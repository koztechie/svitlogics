// netlify/functions/record-analysis-stat.ts

import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";
import { z } from "zod";

// --- Типізація ---

// Схема для валідації вхідних даних
const StatSchema = z.object({
  duration: z.number().positive(),
  charCount: z.number().positive(),
  language: z.enum(["en", "uk"]),
});

type StatEntry = z.infer<typeof StatSchema> & { timestamp: number };

interface AnalysisStats {
  en: StatEntry[];
  uk: StatEntry[];
}

const STATS_LIMIT = 100; // Ліміт на кількість записів

export default async (req: Request, context: Context): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const validationResult = StatSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          issues: validationResult.error.issues,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { duration, charCount, language } = validationResult.data;
    const newStat: StatEntry = {
      duration,
      charCount,
      language,
      timestamp: Date.now(),
    };

    // Отримуємо доступ до сховища
    const store = getStore("analysis_stats");

    // Отримуємо поточну статистику або створюємо нову
    const currentStats: AnalysisStats = (await store.get("stats", {
      type: "json",
    })) || { en: [], uk: [] };

    // Додаємо новий запис
    currentStats[language].push(newStat);

    // Обрізаємо масив, щоб зберігати лише останні N записів
    if (currentStats[language].length > STATS_LIMIT) {
      currentStats[language] = currentStats[language].slice(-STATS_LIMIT);
    }

    // Зберігаємо оновлену статистику
    await store.setJSON("stats", currentStats);

    return new Response("Stat recorded", { status: 201 });
  } catch (error) {
    console.error("Error in record-analysis-stat:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Налаштування для Netlify: вказуємо, що функція працює з Blobs
export const config = {
  name: "Record Analysis Stat",
  blobs: ["analysis_stats"],
};
