import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

// Спрощена структура даних
interface ChangelogEntryData {
  version: string;
  date: string;
  changes: string[]; // Тепер це просто масив рядків
}

// Фінальні дані чейнджлогу з новою версією v0.2.0
const changelogData: ChangelogEntryData[] = [
  // --- НОВА ВЕРСІЯ ---
  {
    version: "v0.2.1 (Beta)",
    date: "August 11, 2025",
    changes: [
      '<strong>REFACTORED:</strong> Migrated all AI analysis logic from the client-side to a secure, serverless API gateway (`Netlify Functions`).',
      '<strong>SECURITY:</strong> API key is now securely stored as a server-side environment variable, making it inaccessible from the user\'s browser.',
      '<strong>SECURITY:</strong> Implemented IP-based rate limiting to protect the service from automated abuse and DDoS attacks (20 requests/hour per IP).',
      '<strong>SECURITY:</strong> Integrated Cloudflare Turnstile CAPTCHA to effectively block automated bots from accessing the AI analysis endpoint.',
      '<strong>IMPROVED:</strong> Overall application security and robustness have been significantly enhanced, moving from a client-only proof-of-concept to a production-ready architecture.'
    ]
  },
  {
    version: "v0.2.0 (Beta)",
    date: "August 11, 2025",
    changes: [
      '<strong>IMPROVED:</strong> Migrated the entire development workflow from a cloud-based IDE to a professional local environment (VS Code, Git) for enhanced stability, performance, and independence.',
      '<strong>ADDED:</strong> Established a new CI/CD (Continuous Integration/Continuous Deployment) pipeline via GitHub and Netlify for automated, reliable deployments.',
      '<strong>ADDED:</strong> Integrated new AI-assisted coding tools directly into the local development environment to accelerate development.',
      '<strong>REMOVED:</strong> Removed all dependencies and references to the Bolt.new platform, ensuring full project autonomy.',
      '<strong>REFACTORED:</strong> Updated all public-facing informational pages to align with the project\'s independent status.'
    ]
  },
  // --- ПОПЕРЕДНІ ВЕРСІЇ ---
  {
    version: "v0.1.0 (Public Beta)",
    date: "June 29, 2025",
    changes: [
      '<strong>ADDED:</strong> Configured and launched the custom domain `svitlogics.com`.',
      '<strong>IMPROVED:</strong> Refined system prompts for Google AI models to improve analysis consistency.',
      '<strong>IMPROVED:</strong> Completed UI adjustments and bug fixes based on multi-device and cross-browser testing.'
    ]
  },
  {
    version: "v0.0.9 (Alpha)",
    date: "June 28, 2025",
    changes: [
      '<strong>ADDED:</strong> Integrated a favicon set and a Web App Manifest for browser and home screen identification.',
      '<strong>IMPROVED:</strong> Implemented a fully responsive UI for mobile, tablet, and desktop devices.'
    ]
  },
  {
    version: "v0.0.8 (Alpha)",
    date: "June 25, 2025",
    changes: [
      '<strong>ADDED:</strong> Implemented on-page and technical SEO, including meta tags, JSON-LD structured data, and a sitemap.'
    ]
  },
  {
    version: "v0.0.7 (Alpha)",
    date: "June 22, 2025",
    changes: [
      '<strong>ADDED:</strong> Implemented a high-availability model fallback cascade using seven Google AI models to ensure service reliability.',
      '<strong>ADDED:</strong> Implemented dynamic character limits based on language and model capacity to manage API token usage.'
    ]
  },
  {
    version: "v0.0.6 (Alpha)",
    date: "June 19, 2025",
    changes: [
      '<strong>ADDED:</strong> Added English content to all informational and legal pages (About, How It Works, FAQ, Privacy, Terms).',
      '<strong>FIXED:</strong> Corrected a client-side routing issue on Netlify that prevented direct URL access.'
    ]
  },
  {
    version: "v0.0.5 (Alpha)",
    date: "June 17, 2025",
    changes: [
      '<strong>ADDED:</strong> Deployed the application to Netlify with a continuous integration and delivery (CI/CD) pipeline.'
    ]
  },
  {
    version: "v0.0.4 (Alpha)",
    date: "June 15, 2025",
    changes: [
      '<strong>IMPROVED:</strong> Redesigned the user interface to align with the \'Pure Minimalist-Brutalist\' design system.'
    ]
  },
  {
    version: "v0.0.3 (Alpha)",
    date: "June 14, 2025",
    changes: [
      '<strong>ADDED:</strong> Established the \'Pure Minimalist-Brutalist\' design system and the Svitlogics Writing System.'
    ]
  },
  {
    version: "v0.0.2 (Alpha)",
    date: "June 8, 2025",
    changes: [
      '<strong>IMPROVED:</strong> Replaced automatic language detection with a manual language selector to ensure the correct system prompt is used for analysis.'
    ]
  },
  {
    version: "v0.0.1 (Alpha)",
    date: "May 31, 2025",
    changes: [
      '<strong>ADDED:</strong> Implemented initial project setup and core text analysis functionality with Google AI models.'
    ]
  }
];

const ChangelogPage: React.FC = () => {
  // const { t } = useTranslation();
  const pageTitle = "CHANGELOG";

  return (
    <>
      <Helmet>
        <title>Changelog | Svitlogics Version History</title>
        <meta name="description" content="See the development history and updates for the Svitlogics application, from its initial alpha release to the latest version." />
        <link rel="canonical" href="https://svitlogics.com/changelog" />
        <meta property="og:title" content="Changelog | Svitlogics Version History" />
        <meta property="og:description" content="See the development history and updates for the Svitlogics application, from its initial alpha release to the latest version." />
        <meta property="og:url" content="https://svitlogics.com/changelog" />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-16 text-left">
          {pageTitle}
        </h1>
        
        <div className="max-w-3xl space-y-12">
          {changelogData.map((entry) => (
            <section key={entry.version} aria-labelledby={`version-${entry.version.replace(/\s+/g, '-')}`}>
              <div className="pb-4 mb-6 border-b border-black">
                <h2 id={`version-${entry.version.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-1 normal-case">
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