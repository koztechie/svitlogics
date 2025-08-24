import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

// --- Типізація та Константи ---

/**
 * @description Визначає структуру даних для одного запису в журналі змін.
 */
interface ChangelogEntryData {
  /** @description Версія релізу, напр., "v0.4.0 (Beta)". */
  readonly version: string;
  /** @description Дата релізу у форматі "Month Day, Year". */
  readonly date: string;
  /** @description Масив змін, де кожна зміна є HTML-рядком. */
  readonly changes: readonly string[];
}

/**
 * @description Контент для SEO та заголовків сторінки.
 */
const pageContent = {
  seoTitle: "CHANGELOG | SVITLOGICS",
  seoDescription:
    "A complete record of application updates, performance enhancements, and feature releases for Svitlogics.",
  canonicalUrl: "https://svitlogics.com/changelog",
  pageTitle: "CHANGELOG",
} as const;

/**
 * @description Статичні дані для журналу змін. `as const` забезпечує глибоку незмінність.
 * @type {readonly ChangelogEntryData[]}
 */
const changelogData: readonly ChangelogEntryData[] = [
  {
    version: "v0.4.0 (Beta)",
    date: "August 17, 2025",
    changes: [
      "<strong>OPTIMIZATION:</strong> Integrated `vite-plugin-image-optimizer`. All static and article images are now automatically compressed during the build process.",
      '<strong>REFACTOR:</strong> Created a custom `<OptimizedImage>` React component that adds `loading="lazy"` and `decoding="async"` attributes to improve loading performance.',
      "<strong>IMPROVEMENT:</strong> Standard `<img>` tags within MDX articles are now automatically replaced with the `<OptimizedImage>` component, ensuring consistent application of performance optimizations.",
    ],
  },
  {
    version: "v0.3.9 (Beta)",
    date: "August 17, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented a validation schema for article frontmatter to enforce a comprehensive set of required and optional metadata fields.",
      "<strong>DEVELOPMENT:</strong> Integrated Zod schema validation into the build process. The build now fails if any article frontmatter is incomplete or malformed, preventing deployment of pages with incorrect SEO data.",
      "<strong>IMPROVEMENT:</strong> Article pages now programmatically generate a full suite of SEO and Open Graph meta tags from the validated frontmatter.",
    ],
  },
  {
    version: "v0.3.8 (Beta)",
    date: "August 16, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented strict schema validation for article frontmatter using Zod. The build process now fails if an article is missing critical metadata.",
      "<strong>IMPROVEMENT:</strong> Enhanced the reliability of the content pipeline by adding a data validation step, ensuring all published articles meet quality and SEO standards.",
      "<strong>IMPROVEMENT:</strong> The build script now provides detailed error messages upon validation failure, pinpointing the exact file and issue.",
    ],
  },
  {
    version: "v0.3.7 (Beta)",
    date: "August 15, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented a category system for the blog, including a dedicated category index and individual category pages.",
      "<strong>REFACTOR:</strong> Migrated all blog articles from Markdown (`.md`) to MDX (`.mdx`) to support interactive React components within articles.",
      "<strong>ADDITION:</strong> Integrated and configured the `@mdx-js/rollup` plugin to process MDX files during the build.",
      "<strong>IMPROVEMENT:</strong> Updated the Static Site Generation (SSG) script to automatically discover and pre-render all category pages.",
    ],
  },
  {
    version: "v0.3.6 (Beta)",
    date: "August 15, 2025",
    changes: [
      "<strong>ARCHITECTURE:</strong> Migrated the core analysis engine to an asynchronous architecture using Netlify Background Functions, removing the previous 10-second execution limit.",
      "<strong>IMPROVEMENT:</strong> The application can now process analysis tasks for up to 15 minutes, allowing for the use of more powerful AI models without timeouts.",
      "<strong>IMPROVEMENT:</strong> The interface now polls for results in the background, creating a more robust and stable process.",
      "<strong>SECURITY:</strong> Re-architected the backend with a dedicated trigger function and a background worker to isolate processes and improve security posture.",
    ],
  },
  {
    version: "v0.3.5 (Beta)",
    date: "August 14, 2025",
    changes: [
      "<strong>PERFORMANCE:</strong> Implemented Static Site Generation (SSG) for the entire application. All pages are now pre-rendered into static HTML files during the build process.",
      "<strong>SEO:</strong> SSG implementation ensures all content is immediately available to search engine crawlers, improving indexing.",
      "<strong>PERFORMANCE:</strong> This change results in faster page loads and an improved Largest Contentful Paint (LCP) score.",
    ],
  },
  {
    version: "v0.3.4 (Beta)",
    date: "August 14, 2025",
    changes: [
      "<strong>ADDITION:</strong> Introduced a 'Blog' section for articles, project updates, and text analysis research.",
      "<strong>ADDITION:</strong> Implemented a lightweight, Markdown-based content system for article management.",
      "<strong>ADDITION:</strong> Created new page templates for the blog index and individual article views, integrated with the existing design system.",
    ],
  },
  {
    version: "v0.3.3 (Beta)",
    date: "August 13, 2025",
    changes: [
      "<strong>PERFORMANCE:</strong> Improved Largest Contentful Paint (LCP) by adding `preconnect` links for Google Fonts.",
      "<strong>IMPROVEMENT:</strong> Added print-specific styles (`@media print`) that hide the UI, allowing users to print or save a clean, report-only version of the analysis.",
      "<strong>ACCESSIBILITY:</strong> Added `title` attributes to all icon-based links to provide descriptive tooltips.",
    ],
  },
  {
    version: "v0.3.2 (Beta)",
    date: "August 13, 2025",
    changes: [
      "<strong>IMPROVEMENT:</strong> The application now persists the last selected language to `localStorage`.",
      "<strong>IMPROVEMENT:</strong> The 'Clear' button now clears both the text input and the analysis results, fully resetting the interface.",
      "<strong>ADDITION:</strong> A 'Copy' button was added to the analysis results card to copy the full report to the clipboard.",
      "<strong>IMPROVEMENT:</strong> The character counter now changes color to red when the input limit is exceeded, providing direct visual feedback.",
      "<strong>ADDITION:</strong> The site footer was updated with clickable icons for GitHub and email.",
      '<strong>SECURITY:</strong> Added `autoComplete="off"` to the text input field to prevent browser suggestions of previously analyzed text.',
    ],
  },
  {
    version: "v0.3.1 (Beta)",
    date: "August 12, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented the official Svitlogics brand identity, replacing the text-based title with a new SVG logo.",
      "<strong>ADDITION:</strong> Integrated a comprehensive set of high-resolution favicons for consistent appearance across all platforms.",
      "<strong>IMPROVEMENT:</strong> Updated Open Graph meta tags to include a custom social media banner (`og:image`).",
    ],
  },
  {
    version: "v0.3.0 (Beta)",
    date: "August 12, 2025",
    changes: [
      "<strong>IMPROVEMENT:</strong> Upgraded the core AI engine to a new cascade of Google Gemini 2.5 Pro models to enhance analysis accuracy and depth.",
      "<strong>SECURITY:</strong> Migrated all AI processing to a secure, server-side API gateway. This architecture protects the core logic and prevents user API key exposure.",
      "<strong>SECURITY:</strong> Implemented IP-based rate limiting to protect the service from automated abuse.",
      "<strong>IMPROVEMENT:</strong> Moved complex computations from client-side to server-side, enhancing application stability and performance.",
    ],
  },
  {
    version: "v0.1.0 (Public Beta)",
    date: "June 29, 2025",
    changes: [
      "<strong>ADDITION:</strong> Configured and launched the custom domain `svitlogics.com`.",
      "<strong>IMPROVEMENT:</strong> Refined system prompts for Google AI models to improve analysis consistency.",
      "<strong>FIX:</strong> Completed UI adjustments and bug fixes based on multi-device and cross-browser testing.",
    ],
  },
  {
    version: "v0.0.9 (Alpha)",
    date: "June 28, 2025",
    changes: [
      "<strong>ADDITION:</strong> Integrated a favicon set and a Web App Manifest.",
      "<strong>IMPROVEMENT:</strong> Implemented a fully responsive UI for mobile, tablet, and desktop devices.",
    ],
  },
  {
    version: "v0.0.8 (Alpha)",
    date: "June 25, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented on-page and technical SEO, including meta tags, JSON-LD structured data, and a sitemap.",
    ],
  },
  {
    version: "v0.0.7 (Alpha)",
    date: "June 22, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented a high-availability model fallback cascade using seven Google AI models.",
      "<strong>ADDITION:</strong> Implemented dynamic character limits based on language and model capacity.",
    ],
  },
  {
    version: "v0.0.6 (Alpha)",
    date: "June 19, 2025",
    changes: [
      "<strong>ADDITION:</strong> Added English content to all informational and legal pages.",
      "<strong>FIX:</strong> Corrected a client-side routing issue on Netlify that prevented direct URL access.",
    ],
  },
  {
    version: "v0.0.5 (Alpha)",
    date: "June 17, 2025",
    changes: [
      "<strong>ADDITION:</strong> Deployed the application to Netlify with a continuous integration and delivery (CI/CD) pipeline.",
    ],
  },
  {
    version: "v0.0.4 (Alpha)",
    date: "June 15, 2025",
    changes: [
      "<strong>IMPROVEMENT:</strong> Redesigned the user interface to align with the 'Pure Minimalist-Brutalist' design system.",
    ],
  },
  {
    version: "v0.0.3 (Alpha)",
    date: "June 14, 2025",
    changes: [
      "<strong>ADDITION:</strong> Established the 'Pure Minimalist-Brutalist' design system and the Svitlogics Writing System.",
    ],
  },
  {
    version: "v0.0.2 (Alpha)",
    date: "June 8, 2025",
    changes: [
      "<strong>IMPROVEMENT:</strong> Replaced automatic language detection with a manual language selector to ensure correct system prompt utilization.",
    ],
  },
  {
    version: "v0.0.1 (Alpha)",
    date: "May 31, 2025",
    changes: [
      "<strong>ADDITION:</strong> Implemented initial project setup and core text analysis functionality with Google AI models.",
    ],
  },
] as const;

