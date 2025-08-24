/**
 * @fileoverview Цей файл містить сервіс для взаємодії з Svitlogics AI API.
 * Він інкапсулює логіку HTTP-запитів, обробку відповідей та помилок,
 * надаючи чистий та типізований інтерфейс для решти застосунку.
 * @version 1.1.0
 */

// --- Типи даних API ---

/**
 * @description Описує результат аналізу для однієї категорії.
 */
interface AnalysisResult {
  readonly category_name: string;
  readonly percentage_score: number;
  readonly justification: string;
}

/**
 * @description Описує повну успішну відповідь від API, коли аналіз завершено.
 */
export interface SvitlogicsAnalysisResponse {
  readonly analysis_results: readonly AnalysisResult[];
  readonly overall_summary: string;
  readonly usedModelName: string;
}

/**
 * @description Описує відповідь з помилкою від API.
 */
export interface SvitlogicsErrorResponse {
  readonly error: string;
}

/**
 * @description Описує відповідь від функції-тригера, що містить ID завдання.
 */
export interface StartAnalysisResponse {
  readonly taskId: string;
}

/**
 * @description Описує відповідь про проміжний статус асинхронного завдання.
 */
export interface AnalysisStatusResponse {
  readonly status: "completed" | "pending" | "failed";
  readonly data?: SvitlogicsAnalysisResponse;
  readonly error?: string;
}

// --- Константи ---

/**
 * @description Ендпоінти API. Винесені для легкого керування та уникнення "магічних рядків".
 * @private
 */
const API_ENDPOINTS = {
  START_ANALYSIS: "/.netlify/functions/analyze-trigger",
  CHECK_STATUS: "/.netlify/functions/analyze-status",
} as const;

/**
 * @description Стандартні заголовки для POST-запитів.
 * @private
 */
const POST_HEADERS = {
  "Content-Type": "application/json",
} as const;

// --- Допоміжні функції (Принцип єдиної відповідальності) ---

/**
 * @description Узагальнена помилка, що представляє збій API-запиту.
 * @private
 */
class ApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * @description Уніфікований обробник для `fetch` запитів.
 * @private
 * @template T - Очікуваний тип успішної відповіді.
 * @param {string} url - URL ендпоінту.
 * @param {RequestInit} [options] - Опції для `fetch`.
 * @returns {Promise<T>} Проміс, що повертає розпарсені JSON-дані.
 * @throws {ApiError} У випадку мережевої помилки або неуспішного HTTP-статусу.
 */
const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  let httpResponse: Response;

  try {
    httpResponse = await fetch(url, options);
  } catch (networkError) {
    console.error(
      `Network error for ${options?.method || "GET"} ${url}:`,
      networkError
    );
    throw new ApiError(
      "A network error occurred. Please check your connection."
    );
  }

  // Десеріалізуємо тіло відповіді, навіть якщо статус неуспішний,
  // щоб спробувати отримати повідомлення про помилку з сервера.
  let responseData: unknown;
  try {
    responseData = await httpResponse.json();
  } catch (jsonError) {
    // Якщо тіло не є валідним JSON, або його немає.
    responseData = null;
  }

  if (!httpResponse.ok) {
    // Типізуємо відповідь з помилкою для безпечного доступу.
    const errorMessage =
      typeof responseData === "object" &&
      responseData &&
      "error" in responseData &&
      typeof responseData.error === "string"
        ? responseData.error
        : `Request failed with status ${httpResponse.status}`;

    console.error(
      `API error for ${options?.method || "GET"} ${url} (Status: ${
        httpResponse.status
      }):`,
      errorMessage
    );
    throw new ApiError(errorMessage, httpResponse.status);
  }

  return responseData as T;
};

// --- Експортовані функції API ---

/**
 * @description Запускає асинхронне завдання аналізу тексту.
 * @param {string} text - Текст для аналізу.
 * @param {'en' | 'uk'} language - Мова тексту.
 * @returns {Promise<StartAnalysisResponse>} Проміс, що повертає об'єкт з `taskId`.
 * @throws {ApiError} У випадку помилки.
 * @example
 * try {
 *   const { taskId } = await startAnalysis("Some text", "en");
 *   console.log("Analysis started with task ID:", taskId);
 * } catch (error) {
 *   console.error("Failed to start analysis:", error.message);
 * }
 */
export const startAnalysis = (
  text: string,
  language: "en" | "uk"
): Promise<StartAnalysisResponse> => {
  return apiFetch<StartAnalysisResponse>(API_ENDPOINTS.START_ANALYSIS, {
    method: "POST",
    headers: POST_HEADERS,
    body: JSON.stringify({ text, language }),
  });
};

/**
 * @description Перевіряє статус асинхронного завдання аналізу за його ID.
 * @param {string} taskId - ID завдання аналізу.
 * @returns {Promise<AnalysisStatusResponse>} Проміс, що повертає об'єкт статусу.
 * @throws {ApiError} У випадку помилки.
 * @example
 * try {
 *   const status = await checkAnalysisStatus("some-task-id");
 *   if (status.status === 'completed') {
 *     console.log("Analysis complete:", status.data);
 *   }
 * } catch (error) {
 *   console.error("Failed to check status:", error.message);
 * }
 */
export const checkAnalysisStatus = (
  taskId: string
): Promise<AnalysisStatusResponse> => {
  const url = new URL(API_ENDPOINTS.CHECK_STATUS, window.location.origin);
  url.searchParams.set("taskId", taskId);
  return apiFetch<AnalysisStatusResponse>(url.href);
};
