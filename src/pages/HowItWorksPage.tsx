/**
 * Svitlogics How It Works Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   the analysis process in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable procedural guide.
 * - Section Bravo (Clarity is a Moral Imperative): The step-by-step structure,
 *   content organization, and information presentation are unambiguous.
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

interface HowToStep {
  title: string;
  paragraphs: string[];
  list?: string[];
  plainText: string;
}

// Content has been completely rewritten to be protocol-compliant.
// CRITICAL: Step 5 now correctly describes the qualitative report, removing
// any mention of "percentage-based scores".
const stepsData: HowToStep[] = [
  {
    title: "1. Provide Text",
    paragraphs: [
      "Copy the text for analysis (e.g., an article, a social media post) and paste it into the Input Processor.",
    ],
    plainText:
      "Copy the text for analysis and paste it into the Input Processor.",
  },
  {
    title: "2. Select Language",
    paragraphs: [
      "Select the primary language of the text (English or Ukrainian). This selection is required, as it determines which language-specific system prompt is used for the analysis.",
    ],
    plainText:
      "Select the primary language of the text (English or Ukrainian). This is required as it determines which system prompt is used.",
  },
  {
    title: "3. Initiate Analysis",
    paragraphs: [
      "Click the 'Initiate Analysis' button. The request is sent to the secure Svitlogics API gateway. Your input text is never stored.",
    ],
    plainText:
      "Click the 'Initiate Analysis' button. The request is sent to the secure Svitlogics API gateway. Your input text is never stored.",
  },
  {
    title: "4. AI Processing",
    paragraphs: [
      "The Svitlogics back-end service utilizes a high-availability cascade of large language models. This system ensures reliability: if a primary model is at capacity, the request automatically falls back to an alternative.",
      "The selected model is guided by a detailed, custom-calibrated system prompt. The prompt instructs the AI to assess the text against five core criteria:",
    ],
    list: [
      "Manipulative Content",
      "Propagandistic Content",
      "Disinformation",
      "Unbiased Presentation",
      "Emotional Tone",
    ],
    plainText:
      "The Svitlogics back-end utilizes a cascade of large language models. A custom prompt guides the AI to assess text against five criteria: Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone.",
  },
  {
    title: "5. Review the Structured Report",
    paragraphs: [
      "The system returns a structured report containing qualitative observations and a concise justification for each of the five criteria, along with an overall summary. The report presents evidence and highlights patterns; it does not provide scores or verdicts.",
    ],
    plainText:
      "The system returns a structured report with qualitative observations, justifications, and an overall summary for each of the five criteria. It presents evidence, not scores or verdicts.",
  },
  {
    title: "6. Utilize the Analysis",
    paragraphs: [
      "The results provided by Svitlogics are not a definitive judgment. Svitlogics is an auxiliary tool designed to aid your own critical thinking. Use the provided data points and analytical justifications to question the text's underlying messages, identify potential biases, and form your own, more informed conclusions.",
    ],
    plainText:
      "The results are not a definitive judgment. Svitlogics is an auxiliary tool to aid your critical thinking. Use the data to form your own conclusions.",
  },
];

/**
 * Renders the "How It Works" page, detailing the analysis process.
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Data as Inquiry): The content (Step 5) has been critically
 *   revised to remove any mention of scores, accurately reflecting the system's
 *   qualitative, evidence-based output.
 * - Section Delta (Typography): Strictly uses 'Inter' for headings and 'Lora' for all
 *   body copy, adhering to the established typographic hierarchy.
 * - Section Echo (Spatial System): The content is constrained to `max-w-prose` (75ch)
 *   for optimal long-form readability.
 */
const HowItWorksPage: React.FC = () => {
  const pageTitle = "How It Works";
  const introParagraph =
    "The Svitlogics analysis workflow is a direct, six-step process. This document outlines each step from text input to receiving the structured report.";
  const seoDescription =
    "A step-by-step guide on how Svitlogics uses a cascade of large language models to analyze text for manipulation, propaganda, and bias.";

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Svitlogics AI Text Analysis Works",
    description:
      "A step-by-step guide on how to use Svitlogics to analyze text for manipulation and disinformation.",
    step: stepsData.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.plainText,
    })),
  };

  return (
    <>
      <Helmet>
        <title>How It Works | Svitlogics</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/how-it-works/" />
        <meta property="og:title" content="How It Works | Svitlogics" />
        <meta property="og:description" content={seoDescription} />
        <meta
          property="og:url"
          content="https://svitlogics.com/how-it-works/"
        />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(howToJsonLd)}
        </script>
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
            {stepsData.map((step) => (
              <section
                key={step.title}
                aria-labelledby={`step-heading-${step.title
                  .slice(0, 10)
                  .replace(/\s+/g, "-")}`}
              >
                <Heading
                  as="h2"
                  id={`step-heading-${step.title
                    .slice(0, 10)
                    .replace(/\s+/g, "-")}`}
                  className="mb-4"
                >
                  {step.title}
                </Heading>
                <div className="space-y-4 font-serif text-body text-carbon-black">
                  {step.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                  {step.list && (
                    <ul className="list-disc space-y-2 pl-6">
                      {step.list.map((item, index) => (
                        <li key={index}>{item}</li>
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

export default HowItWorksPage;
