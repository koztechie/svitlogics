import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

interface HowToStep {
  title: string;
  content: React.ReactNode;
  plainText: string;
}

// --- ОНОВЛЕНИЙ КОНТЕНТ ---
const stepsData: HowToStep[] = [
  {
    title: "1. Provide text",
    content: <p>Copy the text for analysis (e.g., an article, a social media post) and paste it into the input field.</p>,
    plainText: "Copy the text for analysis (e.g., an article, a social media post) and paste it into the input field."
  },
  {
    title: "2. Select language",
    content: <p>Select the primary language of the text (English or Ukrainian) using the buttons above the input field. This selection is required, as it determines which language-specific system prompt is used for the analysis.</p>,
    plainText: "Select the primary language of the text (English or Ukrainian). This is required as it determines which system prompt is used."
  },
  {
    title: "3. Initiate analysis",
    content: <p>Click the ANALYZE button. The request is sent to the <strong>secure Svitlogics API gateway.</strong> Your input text is never stored.</p>,
    plainText: "Click the ANALYZE button. The request is sent to the secure Svitlogics API gateway. Your input text is never stored."
  },
  {
    title: "4. AI processing",
    content: (
      <>
        <p>The Svitlogics back-end service utilizes a high-availability cascade of <strong>premium Google Gemini 2.5 models.</strong> This system ensures reliability: if a primary model is at capacity, the request automatically falls back to an alternative.</p>
        <p>The selected model is guided by a detailed, custom-calibrated system prompt. The prompt instructs the AI to assess the text against five core criteria, functioning as an analyst, not a "truth detector":</p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Manipulative Content</li>
          <li>Propagandistic Content</li>
          <li>Disinformation</li>
          <li>Unbiased Presentation (Impartiality)</li>
          <li>Emotional Tone</li>
        </ul>
      </>
    ),
    plainText: "The Svitlogics back-end utilizes a cascade of premium Google Gemini 2.5 models. A custom prompt guides the AI to assess text against five criteria: Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone."
  },
  {
    title: "5. Review the structured report",
    content: <p>After a short delay, the system returns a structured report. The report contains a percentage-based score and a concise justification for each of the five criteria, along with an overall summary.</p>,
    plainText: "The system returns a structured report with a percentage score, justification, and an overall summary for each of the five criteria."
  },
  {
    title: "6. Use the analysis",
    content: <p>The results provided by Svitlogics are not a definitive verdict. <strong>Svitlogics is an auxiliary tool designed to aid your own critical thinking.</strong> Use the provided data points and analytical justifications to question the text's underlying messages, identify potential biases, and form your own, more informed conclusions.</p>,
    plainText: "The results are not a definitive verdict. Svitlogics is an auxiliary tool designed to aid your own critical thinking. Use the data to form your own conclusions."
  }
];

// Підкомпонент для одного кроку
const StepSection: React.FC<{ step: HowToStep }> = ({ step }) => (
  <section aria-labelledby={`step-heading-${step.title.replace(/\s+/g, '-')}`}>
    <h2 id={`step-heading-${step.title.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-4 normal-case">
      {step.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {step.content}
    </div>
  </section>
);

const HowItWorksPage: React.FC = () => {
  const pageTitle = "HOW IT WORKS";
  const introParagraph = "The Svitlogics analysis workflow is a direct, six-step process. This document outlines each step from text input to receiving the structured report.";
  const seoDescription = "A step-by-step guide on how Svitlogics uses a cascade of premium Google's Gemini 2.5 models to analyze text for manipulation, propaganda, and bias.";

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Svitlogics AI Text Analysis Works",
    "description": "A step-by-step guide on how to use Svitlogics to analyze text for manipulation and disinformation using Google Gemini 2.5 AI.",
    "step": stepsData.map(step => ({
      "@type": "HowToStep",
      "name": step.title,
      "text": step.plainText
    }))
  };

  return (
    <>
      <Helmet>
        <title>How Svitlogics Works | AI Text Analysis Process</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/how-it-works" />
        <meta property="og:title" content="How Svitlogics Works | AI Text Analysis Process" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/how-it-works" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(howToJsonLd)}
        </script>
      </Helmet>
      
      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-12 text-left">
          {pageTitle}
        </h1>

        <div className="max-w-3xl">
          <p className="font-mono text-body-main leading-body text-black mb-16">
            {introParagraph}
          </p>

          <div className="space-y-12">
            {stepsData.map((step) => (
              <StepSection key={step.title} step={step} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorksPage;