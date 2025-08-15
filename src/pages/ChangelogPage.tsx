import React from "react";
import { Helmet } from "react-helmet-async";
// import { useTranslation } from 'react-i18next';

// Спрощена структура даних
interface ChangelogEntryData {
  version: string;
  date: string;
  changes: string[]; // Тепер це просто масив рядків
}

// Фінальні дані чейнджлогу з новою версією v0.3.2
const changelogData: ChangelogEntryData[] = [
  {
    version: "v0.3.6 (Beta)",
    date: "August 15, 2025",
    changes: [
      "<strong>ARCHITECTURE:</strong> Migrated the core analysis engine to a fully asynchronous architecture using Netlify Background Functions. This completely removes the previous 10-second execution limit.",
      "<strong>IMPROVED:</strong> The application can now handle complex and lengthy analysis tasks (up to 15 minutes), allowing the use of the most powerful AI models without timeouts.",
      "<strong>IMPROVED:</strong> User experience during analysis has been enhanced. The interface now polls for results in the background, providing a more robust and stable process for the user.",
      "<strong>SECURITY:</strong> Re-architected the backend with a dedicated trigger function and a background worker, further isolating processes and improving the security posture.",
    ],
  },
  {
    version: "v0.3.5 (Beta)",
    date: "August 14, 2025",
    changes: [
      "<strong>PERFORMANCE:</strong> Implemented Static Site Generation (SSG) for the entire application. All pages are now pre-rendered into static HTML files during the build process.",
      "<strong>SEO:</strong> The move to SSG ensures that all content is immediately available to search engine crawlers, significantly improving indexing and SEO potential.",
      "<strong>PERFORMANCE:</strong> Achieved near-instantaneous page loads and a dramatically improved Largest Contentful Paint (LCP) score, providing a much faster user experience.",
    ],
  },
  {
    version: "v0.3.4 (Beta)",
    date: "August 14, 2025",
    changes: [
      "<strong>ADDED:</strong> Introduced a new 'Blog' section to the website, creating a platform for articles, updates, and deeper insights into text analysis.",
      "<strong>ADDED:</strong> Implemented a lightweight, Markdown-based content system, allowing for easy creation and management of new articles without complex CMS dependencies.",
      "<strong>ADDED:</strong> Created new page templates for the blog index and individual article views, fully integrated with the Svitlogics design system.",
    ],
  },
  {
    version: "v0.3.3 (Beta)",
    date: "August 13, 2025",
    changes: [
      "<strong>PERFORMANCE:</strong> Improved the Largest Contentful Paint (LCP) metric by adding `preconnect` links for Google Fonts, accelerating font loading times.",
      "<strong>IMPROVED:</strong> Added print-specific styles (`@media print`) that hide the interface, allowing users to print or save a clean, report-only version of the analysis results.",
      "<strong>ACCESSIBILITY:</strong> Enhanced accessibility by adding `title` attributes to all icon-based links, providing tooltips for better user guidance.",
    ],
  },
  {
    version: "v0.3.2 (Beta)",
    date: "August 13, 2025",
    changes: [
      "<strong>IMPROVED:</strong> The application now remembers the last selected language using `localStorage`, improving convenience for returning users.",
      "<strong>IMPROVED:</strong> The 'Clear' button in the text input area now clears both the input field and the analysis results, providing a complete reset of the interface.",
      "<strong>ADDED:</strong> A 'Copy' button has been added to the analysis results card, allowing users to easily copy the full report to their clipboard.",
      "<strong>IMPROVED:</strong> The character counter now turns red when the input limit is exceeded, providing clear visual feedback to the user.",
      "<strong>ADDED:</strong> The site footer has been updated to include clickable icons for GitHub and email, improving accessibility and contact options.",
      '<strong>SECURITY:</strong> Added `autoComplete="off"` to the text input field to prevent browsers from suggesting previously analyzed (and potentially sensitive) text.',
    ],
  },
  {
    version: "v0.3.1 (Beta)",
    date: "August 12, 2025",
    changes: [
      "<strong>ADDED:</strong> Implemented the official Svitlogics brand identity, replacing the text-based title with a new SVG logo for a crisp, professional look.",
      "<strong>ADDED:</strong> Integrated a comprehensive set of high-resolution favicons for a consistent appearance across all browsers, devices, and platforms.",
      "<strong>IMPROVED:</strong> Updated Open Graph meta tags to include a custom social media banner (`og:image`), ensuring proper branding when sharing links.",
    ],
  },
  {
    version: "v0.3.0 (Beta)",
    date: "August 12, 2025",
    changes: [
      "<strong>IMPROVED:</strong> Upgraded the core AI engine to a new cascade of premium Google Gemini 2.5 models, significantly enhancing the accuracy and depth of text analysis.",
      "<strong>SECURITY:</strong> Migrated all AI processing to a secure server-side API gateway. This architecture protects the core logic of the service and ensures user API keys are never exposed in the browser.",
      "<strong>SECURITY:</strong> Implemented IP-based rate limiting to protect the service from automated abuse and ensure fair access for all users.",
      "<strong>IMPROVED:</strong> Enhanced overall application stability and performance by moving complex computations from the user's browser to the server.",
    ],
  },
  {
    version: "v0.1.0 (Public Beta)",
    date: "June 29, 2025",
    changes: [
      "<strong>ADDED:</strong> Configured and launched the custom domain `svitlogics.com`.",
      "<strong>IMPROVED:</strong> Refined system prompts for Google AI models to improve analysis consistency.",
      "<strong>IMPROVED:</strong> Completed UI adjustments and bug fixes based on multi-device and cross-browser testing.",
    ],
  },
  {
    version: "v0.0.9 (Alpha)",
    date: "June 28, 2025",
    changes: [
      "<strong>ADDED:</strong> Integrated a favicon set and a Web App Manifest for browser and home screen identification.",
      "<strong>IMPROVED:</strong> Implemented a fully responsive UI for mobile, tablet, and desktop devices.",
    ],
  },
  {
    version: "v0.0.8 (Alpha)",
    date: "June 25, 2025",
    changes: [
      "<strong>ADDED:</strong> Implemented on-page and technical SEO, including meta tags, JSON-LD structured data, and a sitemap.",
    ],
  },
  {
    version: "v0.0.7 (Alpha)",
    date: "June 22, 2025",
    changes: [
      "<strong>ADDED:</strong> Implemented a high-availability model fallback cascade using seven Google AI models to ensure service reliability.",
      "<strong>ADDED:</strong> Implemented dynamic character limits based on language and model capacity to manage API token usage.",
    ],
  },
  {
    version: "v0.0.6 (Alpha)",
    date: "June 19, 2025",
    changes: [
      "<strong>ADDED:</strong> Added English content to all informational and legal pages (About, How It Works, FAQ, Privacy, Terms).",
      "<strong>FIXED:</strong> Corrected a client-side routing issue on Netlify that prevented direct URL access.",
    ],
  },
  {
    version: "v0.0.5 (Alpha)",
    date: "June 17, 2025",
    changes: [
      "<strong>ADDED:</strong> Deployed the application to Netlify with a continuous integration and delivery (CI/CD) pipeline.",
    ],
  },
  {
    version: "v0.0.4 (Alpha)",
    date: "June 15, 2025",
    changes: [
      "<strong>IMPROVED:</strong> Redesigned the user interface to align with the 'Pure Minimalist-Brutalist' design system.",
    ],
  },
  {
    version: "v0.0.3 (Alpha)",
    date: "June 14, 2025",
    changes: [
      "<strong>ADDED:</strong> Established the 'Pure Minimalist-Brutalist' design system and the Svitlogics Writing System.",
    ],
  },
  {
    version: "v0.0.2 (Alpha)",
    date: "June 8, 2025",
    changes: [
      "<strong>IMPROVED:</strong> Replaced automatic language detection with a manual language selector to ensure the correct system prompt is used for analysis.",
    ],
  },
  {
    version: "v0.0.1 (Alpha)",
    date: "May 31, 2025",
    changes: [
      "<strong>ADDED:</strong> Implemented initial project setup and core text analysis functionality with Google AI models.",
    ],
  },
];

