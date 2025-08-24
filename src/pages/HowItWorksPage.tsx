import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";

// --- Типізація та Константи ---

/**
 * @description Визначає структуру даних для одного кроку в інструкції.
 */
interface HowToStep {
  /** @description Заголовок кроку. */
  readonly title: string;
  /** @description Вміст кроку у форматі JSX для рендерингу. */
  readonly content: React.ReactNode;
  /** @description Вміст кроку у форматі чистого тексту для SEO (JSON-LD). */
  readonly plainText: string;
}

/**
 * @description Статичний контент сторінки.
 */
const content = {
  seoTitle: "HOW SVITLOGICS WORKS | ANALYSIS PROCESS",
  seoDescription:
    "An overview of the Svitlogics analysis process, from text input to report generation, detailing the use of Google Gemini 2.5 Pro models for assessing text for manipulation, propaganda, and bias.",
  canonicalUrl: "https://svitlogics.com/how-it-works",
  pageTitle: "HOW IT WORKS",
  introParagraph:
    "The Svitlogics analysis workflow is a direct, six-step process. This document outlines each step from text input to receiving the structured report.",
} as const;

/**
 * @description Статичні дані для кроків інструкції. `as const` забезпечує глибоку незмінність.
 * @type {readonly HowToStep[]}
 */
const stepsData: readonly HowToStep[] = [
  {
    title: "1. Provide text",
    content: (
      <p>
        Copy the text for analysis (e.g., an article, a social media post) and
        paste it into the input field.
      </p>
    ),
    plainText:
      "Copy the text for analysis (e.g., an article, a social media post) and paste it into the input field.",
  },
  {
    title: "2. Select language",
    content: (
      <p>
        Select the primary language of the text (English or Ukrainian) using the
        buttons above the input field. This selection is required, as it
        determines which language-specific system prompt is used for the
        analysis.
      </p>
    ),
    plainText:
      "Select the primary language of the text (English or Ukrainian). This is required as it determines which system prompt is used.",
  },
  {
    title: "3. Initiate analysis",
    content: (
      <p>
        Click the ANALYZE button. The request is sent to the{" "}
        <strong>secure Svitlogics API gateway.</strong> Input text is never
        stored.
      </p>
    ),
    plainText:
      "Click the ANALYZE button. The request is sent to the secure Svitlogics API gateway. Input text is never stored.",
  },
  {
    title: "4. AI processing",
    content: (
      <>
        <p>
          The Svitlogics back-end service utilizes a high-availability cascade
          of <strong>Google Gemini 2.5 Pro models.</strong> This system ensures
          reliability: if a primary model is at capacity, the request
          automatically falls back to an alternative.
        </p>
        <p>
          The selected model is guided by a detailed, custom-calibrated system
          prompt. The prompt instructs the AI to assess the text against five
          core criteria, functioning as an analyst, not a "truth detector":
        </p>
        <ul className="ml-6 list-disc space-y-2 pt-2">
          <li>Manipulative Content</li>
          <li>Propagandistic Content</li>
          <li>Disinformation</li>
          <li>Unbiased Presentation (Impartiality)</li>
          <li>Emotional Tone</li>
        </ul>
      </>
    ),
    plainText:
      "The Svitlogics back-end utilizes a cascade of Google Gemini 2.5 Pro models. A custom prompt guides the AI to assess text against five criteria: Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone.",
  },
  {
    title: "5. Review the structured report",
    content: (
      <p>
        Following a brief processing period, the system returns a structured
        report. The report contains a percentage-based score and a concise
        justification for each of the five criteria, along with an overall
        summary.
      </p>
    ),
    plainText:
      "The system returns a structured report with a percentage score, justification, and an overall summary for each of the five criteria.",
  },
  {
    title: "6. Use the analysis",
    content: (
      <p>
        The results provided by Svitlogics are not a definitive verdict.{" "}
        <strong>
          Svitlogics is an auxiliary tool designed to aid the user's critical
          thinking.
        </strong>{" "}
        Use the provided data points and analytical justifications to question
        the text's underlying messages, identify potential biases, and form
        their own, more informed conclusions.
      </p>
    ),
    plainText:
      "The results are not a definitive verdict. Svitlogics is an auxiliary tool designed to aid the user's critical thinking. The data enables the user to form their own, more informed conclusions.",
  },
] as const;

// --- Мемоїзовані Підкомпоненти та Хелпери ---

/**
 * @description Утиліта для генерації валідного HTML id з рядка.
 * @private
 */
const generateId = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[?']/g, "");

/**
 * @description Пропси для підкомпонента `StepSection`.
 */
interface StepSectionProps {
  step: HowToStep;
}

/**
 * @description Мемоїзований компонент для відображення одного кроку інструкції.
 * @component
 */
const StepSection: React.FC<StepSectionProps> = React.memo(({ step }) => {
  const headingId = useMemo(() => generateId(step.title), [step.title]);

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-4 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      >
        {step.title}
      </h2>
      <div className="space-y-4 text-body-main text-black">{step.content}</div>
    </section>
  );
});
StepSection.displayName = "StepSection";

/**
 * @description Статична сторінка "How It Works".
 * @component
 */
const HowItWorksPage: React.FC = () => {
  const howToJsonLdString = useMemo(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Svitlogics AI Text Analysis Process",
      description:
        "An outline of the process for using Svitlogics to analyze text for manipulation and disinformation with Google Gemini 2.5 Pro AI.",
      step: stepsData.map((step, index) => ({
        "@type": "HowToStep",
        name: step.title,
        text: step.plainText,
        position: index + 1,
      })),
    };
    return JSON.stringify(schema);
  }, []);

  const renderedSteps = useMemo(
    () => stepsData.map((step) => <StepSection key={step.title} step={step} />),
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
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{howToJsonLdString}</script>
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-8 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.pageTitle}
          </h1>
          <p className="mb-16 max-w-3xl text-body-main text-black">
            {content.introParagraph}
          </p>
        </header>

        <main className="max-w-3xl space-y-16">{renderedSteps}</main>
      </div>
    </>
  );
};

export default React.memo(HowItWorksPage);
