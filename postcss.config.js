/**
 * @fileoverview Конфігурація для PostCSS.
 *
 * Цей файл експортує об'єкт конфігурації, який використовується PostCSS
 * для обробки та трансформації CSS-файлів під час процесу збірки.
 * Він налаштовує два ключові плагіни: Tailwind CSS та Autoprefixer.
 *
 * @see https://postcss.org/
 * @see https://tailwindcss.com/docs/using-postcss
 * @see https://github.com/postcss/autoprefixer
 * @version 1.1.0
 */

// --- Type Definitions for JSDoc ---

/**
 * @typedef {Object<string, Object | undefined>} PostCssPlugins
 * @description Об'єкт, що визначає плагіни для PostCSS.
 * Ключ - назва плагіна, значення - його об'єкт конфігурації.
 */

/**
 * @typedef {Object} PostCssConfig
 * @property {PostCssPlugins} plugins - Об'єкт з конфігурацією плагінів.
 */

// --- Constants ---

/**
 * @description Конфігурація для плагіна Tailwind CSS.
 * Порожній об'єкт `{}` означає використання налаштувань за замовчуванням.
 * Tailwind автоматично знайде `tailwind.config.js` в корені проекту.
 * @private
 * @type {Object}
 */
const TAILWIND_CONFIG = {};

/**
 * @description Конфігурація для плагіна Autoprefixer.
 * Autoprefixer автоматично додає вендорні префікси до CSS-правил
 * (напр., `-webkit-`, `-moz-`) для забезпечення сумісності зі старими браузерами.
 * Налаштування за замовчуванням беруться з файлу `browserslist` у `package.json`.
 * @private
 * @type {Object}
 */
const AUTOPREFIXER_CONFIG = {};

// --- Main Configuration Export ---

/**
 * @description Експортований об'єкт конфігурації PostCSS.
 * Порядок плагінів має значення: Tailwind CSS має виконуватися перед Autoprefixer.
 * @type {PostCssConfig}
 */
const postcssConfig = {
  plugins: {
    tailwindcss: TAILWIND_CONFIG,
    autoprefixer: AUTOPREFIXER_CONFIG,
  },
};

export default postcssConfig;
