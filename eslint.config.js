// eslint.config.js

/**
 * @fileoverview Головний конфігураційний файл ESLint ("flat config").
 * Цей файл визначає правила лінтингу для всього проекту, забезпечуючи
 * консистентність коду, виявлення потенційних помилок та дотримання
 * найкращих практик для JavaScript, TypeScript, React та a11y.
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @version 1.1.0
 */

// --- Imports ---

import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

// ESLint Plugins
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Prettier Integration
import prettierConfig from "eslint-config-prettier";

// --- Type Definitions for JSDoc ---

/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

// --- Main Configuration ---

/**
 * @type {FlatConfig[]}
 */
export default tseslint.config(
  // =================================================================
  // 1. Глобальні налаштування та виключення
  // =================================================================
  {
    ignores: [
      "dist", // Папка збірки
      "node_modules", // Залежності
      "public", // Статичні активи
      ".netlify", // Специфічні файли Netlify
      "eslint.config.js", // Виключаємо сам конфігураційний файл
    ],
  },
  {
    // Застосовуємо ці налаштування до всіх файлів
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // =================================================================
  // 2. Базова конфігурація для JavaScript
  // =================================================================
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
  },

  // =================================================================
  // 3. Конфігурація для TypeScript
  // =================================================================
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    rules: {
      // Попереджаємо про невикористовувані змінні, ігноруючи ті, що починаються з `_`
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      // Попереджаємо про використання `any`, оскільки це зводить нанівець переваги TS
      "@typescript-eslint/no-explicit-any": "warn",
      // Вимагаємо явного визначення типів для повертаємих значень функцій
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },

  // =================================================================
  // 4. Конфігурація для React (TSX/JSX)
  // =================================================================
  {
    files: ["src/**/*.{jsx,tsx}"], // Обмежуємо лише файлами в `src`
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      // Тут вже не потрібно дублювати `globals`, оскільки вони успадковані
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect", // Автоматично визначаємо версію React
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // === React Best Practices ===
      // Не потрібно в React 17+ з новим JSX-трансформером
      "react/react-in-jsx-scope": "off",
      // Не потрібно при використанні TypeScript
      "react/prop-types": "off",
      // Забезпечує, що `key` завжди присутній у списках
      "react/jsx-key": "error",

      // === Vite-specific Rule ===
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // =================================================================
  // 5. Інтеграція з Prettier (ЗАВЖДИ ОСТАННІЙ ЕЛЕМЕНТ!)
  // =================================================================
  // Ця конфігурація вимикає всі правила ESLint, які можуть
  // конфліктувати з правилами форматування Prettier.
  // Це гарантує, що Prettier відповідає лише за форматування,
  // а ESLint — за якість коду.
  prettierConfig
);
