/**
 * @fileoverview Netlify Serverless Function для перевірки статусу завдання аналізу.
 * Функція приймає `taskId` як параметр запиту, шукає відповідний результат
 * у сховищі Netlify Blobs та повертає його.
 * @version 1.1.0
 */

import { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// --- Типи для підвищення надійності та автодоповнення ---

/**
 * @description Описує успішний результат аналізу, що зберігається у сховищі.
 * @todo Уточнити структуру відповідно до реальних даних, що зберігаються.
 */
type AnalysisResult = Record<string, unknown>;

/**
 * @description Відповідь, коли завдання ще виконується.
 */
type PendingStatusResponse = {
  readonly status: "pending";
};

/**
 * @description Стандартна відповідь про помилку.
 */
type ErrorResponse = {
  readonly error: string;
};

// --- Константи для покращення читабельності та підтримки ---

const HTTP_STATUS = {
  OK: 200,
  ACCEPTED: 202, // Використовується для позначення, що запит прийнято, але обробка не завершена.
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const HEADERS = {
  "Content-Type": "application/json",
} as const;

const BLOB_STORE_NAME = "analysis_results";
const QUERY_PARAM_TASK_ID = "taskId";

// --- Допоміжні функції (Принцип єдиної відповідальності) ---

/**
 * @private
 * @description Створює стандартизовану JSON-відповідь.
 * @param statusCode - HTTP статус код відповіді.
 * @param body - Об'єкт, який буде перетворено в JSON-рядок.
 * @returns Об'єкт відповіді, сумісний з Netlify Functions.
 */
const createJsonResponse = (
  statusCode: number,
  body: AnalysisResult | PendingStatusResponse | ErrorResponse
) => {
  return {
    statusCode,
    headers: HEADERS,
    body: JSON.stringify(body),
  };
};

/**
 * @private
 * @description Ініціалізує та повертає інстанс сховища Netlify Blobs.
 * Перевіряє наявність необхідних змінних середовища.
 * @throws {Error} Якщо змінні середовища `NETLIFY_SITE_ID` або `NETLIFY_API_TOKEN` не налаштовані.
 * @returns Інстанс Netlify Blob store.
 */
const initializeStore = () => {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_API_TOKEN;

  if (!siteID || !token) {
    throw new Error("Server environment is not configured for Blobs.");
  }

  return getStore({ name: BLOB_STORE_NAME, siteID, token });
};

/**
 * @description Обробник Netlify Function для ендпоінту `analyze-status`.
 * Очікує `taskId` в параметрах запиту.
 * - Повертає 200 OK з результатом, якщо завдання завершено.
 * - Повертає 202 Accepted зі статусом "pending", якщо завдання в процесі.
 * - Повертає 400 Bad Request, якщо `taskId` не надано.
 * - Повертає 500 Internal Server Error у випадку внутрішніх помилок.
 *
 * @param event - Об'єкт події Netlify Function.
 * @returns {Promise<object>} HTTP відповідь.
 *
 * @example
 * // Успішний запит: GET /api/analyze-status?taskId=abc-123
 * // Успішна відповідь (знайдено):
 * // HTTP 200 OK
 * // {"analysis_results": [...]}
 *
 * // Успішна відповідь (в очікуванні):
 * // HTTP 202 Accepted
 * // {"status": "pending"}
 */
export const handler: Handler = async (event: HandlerEvent) => {
  const taskId = event.queryStringParameters?.[QUERY_PARAM_TASK_ID];

  try {
    if (!taskId) {
      return createJsonResponse(HTTP_STATUS.BAD_REQUEST, {
        error: 'Query parameter "taskId" is required.',
      });
    }

    const store = initializeStore();
    const result = await store.get(taskId, { type: "json" });

    if (result) {
      return createJsonResponse(HTTP_STATUS.OK, result as AnalysisResult);
    } else {
      return createJsonResponse(HTTP_STATUS.ACCEPTED, { status: "pending" });
    }
  } catch (error) {
    // Логуємо повну помилку для внутрішнього аналізу, але не віддаємо її клієнту.
    console.error(
      `[analyze-status] Critical error for taskId "${taskId || "N/A"}":`,
      error
    );

    return createJsonResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      error: "An internal server error occurred.",
    });
  }
};
