// src/config/promptConfig.ts

// Кількість токенів, які займають системні промпти
export const SYSTEM_PROMPT_TOKEN_COUNT = {
  en: 7500,
  uk: 7500,
};

// Буфер для токенів відповіді та API overhead
export const OUTPUT_BUFFER_TOKENS = 2500;

// Співвідношення символів до токенів
export const CHARS_PER_TOKEN = {
  en: 4,
  uk: 2,
};