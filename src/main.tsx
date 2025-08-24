/**
 * @fileoverview Це головний файл-точка входу для React-застосунку Svitlogics.
 * Він відповідає за ініціалізацію та рендеринг кореневого компонента `<App />`
 * в DOM, а також за налаштування глобальних провайдерів контексту.
 * @version 1.1.0
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

/**
 * @description ID DOM-елемента, в який буде вмонтовано React-застосунок.
 * Винесено в константу для уникнення "магічних рядків".
 * @private
 */
const ROOT_ELEMENT_ID = "root";

/**
 * @description Ініціалізує та монтує React-застосунок в DOM.
 * @private
 */
function initializeAndMountApp(): void {
  const rootElement = document.getElementById(ROOT_ELEMENT_ID);

  // Надійна перевірка наявності кореневого елемента.
  // Якщо його немає, це критична помилка конфігурації, і застосунок
  // не може бути запущений.
  if (!rootElement) {
    throw new Error(
      `Fatal Error: Failed to find the root element with ID '${ROOT_ELEMENT_ID}'. The application cannot be mounted.`
    );
  }

  const root = createRoot(rootElement);

  // Рендеримо застосунок, обгорнутий у необхідні провайдери:
  // - StrictMode: Вмикає додаткові перевірки та попередження в React для розробки.
  // - HelmetProvider: Надає контекст для асинхронного керування тегами в <head>.
  // - BrowserRouter: Вмикає клієнтський роутинг для застосунку.
  root.render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
}

// Запускаємо ініціалізацію застосунку.
initializeAndMountApp();
