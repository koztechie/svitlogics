/**
 * Svitlogics Pricing & Limits Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   pricing and limitation information in a sober, structured manner, stripped of all
 *   non-essential visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   section organization, and information presentation are unambiguous.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays, Svitlogics Blue) and background (Paper White).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings and
 *   'Lora' (`font-serif`) for body copy, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely informational
 *   container with no decorative attributes or shadows.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

interface ListItem {
  term?: string;
  definition: string;
}

// Data structure is now unified: all lists use the same object shape.
// This enforces the "Clarity is a Moral Imperative" principle at the data level.
const content = {
  seoTitle: "Pricing and Limits | Svitlogics",
  seoDescription:
    "Svitlogics is currently a free service. Learn about character limits and the system architecture designed to manage AI API usage.",
  pageTitle: "Pricing and Limits",
  sections: [
    {
      title: "Current Status: Free (Public Beta)",
      paragraphs: [
        "Svitlogics is currently in public beta and is free to use. The service is provided without cost during this development phase to test system functionality and gather performance data.",
      ],
    },
    {
      title: "Input Character Limits",
      paragraphs: [
        "To ensure system stability and manage API costs, Svitlogics enforces a character limit for each analysis. This limit is determined by the token capacity of the underlying AI models.",
        "The current maximum character limit for the selected language is always displayed on the main page below the Input Processor.",
      ],
    },
    {
      title: "API Usage and System Limits",
      paragraphs: [
        "The Svitlogics back-end service includes several mechanisms to ensure stability and fair use:",
      ],
      list: [
        {
          term: "Rate Limiting:",
          definition:
            "To prevent automated abuse, the system limits the number of requests that can be made from a single IP address (currently 20 requests per hour).",
        },
        {
          term: "High-Availability Cascade:",
          definition:
            "The service relies on a cascade of premium Google Gemini 2.5 models. If a primary model is experiencing high traffic or is at its capacity, requests are automatically rerouted to an alternative model.",
        },
      ],
    },
    {
      title: "Future Plans",
      paragraphs: [
        "To ensure the long-term sustainability of the project, premium subscription plans are being considered for future development.",
        "Potential premium features may include:",
      ],
      list: [
        { definition: "Higher personal analysis limits" },
        { definition: "Access to more advanced AI models" },
        { definition: "Team accounts for organizations" },
        { definition: "API access for research and development" },
      ],
    },
  ],
};

/**
 * Renders the Pricing & Limits informational page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Clarity is a Moral Imperative): Employs a consistent and
 *   unambiguous data structure for all content, simplifying rendering logic.
 * - Section Delta (Typography): Strictly uses 'Inter' for headings and 'Lora' for all
 *   body copy, adhering to the established typographic hierarchy.
 * - Section Echo (Spatial System): The content is constrained to `max-w-prose` (75ch)
 *   for optimal long-form readability.
 */
const PricingLimitsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/pricing-limits" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta
          property="og:url"
          content="https://svitlogics.com/pricing-limits"
        />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-12 text-left">
            {content.pageTitle}
          </Heading>

          <div className="space-y-12">
            {content.sections.map((section) => (
              <section
                key={section.title}
                aria-labelledby={`section-title-${section.title
                  .slice(0, 10)
                  .replace(/\s+/g, "-")}`}
              >
                <Heading
                  as="h2"
                  id={`section-title-${section.title
                    .slice(0, 10)
                    .replace(/\s+/g, "-")}`}
                  className="mb-6"
                >
                  {section.title}
                </Heading>
                <div className="space-y-4 font-serif text-body text-carbon-black">
                  {section.paragraphs?.map((p, pIndex) => (
                    <p key={pIndex}>{p}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-6">
                      {(section.list as ListItem[]).map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.term && <strong>{item.term}</strong>}{" "}
                          {item.definition}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PricingLimitsPage);
