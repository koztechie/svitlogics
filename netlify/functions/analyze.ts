// netlify/functions/analyze.ts

import { Handler } from '@netlify/functions';
import NodeCache from 'node-cache';

// Створюємо екземпляр кешу. Записи будуть жити 1 годину (3600 секунд).
const ipCache = new NodeCache({ stdTTL: 3600 });

// --- ІМПОРТИ, ПЕРЕНЕСЕНІ З КЛІЄНТА ---
// Ми імпортуємо ваші реальні конфігурації
import { MODELS_CASCADE, ModelConfig } from '../../src/config/modelsConfig';
import { SYSTEM_PROMPT_TOKEN_COUNT, OUTPUT_BUFFER_TOKENS, CHARS_PER_TOKEN } from '../../src/config/promptConfig';

// --- ІНТЕРФЕЙСИ ТИПІВ, ПЕРЕНЕСЕНІ З КЛІЄНТА ---
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

// --- ДОПОМІЖНА ФУНКЦІЯ ПАРСИНГУ, ПЕРЕНЕСЕНА З КЛІЄНТА ---
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

// --- ОСНОВНА AI-ЛОГІКА (ВАШ ОРИГІНАЛЬНИЙ КАСКАД), АДАПТОВАНА ДЛЯ БЕКЕНДУ ---
async function analyzeTextWithSvitlogicsAI(
  systemPromptString: string,
  textToAnalyze: string,
  languageCode: 'en' | 'uk',
  modelIndex: number = 0
): Promise<SvitlogicsAnalysisResponse | SvitlogicsErrorResponse> {
  // ... (Ваш код каскаду залишається тут без змін) ...
  if (modelIndex >= MODELS_CASCADE.length) {
    return { error: "All available AI models are currently at their capacity limit or the text is too long for any available model. Please try again later." };
  }
  const currentModel = MODELS_CASCADE[modelIndex];
  const apiKey = process.env.GOOGLE_AI_KEY;
  if (!apiKey) {
      throw new Error("FATAL: GOOGLE_AI_KEY environment variable is not set on the server.");
  }
  const API_ENDPOINT = `https://generativelace.googleapis.com/v1beta/models/${currentModel.name}:generateContent?key=${apiKey}`;
  console.log(`Attempting analysis with model [${modelIndex + 1}/${MODELS_CASCADE.length}]: ${currentModel.displayName}`);
  const systemPromptTokens = SYSTEM_PROMPT_TOKEN_COUNT[languageCode];
  const tokenToCharRatio = CHARS_PER_TOKEN[languageCode];
  const availableTokensForInput = currentModel.tpm - systemPromptTokens - OUTPUT_BUFFER_TOKENS;
  const maxCharsForThisModel = Math.floor(availableTokensForInput * tokenToCharRatio);
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
      if (httpResponse.status === 429 || errorMessage.toLowerCase().includes('quota')) {
        console.warn(`Quota limit hit for model ${currentModel.name}. Falling back...`);
        return analyzeTextWithSvitlogicsAI(systemPromptString, textToAnalyze, languageCode, modelIndex + 1);
      }
      return { error: `API Error: ${errorMessage}` };
    }
    const candidate = responseData.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      const blockReason = responseData.promptFeedback?.blockReason || 'No candidate returned';
      return { error: `Analysis blocked: ${blockReason}` };
    }
    if (candidate.finishReason && !['STOP', 'MAX_TOKENS'].includes(candidate.finishReason)) {
      return { error: `Analysis incomplete: ${candidate.finishReason}` };
    }
    const generatedText = candidate.content.parts[0].text;
    return parseAnalysisResponse(generatedText, currentModel);
  } catch (error: any) {
    console.error(`Critical fetch error for ${currentModel.name}:`, error);
    return { error: `A network error occurred: ${error.message}` };
  }
}


// --- ГОЛОВНИЙ ОБРОБНИК NETLIFY ---
export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  // --- CLOUDFLARE TURNSTILE VERIFICATION ---
  try {
    const body = JSON.parse(event.body);
    const { turnstileToken } = body;

    if (!turnstileToken) {
      return { statusCode: 403, body: JSON.stringify({ error: "CAPTCHA token is missing." }) };
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;
    // --- ВИПРАВЛЕННЯ ТУТ ---
    if (!secret) {
        console.error("FATAL: TURNSTILE_SECRET_KEY environment variable is not set on the server.");
        // Повертаємо загальну помилку, щоб не розкривати деталі інфраструктури
        return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error." }) };
    }

    const clientIp = event.headers['x-nf-client-connection-ip'];
    const formData = new URLSearchParams();
    formData.append('secret', secret); // Тепер TypeScript впевнений, що 'secret' - це 'string'
    formData.append('response', turnstileToken);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v2/siteverify', {
      method: 'POST',
      body: formData,
    });

    const outcome = await result.json();
    if (!outcome.success) {
      console.warn('Turnstile verification failed:', outcome['error-codes']);
      return { statusCode: 403, body: JSON.stringify({ error: "CAPTCHA verification failed." }) };
    }
    console.log("Turnstile verification successful.");

  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }
  // --- END OF TURNSTILE VERIFICATION ---
  
  // --- IP-BASED RATE LIMITING ---
  const clientIp = event.headers['x-nf-client-connection-ip'];
  if (clientIp) {
    const requestCount = (ipCache.get<number>(clientIp) || 0) + 1;
    if (requestCount > 20) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: "Too many requests. Please try again later." }),
      };
    }
    ipCache.set(clientIp, requestCount);
    console.log(`IP: ${clientIp} has made ${requestCount} requests.`);
  }
  // --- END OF RATE LIMITING ---

  try {
    const { text, language, systemPrompt } = JSON.parse(event.body);

    if (!text || !language || !systemPrompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing text, language, or systemPrompt in request body.' }),
      };
    }

    const result = await analyzeTextWithSvitlogicsAI(systemPrompt, text, language);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };

  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred on the server.";
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};