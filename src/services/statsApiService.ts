// src/services/statsApiService.ts

// --- Типізація ---

// Дані, які ми відправляємо на сервер
interface StatPayload {
  duration: number;
  charCount: number;
  language: "en" | "uk";
}

// Дані, які ми очікуємо отримати з сервера
interface StatEntry {
  duration: number;
  charCount: number;
  language: "en" | "uk";
  timestamp: number;
}

interface AnalysisStatsResponse {
  en?: StatEntry[];
  uk?: StatEntry[];
}

const STATS_BASE_PATH = "/.netlify/functions";

/**
 * @description Отримує зібрану статистику аналізів з сервера.
 * @returns {Promise<AnalysisStatsResponse>} Об'єкт зі статистикою для кожної мови.
 */
export const getStats = async (): Promise<AnalysisStatsResponse> => {
  try {
    const response = await fetch(`${STATS_BASE_PATH}/get-analysis-stats`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching analysis stats:", error);
    // Повертаємо порожній об'єкт у випадку помилки, щоб не "ламати" фронтенд
    return {};
  }
};

/**
 * @description Відправляє дані про завершений аналіз на сервер для збереження.
 * @param {StatPayload} data - Дані про аналіз (тривалість, кількість символів, мова).
 */
export const recordStat = async (data: StatPayload): Promise<void> => {
  try {
    const response = await fetch(`${STATS_BASE_PATH}/record-analysis-stat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to record stat: ${response.statusText}`);
    }
    // Нам не потрібно обробляти відповідь, лише перевіряємо, що запит пройшов успішно
  } catch (error) {
    // Тихо логуємо помилку в консоль, не турбуючи користувача
    console.error("Error recording analysis stat:", error);
  }
};
