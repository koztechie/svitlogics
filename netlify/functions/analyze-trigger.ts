/**
 * @fileoverview Netlify Serverless Function для асинхронного запуску завдання аналізу тексту.
 * Ця функція виступає як швидкий "тригер": вона приймає дані, валідує їх,
 * генерує унікальний ID завдання та ініціює фонову функцію для важкої обробки.
 * Клієнту негайно повертається ID для подальшої перевірки статусу.
 * @version 1.1.0
 */

import { Handler, HandlerEvent } from "@netlify/functions";
import { v4 as uuidv4 } from "uuid";
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_UK } from "./config/promptConfig";

// --- Типи та константи для підвищення надійності та читабельності ---

/**
 * @description Визначає підтримувані мови для аналізу.
 * Використання union type забезпечує типову безпеку при виборі системного промпту.
 */
type SupportedLanguage = "en" | "uk";

/**
 * @description Описує очікувану структуру тіла POST-запиту.
 */
interface RequestBody {
  text?: string;
  language?: SupportedLanguage;
}

/**
 * @description Описує корисне навантаження, що передається у фонову функцію.
 */
interface BackgroundTaskPayload extends RequestBody {
  taskId: string;
  systemPrompt: string;
}

const HTTP_STATUS = {
  OK: 200,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const BACKGROUND_FUNCTION_PATH = "/.netlify/functions/analyze-background";
const NETLIFY_INVOKE_HEADER = "x-netlify-invoke";
const DEFAULT_BASE_URL = "http://localhost:8888";

const SYSTEM_PROMPTS: Record<SupportedLanguage, string> = {
  uk: SYSTEM_PROMPT_UK,
  en: SYSTEM_PROMPT_EN,
};

// --- Допоміжні функції для дотримання принципу єдиної відповідальності ---

/**
 * @private
 * @description Створює стандартизовану JSON-відповідь.
 * @param statusCode - HTTP статус код відповіді.
 * @param body - Об'єкт, який буде серіалізовано в JSON.
 * @returns Об'єкт відповіді, сумісний з Netlify Functions.
 */
const createJsonResponse = (statusCode: number, body: object) => {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};

/**
 * @description Обробник Netlify Function для ендпоінту `analyze-trigger`.
 * Приймає POST-запит з `text` та `language`.
 * - Повертає 202 Accepted з `taskId` у разі успішного запуску фонового завдання.
 * - Повертає 400 Bad Request у разі відсутності тіла, невалідного JSON або відсутності обов'язкових полів.
 * - Повертає 500 Internal Server Error у випадку внутрішніх помилок сервера.
 *
 * @param event - Об'єкт події Netlify Function.
 * @returns {Promise<object>} HTTP відповідь.
 *
 * @example
 * // Приклад успішного запиту за допомогою cURL:
 * // curl -X POST 'https://your-site.netlify.app/.netlify/functions/analyze-trigger' \
 * // -H 'Content-Type: application/json' \
 * // -d '{"text": "Це текст для аналізу.", "language": "uk"}'
 * //
 * // Очікувана відповідь:
 * // HTTP/1.1 202 Accepted
 * // {"taskId": "a1b2c3d4-e5f6-..."}
 */
export const handler: Handler = async (event: HandlerEvent) => {
  if (!event.body) {
    return createJsonResponse(HTTP_STATUS.BAD_REQUEST, {
      error: "Request body is missing.",
    });
  }

  let requestBody: RequestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch (error) {
    console.error("[Trigger] Failed to parse request body:", error);
    return createJsonResponse(HTTP_STATUS.BAD_REQUEST, {
      error: "Invalid JSON format in request body.",
    });
  }

  const { text, language } = requestBody;
  const supportedLanguages = Object.keys(SYSTEM_PROMPTS) as SupportedLanguage[];

  if (!text || !language || !supportedLanguages.includes(language)) {
    return createJsonResponse(HTTP_STATUS.BAD_REQUEST, {
      error: "Missing or invalid `text` or `language` in request body.",
      details: `Required: 'text' (string), 'language' (one of: ${supportedLanguages.join(
        ", "
      )}).`,
    });
  }

  try {
    const taskId = uuidv4();
    const systemPrompt = SYSTEM_PROMPTS[language];

    const payload: BackgroundTaskPayload = {
      taskId,
      text,
      language,
      systemPrompt,
    };

    const functionUrl = new URL(
      BACKGROUND_FUNCTION_PATH,
      process.env.URL || DEFAULT_BASE_URL
    ).href;

    // Асинхронний виклик фонової функції. Ми не очікуємо (await) на результат.
    fetch(functionUrl, {
      method: "POST",
      headers: {
        [NETLIFY_INVOKE_HEADER]: "background",
      },
      body: JSON.stringify(payload),
    }).catch((fetchError) => {
      // Логуємо помилку, якщо `fetch` не зміг навіть ініціювати запит.
      // Це не впливає на відповідь клієнту, оскільки вона вже могла бути відправлена.
      console.error(
        `[Trigger] Background fetch initiation failed for task ${taskId}:`,
        fetchError
      );
    });

    console.log(`[Trigger] Background task ${taskId} invoked successfully.`);

    return createJsonResponse(HTTP_STATUS.ACCEPTED, { taskId });
  } catch (error) {
    console.error("[Trigger] An unexpected internal error occurred:", error);
    return createJsonResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      error: "An internal server error occurred.",
    });
  }
};
