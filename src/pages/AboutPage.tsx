/**
 * Svitlogics About Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   section organization, and information presentation are unambiguous.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black) and background (Paper White).
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

const content = {
  seoTitle: "About Svitlogics | Mission, Philosophy, and Methodology",
  seoDescription:
    "Discover the ethos behind Svitlogics. Learn how this AI text analysis tool was engineered in Kyiv, Ukraine, as a bulwark against informational chaos.",
  pageTitle: "About Svitlogics",
  introduction:
    "Svitlogics was not built as an AI novelty. It was engineered as an instrument for disciplined thought in an environment saturated with informational chaos. This document outlines its mission, methodology, and the philosophy that dictates its every function and design element.",
  sections: [
    {
      id: "mission",
      title: "Mission",
      paragraphs: [
        "The mission is to provide an accessible, transparent tool for identifying manipulative techniques in text. This project was developed as a solo endeavor from Kyiv, Ukraine, driven by the daily reality of systemic information warfare. The core principle is that understanding *how* a message is constructed to influence is a necessary skill for navigating the modern information environment.",
        "Svitlogics is designed as an auxiliary cognitive instrument for journalists, researchers, students, or any individual seeking to analyze the structure and intent of a text.",
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
            "Svitlogics is an instrument for inquiry, not a 'truth machine.' It never delivers a simplistic verdict. Effective manipulation often relies on a complex web of emotional appeals, logical fallacies, and framed narratives rather than a single, verifiable lie.",
            "Instead of a verdict, the tool provides a structured analysis of identified rhetorical and linguistic patterns. This approach provides data that helps the user ask better questions and form their own, more informed conclusions, deferring always to their final judgment.",
          ],
        },
        {
          id: "tech-implementation",
          title: "Technical Implementation",
          paragraphs: [
            "Svitlogics is a high-performance web application built with React, TypeScript, and Vite, with all pages pre-rendered into static HTML for near-instantaneous load times.",
            "The core analysis logic resides in a secure, asynchronous back-end service utilizing a cascade of premium large language models. This architecture ensures all complex processing is handled securely on the server, guaranteeing both performance and privacy.",
            "The next major development milestone is to integrate real-time, AI-driven web search capabilities directly into the analysis. This will allow the model to cross-reference claims against external sources, transforming Svitlogics into a next-generation instrument for robust, context-aware analysis.",
          ],
        },
      ],
    },
    {
      id: "design-philosophy",
      title: "Design Philosophy",
      paragraphs: [
        "The design of Svitlogics is not a stylistic choice; it is an ethical imperative. It is a direct counter-argument to the noisy, frantic, and manipulative digital spaces it is designed to analyze. The interface is a manifestation of its purpose: a sober, structured, and silent sanctuary for focused thought.",
        "Its aesthetic is that of a high-consequence laboratory. The 'Inter' typeface is used for all UI controls for maximum legibility, while 'Lora' is used for analyzed text to create a clear cognitive separation. The color palette is intentionally desaturated and clinical. Every element is calibrated for precision and objectivity, receding into the background to allow the user's intellect to become the primary focus.",
      ],
    },
    {
      id: "project-status",
      title: "Project Status",
      paragraphs: [
        "Svitlogics is in public beta. The core functionality is operational, but the system is under active development. Performance limitations or bugs may be present. All analysis results should be considered preliminary and subject to user verification.",
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
        <p key={i}>{p}</p>
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
          <Heading as="h1" className="mb-8 text-left">
            {content.pageTitle}
          </Heading>

          <p className="mb-16 font-serif text-h4 text-carbon-black">
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
