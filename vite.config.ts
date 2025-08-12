// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr"; // Додаємо імпорт для SVGR

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Основний React плагін для Vite.
    // Відповідає за JSX, Fast Refresh та інші оптимізації.
    react(),

    // Плагін для імпорту SVG як React компонентів.
    // Дозволяє стилізувати SVG через CSS (напр., `fill`, `stroke`).
    svgr(),
  ],

  build: {
    // Встановлюємо ціль для сумісності з сучасними браузерами.
    // 'es2020' дозволяє використовувати сучасний синтаксис (напр., optional chaining).
    target: "es2020",

    // Генеруємо sourcemaps для продакшн-збірки.
    // Це не впливає на продуктивність для користувачів, але значно
    // полегшує дебагінг помилок у продакшені.
    sourcemap: true,
  },

  // Опція для Netlify Functions, щоб dev-сервер знав, куди проксіювати запити
  server: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888", // Порт, який зазвичай використовує `netlify dev`
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ""),
      },
    },
  },
});
