/**
 * Svitlogics Application Root
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component serves as the
 *   foundational structure for a serious, focused analytical environment.
 * - Section Bravo (Clarity is a Moral Imperative): Routing is structured with
 *   clear intent and semantic precision. Each route maps directly to a defined
 *   functional area of the system.
 * - Section Echo (Engineered for Focus): The application shell enforces a rigid,
 *   distraction-free information architecture that supports deep work.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Article } from "./articles";

// Layout Components
import Layout from "./components/layout/Layout";
import CookieBanner from "./components/layout/CookieBanner";

// Page Components
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQPage from "./pages/FAQPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import ArticlePage from "./pages/ArticlePage";
import TagPage from "./pages/TagPage";
import PricingLimitsPage from "./pages/PricingLimitsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ChangelogPage from "./pages/ChangelogPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * @interface AppProps
 * @description Defines the props for the root App component.
 * @property {Article} [ssrArticle] - An optional article object provided during
 * Server-Side Rendering (SSR) to pre-populate the article page, avoiding a client-side fetch.
 */
interface AppProps {
  ssrArticle?: Article;
}

/**
 * The root component of the Svitlogics application.
 * It establishes the foundational structure and information architecture.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Echo (Spatial & Grid System): Implements the top-level <Layout> component,
 *   ensuring a stable, predictable, and focused environment for all views.
 * - Section Bravo (Clarity is a Moral Imperative): Defines a clear, logical, and
 *   unambiguous routing structure. There are no redundant or confusing paths.
 *   The 404 route acts as a definitive fallback for any invalid resource request.
 */
const App: React.FC<AppProps> = ({ ssrArticle }) => {
  return (
    <Layout>
      <Routes>
        {/* Core Application Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/how-it-works/" element={<HowItWorksPage />} />
        <Route path="/faq/" element={<FAQPage />} />

        {/* Blog Pages */}
        <Route path="/blog/" element={<BlogIndexPage />} />
        <Route path="/blog/tag/:tagSlug/" element={<TagPage />} />
        <Route
          path="/blog/:slug/"
          element={<ArticlePage ssrArticle={ssrArticle} />}
        />

        {/* Informational & Legal Pages */}
        <Route path="/pricing-limits/" element={<PricingLimitsPage />} />
        <Route path="/contact/" element={<ContactPage />} />
        <Route path="/changelog/" element={<ChangelogPage />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use/" element={<TermsOfUsePage />} />
        <Route path="/cookie-policy/" element={<CookiePolicyPage />} />
        <Route path="/disclaimer/" element={<DisclaimerPage />} />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
    </Layout>
  );
};

export default App;
