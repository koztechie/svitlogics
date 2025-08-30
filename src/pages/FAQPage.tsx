/**
 * Svitlogics FAQ Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   question/answer format, and information presentation are unambiguous.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black) and background (Paper White).
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

interface FaqItemData {
  question: string;
  answer: string[];
  plainTextAnswer: string;
}

// Content has been completely rewritten and restructured for protocol compliance.
// The question about "brutalist design" has been replaced with one that accurately
// describes The Ethos-Driven Design System.
const faqData: FaqItemData[] = [
  {
    question:
      "What is the primary difference between Svitlogics and other analysis tools?",
    answer: [
      "Svitlogics is designed as an auxiliary instrument for critical thinking. Unlike tools that provide a binary 'true' or 'false' verdict, it does not deliver a final judgment. Instead, it provides a structured report highlighting linguistic and rhetorical patterns.",
      "This methodology is designed to provide data that empowers the user to form their own, more informed conclusions, always deferring to their final judgment.",
    ],
    plainTextAnswer:
      "Svitlogics is an auxiliary instrument for critical thinking. It provides a structured report highlighting linguistic and rhetorical patterns to empower the user to form their own conclusions, rather than giving a simple 'true' or 'false' verdict.",
  },
  {
    question: "What technology powers the analysis?",
    answer: [
      "The analysis is powered by a secure server-side API gateway. It utilizes a high-availability cascade of premium large language models to ensure operational reliability. All core logic and credentials are stored securely on the server, never exposed to the user's browser.",
    ],
    plainTextAnswer:
      "The analysis is powered by a secure server-side API gateway using a cascade of premium large language models. Core logic and credentials are stored securely on the server.",
  },
  {
    question: "What is the design philosophy of the interface?",
    answer: [
      "The design is a direct manifestation of the system's purpose. It adopts the aesthetic of a high-consequence laboratory, prioritizing clarity and focus over engagement or entertainment. The interface is sober, structured, and silent.",
      "It uses the 'Inter' typeface for all UI elements and headings for maximum legibility, and the 'Lora' typeface for analyzed content to create a clear cognitive separation. Every element is calibrated for precision and objectivity.",
    ],
    plainTextAnswer:
      "The design adopts the aesthetic of a high-consequence laboratory, prioritizing clarity and focus. It uses the 'Inter' typeface for UI and 'Lora' for analyzed text to create a clear cognitive separation. The interface is sober, structured, and silent.",
  },
  {
    question: "Is the AI analysis 100% accurate?",
    answer: [
      "No. No AI analysis is infallible. AI models can misinterpret context, miss nuance, or make errors. Svitlogics is a tool to aid, not replace, human critical thinking. The final interpretation and judgment always rest with the user.",
    ],
    plainTextAnswer:
      "No, no AI analysis is infallible. Svitlogics is a tool to aid, not replace, human critical thinking. The final interpretation rests with the user.",
  },
  {
    question: "Is my submitted text stored?",
    answer: [
      "No. Svitlogics does not store the content you analyze. All processing is stateless. The text you submit is sent to our secure back-end, forwarded to the AI service for analysis, and then discarded. It is never written to a database or logged.",
    ],
    plainTextAnswer:
      "No. Svitlogics does not store the content you analyze. All processing is stateless and your text is never written to a database.",
  },
];

/**
 * Renders the Frequently Asked Questions page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha/Hotel (Content & Tone): The content has been rewritten to be
 *   self-consistent with the system's philosophy, accurately describing its design.
 * - Section Delta (Typography): Strictly uses 'Inter' for headings/UI and 'Lora' for body
 *   copy, adhering to the established typographic hierarchy.
 * - Section Echo (Spatial System): Content is constrained to `max-w-prose` (75ch) for
 *   optimal readability.
 */
const FAQPage: React.FC = () => {
  const pageTitle = "Frequently Asked Questions";
  const introParagraph =
    "This section provides answers to common questions regarding the system's methodology, technology, and limitations.";
  const seoDescription =
    "Find answers to common questions about Svitlogics. Learn about its AI accuracy, supported languages, data privacy, and the technology behind the text analysis.";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.plainTextAnswer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Svitlogics</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/faq/" />
        <meta property="og:title" content="FAQ | Svitlogics" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/faq/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-8 text-left">
            {pageTitle}
          </Heading>
          <p className="mb-16 font-serif text-h4 text-carbon-black">
            {introParagraph}
          </p>

          <div className="space-y-12">
            {faqData.map((item) => (
              <section
                key={item.question}
                aria-labelledby={`faq-question-${item.question
                  .slice(0, 10)
                  .replace(/\s+/g, "-")}`}
              >
                <Heading
                  as="h2"
                  id={`faq-question-${item.question
                    .slice(0, 10)
                    .replace(/\s+/g, "-")}`}
                  className="mb-4"
                >
                  {item.question}
                </Heading>
                <div className="space-y-4 font-serif text-body text-carbon-black">
                  {item.answer.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
