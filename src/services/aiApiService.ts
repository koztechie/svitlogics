// src/services/aiApiService.ts

// --- ІНТЕРФЕЙСИ ТИПІВ ---
// Описують формати даних, які ми очікуємо від API.

// Результат аналізу для однієї категорії
interface AnalysisResult {
  category_name: string;
  percentage_score: number;
  justification: string;
}

// Повна успішна відповідь від API, коли аналіз завершено
export interface SvitlogicsAnalysisResponse {
  analysis_results: AnalysisResult[];
  overall_summary: string;
  usedModelName: string;
}

// Відповідь з помилкою від API
export interface SvitlogicsErrorResponse {
  error: string;
}

// Відповідь від функції-тригера, що містить ID завдання
export interface StartAnalysisResponse {
  taskId: string;
}

// Відповідь про проміжний статус асинхронного завдання
export interface AnalysisStatusResponse {
  status: "completed" | "pending" | "failed";
  data?: SvitlogicsAnalysisResponse; // Дані будуть лише при статусі 'completed'
  error?: string; // Повідомлення про помилку при статусі 'failed'
}

// --- КЛІЄНТСЬКІ ФУНКЦІЇ API ---

/**
 * Запускає асинхронне завдання аналізу тексту.
 * @param text - Текст для аналізу.
 * @param language - Мова тексту ('en' або 'uk').
 * @returns A promise that resolves to an object with a taskId, or an error object.
 */
export async function startAnalysis(
  text: string,
  language: "en" | "uk"
): Promise<StartAnalysisResponse> {
  const API_ENDPOINT = "/.netlify/functions/analyze-trigger";
  try {
    const httpResponse = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language }),
    });

    const responseData = await httpResponse.json();

    if (!httpResponse.ok) {
      const errorMessage =
        responseData.error ||
        `Request failed with status ${httpResponse.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: any) {
    console.error("Critical error in startAnalysis:", error);
    // Перекидаємо помилку далі, щоб її обробив `handleAnalyze`
    throw new Error(error.message || "An unexpected network error occurred.");
  }
}

/**
 * Перевіряє статус асинхронного завдання аналізу за його ID.
 * @param taskId - The ID of the analysis task.
 * @returns A promise that resolves to the final analysis result or a status object.
 */
export async function checkAnalysisStatus(
  taskId: string
): Promise<AnalysisStatusResponse> {
  const API_ENDPOINT = `/.netlify/functions/analyze-status?taskId=${taskId}`;

  try {
    const httpResponse = await fetch(API_ENDPOINT);
    const responseData = await httpResponse.json();

    if (!httpResponse.ok) {
      const errorMessage =
        responseData.error ||
        `Request failed with status ${httpResponse.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: any) {
    console.error("Critical error in checkAnalysisStatus:", error);
    // Перекидаємо помилку далі
    throw new Error(error.message || "An unexpected network error occurred.");
  }
}
