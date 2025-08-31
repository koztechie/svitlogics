import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";
import { Article } from "./articles"; // Імпортуємо тип Article

// --- Типізація ---

interface HelmetContext {
  helmet?: HelmetServerState;
}

interface RenderResult {
  appHtml: string;
  helmet: HelmetServerState | undefined;
}

/**
 * The server-side rendering (SSR) entry point for the Svitlogics application.
 * This function generates the initial static HTML for a given route.
 * It now supports "data injection" for article pages to ensure they are fully
 * rendered on the server, bypassing client-side data fetching.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Clarity is a Moral Imperative): The function signature is
 *   explicit about its capabilities, accepting an optional `article` payload.
 *
 * @param url The URL path to render.
 * @param article Optional: The pre-fetched article data for the given URL.
 * @returns An object containing the rendered application HTML and Helmet metadata.
 */
export function render(url: string, article?: Article): RenderResult {
  const helmetContext: HelmetContext = {};

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          {/* --- ВИПРАВЛЕННЯ ТУТ: Передаємо статтю в App як пропс --- */}
          <App ssrArticle={article} />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  const { helmet } = helmetContext;
  return { appHtml, helmet };
}
