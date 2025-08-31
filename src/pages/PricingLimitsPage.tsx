import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heading } from "../components/ui/Heading";

// --- ОНОВЛЕНО: Текст повністю переписано для ясності ---
const content = {
  seoTitle: "Disclaimer | Limitations of AI Analysis | Svitlogics",
  seoDescription:
    "Official disclaimer for the Svitlogics AI text analyzer. Understand the limitations, user responsibilities, and the 'as is' nature of the service.",
  pageTitle: "Disclaimer",
  lastUpdated: "August 22, 2025",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      paragraphs: [
        "This disclaimer explains the terms of use for the Svitlogics web application ('the Service'). By using the Service, you agree to this disclaimer in full. If you do not agree with any part of this document, you must stop using the Service.",
        "The purpose of this document is to give you a clear understanding of the capabilities and, more importantly, the **limitations** of the AI analysis provided by Svitlogics.",
      ],
    },
    {
      id: "no-professional-advice",
      title: "2. Not Professional Advice",
      paragraphs: [
        "The analysis provided by Svitlogics is **not a substitute for professional advice**. The Service provides automated text analysis and should not be considered legal, financial, or journalistic counsel.",
        "The final interpretation and any decisions you make based on the analysis are your own.",
      ],
    },
    {
      id: "accuracy-and-limitations",
      title: "3. Accuracy and AI Limitations",
      paragraphs: [
        "Svitlogics is a **tool for critical thinking, not a “truth machine” or a fact-checking service.** We make no warranties about the completeness, accuracy, or reliability of the analysis.",
        "You must understand the known limitations of artificial intelligence:",
      ],
      list: [
        "**No AI is perfect.** AI models can misinterpret context, miss nuance, or generate outputs with errors.",
        "**No “Truth” Verdict.** The Service cannot deliver a definitive “true” or “false” verdict on the text you submit.",
        "**Context is Key.** The AI analyzes only the text you provide. It does not know the author's intent or the broader context of the information.",
      ],
      footer:
        "Any reliance you place on the analysis is **strictly at your own risk.**",
    },
    {
      id: "limitation-of-liability",
      title: "4. Limitation of Liability",
      paragraphs: [
        "In no event will Svitlogics be liable for any damages that arise from your use of the Service. For full details, please see the 'Limitation of Liability' section in our",
      ],
      link: { to: "/terms-of-use/", text: "Terms of Use" },
    },
    {
      id: "contact",
      title: "5. Contact Us",
      paragraphs: [
        "If you have any questions about this disclaimer, please contact us via our",
      ],
      link: { to: "/contact/", text: "Contact page" },
    },
  ],
};

const DisclaimerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/disclaimer/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/disclaimer/" />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {content.pageTitle}
            </Heading>
            <p className="font-sans text-small text-neutral-700">
              Last Updated: {content.lastUpdated}
            </p>
          </header>
          <div className="space-y-12 font-serif text-body text-carbon-black">
            {content.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <Heading as="h2" id={section.id} className="mb-6">
                  {section.title}
                </Heading>
                <div className="space-y-4">
                  {section.paragraphs?.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.list.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p>
                      <strong>{section.footer}</strong>
                    </p>
                  )}
                  {section.link && (
                    <p>
                      <Link
                        to={section.link.to}
                        className="font-sans text-svitlogics-blue hover:underline"
                      >
                        {section.link.text}
                      </Link>
                      .
                    </p>
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

export default React.memo(DisclaimerPage);
