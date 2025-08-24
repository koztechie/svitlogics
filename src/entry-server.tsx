import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App from "./App";

// --- Типізація для підвищення надійності та DX ---

/**
 * @description Визначає структуру об'єкта, що передається в HelmetProvider
 * для збору метаданих на сервері.
 * @private
 */
interface HelmetContext {
  helmet?: HelmetServerState;
}

/**
 * @description Визначає контракт повертаємого значення функції `render`.
 */
export interface RenderOutput {
  /**
   * @description HTML-рядок, згенерований з дерева React-компонентів.
   */
  readonly appHtml: string;
  /**
   * @description Об'єкт, що містить усі метадани, зібрані з `react-helmet-async`
   * (title, meta, link, script теги), готовий для вставки в `<head>`.
   */
  readonly helmet?: HelmetServerState;
}

/**
 * @description
 * Серверна функція для рендерингу React-застосунку в HTML-рядок.
 * Використовується в процесі статичної генерації сайту (SSG) для створення
 * HTML-файлів для кожного маршруту.
 *
 * @param {string} path - Маршрут (URL-шлях), для якого потрібно згенерувати HTML.
 * @returns {RenderOutput} Об'єкт, що містить HTML-рядок (`appHtml`) та метадані (`helmet`).
 * @throws {Error} Перекидає помилку, якщо `ReactDOMServer.renderToString` зазнає невдачі,
 *                 щоб процес збірки міг її перехопити та завершитися з помилкою.
 *
 * @example
 * // У скрипті pre-render.mjs
 * import { render } from './src/entry-server.js';
 *
 * const routes = ['/', '/about'];
 * for (const route of routes) {
 *   try {
 *     const { appHtml, helmet } = render(route);
 *     // ... логіка для вставки HTML у шаблон ...
 *   } catch (error) {
 *     console.error(`Failed to render path: ${route}`, error);
 *     process.exit(1);
 *   }
 * }
 */
export function render(path: string): RenderOutput {
  const helmetContext: HelmetContext = {};

  try {
    const appHtml = ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

    const { helmet } = helmetContext;
    return { appHtml, helmet };
  } catch (error) {
    // Логуємо помилку з контекстом (який шлях не вдалося відрендерити),
    // що є критично важливим для швидкого налагодження.
    console.error(
      `\n❌ Critical error during server-side rendering for path: "${path}"`
    );
    console.error(
      "This is likely caused by an error within a React component rendered on this page.\n"
    );
    // Перекидаємо помилку далі, щоб скрипт збірки (pre-render.mjs)
    // міг її перехопити та завершити процес з ненульовим кодом виходу.
    throw error;
  }
}