// --- Мемоїзовані та Безпечні Підкомпоненти ---

/**
 * @description Безпечно рендерить HTML-рядок, попередньо очистивши його.
 * @param {string} rawHtml - Необроблений HTML-рядок.
 * @returns {{ __html: string }} Об'єкт, сумісний з `dangerouslySetInnerHTML`.
 */
const createSanitizedHtml = (rawHtml: string): { __html: string } => {
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ["strong", "em"],
  });
  return { __html: sanitizedHtml };
};

/**
 * @description Пропси для мемоїзованого підкомпонента `ChangelogEntry`.
 */
interface ChangelogEntryProps {
  entry: ChangelogEntryData;
}

/**
 * @description Мемоїзований компонент для відображення одного запису в журналі змін.
 * @component
 */
const ChangelogEntry: React.FC<ChangelogEntryProps> = React.memo(
  ({ entry }) => {
    const headingId = useMemo(
      () => `version-${entry.version.replace(/[\s()]/g, "-")}`,
      [entry.version]
    );

    return (
      <section key={entry.version} aria-labelledby={headingId}>
        <header className="mb-6 border-b-1 border-black pb-4">
          <h2
            id={headingId}
            className="mb-1 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
          >
            {entry.version}
          </h2>
          <p className="text-text-secondary text-ui-label">{entry.date}</p>
        </header>
        <ul className="ml-6 list-disc space-y-4">
          {entry.changes.map((change, index) => (
            <li
              key={index}
              className="text-body-main text-black"
              dangerouslySetInnerHTML={createSanitizedHtml(change)}
            />
          ))}
        </ul>
      </section>
    );
  }
);
ChangelogEntry.displayName = "ChangelogEntry";

/**
 * @description Статична сторінка "Changelog".
 * @component
 */
const ChangelogPage: React.FC = () => {
  const renderedEntries = useMemo(
    () =>
      changelogData.map((entry) => (
        <ChangelogEntry key={entry.version} entry={entry} />
      )),
    []
  );

  return (
    <>
      <Helmet>
        <title>{pageContent.seoTitle}</title>
        <meta name="description" content={pageContent.seoDescription} />
        <link rel="canonical" href={pageContent.canonicalUrl} />
        <meta property="og:title" content={pageContent.seoTitle} />
        <meta property="og:description" content={pageContent.seoDescription} />
        <meta property="og:url" content={pageContent.canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-16 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {pageContent.pageTitle}
          </h1>
        </header>

        <main className="max-w-3xl space-y-16">{renderedEntries}</main>
      </div>
    </>
  );
};

export default React.memo(ChangelogPage);
