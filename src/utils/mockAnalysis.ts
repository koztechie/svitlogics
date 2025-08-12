import { Category } from "../components/AnalysisResults";

// Узгоджуємо назви категорій з тими, що використовуються в Home.tsx
const CATEGORY_NAMES = [
  "Manipulative Content",
  "Propagandistic Content",
  "Disinformation",
  "Unbiased Presentation",
  "Emotional Tone",
] as const; // Використовуємо 'as const' для створення tuple типу

type CategoryName = (typeof CATEGORY_NAMES)[number];

const explanations: Record<CategoryName, string[]> = {
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
    // Пам'ятаємо, що тут вищий бал = краще
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
};

/**
 * Selects a random explanation for a given category based on a percentage score.
 * @param categoryName The name of the category.
 * @param percentage The score (0-100).
 * @returns A descriptive string.
 */
function getMockExplanation(
  categoryName: CategoryName,
  percentage: number
): string {
  // The index is determined by the percentage score, fitting into one of the 5 explanation levels.
  const index = Math.min(Math.floor(percentage / 21), 4); // 0-20 -> 0, 21-41 -> 1, ..., 81-100 -> 4
  return explanations[categoryName][index];
}

/**
 * Generates a mock analysis response for development and testing purposes.
 * This function should NOT be used in the production build.
 * @param _text - The input text (currently unused, but kept for signature consistency).
 * @returns An array of Category objects with randomized data.
 */
export function generateMockAnalysis(_text: string): Category[] {
  // Попередження в консоль, щоб ви не забули видалити цей виклик з продакшн коду
  if (import.meta.env.PROD) {
    console.warn(
      "WARNING: `generateMockAnalysis` is being called in a production build. This should be disabled."
    );
  }

  return CATEGORY_NAMES.map((name): Category => {
    const percentage = Math.floor(Math.random() * 101);
    return {
      name,
      percentage,
      explanation: getMockExplanation(name, percentage),
    };
  });
}
