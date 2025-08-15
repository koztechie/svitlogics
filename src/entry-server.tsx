// src/entry-server.tsx

// ВИДАЛЕНО: import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

// Інтерфейс для контексту Helmet, що використовує офіційний тип
interface HelmetContext {
  helmet?: HelmetServerState;
}

export function render(path: string) {
  const helmetContext: HelmetContext = {};

  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return { appHtml, helmet };
}
