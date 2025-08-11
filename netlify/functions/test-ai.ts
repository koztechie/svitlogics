// netlify/functions/test-ai.ts

import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  // 1. Перевіряємо, чи є ключ
  const apiKey = process.env.GOOGLE_AI_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: "Error: GOOGLE_AI_KEY is not set." };
  }

  // 2. Використовуємо найпростішу і найшвидшу модель
  const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  // 3. Формуємо найпростіший можливий запит
  const requestBody = {
    contents: [{
      parts: [{
        text: "Tell me a short joke."
      }]
    }]
  };

  try {
    // 4. Робимо запит
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // 5. Перевіряємо статус відповіді
    if (!response.ok) {
        const errorText = await response.text();
        return {
            statusCode: response.status,
            body: `Google API Error: ${errorText}`,
        };
    }

    // 6. Повертаємо сиру відповідь від Google
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

  } catch (error: any) {
    return {
      statusCode: 500,
      body: `Internal Server Error: ${error.message}`,
    };
  }
};