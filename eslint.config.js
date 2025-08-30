// eslint.config.js

import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

// Плагіни
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Найважливіший плагін для інтеграції з Prettier
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // 1. Глобальні виключення
  {
    ignores: ["dist", "node_modules", "public", ".netlify"],
  },

  // 2. Базова конфігурація для всіх файлів
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // 3. Конфігурація для TypeScript файлів
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommended],
    rules: {
      // Додаткові суворі правила для TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // 4. Конфігурація спеціально для React (TSX/JSX)
  {
    files: ["**/*.{jsx,tsx}"],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Важливі правила для сучасного React
      "react/react-in-jsx-scope": "off", // Не потрібно в React 17+
      "react/prop-types": "off", // Не потрібно при використанні TypeScript

      // Ваше правило для Vite
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Правило, яке змушує додавати key до елементів у списках
      "react/jsx-key": "error",
    },
  },

  // 5. Конфігурація Prettier (ЗАВЖДИ МАЄ БУТИ ОСТАННЬОЮ!)
  // Цей блок відключає всі правила ESLint, які конфліктують з Prettier.
  prettierConfig
);