const ChangelogPage: React.FC = () => {
  // const { t } = useTranslation();
  const pageTitle = "CHANGELOG";

  return (
    <>
      <Helmet>
        <title>Changelog | Svitlogics Version History</title>
        <meta
          name="description"
          content="See the development history and updates for the Svitlogics application, from its initial alpha release to the latest version."
        />
        <link rel="canonical" href="https://svitlogics.com/changelog" />
        <meta
          property="og:title"
          content="Changelog | Svitlogics Version History"
        />
        <meta
          property="og:description"
          content="See the development history and updates for the Svitlogics application, from its initial alpha release to the latest version."
        />
        <meta property="og:url" content="https://svitlogics.com/changelog" />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-16 text-left">
          {pageTitle}
        </h1>

        <div className="max-w-3xl space-y-12">
          {changelogData.map((entry) => (
            <section
              key={entry.version}
              aria-labelledby={`version-${entry.version.replace(/\s+/g, "-")}`}
            >
              <div className="pb-4 mb-6 border-b border-black">
                <h2
                  id={`version-${entry.version.replace(/\s+/g, "-")}`}
                  className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-1 normal-case"
                >
                  {entry.version}
                </h2>
                <p className="font-mono text-ui-label text-text-secondary normal-case">
                  {entry.date}
                </p>
              </div>

              <ul className="space-y-4 list-disc ml-6">
                {entry.changes.map((change, index) => (
                  <li
                    key={index}
                    className="font-mono text-body-main leading-body text-black"
                    dangerouslySetInnerHTML={{ __html: change }}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;
