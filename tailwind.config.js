/**
 * @fileoverview Головний конфігураційний файл для Tailwind CSS.
 *
 * Цей файл є ЄДИНИМ ДЖЕРЕЛОМ ІСТИНИ для всіх дизайн-токенів
 * (кольорів, шрифтів, розмірів, відступів) у проекті.
 * Він визначає та обмежує палітру, доступну для використання через
 * утилітарні класи Tailwind, забезпечуючи візуальну консистентність.
 *
 * @see https://tailwindcss.com/docs/configuration
 * @version 1.1.0
 * @type {import('tailwindcss').Config}
 */

// --- Type Definitions for JSDoc ---

/**
 * @typedef {import('tailwindcss/types/config').ThemeConfig} ThemeConfig
 * @typedef {import('tailwindcss/types/config').CustomThemeConfig} CustomThemeConfig
 */

// --- Design System Tokens ---

/**
 * @description Палітра кольорів, що відповідає дизайн-системі.
 * @private
 * @type {ThemeConfig['colors']}
 */
const COLORS = {
  transparent: "transparent",
  current: "currentColor",
  white: "#FFFFFF",
  black: "#000000",
  // Accent color for interactive elements
  "blue-accent": "#0000CC",
  "blue-accent-hover": "#0000AA",
  "blue-accent-active": "#000088",
  // Grayscale palette for UI
  "text-secondary": "#555555",
  "text-disabled": "#AAAAAA",
  "bg-disabled": "#F0F0F0",
  // Status colors
  "status-error": "#FF0000",
  "status-success": "#00AA00",
  "status-info": "#0000CC", // Reusing accent color
};

/**
 * @description Типографічна шкала.
 * @private
 * @type {ThemeConfig['fontSize']}
 */
const FONT_SIZES = {
  "ui-label": "14px",
  "body-main": "16px",
  "h3-mobile": "16px",
  "h3-desktop": "18px",
  "h2-mobile": "20px",
  "h2-desktop": "24px",
  "h1-mobile": "26px",
  "h1-desktop": "32px",
  logo: "36px",
};

// --- Main Configuration Export ---

/**
 * @description Основний експортований об'єкт конфігурації Tailwind CSS.
 * @type {CustomThemeConfig}
 */
const tailwindConfig = {
  // Файли, які Tailwind сканує на наявність утилітарних класів.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    // =================================================================
    // # Core Overrides
    // =================================================================
    // Повністю перевизначаємо палітру кольорів, щоб уникнути використання
    // кольорів Tailwind за замовчуванням та забезпечити строгу відповідність
    // дизайн-системі.
    colors: COLORS,

    // Перевизначаємо сімейства шрифтів, залишаючи лише `mono`.
    // Це змушує використовувати `font-mono` для всього тексту.
    fontFamily: {
      mono: ['"IBM Plex Mono"', "monospace"],
    },

    // =================================================================
    // # Theme Extensions
    // =================================================================
    // Розширюємо тему Tailwind нашими кастомними значеннями.
    extend: {
      // Кастомні розміри шрифтів з нашої типографічної шкали.
      fontSize: FONT_SIZES,

      // Кастомна висота рядка для основного тексту.
      lineHeight: {
        body: "1.5",
      },

      // Кастомна максимальна ширина для головного контейнера.
      maxWidth: {
        container: "1024px",
      },

      // Кастомна ширина рамок.
      borderWidth: {
        1: "1px", // Для більшості рамок
        2: "2px", // Для статусних повідомлень
      },

      // Дозволяємо використовувати всі кольори з палітри як кольори рамок.
      /** @param {function(string): any} theme */
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.black"), // `border` -> `border-color: black`
        disabled: theme("colors.text-disabled"), // `border-disabled`
      }),
    },
  },
  plugins: [], // Наразі не використовуються додаткові плагіни.
};

export default tailwindConfig;
