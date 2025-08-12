import React from "react";
import { Routes, Route } from "react-router-dom";
import { usePageTracking } from "./hooks/usePageTracking";

// Layout Components
import Layout from "./components/layout/Layout";

// Page Components
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FAQPage from "./pages/FAQPage";
import PricingLimitsPage from "./pages/PricingLimitsPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ChangelogPage from "./pages/ChangelogPage";

/**
 * The root component of the Svitlogics application.
 * It sets up the main layout and defines all the client-side routes.
 */
const App: React.FC = () => {
  usePageTracking();

  return (
    <Layout>
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Informational & Legal Pages */}
        <Route path="/pricing-limits" element={<PricingLimitsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/changelog" element={<ChangelogPage />} />

        {/* A catch-all route for 404 pages could be added here later if needed */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  );
};

export default App;
