import { GEMMA_API_KEY } from '../config/gemmaConfig';
import { MODELS_CASCADE, ModelConfig } from '../config/modelsConfig';
import { SYSTEM_PROMPT_TOKEN_COUNT, OUTPUT_BUFFER_TOKENS, CHARS_PER_TOKEN } from '../config/promptConfig';

// --- Type Interfaces ---

interface AnalysisResult {
  category_name: string;
  percentage_score: number;
  justification: string;
}

export interface SvitlogicsAnalysisResponse {
  analysis_results: AnalysisResult[];
  overall_summary: string;
  usedModelName: string;
}

export interface SvitlogicsErrorResponse {
  error: string;
}

// --- Helper Functions ---

/**
 * Parses the JSON string from the AI's response.
 * Handles cases where the JSON is wrapped in a markdown code block.
 * @param jsonString - The raw string from the AI response.
 * @param model - The model config used, for enriching the response.
 * @returns A parsed SvitlogicsAnalysisResponse or throws an error.
 */
function parseAnalysisResponse(jsonString: string, model: ModelConfig): SvitlogicsAnalysisResponse {
  try {
    const parsed = JSON.parse(jsonString);
    parsed.usedModelName = model.displayName;
    return parsed;
  } catch (e) {
    const match = jsonString.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        const parsedFromMarkdown = JSON.parse(match[1]);
        parsedFromMarkdown.usedModelName = model.displayName;
        return parsedFromMarkdown;
      } catch (e2) {
        console.error("Failed to parse extracted JSON:", e2);
        throw new Error("AI response was not valid JSON even after extraction from markdown.");
      }
    }
    console.error("Raw string was not valid JSON and not in a markdown block:", jsonString);
    throw new Error("AI response was not in a valid JSON format.");
  }
}

/**
 * The main recursive function for text analysis with a model fallback cascade.
 * It tries models in priority order, falling back on quota errors or if the text is too long for a given model.
 * @param systemPromptString The system prompt defining the AI's task.
 * @param textToAnalyze The user's input text.
 * @param languageCode The language of the text ('en' or 'uk').
 * @param modelIndex The index of the current model to try from the MODELS_CASCADE array.
 * @returns A promise that resolves to either a successful analysis or an error object.
 */
export async function analyzeTextWithSvitlogicsAI(
  systemPromptString: string,
  textToAnalyze: string,
  languageCode: 'en' | 'uk',
  modelIndex: number = 0
): Promise<SvitlogicsAnalysisResponse | SvitlogicsErrorResponse> {
  
  // Base case for recursion: if all models have been tried and failed.
  if (modelIndex >= MODELS_CASCADE.length) {
    return { error: "All available AI models are currently at their capacity limit or the text is too long for any available model. Please try again later." };
  }

  const currentModel = MODELS_CASCADE[modelIndex];
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel.name}:generateContent?key=${GEMMA_API_KEY}`;
  
  console.log(`Attempting analysis with model [${modelIndex + 1}/${MODELS_CASCADE.length}]: ${currentModel.displayName}`);

  // Pre-flight check: ensure the text fits within this specific model's capacity.
  const systemPromptTokens = SYSTEM_PROMPT_TOKEN_COUNT[languageCode];
  const tokenToCharRatio = CHARS_PER_TOKEN[languageCode];
  const availableTokensForInput = currentModel.tpm - systemPromptTokens - OUTPUT_BUFFER_TOKENS;
  const maxCharsForThisModel = Math.floor((availableTokensForInput * tokenToCharRatio) / 10) * 10;
  
  if (textToAnalyze.length > maxCharsForThisModel) {
    console.warn(`Text length (${textToAnalyze.length}) exceeds capacity of model ${currentModel.name} (${maxCharsForThisModel}). Falling back to next model.`);
    return analyzeTextWithSvitlogicsAI(systemPromptString, textToAnalyze, languageCode, modelIndex + 1);
  }

  const fullPrompt = `${systemPromptString}\n\nAnalyze the following text (language: ${languageCode}):\n${textToAnalyze}`;
  const requestBody = {
    contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: currentModel.maxOutputTokens },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };

  try {
    const httpResponse = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const responseData = await httpResponse.json();

    if (!httpResponse.ok) {
      const errorInfo = responseData.error || { message: `API request failed with status ${httpResponse.status}` };
      const errorMessage = errorInfo.message || 'Unknown API error';
      
      // If it's a quota/rate limit error, trigger fallback by calling the next model.
      if (httpResponse.status === 429 || errorMessage.toLowerCase().includes('quota')) {
        console.warn(`Quota limit hit for model ${currentModel.name}. Falling back...`);
        return analyzeTextWithSvitlogicsAI(systemPromptString, textToAnalyze, languageCode, modelIndex + 1);
      }
      // For other HTTP errors, return them directly.
      return { error: `API Error: ${errorMessage}` };
    }

    // Handle responses that are technically "OK" (status 200) but contain no valid content.
    const candidate = responseData.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      const blockReason = responseData.promptFeedback?.blockReason || 'No candidate returned';
      console.error(`Analysis blocked or no content returned: ${blockReason}`, responseData);
      return { error: `Analysis blocked: ${blockReason}` };
    }

    // Check for non-standard finish reasons.
    if (candidate.finishReason && !['STOP', 'MAX_TOKENS'].includes(candidate.finishReason)) {
      console.error(`Analysis incomplete. Finish reason: ${candidate.finishReason}`, candidate);
      return { error: `Analysis incomplete: ${candidate.finishReason}` };
    }

    const generatedText = candidate.content.parts[0].text;
    return parseAnalysisResponse(generatedText, currentModel);

  } catch (error: any) {
    console.error(`Critical fetch error for ${currentModel.name}:`, error);
    return { error: `A network error occurred: ${error.message}` };
  }
}