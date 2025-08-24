import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

// --- Типізація та Константи ---

/** @description Визначає структуру однієї інформаційної секції. */
interface InfoSectionData {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly listTitle?: string;
  readonly list?: readonly string[];
}

/**
 * @description Статичний контент сторінки. `as const` забезпечує глибоку незмінність.
 */
const content = {
  seoTitle: "PRICING AND LIMITS | SVITLOGICS",
  seoDescription:
    "An overview of the Svitlogics service status, including character limits, rate limiting, and the system architecture for managing Google AI API usage.",
  canonicalUrl: "https://svitlogics.com/pricing-limits",
  pageTitle: "PRICING AND LIMITS",
  sections: [
    {
      title: "Current status: Free (public beta)",
      paragraphs: [
        "Svitlogics is in a public beta phase and is currently provided without cost. This allows for system functionality testing and performance data collection.",
      ],
    },
    {
      title: "Input character limits",
      paragraphs: [
        "To ensure system stability and manage API costs, Svitlogics enforces a character limit for each analysis. This limit is determined by the token capacity of the underlying AI models.",
        "The current maximum character limit for the selected language is displayed on the main page below the text input field.",
      ],
    },
    {
      title: "API usage and system limits",
      paragraphs: [
        "The Svitlogics back-end service includes several mechanisms to ensure stability and fair use:",
        "<strong>Rate Limiting:</strong> To prevent automated abuse, the system limits the number of requests a single IP address can make (currently 20 requests per hour).",
        "<strong>High-Availability Cascade:</strong> The service utilizes a cascade of Google Gemini 2.5 Pro models. If a primary model is experiencing high traffic or is at its capacity, requests are automatically rerouted to an alternative model. This may result in processing delays during peak hours.",
      ],
    },
    {
      title: "Future development",
      paragraphs: [
        "To ensure long-term project sustainability, subscription plans are a consideration for future development.",
      ],
      listTitle: "Proposed features for future subscription plans include:",
      list: [
        "Higher personal analysis limits",
        "Access to more advanced AI models",
        "Team accounts for organizations",
        "API access for research and development",
      ],
    },
  ],
} as const;

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

/** @description Утиліта для генерації валідного HTML id з рядка. */
const generateId = (text: string): string =>
  text.toLowerCase().replace(/[\s:]/g, "-").replace(/[/()]/g, "");

/** @description Пропси для підкомпонента `InfoSection`. */
interface InfoSectionProps {
  section: InfoSectionData;
}

const InfoSection: React.FC<InfoSectionProps> = React.memo(({ section }) => {
  const headingId = useMemo(() => generateId(section.title), [section.title]);

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-6 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      >
        {section.title}
      </h2>
      <div className="space-y-4 text-body-main text-black">
        {section.paragraphs.map((p, pIndex) => (
          <p key={pIndex} dangerouslySetInnerHTML={createSanitizedHtml(p)} />
        ))}
        {section.listTitle && <p className="pt-2">{section.listTitle}</p>}
        {section.list && (
          <ul className="ml-6 list-disc space-y-2">
            {section.list.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
});
InfoSection.displayName = "InfoSection";

/**
 * @description Статична сторінка "Pricing and Limits".
 * @component
 */
const PricingLimitsPage: React.FC = () => {
  const renderedSections = useMemo(
    () =>
      content.sections.map((section) => (
        <InfoSection key={section.title} section={section} />
      )),
    []
  );

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href={content.canonicalUrl} />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content={content.canonicalUrl} />
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-16 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.pageTitle}
          </h1>
        </header>

        <main className="max-w-3xl">
          <div className="space-y-16">{renderedSections}</div>
        </main>
      </div>
    </>
  );
};

export default React.memo(PricingLimitsPage);
