// netlify/functions/get-analysis-stats.ts

import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // Отримуємо доступ до сховища
    const store = getStore("analysis_stats");

    // Отримуємо статистику. Якщо її немає, get поверне `null`.
    const stats = await store.get("stats", { type: "json" });

    // Повертаємо знайдені дані або порожній об'єкт, якщо нічого не знайдено
    return new Response(JSON.stringify(stats || {}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Додаємо кешування, щоб не запитувати дані занадто часто
        "Cache-Control": "public, max-age=300", // Кешувати на 5 хвилин
      },
    });
  } catch (error) {
    console.error("Error in get-analysis-stats:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Налаштування для Netlify: вказуємо, що функція працює з Blobs
export const config = {
  name: "Get Analysis Stats",
  blobs: ["analysis_stats"],
};
