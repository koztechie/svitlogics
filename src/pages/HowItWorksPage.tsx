import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

interface HowToStep {
  title: string;
  paragraphs: string[];
  list?: string[];
  plainText: string;
}

// --- ОНОВЛЕНО: Текст повністю переписано для кращої читабельності ---
const stepsData: HowToStep[] = [
  {
    title: "1. Provide Text",
    paragraphs: [
      "Copy the text you want to analyze, such as an article or a social media post. Paste it into the Input Processor on the main page.",
    ],
    plainText: "Copy and paste the text for analysis into the Input Processor.",
  },
  {
    title: "2. Select Language",
    paragraphs: [
      "Select the primary language of the text (English or Ukrainian). This is a required step, as it determines which system prompt the AI will use for analysis.",
    ],
    plainText:
      "Select the primary language of the text. This step is required.",
  },
  {
    title: "3. Initiate Analysis",
    paragraphs: [
      "Click the 'Initiate Analysis' button. Your request is sent to the secure Svitlogics API. Your input text is never stored.",
    ],
    plainText:
      "Click 'Initiate Analysis'. Your request is sent securely, and the input text is never stored.",
  },
  {
    title: "4. AI Processing",
    paragraphs: [
      "The Svitlogics back-end uses a cascade of large language models to ensure reliability. If one model is busy, your request is automatically sent to another.",
      "A detailed system prompt guides the AI to check the text against five core criteria:",
    ],
    list: [
      "Manipulative Content",
      "Propagandistic Content",
      "Disinformation",
      "Unbiased Presentation",
      "Emotional Tone",
    ],
    plainText:
      "The system uses a cascade of AI models. A custom prompt guides the AI to assess text against five core criteria.",
  },
  {
    title: "5. Review the Report",
    paragraphs: [
      "The system returns a structured report with qualitative observations for each of the five criteria, along with an overall summary. The report shows you evidence and patterns, not scores or simple verdicts.",
    ],
    plainText:
      "The system returns a structured report with qualitative observations and an overall summary. It presents evidence, not scores.",
  },
  {
    title: "6. Use the Analysis",
    paragraphs: [
      "The results from Svitlogics are not a final judgment. The tool is designed to support your own critical thinking. Use the data to question the text's messages, identify potential bias, and form your own informed conclusions.",
    ],
    plainText:
      "The results are not a final judgment. Use the data to support your own critical thinking and form your own conclusions.",
  },
];

const HowItWorksPage: React.FC = () => {
  const pageTitle = "How It Works";
  const introParagraph =
    "The Svitlogics analysis workflow is a direct, six-step process. This guide outlines each step, from providing text to reviewing your structured report.";
  const seoDescription =
    "Learn the step-by-step process of using Svitlogics. See how our AI system analyzes text for manipulation, propaganda, and bias.";

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Svitlogics AI Text Analysis Works",
    description:
      "A step-by-step guide on how to use Svitlogics to analyze text for manipulation and disinformation.",
    step: stepsData.map((step, index) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.plainText,
      position: index + 1,
    })),
  };

  return (
    <>
      <Helmet>
        <title>How It Works | Analysis Methodology | Svitlogics</title>
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
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {pageTitle}
            </Heading>
            <p className="font-serif text-h4 text-carbon-black">
              {introParagraph}
            </p>
          </header>
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

export default React.memo(HowItWorksPage);
