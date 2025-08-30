// netlify/functions/analyze-trigger.ts

import { Handler } from "@netlify/functions";
import { v4 as uuidv4 } from "uuid";
// ВИДАЛЕНО: import { invoke } from "@netlify/functions";
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_UK } from "./config/promptConfig";

/**
 * Netlify serverless function to trigger a background analysis task.
 *
 * This function receives text and a language code, generates a unique task ID,
 * and invokes a background function to perform the analysis. It immediately
 * returns the task ID to the client.
 *
 * @param event The incoming request event.
 * @returns A response with the task ID.
 */
export const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request body is missing" }),
    };
  }

  try {
    const { text, language } = JSON.parse(event.body);

    if (!text || !language || (language !== "en" && language !== "uk")) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing or invalid `text` or `language` in request body.",
        }),
      };
    }

    const taskId = uuidv4();

    // Вибираємо правильний промпт тут
    const systemPrompt =
      language === "uk" ? SYSTEM_PROMPT_UK : SYSTEM_PROMPT_EN;

    const payload = {
      taskId,
      text,
      language,
      systemPrompt,
    };

    // --- ВИПРАВЛЕННЯ ТУТ: Сучасний спосіб виклику фонової функції ---
    // Формуємо повний URL до фонової функції
    const functionUrl = new URL(
      "/.netlify/functions/analyze-background",
      process.env.URL || "http://localhost:8888" // process.env.URL надається Netlify
    ).href;

    // Робимо fetch-запит з спеціальним заголовком
    fetch(functionUrl, {
      method: "POST",
      headers: {
        "x-netlify-invoke": "background", // Цей заголовок каже Netlify запустити функцію у фоні
      },
      body: JSON.stringify(payload),
    });
    // Важливо: ми НЕ чекаємо на відповідь за допомогою await

    console.log(`[Trigger] Background task ${taskId} invoked.`);

    return {
      statusCode: 202, // 202 Accepted - кращий статус для такого випадку
      body: JSON.stringify({ taskId }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON in request body." }),
    };
  }
};
