import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";

interface ListItem {
  term?: string;
  definition: string;
}

// --- ОНОВЛЕНО: Текст переписано для кращої читабельності ---
const content = {
  seoTitle: "Access and Limits | Svitlogics",
  seoDescription:
    "Svitlogics is a free public beta service. This page details the current text input limits and the system architecture that ensures fair use and operational stability.",
  pageTitle: "Access and System Limits",
  sections: [
    {
      title: "Service Access: Free Public Beta",
      paragraphs: [
        "Svitlogics is currently in a public beta phase and is available free of charge. Access is provided without cost to gather performance data and test system functionality.",
      ],
    },
    {
      title: "Text Input Limits",
      paragraphs: [
        "The system enforces a character limit on each analysis to ensure stability and manage API costs. The maximum number of characters is determined by the token capacity of the underlying AI models and is always displayed on the main page.",
      ],
    },
    {
      title: "System Safeguards",
      paragraphs: [
        "The Svitlogics back-end includes several mechanisms to ensure stability and prevent abuse:",
      ],
      list: [
        {
          term: "Rate Limiting:",
          definition:
            "The system restricts the number of requests from a single IP address to 20 per hour to prevent automated abuse.",
        },
        {
          term: "Model Cascade:",
          definition:
            "The service uses a cascade of large language models. If a primary model is at capacity, requests are automatically rerouted to an available alternative.",
        },
      ],
    },
    {
      title: "Future Development",
      paragraphs: [
        "To ensure the long-term sustainability of the Svitlogics project, premium subscription plans may be introduced in the future.",
        "Potential premium features could include:",
      ],
      list: [
        { definition: "Increased analysis limits" },
        { definition: "Access to more advanced models" },
        { definition: "Accounts for teams and organizations" },
        { definition: "API access for research and integration" },
      ],
    },
  ],
};

const PricingLimitsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/pricing-limits/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta
          property="og:url"
          content="https://svitlogics.com/pricing-limits/"
        />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-12 text-left">
            {content.pageTitle}
          </Heading>

          <div className="space-y-12">
            {content.sections.map((section) => (
              <section
                key={section.title}
                aria-labelledby={`section-title-${section.title
                  .slice(0, 10)
                  .replace(/\s+/g, "-")}`}
              >
                <Heading
                  as="h2"
                  id={`section-title-${section.title
                    .slice(0, 10)
                    .replace(/\s+/g, "-")}`}
                  className="mb-6"
                >
                  {section.title}
                </Heading>
                <div className="space-y-4 font-serif text-body text-carbon-black">
                  {section.paragraphs?.map((p, pIndex) => (
                    <p key={pIndex}>{p}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-6">
                      {(section.list as ListItem[]).map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.term && <strong>{item.term}</strong>}{" "}
                          {item.definition}
                        </li>
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

export default React.memo(PricingLimitsPage);
