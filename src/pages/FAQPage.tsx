import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

// Структура для одного Q&A блоку
interface FaqItemData {
  question: string;
  answer: React.ReactNode;
  plainTextAnswer: string; // Окреме поле для чистого тексту для JSON-LD
}

// --- ОНОВЛЕНИЙ КОНТЕНТ ---
const faqData: FaqItemData[] = [
  {
    question: "What is the primary difference between Svitlogics and other analysis tools?",
    answer: <p>Svitlogics is designed as an <strong>auxiliary instrument for critical thinking</strong>. Unlike tools that provide a binary "true" or "false" verdict, it does not deliver a final judgment. Instead, it provides a structured report across five criteria (Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone). This methodology is designed to provide data that empowers the user to form their own conclusions.</p>,
    plainTextAnswer: "Svitlogics is designed as an auxiliary instrument for critical thinking. Unlike tools that provide a binary \"true\" or \"false\" verdict, it provides a structured report across five criteria to empower the user to form their own conclusions."
  },
  {
    question: "What technology powers the analysis?",
    answer: <p>The analysis is powered by a <strong>secure server-side API gateway</strong> running on Netlify Functions. It utilizes a high-availability cascade of <strong>premium Google Gemini 2.5 models</strong> to ensure operational reliability. The core logic and API keys are stored securely on the server, never exposed to the user's browser.</p>,
    plainTextAnswer: "The analysis is powered by a secure server-side API gateway using a cascade of premium Google Gemini 2.5 models. Core logic and API keys are stored securely on the server."
  },
  {
    question: "Why does Svitlogics use a 'brutalist' design?",
    answer: <p>The 'Pure Minimalist-Brutalist' aesthetic is a functional decision that supports the tool's mission of clarity. The interface intentionally omits decorative elements such as shadows, gradients, or animations. This ensures the user's focus remains entirely on the input text and the structured analysis provided.</p>,
    plainTextAnswer: "The 'Pure Minimalist-Brutalist' design is a functional choice that supports the tool's mission of honesty. The UI is intentionally direct, with no decorative elements, ensuring the user's focus remains on the content and its analysis."
  },
  {
    question: "Is the AI analysis 100% accurate?",
    answer: <p>No. <strong>No AI analysis is 100% infallible.</strong> AI models can misinterpret context, miss nuance, or make errors. Svitlogics is a tool to aid, not replace, human critical thinking. The final interpretation and judgment rest with the user.</p>,
    plainTextAnswer: "No. No AI analysis is 100% infallible. Svitlogics is a tool to aid, not replace, human critical thinking. The final interpretation rests with the user."
  },
  {
    question: "What are the text input limits?",
    answer: <p>To ensure system stability and fair usage for all users, there is a character limit for each analysis. This limit is determined by the back-end service and is always displayed on the main page near the input field.</p>,
    plainTextAnswer: "To ensure system stability and fair usage, there is a character limit for each analysis. The current limit is displayed on the main page."
  },
  {
    question: "What languages does Svitlogics support?",
    answer: <p>Svitlogics is optimized for analyzing texts in <strong>English</strong> and <strong>Ukrainian</strong>. The system prompts that guide the AI are specifically calibrated for these two languages.</p>,
    plainTextAnswer: "Svitlogics is optimized for analyzing texts in English and Ukrainian, with system prompts calibrated for these languages."
  },
  {
    question: "Is my submitted text stored?",
    answer: <p>No. <strong>Svitlogics does not store the content you analyze.</strong> All processing is stateless. The text you submit is sent to our secure back-end, forwarded to the Google AI API for analysis, and then discarded. It is never written to a database.</p>,
    plainTextAnswer: "No. Svitlogics does not store the content you analyze. All processing is stateless and your text is never written to a database."
  },
  {
    question: "Who developed Svitlogics?",
    answer: <p>Svitlogics is a solo project developed by Eugene Kozlovsky from Kyiv, Ukraine.</p>,
    plainTextAnswer: "Svitlogics is a solo project developed by Eugene Kozlovsky from Kyiv, Ukraine."
  }
];

// Підкомпонент для одного Q&A блоку
const FaqItem: React.FC<{ item: FaqItemData }> = ({ item }) => (
  <section aria-labelledby={`faq-question-${item.question.replace(/\s+/g, '-')}`}>
    <h2 id={`faq-question-${item.question.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-4 normal-case">
      {item.question}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {item.answer}
    </div>
  </section>
);

const FAQPage: React.FC = () => {
  // const { t } = useTranslation();
  const pageTitle = "FREQUENTLY ASKED QUESTIONS";
  const introParagraph = "This section provides answers to common questions. If your question is not answered here, use the Contact page.";
  const seoDescription = "Find answers to common questions about Svitlogics. Learn about its AI accuracy, supported languages, data privacy, and the technology behind the text analysis.";
  
  // Генеруємо JSON-LD для FAQPage structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.plainTextAnswer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Svitlogics - Frequently Asked Questions</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/faq" />
        <meta property="og:title" content="FAQ | Svitlogics - Frequently Asked Questions" />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/faq" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
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
            {faqData.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;