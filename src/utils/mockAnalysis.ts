/**
 * @fileoverview Цей файл надає мок-функції для імітації відповідей AI API.
 * Використовується для розробки та тестування UI без реальних API-запитів.
 * @warning **Цей модуль не повинен потрапляти у виробничу збірку.**
 * @version 1.1.0
 */

import { Category } from "../components/AnalysisResults";

// --- Типи та Константи ---

/**
 * @description Визначає узгоджені назви категорій аналізу.
 * Використання `as const` створює незмінний tuple та дозволяє вивести точний тип.
 * @private
 */
const CATEGORY_NAMES = [
  "Manipulative Content",
  "Propagandistic Content",
  "Disinformation",
  "Unbiased Presentation",
  "Emotional Tone",
] as const;

/**
 * @description Тип, що представляє одну з можливих назв категорій.
 * Виведений з `CATEGORY_NAMES` для забезпечення синхронізації.
 * @private
 */
type CategoryName = (typeof CATEGORY_NAMES)[number];

/**
 * @description Кількість рівнів/пояснень для кожної категорії.
 * Використовується для валідації та обчислень.
 * @private
 */
const EXPLANATION_LEVELS = 5;

/**
 * @description Мапа, що містить масиви з п'яти рівнів пояснень для кожної категорії.
 * Рівні відповідають діапазонам оцінок: 0-20, 21-40, 41-60, 61-80, 81-100.
 *
 * `satisfies` гарантує, що об'єкт відповідає типу `Record<CategoryName, string[]>`,
 * але не розширює тип `explanations`, зберігаючи його специфічність.
 * @private
 */
const explanations = {
  "Manipulative Content": [
    "No significant manipulative techniques detected.",
    "Subtle manipulative elements are present but do not dominate the text.",
    "The text employs a moderate level of manipulative language to guide the reader.",
    "A high degree of manipulative language and logical fallacies are used.",
    "The text is fundamentally manipulative, saturated with techniques to bypass critical thought.",
  ],
  "Propagandistic Content": [
    "No clear propaganda markers identified.",
    'Contains latent elements common in propaganda, such as strong "us vs. them" framing.',
    "The text exhibits significant characteristics of propaganda, promoting a one-sided agenda.",
    "A clear example of systematic, one-sided propaganda.",
    "This is overt propaganda designed to enforce a specific worldview.",
  ],
  Disinformation: [
    "No evidence of disinformation detected; claims appear verifiable.",
    "Contains unsubstantiated claims, but clear intent to deceive is not evident (possible misinformation).",
    "High probability of disinformation; contains misleading context or unverified data.",
    "Contains demonstrably false information with clear indicators of malicious intent.",
    "Clear-cut disinformation with fabricated evidence.",
  ],
  "Unbiased Presentation": [
    // Нагадування: вищий бал = краща неупередженість
    "Highly biased and one-sided, functions as advocacy.",
    "A noticeable slant is present, favoring one perspective.",
    "An attempt at objectivity is visible, but with some remaining bias.",
    "The text is generally objective and balanced.",
    "Adheres to high standards of impartiality, providing balanced and factual information.",
  ],
  "Emotional Tone": [
    "The tone is neutral and purely informational.",
    "A slight emotional charge is detectable, but the tone is generally restrained.",
    "A clear and consistent emotional tone is a significant feature of the text.",
    "The text is saturated with a strong emotional tone.",
    "The tone is intensely emotional and vehement.",
  ],
} satisfies Record<CategoryName, string[]>;

// --- Допоміжні функції ---

/**
 * @description Вибирає пояснення для заданої категорії на основі оцінки в процентах.
 * @private
 * @param {CategoryName} categoryName - Назва категорії.
 * @param {number} percentage - Оцінка від 0 до 100.
 * @returns {string} Описовий рядок, що відповідає оцінці.
 * @throws {Error} Якщо `percentage` виходить за межі 0-100.
 */
function getMockExplanation(
  categoryName: CategoryName,
  percentage: number
): string {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100.");
  }

  // Надійна логіка для визначення індексу, що запобігає виходу за межі масиву.
  // Діапазон оцінок (101) ділиться на кількість рівнів (5).
  const bucketSize = (100 + 1) / EXPLANATION_LEVELS;
  const index = Math.min(
    Math.floor(percentage / bucketSize),
    EXPLANATION_LEVELS - 1
  );

  const explanationSet = explanations[categoryName];

  // Перевірка цілісності даних на випадок помилки в конфігурації.
  if (explanationSet.length !== EXPLANATION_LEVELS) {
    console.error(
      `Configuration error: Category "${categoryName}" has ${explanationSet.length} explanations, but expected ${EXPLANATION_LEVELS}.`
    );
    return explanationSet[0] || "Invalid explanation configuration.";
  }

  return explanationSet[index];
}

/**
 * @description Генерує мок-відповідь аналізу для цілей розробки та тестування.
 * Ця функція не повинна використовуватися або потрапляти у виробничу збірку.
 * @param {string} _text - Вхідний текст (не використовується, але зберігається для сумісності сигнатури).
 * @returns {Category[]} Масив об'єктів `Category` з рандомізованими даними.
 * @example
 * import { generateMockAnalysis } from './mockAiApiService';
 *
 * const mockResults = generateMockAnalysis("some text");
 * setAnalysisData({ categories: mockResults, ... });
 */
export function generateMockAnalysis(_text: string): Category[] {
  // `process.env.NODE_ENV` є більш універсальним і не залежить від Vite.
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "WARNING: `generateMockAnalysis` is being called in a production environment. This is likely a mistake."
    );
    // У production-збірці повертаємо порожній або початковий стан, щоб уникнути несподіваної поведінки.
    return [];
  }

  return CATEGORY_NAMES.map((name): Category => {
    const percentage = Math.floor(Math.random() * 101); // 0-100
    return {
      name,
      percentage,
      explanation: getMockExplanation(name, percentage),
    };
  });
}
