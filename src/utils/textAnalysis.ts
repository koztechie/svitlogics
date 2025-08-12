/**
 * Counts the number of sentences in a given text.
 * A sentence is considered to be a sequence of characters ending with '.', '!', or '?'.
 * @param text The input string to analyze.
 * @returns The number of sentences.
 */
export function countSentences(text: string): number {
  if (!text.trim()) return 0;

  // A regular expression that splits the text by sentence-ending punctuation followed by whitespace or end-of-string.
  const sentences = text.split(/[.!?…]+[\s\n\r]+|[.!?…]+$/);
  // Filter out any empty strings that may result from the split (e.g., text ending with punctuation).
  return sentences.filter((s) => s.trim().length > 0).length;
}

/**
 * Approximates the number of syllables in a given English word.
 * This is a heuristic-based approach and may not be 100% accurate for all words.
 * @param word The word to count syllables for.
 * @returns The estimated number of syllables.
 */
function countSyllablesInWord(word: string): number {
  const lowerWord = word.toLowerCase();

  // Handle exceptions for very short words.
  if (lowerWord.length <= 3) return 1;

  // A simplified syllable counting logic.
  const vowelGroups = lowerWord
    .replace(/e$/, "") // Remove silent 'e' at the end
    .match(/[aeiouy]{1,2}/g); // Match groups of 1 or 2 vowels

  let count = vowelGroups ? vowelGroups.length : 0;

  // Adjust for 'le' endings preceded by a consonant.
  if (
    lowerWord.endsWith("le") &&
    !/[aeiouy]/.test(lowerWord.charAt(lowerWord.length - 3))
  ) {
    count++;
  }

  // Every word must have at least one syllable.
  return Math.max(1, count);
}

/**
 * Calculates the Flesch-Kincaid Reading Ease score for a given text.
 * Higher scores indicate easier readability. The calculation is optimized for English.
 * @param text The input string to analyze.
 * @returns An object containing the Flesch-Kincaid score, clamped between 0 and 100.
 */
export function calculateReadability(text: string) {
  if (!text.trim()) {
    return { fleschKincaid: 0 };
  }

  const words = text.match(/\b[a-zA-Z']+\b/g) || []; // Only count English-like words for this formula
  const wordCount = words.length;
  const sentenceCount = countSentences(text);
  const syllableCount = words.reduce(
    (acc, word) => acc + countSyllablesInWord(word),
    0
  );

  if (wordCount === 0 || sentenceCount === 0) {
    return { fleschKincaid: 0 };
  }

  const fleschKincaid =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount);

  // Clamp the result between 0 and 100, as scores outside this range are not meaningful.
  return {
    fleschKincaid: Math.round(Math.max(0, Math.min(100, fleschKincaid))),
  };
}

// Common stop words for both English and Ukrainian
const stopWords = new Set([
  // English
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "i",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
  "you",
  "your",
  // Ukrainian
  "а",
  "але",
  "без",
  "був",
  "була",
  "були",
  "було",
  "в",
  "вам",
  "вас",
  "весь",
  "від",
  "він",
  "вона",
  "вони",
  "все",
  "всі",
  "ви",
  "де",
  "для",
  "до",
  "е",
  "є",
  "ж",
  "за",
  "з",
  "і",
  "її",
  "їм",
  "й",
  "його",
  "із",
  "ін",
  "інших",
  "їх",
  "його",
  "коли",
  "крім",
  "лише",
  "ми",
  "на",
  "над",
  "нас",
  "наш",
  "не",
  "нею",
  "ні",
  "ній",
  "них",
  "о",
  "ось",
  "під",
  "по",
  "при",
  "про",
  "раз",
  "с",
  "собі",
  "та",
  "там",
  "те",
  "ти",
  "то",
  "той",
  "тільки",
  "тому",
  "тут",
  "у",
  "хто",
  "ця",
  "це",
  "цей",
  "ці",
  "цю",
  "чи",
  "чого",
  "що",
  "щоб",
  "я",
  "як",
]);

/**
 * Counts the frequency of words in a text, excluding common stop words.
 * Supports both English and Ukrainian (Cyrillic) words.
 * @param text The input string to analyze.
 * @returns A sorted array of objects, each containing a word and its count.
 */
export function getWordFrequency(
  text: string
): { word: string; count: number }[] {
  if (!text.trim()) return [];

  // Regular expression to match words containing Latin or Cyrillic letters and an apostrophe.
  const words = text.toLowerCase().match(/\b[a-zа-яіїєґ']+\b/g) || [];

  const wordCounts: Record<string, number> = {};
  for (const word of words) {
    // Exclude stop words and single-character words.
    if (word.length <= 2 || stopWords.has(word)) continue;
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}
