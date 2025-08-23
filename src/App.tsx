import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CookieBanner from "./components/layout/CookieBanner";

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
import CategoryPage from "./pages/CategoryPage";
import TagPage from "./pages/TagPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/blog/tag/:tagSlug" element={<TagPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/pricing-limits" element={<PricingLimitsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
    </Layout>
  );
};

export default App;
