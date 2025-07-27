import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

// Фінальний контент
const content = {
  seoTitle: "About Svitlogics | Mission, Methodology, and Design",
  seoDescription: "Discover the philosophy behind Svitlogics. Learn how this AI text analysis tool was built to combat disinformation and empower critical thinking.",
  pageTitle: "ABOUT SVITLOGICS",
  introduction: "Svitlogics was not built as an AI novelty. It was engineered for a singular purpose: to provide a tool for clarity in an environment saturated with informational chaos. This document outlines its mission, methodology, and design philosophy.",
  sections: [
    {
      id: "mission",
      title: "Mission",
      paragraphs: [
        "My mission with Svitlogics is straightforward: to provide an accessible, transparent tool for identifying manipulative techniques. This project was developed as a solo endeavor from my home in Kyiv, Ukraine, driven by the daily reality of information warfare. The core principle is that understanding <em>how</em> a message is constructed to influence is a necessary skill for navigating the modern information environment.",
        "Svitlogics is designed to be an accessible instrument for journalists, researchers, students, or any individual seeking to analyze the structure of a text."
      ]
    },
    {
      id: "methodology",
      title: "Methodology",
      subSections: [
        {
          id: "analysis-model",
          title: "Analysis model",
          paragraphs: [
            "Svitlogics is designed as an <strong>auxiliary instrument for critical thinking</strong>, not a \"truth machine.\" It does not deliver a simple \"true\" or \"false\" verdict, as effective manipulation often relies on a complex web of emotional appeals, logical fallacies, and carefully framed narratives rather than a single, verifiable lie.",
            "Instead of a verdict, the tool provides a structured analysis across five core criteria: Manipulative Content, Propagandistic Content, Disinformation, Unbiased Presentation, and Emotional Tone. This approach provides data to help the user ask better questions and form their own, more informed conclusions."
          ]
        },
        {
          id: "tech-implementation",
          title: "Technical implementation",
          paragraphs: [
            "Svitlogics is a modern front-end application built with React, TypeScript, and Vite for a fast and type-safe user experience. The 'Pure Minimalist-Brutalist' design is implemented with a precisely configured Tailwind CSS system.",
            "To ensure high availability, the core logic resides on the client-side. The application utilizes a <strong>client-side high-availability cascade of seven Google AI models</strong>, including the Gemini and Gemma families. If a primary model is at capacity, the system intelligently and automatically falls back to an alternative. This complex logic ensures the tool remains operational and reliable. The project was developed within Bolt.new, a platform for managing multi-service applications."
          ]
        }
      ]
    },
    {
      id: "design-philosophy",
      title: "Design philosophy",
      paragraphs: [
        "The design of Svitlogics is a functional decision that reflects its core mission. It embraces a <strong>'Pure Minimalist-Brutalist'</strong> aesthetic to build trust through directness.",
        "The user interface is unapologetically clear. Every element, from the universal use of the <strong>IBM Plex Mono</strong> font to the stark black-and-white palette with a single functional blue accent, is chosen to support clarity and transparency. The user experience is designed to be as direct and honest as the analysis it presents."
      ]
    },
    {
      id: "project-status",
      title: "Project status",
      paragraphs: [
        "Svitlogics is in public beta. The core functionality is operational, but the system is under active development. <strong>Bugs or performance limitations may be present</strong>. All analysis results should be considered preliminary."
      ]
    }
  ]
};

// Підкомпонент для однієї секції, тепер може рендерити під-секції
const InfoSection: React.FC<{ section: typeof content.sections[0] }> = ({ section }) => (
  <section aria-labelledby={section.id}>
    <h2 id={section.id} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case">
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.paragraphs?.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/<em>(.*?)<\/em>/g, '<em class="font-mono not-italic font-medium">$1</em>') }} />
      ))}
      {section.subSections?.map(sub => (
        <div key={sub.id} className="mt-4">
          <h3 className="font-mono font-medium text-h3-desktop normal-case text-black mb-4">{sub.title}</h3>
          <div className="space-y-4">
            {sub.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AboutPage: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/about" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/about" />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="container-main pt-16 pb-16"> 
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-8 text-left">
          {content.pageTitle}
        </h1>
        
        <div className="max-w-3xl">
          <p className="font-mono font-semibold text-h3-desktop text-black mb-16">
            {content.introduction}
          </p>

          <div className="space-y-12">
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