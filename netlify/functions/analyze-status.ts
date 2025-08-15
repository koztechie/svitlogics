// netlify/functions/analyze-status.ts

import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export const handler: Handler = async (event) => {
  console.log("[Status Check] Function invoked.");

  try {
    const taskId = event.queryStringParameters?.taskId;

    if (!taskId) {
      console.error(
        "[Status Check] Error: taskId is missing from query string."
      );
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "taskId is required." }),
      };
    }

    console.log(`[Status Check] Received taskId: ${taskId}`);

    // --- ВИПРАВЛЕННЯ ТУТ: Явна ініціалізація сховища ---
    const store = getStore({
      name: "analysis_results",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_API_TOKEN,
    });

    console.log(`[Status Check] Attempting to get value for key: ${taskId}`);
    const result = await store.get(taskId, { type: "json" });
    console.log(`[Status Check] Got result from store:`, result);

    if (result) {
      console.log(
        `[Status Check] Task ${taskId} is completed. Returning data.`
      );
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };
    } else {
      console.log(`[Status Check] Task ${taskId} is still pending.`);
      return {
        statusCode: 202, // Accepted (but not complete)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      };
    }
  } catch (error) {
    console.error(
      "[Status Check] A CRITICAL error occurred in the handler:",
      error
    );
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An internal server error occurred while checking the status.",
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
