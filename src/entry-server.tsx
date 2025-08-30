/**
 * Svitlogics Server-Side Rendering Entry Point
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This function is a
 *   sober, functional implementation of server-side rendering, stripped of all
 *   non-essential elements. It serves as the first line of defense against
 *   client-side rendering delays and network uncertainty.
 * - Section Alpha (Interface is a Laboratory): The design philosophy extends
 *   to the build and delivery pipeline. SSR ensures a predictable, stable
 *   initial document state, consistent with the laboratory aesthetic.
 * - Section Alpha (Truth is a Process, Not a Product): SSR provides the
 *   foundational document structure, but it is not the final interactive
 *   experience. It is a necessary step in the process of delivering a fully
 *   functional application.
 * - Section Bravo (Clarity is a Moral Imperative): The function's purpose,
 *   parameters, and return value are unambiguous. It is a transparent instrument
 *   for generating static HTML. The provider hierarchy is minimal and essential.
 * - Section Bravo (Engineered for Focus): By pre-rendering the application,
 *   this function delivers a stable, non-interactive HTML document. This
 *   ensures the fastest possible initial load and content paint, presenting the
 *   user with a calm, structured environment before client-side hydration.
 * - Section Echo (Spatial System): While this component does not directly
 *   control spatial elements, it ensures the initial HTML document is
 *   structurally sound, providing a stable foundation for the client-side grid.
 * - Section Hotel (Copy & Tone of Voice): The documentation uses precise,
 *   technical language, avoiding hyperbole or casual phrasing.
 */

import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

interface HelmetContext {
  helmet?: HelmetServerState;
}

/**
 * The server-side rendering (SSR) entry point for the Svitlogics application.
 * This function is responsible for generating the initial static HTML for a given route,
 * ensuring the fastest possible delivery of a stable, non-interactive document to the client.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Engineered for Focus): By pre-rendering the application on the
 *   server, this function provides a stable, non-interactive HTML document. This
 *   ensures the fastest possible initial load and content paint, presenting the
 *   user with a calm, structured environment before client-side hydration.
 * - Section Bravo (Clarity is a Moral Imperative): The architecture is ruthlessly
 *   economical. It includes only the essential providers (`StaticRouter`, `HelmetProvider`)
 *   required to render a correct and complete document, eliminating all non-essential
 *   logic from this critical path.
 *
 * @param path The URL path requested by the client.
 * @returns An object containing the rendered application HTML and the extracted helmet metadata.
 */
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
