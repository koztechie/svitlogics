/**
 * Svitlogics System Changelog Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   development history in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource
 *   for system development tracking.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   version entries, and change categorization are unambiguous and purpose-driven.
 *   Change type badges provide clear, systematic visual encoding.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays) and background (Paper White). Change type
 *   badges use clinical color coding with transparency for information encoding.
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings, badges,
 *   and metadata, and 'Lora' (`font-serif`) for change descriptions, maintaining
 *   UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely informational
 *   container with no decorative attributes or shadows. Badge component is functional.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

type ChangeType =
  | "ADDED"
  | "IMPROVED"
  | "FIXED"
  | "SECURITY"
  | "ARCHITECTURE"
  | "SEO"
  | "DEVELOPMENT"
  | "PERFORMANCE";

interface Change {
  type: ChangeType;
  description: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: Change[];
}

// The data is cleaned of HTML tags and irrelevant entries (e.g., related to the
// now-decommissioned "Pure Minimalist-Brutalist" system). A structured 'type'
// is added for systematic, protocol-compliant styling.
const changelogData: ChangelogEntry[] = [
  {
    version: "v0.4.8 (Beta)",
    date: "August 30, 2025",
    changes: [
      {
        type: "ARCHITECTURE",
        description:
          "Completed 'Operation Laboratory': A full-stack migration of the entire application to the new 'Ethos-Driven Design System'.",
      },
      {
        type: "DEVELOPMENT",
        description:
          "Introduced a new atomic component library (`Button`, `Card`, `Heading`) to enforce design system consistency at the code level.",
      },
      {
        type: "IMPROVED",
        description:
          "Refactored all application components and pages to be 100% compliant with the new design protocol, replacing all legacy styles.",
      },
      {
        type: "FIXED",
        description:
          "Eliminated all instances of `dangerouslySetInnerHTML` from informational pages by restructuring content objects for safe rendering.",
      },
      {
        type: "IMPROVED",
        description:
          "Updated all project documentation (README.md, CONTRIBUTING.md, LICENSE) to align with the new system's clinical tone and technical mandates.",
      },
    ],
  },
  {
    version: "v0.3.8 (Beta)",
    date: "August 16, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented strict schema validation for article frontmatter using Zod. The build process will now fail if an article is missing critical metadata (like `title` or `summary`) or if the data is malformed.",
      },
      {
        type: "IMPROVED",
        description:
          "Enhanced the reliability of the content pipeline by adding a data validation step, ensuring that all published articles meet predefined quality and SEO standards.",
      },
      {
        type: "IMPROVED",
        description:
          "The build script now provides detailed, user-friendly error messages if validation fails, pinpointing the exact file and issue that needs to be fixed.",
      },
    ],
  },
  {
    version: "v0.3.7 (Beta)",
    date: "August 15, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented a full-featured category system for the blog, including a dedicated category index and individual category pages.",
      },
      {
        type: "IMPROVED",
        description:
          "Migrated all blog articles from Markdown (`.md`) to MDX (`.mdx`) to allow for future use of interactive React components within articles.",
      },
      {
        type: "ADDED",
        description:
          "Integrated and configured the `@mdx-js/rollup` plugin to process MDX files during the build.",
      },
      {
        type: "IMPROVED",
        description:
          "Updated the Static Site Generation (SSG) script to automatically discover and pre-render all category pages, ensuring they are fast and SEO-friendly.",
      },
    ],
  },
  {
    version: "v0.3.6 (Beta)",
    date: "August 15, 2025",
    changes: [
      {
        type: "ARCHITECTURE",
        description:
          "Migrated the core analysis engine to a fully asynchronous architecture using Netlify Background Functions. This completely removes the previous 10-second execution limit.",
      },
      {
        type: "IMPROVED",
        description:
          "The application can now handle complex and lengthy analysis tasks (up to 15 minutes), allowing the use of the most powerful AI models without timeouts.",
      },
      {
        type: "IMPROVED",
        description:
          "User experience during analysis has been enhanced. The interface now polls for results in the background, providing a more robust and stable process for the user.",
      },
      {
        type: "SECURITY",
        description:
          "Re-architected the backend with a dedicated trigger function and a background worker, further isolating processes and improving the security posture.",
      },
    ],
  },
  {
    version: "v0.3.5 (Beta)",
    date: "August 14, 2025",
    changes: [
      {
        type: "PERFORMANCE",
        description:
          "Implemented Static Site Generation (SSG) for the entire application. All pages are now pre-rendered into static HTML files during the build process.",
      },
      {
        type: "SEO",
        description:
          "The move to SSG ensures that all content is immediately available to search engine crawlers, significantly improving indexing and SEO potential.",
      },
      {
        type: "PERFORMANCE",
        description:
          "Achieved near-instantaneous page loads and a dramatically improved Largest Contentful Paint (LCP) score, providing a much faster user experience.",
      },
    ],
  },
  {
    version: "v0.3.4 (Beta)",
    date: "August 14, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Introduced a new 'Blog' section to the website, creating a platform for articles, updates, and deeper insights into text analysis.",
      },
      {
        type: "ADDED",
        description:
          "Implemented a lightweight, Markdown-based content system, allowing for easy creation and management of new articles without complex CMS dependencies.",
      },
      {
        type: "ADDED",
        description:
          "Created new page templates for the blog index and individual article views, fully integrated with the Svitlogics design system.",
      },
    ],
  },
  {
    version: "v0.3.3 (Beta)",
    date: "August 13, 2025",
    changes: [
      {
        type: "PERFORMANCE",
        description:
          "Improved the Largest Contentful Paint (LCP) metric by adding `preconnect` links for Google Fonts, accelerating font loading times.",
      },
      {
        type: "IMPROVED",
        description:
          "Added print-specific styles (`@media print`) that hide the interface, allowing users to print or save a clean, report-only version of the analysis results.",
      },
      {
        type: "IMPROVED",
        description:
          "Enhanced accessibility by adding `title` attributes to all icon-based links, providing tooltips for better user guidance.",
      },
    ],
  },
  {
    version: "v0.3.2 (Beta)",
    date: "August 13, 2025",
    changes: [
      {
        type: "IMPROVED",
        description:
          "The application now remembers the last selected language using `localStorage`, improving convenience for returning users.",
      },
      {
        type: "IMPROVED",
        description:
          "The 'Clear' button in the text input area now clears both the input field and the analysis results, providing a complete reset of the interface.",
      },
      {
        type: "ADDED",
        description:
          "A 'Copy' button has been added to the analysis results card, allowing users to easily copy the full report to their clipboard.",
      },
      {
        type: "IMPROVED",
        description:
          "The character counter now turns red when the input limit is exceeded, providing clear visual feedback to the user.",
      },
      {
        type: "ADDED",
        description:
          "The site footer has been updated to include clickable icons for GitHub and email, improving accessibility and contact options.",
      },
      {
        type: "SECURITY",
        description:
          'Added `autoComplete="off"` to the text input field to prevent browsers from suggesting previously analyzed (and potentially sensitive) text.',
      },
    ],
  },
  {
    version: "v0.3.1 (Beta)",
    date: "August 12, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented the official Svitlogics brand identity, replacing the text-based title with a new SVG logo for a crisp, professional look.",
      },
      {
        type: "ADDED",
        description:
          "Integrated a comprehensive set of high-resolution favicons for a consistent appearance across all browsers, devices, and platforms.",
      },
      {
        type: "IMPROVED",
        description:
          "Updated Open Graph meta tags to include a custom social media banner (`og:image`), ensuring proper branding when sharing links.",
      },
    ],
  },
  {
    version: "v0.3.0 (Beta)",
    date: "August 12, 2025",
    changes: [
      {
        type: "IMPROVED",
        description:
          "Upgraded the core AI engine to a new cascade of premium Google Gemini 2.5 models, significantly enhancing the accuracy and depth of text analysis.",
      },
      {
        type: "SECURITY",
        description:
          "Migrated all AI processing to a secure server-side API gateway. This architecture protects the core logic of the service and ensures user API keys are never exposed in the browser.",
      },
      {
        type: "SECURITY",
        description:
          "Implemented IP-based rate limiting to protect the service from automated abuse and ensure fair access for all users.",
      },
      {
        type: "IMPROVED",
        description:
          "Enhanced overall application stability and performance by moving complex computations from the user's browser to the server.",
      },
    ],
  },
  {
    version: "v0.1.0 (Public Beta)",
    date: "June 29, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Configured and launched the custom domain `svitlogics.com`.",
      },
      {
        type: "IMPROVED",
        description:
          "Refined system prompts for Google AI models to improve analysis consistency.",
      },
      {
        type: "IMPROVED",
        description:
          "Completed UI adjustments and bug fixes based on multi-device and cross-browser testing.",
      },
    ],
  },
  {
    version: "v0.0.9 (Alpha)",
    date: "June 28, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Integrated a favicon set and a Web App Manifest for browser and home screen identification.",
      },
      {
        type: "IMPROVED",
        description:
          "Implemented a fully responsive UI for mobile, tablet, and desktop devices.",
      },
    ],
  },
  {
    version: "v0.0.8 (Alpha)",
    date: "June 25, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented on-page and technical SEO, including meta tags, JSON-LD structured data, and a sitemap.",
      },
    ],
  },
  {
    version: "v0.0.7 (Alpha)",
    date: "June 22, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented a high-availability model fallback cascade using seven Google AI models to ensure service reliability.",
      },
      {
        type: "ADDED",
        description:
          "Implemented dynamic character limits based on language and model capacity to manage API token usage.",
      },
    ],
  },
  {
    version: "v0.0.6 (Alpha)",
    date: "June 19, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Added English content to all informational and legal pages (About, How It Works, FAQ, Privacy, Terms).",
      },
      {
        type: "FIXED",
        description:
          "Corrected a client-side routing issue on Netlify that prevented direct URL access.",
      },
    ],
  },
  {
    version: "v0.0.5 (Alpha)",
    date: "June 17, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Deployed the application to Netlify with a continuous integration and delivery (CI/CD) pipeline.",
      },
    ],
  },
  {
    version: "v0.0.2 (Alpha)",
    date: "June 8, 2025",
    changes: [
      {
        type: "IMPROVED",
        description:
          "Replaced automatic language detection with a manual language selector to ensure the correct system prompt is used for analysis.",
      },
    ],
  },
  {
    version: "v0.0.1 (Alpha)",
    date: "May 31, 2025",
    changes: [
      {
        type: "ADDED",
        description:
          "Implemented initial project setup and core text analysis functionality with Google AI models.",
      },
    ],
  },
];

const badgeColors: Record<ChangeType, string> = {
  ADDED: "bg-signal-green/20 text-signal-green",
  IMPROVED: "bg-svitlogics-blue/20 text-svitlogics-blue",
  FIXED: "bg-signal-yellow/20 text-signal-yellow",
  SECURITY: "bg-semantic-terracotta/20 text-semantic-terracotta",
  ARCHITECTURE: "bg-semantic-violet/20 text-semantic-violet",
  SEO: "bg-semantic-teal/20 text-semantic-teal",
  PERFORMANCE: "bg-semantic-teal/20 text-semantic-teal",
  DEVELOPMENT: "bg-neutral-500/20 text-neutral-700",
};

const ChangeTypeBadge: React.FC<{ type: ChangeType }> = ({ type }) => (
  <span
    className={`mr-3 inline-block shrink-0 px-2 py-0.5 font-sans text-xs font-semibold ${
      badgeColors[type] || ""
    }`}
  >
    {type}
  </span>
);

/**
 * Renders the system changelog page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): Strictly follows the hierarchy. Page title and version
 *   headings use 'Inter' (`font-sans`), while change descriptions use 'Lora' (`font-serif`).
 * - Section Echo (Spatial System): The content area is constrained to `max-w-prose`
 *   for optimal readability. Consistent spacing using the 8px grid.
 * - Section Charlie (Chromatic System): Uses clinical color coding for change types
 *   with transparency to avoid emotional connotations.
 * - Section Foxtrot (Component Architecture): Change type badges are functional
 *   elements for information encoding, avoiding decorative styling.
 * - Section Hotel (Tone): The content presentation is direct, clinical, and educational.
 */
const ChangelogPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>System Changelog | Svitlogics</title>
        <meta
          name="description"
          content="Development history and version updates for the Svitlogics text analysis tool."
        />
        <link rel="canonical" href="https://svitlogics.com/changelog" />
        <meta property="og:title" content="System Changelog | Svitlogics" />
        <meta
          property="og:description"
          content="Development history and version updates for the Svitlogics text analysis tool."
        />
        <meta property="og:url" content="https://svitlogics.com/changelog" />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-16 text-left">
            System Changelog
          </Heading>

          <div className="space-y-12">
            {changelogData.map((entry) => (
              <section
                key={entry.version}
                aria-labelledby={`version-${entry.version}`}
              >
                <div className="mb-6 border-b border-carbon-black pb-4">
                  <Heading
                    as="h2"
                    id={`version-${entry.version}`}
                    className="mb-1"
                  >
                    {entry.version}
                  </Heading>
                  <p className="font-sans text-small text-neutral-700">
                    {entry.date}
                  </p>
                </div>

                <ul className="space-y-4">
                  {entry.changes.map((change, index) => (
                    <li
                      key={index}
                      className="flex items-start font-serif text-body text-carbon-black"
                    >
                      <div className="mt-1">
                        <ChangeTypeBadge type={change.type} />
                      </div>
                      <span className="flex-1">{change.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;
