import React from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

// --- Типізація та Константи (без змін) ---
interface SubSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
}
interface ContentSection {
  readonly id: string;
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly subSections?: readonly SubSection[];
}
const content = {
  seoTitle: "About Svitlogics | Mission, Methodology, and Technology",
  seoDescription:
    "An overview of the Svitlogics mission, methodology, and technology. An AI text analysis tool built in Kyiv, Ukraine to combat disinformation and empower critical thinking.",
  canonicalUrl: "https://svitlogics.com/about",
  pageTitle: "ABOUT SVITLOGICS",
  introduction:
    "Svitlogics was not built as an AI novelty. It was engineered for a singular purpose: to provide a tool for clarity in an environment saturated with informational chaos. This document outlines the project mission, methodology, and core technology.",
  sections: [
    {
      id: "mission",
      title: "Mission",
      paragraphs: [
        "My mission with Svitlogics is direct: to provide an accessible, transparent tool for identifying manipulative techniques. This project was developed as a solo endeavor from my home in Kyiv, Ukraine, driven by the daily reality of information warfare. The core principle is that understanding <em>how</em> a message is constructed to influence is a necessary skill for navigating the modern information environment.",
        "Svitlogics is designed to be an accessible instrument for journalists, researchers, students, or any individual seeking to analyze the structure of a text.",
      ],
    },
    {
      id: "methodology",
      title: "Methodology",
      subSections: [
        {
          id: "analysis-model",
          title: "Analysis model",
          paragraphs: [
            'Svitlogics is an <strong>auxiliary instrument for critical thinking</strong>, not a "truth machine." It does not deliver a simplistic "true" or "false" verdict, as effective manipulation often relies on a complex web of emotional appeals, logical fallacies, and carefully framed narratives rather than a single, verifiable lie.',
            "Instead of a verdict, the tool provides a structured analysis across five core criteria: Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone. This approach provides data that helps the user ask better questions and form their own, more informed conclusions.",
          ],
        },
        {
          id: "tech-implementation",
          title: "Technical implementation",
          paragraphs: [
            "Svitlogics is a modern, high-performance web application. The front-end is built with React, TypeScript, and Vite, and all pages are pre-rendered into static HTML during the build process (Static Site Generation), ensuring near-instantaneous load times.",
            "The core analysis logic resides in a <strong>secure, asynchronous back-end running on Netlify Functions.</strong> This service utilizes a high-availability cascade of <strong>Google Gemini 2.5 Pro models</strong>. This architecture ensures that all complex processing is handled securely on the server, guaranteeing both performance and privacy.",
            "<strong>Future Development:</strong> The next major milestone is the integration of <strong>real-time, AI-driven web search</strong> capabilities into the Disinformation analysis. This will allow the model to cross-reference claims against external sources for more robust, context-aware analysis.",
          ],
        },
      ],
    },
    {
      id: "design-philosophy",
      title: "Design philosophy",
      paragraphs: [
        "The design of Svitlogics is a functional decision that reflects its core mission. It embraces a <strong>'Pure Minimalist-Brutalist'</strong> aesthetic to build trust through directness.",
        "The user interface is intentionally clear. Every element, from the universal use of the <strong>IBM Plex Mono</strong> font to the stark black-and-white palette with a single functional blue accent, is chosen to support clarity and transparency. The user experience is designed to be as direct and honest as the analysis it presents.",
      ],
    },
    {
      id: "project-status",
      title: "Project status",
      paragraphs: [
        "Svitlogics is in public beta. The core functionality is operational, but the system is under active development. <strong>Bugs or performance limitations may be present</strong>. All analysis results should be considered preliminary.",
      ],
    },
  ],
} as const;

// --- ФУНКЦІЯ ОЧИЩЕННЯ HTML ---
/**
 * @description Безпечно рендерить HTML-рядок, попередньо очистивши його.
 * Перевіряє, чи виконується код у браузері, перед використанням DOMPurify.
 * @param {string} rawHtml - Необроблений HTML-рядок.
 * @returns {object} Об'єкт, сумісний з `dangerouslySetInnerHTML`.
 */
const createSanitizedHtml = (rawHtml: string) => {
  let sanitizedHtml = rawHtml;
  if (typeof window !== "undefined") {
    sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: ["strong", "em", "a"],
      ALLOWED_ATTR: ["href", "target", "rel"],
    });
  }
  // Застосовуємо системний стиль для <em>, використовуючи вагу шрифту, а не курсив
  const styledHtml = sanitizedHtml.replace(
    /<em>(.*?)<\/em>/g,
    '<em class="not-italic font-medium">$1</em>'
  );
  return { __html: styledHtml };
};

// --- ПІДКОМПОНЕНТИ ---
const InfoSection: React.FC<{ section: ContentSection }> = ({ section }) => (
  <section aria-labelledby={section.id}>
    <h2
      id={section.id}
      className="mb-6 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
    >
      {section.title}
    </h2>
    <div className="space-y-4 text-body-main text-black">
      {section.paragraphs?.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={createSanitizedHtml(p)} />
      ))}
      {section.subSections?.map((sub) => (
        <div key={sub.id} className="pt-4">
          <h3 className="mb-4 font-medium text-black text-h3-mobile lg:text-h3-desktop">
            {sub.title}
          </h3>
          <div className="space-y-4">
            {sub.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={createSanitizedHtml(p)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- ГОЛОВНИЙ КОМПОНЕНТ СТОРІНКИ ---
const AboutPage: React.FC = () => {
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
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-8 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.pageTitle}
          </h1>
          <p
            className="mb-16 max-w-3xl font-semibold text-black text-h3-desktop"
            dangerouslySetInnerHTML={createSanitizedHtml(content.introduction)}
          />
        </header>

        <div className="max-w-3xl">
          <div className="space-y-16">
            {content.sections.map((section) => (
              <InfoSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
