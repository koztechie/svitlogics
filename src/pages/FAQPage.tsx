import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";

// --- Типізація та Константи ---

/**
 * @description Визначає структуру даних для одного Q&A блоку.
 */
interface FaqItemData {
  /** @description Питання. */
  readonly question: string;
  /** @description Відповідь у форматі JSX для рендерингу. */
  readonly answer: React.ReactNode;
  /** @description Відповідь у форматі чистого тексту для SEO (JSON-LD). */
  readonly plainTextAnswer: string;
}

/**
 * @description Статичний контент сторінки. `as const` забезпечує глибоку незмінність.
 */
const content = {
  seoTitle: "FAQ | SVITLOGICS",
  seoDescription:
    "Answers to frequently asked questions about Svitlogics, including its AI model, accuracy, data privacy, and supported languages.",
  canonicalUrl: "https://svitlogics.com/faq",
  pageTitle: "FREQUENTLY ASKED QUESTIONS",
  introParagraph:
    "This section provides answers to common questions. For inquiries not addressed here, use the Contact page.",
} as const;

/**
 * @description Статичні дані для FAQ.
 * @type {readonly FaqItemData[]}
 */
const faqData: readonly FaqItemData[] = [
  {
    question:
      "What is the primary difference between Svitlogics and other analysis tools?",
    answer: (
      <p>
        Svitlogics is designed as an{" "}
        <strong>auxiliary instrument for critical thinking</strong>. Unlike
        tools that provide a binary "true" or "false" verdict, it does not
        deliver a final judgment. Instead, it provides a structured report
        across five criteria (Manipulative Content, Propagandistic Content,
        Disinformation, Unbiased Presentation, and Emotional Tone). This
        methodology is designed to provide data that empowers the user to form
        their own conclusions.
      </p>
    ),
    plainTextAnswer:
      'Svitlogics is designed as an auxiliary instrument for critical thinking. Unlike tools that provide a binary "true" or "false" verdict, it provides a structured report across five criteria to empower the user to form their own conclusions.',
  },
  {
    question: "What technology powers the analysis?",
    answer: (
      <p>
        The analysis is powered by a{" "}
        <strong>secure server-side API gateway</strong> running on Netlify
        Functions. It utilizes a high-availability cascade of{" "}
        <strong>Google Gemini 2.5 Pro models</strong> to ensure operational
        reliability. The core logic and API keys are stored securely on the
        server, never exposed to the user's browser.
      </p>
    ),
    plainTextAnswer:
      "The analysis is powered by a secure server-side API gateway using a cascade of Google Gemini 2.5 Pro models. Core logic and API keys are stored securely on the server.",
  },
  {
    question: "Why does Svitlogics use a 'brutalist' design?",
    answer: (
      <p>
        The 'Pure Minimalist-Brutalist' aesthetic is a functional decision that
        supports the tool's mission of clarity. The interface intentionally
        omits decorative elements such as shadows, gradients, or animations.
        This ensures the user's focus remains entirely on the input text and the
        structured analysis provided.
      </p>
    ),
    plainTextAnswer:
      "The 'Pure Minimalist-Brutalist' design is a functional choice that supports the tool's mission of clarity. The UI is intentionally direct, with no decorative elements, ensuring the user's focus remains on the content and its analysis.",
  },
  {
    question: "Is the AI analysis 100% accurate?",
    answer: (
      <p>
        No. <strong>No AI analysis is 100% infallible.</strong> AI models can
        misinterpret context, miss nuance, or make errors. Svitlogics is a tool
        to aid, not replace, human critical thinking. The final interpretation
        and judgment rest with the user.
      </p>
    ),
    plainTextAnswer:
      "No. No AI analysis is 100% infallible. Svitlogics is a tool to aid, not replace, human critical thinking. The final interpretation rests with the user.",
  },
  {
    question: "What are the text input limits?",
    answer: (
      <p>
        To ensure system stability and fair usage, there is a character limit
        for each analysis. This limit is determined by the back-end service and
        is always displayed on the main page near the input field.
      </p>
    ),
    plainTextAnswer:
      "To ensure system stability and fair usage, there is a character limit for each analysis. The current limit is displayed on the main page.",
  },
  {
    question: "What languages does Svitlogics support?",
    answer: (
      <p>
        Svitlogics is optimized for analyzing texts in <strong>English</strong>{" "}
        and <strong>Ukrainian</strong>. The system prompts that guide the AI are
        specifically calibrated for these two languages.
      </p>
    ),
    plainTextAnswer:
      "Svitlogics is optimized for analyzing texts in English and Ukrainian, with system prompts calibrated for these languages.",
  },
  {
    question: "Is submitted text stored?",
    answer: (
      <p>
        No.{" "}
        <strong>
          Svitlogics does not store the content submitted for analysis.
        </strong>{" "}
        All processing is stateless. Submitted text is sent to the secure
        back-end, forwarded to the Google AI API for analysis, and then
        discarded. It is never written to a database.
      </p>
    ),
    plainTextAnswer:
      "No. Svitlogics does not store the content submitted for analysis. All processing is stateless and the text is never written to a database.",
  },
  {
    question: "Who developed Svitlogics?",
    answer: (
      <p>
        Svitlogics is a solo project developed by Eugene Kozlovsky from Kyiv,
        Ukraine.
      </p>
    ),
    plainTextAnswer:
      "Svitlogics is a solo project developed by Eugene Kozlovsky from Kyiv, Ukraine.",
  },
] as const;

// --- Мемоїзовані Підкомпоненти та Хелпери ---

/**
 * @description Утиліта для генерації валідного HTML id з рядка.
 * @private
 */
const generateId = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[?']/g, "");

/**
 * @description Пропси для підкомпонента `FaqItem`.
 */
interface FaqItemProps {
  item: FaqItemData;
}

/**
 * @description Мемоїзований компонент для відображення одного Q&A блоку.
 * @component
 */
const FaqItem: React.FC<FaqItemProps> = React.memo(({ item }) => {
  const headingId = useMemo(() => generateId(item.question), [item.question]);

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-4 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      >
        {item.question}
      </h2>
      <div className="text-body-main text-black">{item.answer}</div>
    </section>
  );
});
FaqItem.displayName = "FaqItem";

/**
 * @description Статична сторінка "FAQ".
 * @component
 */
const FAQPage: React.FC = () => {
  const faqJsonLdString = useMemo(() => {
    const schema = {
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
    return JSON.stringify(schema);
  }, []);

  const renderedFaqItems = useMemo(
    () => faqData.map((item) => <FaqItem key={item.question} item={item} />),
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
        <script type="application/ld+json">{faqJsonLdString}</script>
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

        <main className="max-w-3xl space-y-16">{renderedFaqItems}</main>
      </div>
    </>
  );
};

export default React.memo(FAQPage);
