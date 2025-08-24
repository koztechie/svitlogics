// vite.config.ts

import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- ВИПРАВЛЕННЯ ТУТ: Перевіряємо змінну оточення ---
const isSsrBuild = !!process.env.SSR;

/**
 * @description Конфігурація Vite.
 * @see https://vitejs.dev/config/
 */
const viteConfig: UserConfig = {
  plugins: [
    react(),
    svgr(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
    }),
  ],

  resolve: {
    alias: isSsrBuild
      ? [
          {
            find: path.resolve(
              __dirname,
              "src/components/layout/CookieConsentManager"
            ),
            replacement: path.resolve(
              __dirname,
              "src/components/layout/CookieConsentManager.server"
            ),
          },
        ]
      : [],
  },

  build: {
    target: "es2020",
    sourcemap: true,
  },

  server: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ""),
      },
    },
  },

  ssr: {
    noExternal: true,
  },
};

export default defineConfig(viteConfig);
