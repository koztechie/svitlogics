// netlify/functions/analyze.ts
import { Handler } from "@netlify/functions";
import NodeCache from "node-cache";
import { MODELS_CASCADE, ModelConfig } from "./config/modelsConfig";
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_UK } from "./config/promptConfig";
const ipCache = new NodeCache({ stdTTL: 3600 });

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
interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
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
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" }),
    };
  }
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }
  const clientIp = event.headers["x-nf-client-connection-ip"];

  // IP-BASED RATE LIMITING (ТЕПЕР ЦЕ ВАШ ГОЛОВНИЙ ЗАХИСТ)
  if (clientIp) {
    const requestCount = (ipCache.get<number>(clientIp) || 0) + 1;
    if (requestCount > 20) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Too many requests" }),
      };
    }
    ipCache.set(clientIp, requestCount);
  }

  try {
    const { text, language } = body; // Більше немає turnstileToken
    const apiKey = process.env.GOOGLE_AI_KEY;
    if (!apiKey) {
      throw new Error("Server config error");
    }
    if (!text || !language) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing text or language" }),
      };
    }

    const systemPrompt =
      language === "uk" ? SYSTEM_PROMPT_UK : SYSTEM_PROMPT_EN;
    const result = await analyzeTextWithSvitlogicsAI(
      systemPrompt,
      text,
      language,
      apiKey
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        error: error.message || "AI providers unavailable",
      }),
    };
  }
};
