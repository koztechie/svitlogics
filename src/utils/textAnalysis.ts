/**
 * @fileoverview Цей файл містить утиліти для статистичного аналізу тексту.
 * Він надає функції для підрахунку речень, оцінки читабельності та визначення
 * частотності слів, оптимізовані для англійської та української мов.
 * @version 1.1.0
 */

// --- Типи та Константи ---

/**
 * @description Визначає структуру об'єкта, що повертається функцією `calculateReadability`.
 */
export interface ReadabilityScore {
  /**
   * @description Оцінка за індексом читабельності Флеша-Кінкейда.
   * Вищі значення (до 100) означають легший для читання текст.
   */
  readonly fleschKincaid: number;
}

/**
 * @description Визначає структуру об'єкта для одного слова у списку частотності.
 */
export interface WordFrequency {
  /** @description Слово. */
  readonly word: string;
  /** @description Кількість повторень. */
  readonly count: number;
}

/**
 * @description Набір стоп-слів (найбільш вживаних слів, що ігноруються при аналізі).
 * Винесено в константу для уникнення повторного створення.
 * @private
 */
const STOP_WORDS = new Set([
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

// --- Приватні допоміжні функції ---

/**
 * @description Оцінює кількість складів в англійському слові за допомогою евристичного підходу.
 * @private
 * @param {string} word - Слово для аналізу.
 * @returns {number} Приблизна кількість складів.
 */
function countSyllablesInWord(word: string): number {
  const lowerWord = word.toLowerCase();

  // Раннє повернення для дуже коротких слів.
  if (lowerWord.length <= 3) {
    return 1;
  }

  // Більш надійний regex для підрахунку груп голосних, ігноруючи деякі закінчення.
  const syllableRegex =
    /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
  const matches = lowerWord.match(syllableRegex);

  let count = matches ? matches.length : 0;

  // Виправлення для поширених випадків, де regex може давати помилку.
  if (lowerWord.endsWith("e") && !lowerWord.endsWith("le") && count > 1) {
    const penultimateChar = lowerWord.charAt(lowerWord.length - 2);
    if (!"aeiou".includes(penultimateChar)) {
      count--;
    }
  }

  return Math.max(1, count);
}

// --- Експортовані утиліти ---

/**
 * @description Рахує кількість речень у наданому тексті.
 * Реченням вважається послідовність символів, що закінчується '.', '!', '?' або '…'.
 * @param {string} text - Вхідний рядок для аналізу.
 * @returns {number} Кількість речень.
 * @example
 * const sentenceCount = countSentences("Hello world! How are you?"); // 2
 */
export function countSentences(text: string): number {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return 0;
  }

  // Regex, що знаходить кінці речень, враховуючи пробіли або кінець рядка.
  const sentences = trimmedText.split(/[.!?…]+(?:[\s\n\r]+|$)/);

  // Фільтруємо порожні елементи, які можуть виникнути, якщо текст закінчується розділовим знаком.
  return sentences.filter((s) => s.length > 0).length;
}

/**
 * @description Обчислює оцінку читабельності за індексом Флеша-Кінкейда.
 * Вищі оцінки вказують на легший для читання текст. Формула оптимізована для англійської мови.
 * @param {string} text - Вхідний рядок для аналізу.
 * @returns {ReadabilityScore} Об'єкт, що містить оцінку, обмежену діапазоном 0-100.
 * @example
 * const { fleschKincaid } = calculateReadability("The cat sat on the mat."); // ~90-100
 */
export function calculateReadability(text: string): ReadabilityScore {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return { fleschKincaid: 0 };
  }

  // Regex для знаходження слів, що складаються з латинських літер та апострофів.
  const words = trimmedText.match(/\b[a-zA-Z']+\b/g) || [];
  const wordCount = words.length;
  const sentenceCount = countSentences(trimmedText);

  // Раннє повернення, щоб уникнути ділення на нуль.
  if (wordCount === 0 || sentenceCount === 0) {
    return { fleschKincaid: 0 };
  }

  const syllableCount = words.reduce(
    (acc, word) => acc + countSyllablesInWord(word),
    0
  );

  // Формула індексу читабельності Флеша-Кінкейда
  const score =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount);

  // Обмежуємо результат діапазоном 0-100, оскільки значення поза ним не мають сенсу.
  const clampedScore = Math.max(0, Math.min(100, score));

  return {
    fleschKincaid: Math.round(clampedScore),
  };
}

/**
 * @description Рахує частотність слів у тексті, виключаючи стоп-слова.
 * Підтримує англійські та українські (кириличні) слова.
 * @param {string} text - Вхідний рядок для аналізу.
 * @param {number} [limit] - Опціональний ліміт на кількість слів, що повертаються.
 * @returns {WordFrequency[]} Відсортований масив об'єктів, кожен з яких містить слово та його кількість.
 * @example
 * const topWords = getWordFrequency("The quick brown fox jumps over the lazy dog.", 3);
 * // [{ word: 'quick', count: 1 }, { word: 'brown', count: 1 }, { word: 'fox', count: 1 }]
 */
export function getWordFrequency(
  text: string,
  limit?: number
): WordFrequency[] {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return [];
  }

  // Regex для знаходження слів, що містять латинські, кириличні літери та апостроф.
  const words = trimmedText.toLowerCase().match(/\b[a-zа-яіїєґ']+\b/g);
  if (!words) {
    return [];
  }

  const wordCounts = new Map<string, number>();
  for (const word of words) {
    // Ігноруємо стоп-слова та слова довжиною <= 2.
    if (word.length <= 2 || STOP_WORDS.has(word)) {
      continue;
    }
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  }

  const sortedFrequencies = Array.from(wordCounts.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  return limit ? sortedFrequencies.slice(0, limit) : sortedFrequencies;
}
