// src/entry-server.tsx

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
// --- ВИПРАВЛЕННЯ ТУТ: Імпортуємо офіційні типи ---
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

// Створюємо інтерфейс для контексту, використовуючи офіційний тип
interface HelmetContext {
  helmet?: HelmetServerState;
}

export function render(path: string) {
  // 1. Створюємо порожній об'єкт, який відповідає очікуваному типу
  const helmetContext: HelmetContext = {};

  // 2. Рендеримо додаток, обгорнувши його в HelmetProvider
  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  // 3. Витягуємо згенеровані мета-теги з контексту
  const { helmet } = helmetContext;

  // 4. Повертаємо і HTML, і об'єкт helmet
  return { appHtml, helmet };
}
