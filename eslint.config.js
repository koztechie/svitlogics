import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["dist", "node_modules", "public"],
  },
  
  // Base configuration for all JS/TS files
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // React-specific configurations
  {
    files: ["**/*.{ts,tsx}"],
    ...reactRecommended, // Use recommended rules from eslint-plugin-react
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y, // Add the accessibility plugin
    },
    languageOptions: {
      ...reactRecommended.languageOptions, // Inherit parser options for JSX
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      // Apply recommended rules from hooks and accessibility plugins
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      
      // Rule for React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      
      // Optional: Disable a rule if it's too noisy for you
      // "react/react-in-jsx-scope": "off", // Not needed with modern React/Vite
      // "react/prop-types": "off", // Not needed when using TypeScript
    },
  }
);