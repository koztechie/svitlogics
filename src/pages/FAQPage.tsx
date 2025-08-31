import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

interface FaqItemData {
  question: string;
  answer: string[];
  plainTextAnswer: string;
}

// --- ОНОВЛЕНО: Текст повністю переписано для кращої читабельності ---
const faqData: FaqItemData[] = [
  {
    question: "How does Svitlogics differ from other tools?",
    answer: [
      "Svitlogics is a tool for critical thinking, not a 'truth machine.' It does not give a simple 'true' or 'false' verdict. Instead, it provides a structured report that highlights linguistic and rhetorical patterns.",
      "This method gives you data to form your own informed conclusions, rather than relying on an automated judgment.",
    ],
    plainTextAnswer:
      "Svitlogics is a tool for critical thinking. It provides a structured report on linguistic and rhetorical patterns to help you form your own conclusions, instead of giving a simple 'true' or 'false' verdict.",
  },
  {
    question: "What technology powers the analysis?",
    answer: [
      "The analysis is powered by a secure server-side API. It uses a cascade of large language models to ensure the service is always available. All core logic is stored securely on the server and is never exposed to the browser.",
    ],
    plainTextAnswer:
      "The analysis is powered by a secure server-side API using a cascade of large language models. All core logic is stored securely on the server.",
  },
  {
    question: "What is the design philosophy of the interface?",
    answer: [
      "The design reflects the system's purpose. It uses the aesthetic of a laboratory, prioritizing clarity and focus over engagement. The interface is sober, structured, and silent.",
      "We use the 'Inter' font for UI elements and 'Lora' for analyzed text to create a clear mental separation. Every element is built for precision and objectivity.",
    ],
    plainTextAnswer:
      "The design uses a laboratory aesthetic, prioritizing clarity and focus. 'Inter' is used for UI and 'Lora' for text to create a clear mental separation. The interface is sober and structured.",
  },
  {
    question: "Is the AI analysis 100% accurate?",
    answer: [
      "No. No AI analysis is perfect. AI models can miss context, nuance, or make errors. Svitlogics is a tool to aid, not replace, human critical thinking. The final judgment always rests with the user.",
    ],
    plainTextAnswer:
      "No, no AI analysis is perfect. Svitlogics is a tool to aid, not replace, human critical thinking. The final judgment rests with the user.",
  },
  {
    question: "Is my submitted text stored?",
    answer: [
      "No. Svitlogics does not store your content. All processing is stateless. The text you submit is sent to our secure back-end, analyzed, and then discarded. It is never written to a database.",
    ],
    plainTextAnswer:
      "No. Svitlogics does not store your content. All processing is stateless and your text is never written to a database.",
  },
];

const FAQPage: React.FC = () => {
  const pageTitle = "Frequently Asked Questions";
  const introParagraph =
    "This section answers common questions about the system's methodology, technology, and limitations.";
  const seoDescription =
    "Find answers to frequently asked questions about Svitlogics, including its methodology, technology, accuracy, and data privacy.";

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
        <title>FAQ | Frequently Asked Questions | Svitlogics</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/faq/" />
        <meta property="og:title" content="FAQ | Svitlogics" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/faq/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
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

export default React.memo(FAQPage);
