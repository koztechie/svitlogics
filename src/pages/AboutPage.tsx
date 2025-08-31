import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

// --- ОНОВЛЕНО: Текст повністю переписано для ясності та читабельності ---
const content = {
  seoTitle: "About Svitlogics | Mission, Philosophy, and Methodology",
  seoDescription:
    "Discover the ethos behind Svitlogics. Learn how this AI text analysis tool was engineered in Kyiv, Ukraine, to counter informational chaos.",
  pageTitle: "About Svitlogics",
  introduction:
    "Svitlogics is not an AI novelty. It is an instrument for disciplined thought, built for an environment saturated with informational chaos. This page outlines the mission, methods, and philosophy that guide every part of the project.",
  sections: [
    {
      id: "mission",
      title: "Mission",
      paragraphs: [
        "Our mission is to provide a clear, accessible tool to identify manipulative techniques in text. This project was developed as a solo effort in Kyiv, Ukraine, driven by the daily reality of information warfare. The core principle is simple: understanding *how* a message is built to influence is the first step to resisting it.",
        "Svitlogics is designed as a cognitive tool for journalists, researchers, students, and any individual who wants to analyze the structure and intent of a text.",
      ],
    },
    {
      id: "methodology",
      title: "Methodology",
      subSections: [
        {
          id: "analysis-model",
          title: "Analysis Model",
          paragraphs: [
            "Svitlogics is a tool for inquiry, not a 'truth machine.' It never gives a simple verdict. Effective manipulation often uses a mix of emotional appeals, logical fallacies, and framed narratives, not just single lies.",
            "Instead of a verdict, the tool provides a structured analysis of rhetorical and linguistic patterns. This approach gives you data to ask better questions and form your own informed conclusions.",
          ],
        },
        {
          id: "tech-implementation",
          title: "Technical Implementation",
          paragraphs: [
            "Svitlogics is a high-performance web application built with React, TypeScript, and Vite. All pages are pre-rendered into static HTML for fast load times.",
            "The core analysis logic runs on a secure, asynchronous back-end service that uses a cascade of large language models. This ensures all complex processing is handled securely on the server, guaranteeing both performance and privacy.",
          ],
        },
      ],
    },
    {
      id: "design-philosophy",
      title: "Design Philosophy",
      paragraphs: [
        "The design of Svitlogics is an ethical choice. It is a direct counter-argument to the noisy and manipulative digital spaces it analyzes. The interface is a manifestation of its purpose: a sober, structured, and quiet space for focused thought.",
        "Its aesthetic is that of a high-consequence laboratory. We use 'Inter' for UI controls and 'Lora' for analyzed text to create a clear mental separation. The color palette is desaturated and clinical. Every element is built for precision and objectivity, allowing the user's intellect to be the primary focus.",
      ],
    },
    {
      id: "project-status",
      title: "Project Status",
      paragraphs: [
        "Svitlogics is in public beta. The core functions are operational, but the system is under active development. You may encounter performance limits or bugs. All analysis results should be considered preliminary and require user verification.",
      ],
    },
  ],
};

const InfoSection: React.FC<{ section: (typeof content.sections)[0] }> = ({
  section,
}) => (
  <section aria-labelledby={section.id}>
    <Heading as="h2" id={section.id} className="mb-6">
      {section.title}
    </Heading>
    <div className="space-y-4 font-serif text-body text-carbon-black">
      {section.paragraphs?.map((p, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{
            __html: p.replace(/\*(.*?)\*/g, "<em>$1</em>"),
          }}
        />
      ))}
      {section.subSections?.map((sub) => (
        <div key={sub.id} className="pt-2">
          <Heading as="h3" className="mb-4">
            {sub.title}
          </Heading>
          <div className="space-y-4">
            {sub.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/about/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/about/" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {content.pageTitle}
            </Heading>
            <p className="font-serif text-h4 text-carbon-black">
              {content.introduction}
            </p>
          </header>
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

export default React.memo(AboutPage);
