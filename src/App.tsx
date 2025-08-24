import React from "react";
import { Routes, Route } from "react-router-dom";

// --- ЗМІНИ ТУТ: Видалено Suspense та useMemo ---

// --- Компоненти ---
import Layout from "./components/layout/Layout";
import CookieBanner from "./components/layout/CookieBanner";

// --- СТАТИЧНИЙ ІМПОРТ СТОРІНОК ---
// Ми повертаємося до простих імпортів. Це необхідно для Static Site Generation (SSG).
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQPage from "./pages/FAQPage";
import PricingLimitsPage from "./pages/PricingLimitsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ChangelogPage from "./pages/ChangelogPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import ArticlePage from "./pages/ArticlePage";
import TagPage from "./pages/TagPage";
import NotFoundPage from "./pages/NotFoundPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";

/**
 * @description
 * Кореневий компонент застосунку `Svitlogics`.
 * Відповідає за налаштування основного макету (`Layout`) та маршрутизації
 * за допомогою `react-router-dom`.
 *
 * @component
 */
const App: React.FC = () => {
  return (
    <Layout>
      {/* --- ЗМІНИ ТУТ: Видалено Suspense --- */}
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/pricing-limits" element={<PricingLimitsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />

        {/* Blog Pages */}
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/tag/:tagSlug" element={<TagPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
    </Layout>
  );
};

export default App;
