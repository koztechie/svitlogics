import React, { Suspense, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

// --- Компонент-завантажувач для Suspense ---
/**
 * @description Компонент-плейсхолдер, що відображається під час "лінивого" завантаження сторінок.
 * Це покращує UX, надаючи візуальний зворотний зв'язок замість порожнього екрана.
 * @component
 */
const PageLoader: React.FC = () => (
  <div className="flex h-screen items-center justify-center">
    <p className="font-mono text-ui-label uppercase">Loading Page...</p>
  </div>
);

// --- Ліниве завантаження компонентів сторінок (Code Splitting) ---
// `React.lazy` дозволяє завантажувати код кожної сторінки лише тоді,
// коли користувач на неї переходить. Це значно зменшує розмір початкового
// JavaScript-бандлу та покращує час першого завантаження (TTR/TTI).

const Home = React.lazy(() => import("./pages/Home"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const HowItWorksPage = React.lazy(() => import("./pages/HowItWorksPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const PricingLimitsPage = React.lazy(() => import("./pages/PricingLimitsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = React.lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUsePage = React.lazy(() => import("./pages/TermsOfUsePage"));
const ChangelogPage = React.lazy(() => import("./pages/ChangelogPage"));
const BlogIndexPage = React.lazy(() => import("./pages/BlogIndexPage"));
const ArticlePage = React.lazy(() => import("./pages/ArticlePage"));
const TagPage = React.lazy(() => import("./pages/TagPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const CookiePolicyPage = React.lazy(() => import("./pages/CookiePolicyPage"));
const DisclaimerPage = React.lazy(() => import("./pages/DisclaimerPage"));

/**
 * @description Визначення одного маршруту для кращої типізації та підтримки.
 */
interface AppRoute {
  readonly path: string;
  readonly element: React.ReactElement;
  readonly group: "core" | "blog" | "legal";
}

/**
 * @description
 * Кореневий компонент застосунку `Svitlogics`.
 * Відповідає за налаштування основного макету (`Layout`) та маршрутизації
 * за допомогою `react-router-dom`. Використовує "ліниве" завантаження
 * (code-splitting) для всіх сторінок для оптимальної продуктивності.
 *
 * @component
 */
const App: React.FC = () => {
  // `useMemo` запобігає повторному створенню масиву маршрутів при кожному рендері.
  // Хоча `App` ре-рендериться рідко, це є найкращою практикою.
  const appRoutes = useMemo(
    (): readonly AppRoute[] => [
      // Core Pages
      { path: "/", element: <Home />, group: "core" },
      { path: "/about", element: <AboutPage />, group: "core" },
      { path: "/how-it-works", element: <HowItWorksPage />, group: "core" },
      { path: "/faq", element: <FAQPage />, group: "core" },
      {
        path: "/pricing-limits",
        element: <PricingLimitsPage />,
        group: "core",
      },
      { path: "/contact", element: <ContactPage />, group: "core" },
      { path: "/changelog", element: <ChangelogPage />, group: "core" },

      // Blog Pages
      { path: "/blog", element: <BlogIndexPage />, group: "blog" },
      { path: "/blog/tag/:tagSlug", element: <TagPage />, group: "blog" },
      { path: "/blog/:slug", element: <ArticlePage />, group: "blog" },

      // Legal Pages & Fallbacks
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
        group: "legal",
      },
      { path: "/terms-of-use", element: <TermsOfUsePage />, group: "legal" },
      { path: "/cookie-policy", element: <CookiePolicyPage />, group: "legal" },
      { path: "/disclaimer", element: <DisclaimerPage />, group: "legal" },
      { path: "*", element: <NotFoundPage />, group: "legal" },
    ],
    []
  );

  return (
    <Layout>
      {/* `Suspense` є обов'язковим для роботи `React.lazy`.
          Він показує `fallback` UI, поки завантажується код сторінки. */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
