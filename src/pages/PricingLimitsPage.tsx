import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

// Фінальний контент з виправленою технічною деталлю
const content = {
  seoTitle: "Pricing and Limits | Svitlogics",
  seoDescription: "Svitlogics is currently a free service. Learn about character limits and the system architecture designed to manage Google AI API usage.",
  pageTitle: "PRICING AND LIMITS",
  sections: [
    {
      title: "Current status: free (public beta)",
      paragraphs: [
        "Svitlogics is currently in public beta and is free to use. The service is provided without cost during this development phase to test system functionality and gather performance data."
      ]
    },
    {
      title: "Input character limits",
      paragraphs: [
        "To ensure system stability and manage costs, Svitlogics enforces a character limit for each analysis. This limit is determined by the token capacity of the underlying AI models.",
        "The current maximum character limit for the selected language is always displayed on the main page below the text input field."
      ]
    },
    {
      title: "API usage and system limits",
      paragraphs: [
        "Svitlogics utilizes the free usage tier provided by Google for its AI models. This tier has global rate limits (requests per minute) that are shared among all users of the application.",
        // --- ЗМІНЕНО ТУТ ---
        "The application's client-side architecture manages these limits by automatically rerouting requests through a cascade of models. During periods of high traffic, this may result in a brief processing delay."
      ]
    },
    {
      title: "Future plans",
      paragraphs: [
        "To ensure the long-term sustainability of the project, premium subscription plans are being considered for the future."
      ],
      listTitle: "Potential premium features may include:",
      list: [
        "Higher personal analysis limits",
        "Access to more advanced AI models",
        "Team accounts for organizations",
        "API access for research and development"
      ]
    }
  ]
};

// Підкомпонент для однієї секції
const InfoSection: React.FC<{ section: (typeof content.sections)[0] }> = ({ section }) => (
  <section aria-labelledby={`section-title-${section.title.replace(/\s+/g, '-')}`}>
    <h2 id={`section-title-${section.title.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case">
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.paragraphs?.map((p, pIndex) => (
        <p key={pIndex}>{p}</p>
      ))}
      {section.listTitle && <p className="pt-2">{section.listTitle}</p>}
      {section.list && (
        <ul className="list-disc ml-6 space-y-2">
          {section.list.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

const PricingLimitsPage: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/pricing-limits" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/pricing-limits" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-12 lg:mb-16 text-left">
          {content.pageTitle}
        </h1>
        
        <div className="max-w-3xl">
          <div className="space-y-12">
            {content.sections.map((section) => (
              <InfoSection key={section.title} section={section} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingLimitsPage;