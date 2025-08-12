// src/services/aiApiService.ts

// --- ІНТЕРФЕЙСИ ТИПІВ ---
// Ці типи описують, як виглядають успішна відповідь та помилка від нашого бекенду.
// Вони залишаються такими ж, як і раніше.

interface AnalysisResult {
  category_name: string;
  percentage_score: number;
  justification: string;
}

export interface SvitlogicsAnalysisResponse {
  analysis_results: AnalysisResult[];
  overall_summary: string;
  usedModelName: string;
}

export interface SvitlogicsErrorResponse {
  error: string;
}

// --- НОВА ФУНКЦІЯ-КЛІЄНТ ---

/**
 * Надсилає запит на аналіз тексту до нашого власного захищеного API-шлюзу.
 * @param text - Текст для аналізу.
 * @param language - Мова тексту ('en' або 'uk').
 * @param systemPrompt - Системний промпт, що відповідає обраній мові.
 * @param turnstileToken - Токен від Cloudflare Turnstile для CAPTCHA верифікації.
 * @returns A promise that resolves to either a successful analysis or an error object.
 */
export async function analyzeText(
  text: string,
  language: "en" | "uk",
  systemPrompt: string
): Promise<SvitlogicsAnalysisResponse | SvitlogicsErrorResponse> {
  const API_ENDPOINT = "/.netlify/functions/analyze";
  try {
    const httpResponse = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language, systemPrompt }), // Надсилаємо без токена
    });

    const responseData: SvitlogicsAnalysisResponse | SvitlogicsErrorResponse =
      await httpResponse.json();

    if (!httpResponse.ok) {
      // Якщо сервер повернув помилку (напр., 429, 500), ми її "прокидаємо" далі
      const errorMessage =
        (responseData as SvitlogicsErrorResponse).error ||
        `Request failed with status ${httpResponse.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error: any) {
    console.error("Critical error in aiApiService:", error);
    // Повертаємо помилку у стандартизованому форматі
    return { error: error.message || "An unexpected network error occurred." };
  }
}
