import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// --- Типізація та Константи ---

/**
 * @description Статичний контент для сторінки 404.
 * Винесено для легкої зміни, централізації та майбутньої локалізації.
 */
const content = {
  seoTitle: "404: PAGE NOT FOUND | SVITLOGICS",
  pageTitle: "404: PAGE NOT FOUND",
  description: "The requested resource does not exist or has been moved.",
  linkText: "RETURN TO HOMEPAGE",
} as const;

/**
 * @description
 * Статична сторінка, що відображається, коли маршрут не знайдено (HTTP 404).
 * Надає чітке повідомлення про помилку та посилання для повернення на головну сторінку.
 * Компонент мемоїзовано для оптимальної продуктивності, оскільки він є чисто презентаційним
 * і не залежить від пропсів чи динамічного стану.
 *
 * @component
 * @example
 * <Route path="*" element={<NotFoundPage />} />
 */
const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Використання `<main>` є семантично коректним для основного контенту сторінки */}
      <main className="container-main text-center">
        <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
          {content.pageTitle}
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-body-main">
          {content.description}
        </p>
        <Link
          to="/"
          className="font-medium uppercase text-blue-accent text-ui-label no-underline hover:underline focus-visible:underline"
        >
          {content.linkText}
        </Link>
      </main>
    </>
  );
};

// --- Мемоїзація ---
// Оскільки NotFoundPage є статичним компонентом без пропсів, React.memo
// гарантує, що він буде ре-рендеритися лише один раз, навіть якщо
// батьківські компоненти (напр., Layout) оновлюються.
export default React.memo(NotFoundPage);
