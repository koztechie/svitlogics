// netlify/functions/analyze-status.ts

import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export const handler: Handler = async (event) => {
  // --- ЛОГ №1: Перевіряємо, чи функція взагалі запустилася ---
  console.log("[Status Check] Invoked.");

  try {
    const taskId = event.queryStringParameters?.taskId;

    // --- ЛОГ №2: Перевіряємо, чи отримали ми taskId ---
    console.log(`[Status Check] Received taskId: ${taskId || "NONE"}`);

    if (!taskId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "taskId is required." }),
      };
    }

    // --- ЛОГ №3: Перевіряємо, чи доступні змінні оточення ---
    const siteID = process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_API_TOKEN;
    console.log(`[Status Check] NETLIFY_SITE_ID is set: ${!!siteID}`);
    console.log(`[Status Check] NETLIFY_API_TOKEN is set: ${!!token}`);

    if (!siteID || !token) {
      throw new Error("Server environment is not configured for Blobs.");
    }

    const store = getStore({
      name: "analysis_results",
      siteID,
      token,
    });

    // --- ЛОГ №4: Перевіряємо, чи отримали ми "ручку" до сховища ---
    console.log("[Status Check] Successfully got store handle.");

    const result = await store.get(taskId, { type: "json" });

    // --- ЛОГ №5: Показуємо, що саме ми отримали зі сховища ---
    console.log(
      `[Status Check] Got result from store for ${taskId}:`,
      JSON.stringify(result, null, 2)
    );

    if (result) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };
    } else {
      return {
        statusCode: 202,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      };
    }
  } catch (error) {
    // --- ЛОГ №6: Якщо будь-що "впало", ми побачимо повну помилку ---
    console.error("[Status Check] CRITICAL ERROR:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An internal server error occurred.",
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
