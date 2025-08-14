// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  build: {
    target: "es2020",
    sourcemap: true,
  },

  // Опція для Netlify Functions, щоб dev-сервер знав, куди проксіювати запити
  server: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ""),
      },
    },
  },

  // --- ВИПРАВЛЕННЯ ТУТ: Перенесено на верхній рівень ---
  // Вказуємо Vite, що потрібно бандлити всі залежності для SSR
  ssr: {
    noExternal: true,
  },
});
