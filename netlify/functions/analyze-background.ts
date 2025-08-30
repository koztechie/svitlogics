// netlify/functions/analyze-background.ts
import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { MODELS_CASCADE, ModelConfig } from "./config/modelsConfig";
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_UK } from "./config/promptConfig";

// --- ІНТЕРФЕЙСИ ---
interface AnalysisResult {
  category_name: string;
  percentage_score: number;
  justification: string;
}
interface SvitlogicsAnalysisResponse {
  analysis_results: AnalysisResult[];
  overall_summary: string;
  usedModelName: string;
}
interface GoogleAIResponse {
  candidates?: { content: { parts: { text: string }[] } }[];
  promptFeedback?: { blockReason: string };
}

// --- ГОЛОВНА AI-ЛОГІКА ---
async function analyzeTextWithSvitlogicsAI(
  systemPromptString: string,
  textToAnalyze: string,
  languageCode: "en" | "uk",
  apiKey: string,
  modelIndex: number = 0
): Promise<SvitlogicsAnalysisResponse> {
  if (modelIndex >= MODELS_CASCADE.length) {
    throw new Error(
      "All available AI models in the cascade failed or are at capacity."
    );
  }
  const currentModel = MODELS_CASCADE[modelIndex];
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel.name}:generateContent?key=${apiKey}`;
  console.log(
    `[AI Cascade] Attempting model [${modelIndex + 1}/${
      MODELS_CASCADE.length
    }]: ${currentModel.displayName}`
  );
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${systemPromptString}\n\nAnalyze the following text (language: ${languageCode}):\n${textToAnalyze}`,
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.2, maxOutputTokens: 8192 },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  };
  try {
    const httpResponse = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!httpResponse.ok) {
      const errorText = await httpResponse.text();
      let errorMessage = `API request failed with status ${httpResponse.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson?.error?.message || errorText;
      } catch (e) {
        errorMessage = errorText;
      }
      if (
        httpResponse.status === 429 ||
        httpResponse.status === 400 ||
        errorMessage.toLowerCase().includes("quota") ||
        errorMessage.toLowerCase().includes("size")
      ) {
        console.warn(
          `Model ${currentModel.displayName} failed (likely size/quota). Falling back...`
        );
        return analyzeTextWithSvitlogicsAI(
          systemPromptString,
          textToAnalyze,
          languageCode,
          apiKey,
          modelIndex + 1
        );
      }
      throw new Error(`Google API Error: ${errorMessage}`);
    }
    const responseData = (await httpResponse.json()) as GoogleAIResponse;
    const generatedText =
      responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      const blockReason =
        responseData.promptFeedback?.blockReason ||
        "No content returned from API";
      console.warn(
        `Empty response from ${currentModel.displayName} (Reason: ${blockReason}). Falling back...`
      );
      return analyzeTextWithSvitlogicsAI(
        systemPromptString,
        textToAnalyze,
        languageCode,
        apiKey,
        modelIndex + 1
      );
    }

    const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = match ? match[1] : generatedText.trim();
    const parsedResult = JSON.parse(jsonString);
    return { ...parsedResult, usedModelName: currentModel.displayName };
  } catch (error) {
    console.error(
      `[AI Cascade] Critical error with ${currentModel.displayName}:`,
      error instanceof Error ? error.message : String(error)
    );
    return analyzeTextWithSvitlogicsAI(
      systemPromptString,
      textToAnalyze,
      languageCode,
      apiKey,
      modelIndex + 1
    );
  }
}

// --- ГОЛОВНИЙ ОБРОБНИК NETLIFY ---
export const handler: Handler = async (event) => {
  if (!event.body) {
    console.error("Background function invoked without a body.");
    return { statusCode: 400 };
  }

  let taskId: string | undefined;

  try {
    const body = JSON.parse(event.body);
    taskId = body.taskId; // Зберігаємо taskId для блоку catch
    const { text, language, systemPrompt } = body;
    const apiKey = process.env.GOOGLE_AI_KEY;

    if (!apiKey) {
      throw new Error("Server configuration error: GOOGLE_AI_KEY is not set.");
    }

    if (!taskId || !text || !language || !systemPrompt) {
      throw new Error("Background function invoked with missing parameters.");
    }

    console.log(`[Background Job ${taskId}] Starting analysis...`);
    const result = await analyzeTextWithSvitlogicsAI(
      systemPrompt,
      text,
      language,
      apiKey
    );

    // --- ВИПРАВЛЕННЯ ТУТ ---
    const store = getStore({
      name: "analysis_results",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });

    await store.setJSON(taskId, { status: "completed", data: result });
    console.log(`[Background Job ${taskId}] Analysis complete. Result saved.`);

    return {
      statusCode: 200,
    };
  } catch (error: any) {
    console.error("[Background Job] A critical error occurred:", error);

    if (taskId) {
      // --- ВИПРАВЛЕННЯ ТУТ ---
      const store = getStore({
        name: "analysis_results",
        siteID: process.env.NETLIFY_SITE_ID,
        token: process.env.NETLIFY_API_TOKEN,
      });
      await store.setJSON(taskId, {
        status: "failed",
        error: error.message,
      });
    }
    return {
      statusCode: 500,
    };
  }
};
