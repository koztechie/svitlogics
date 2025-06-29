import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

// Фінальний контент
const content = {
  seoTitle: "Privacy Policy | Svitlogics",
  seoDescription: "Understand how Svitlogics handles data. This policy details information usage, third-party services, and our commitment to user privacy.",
  pageTitle: "PRIVACY POLICY",
  lastUpdated: "Last Updated: June 29, 2025",
  sections: [
    {
      title: "1. Overview",
      text: "This Privacy Policy outlines how Svitlogics (\"the Service\") handles information. The Service is designed to operate without collecting or storing your personally identifiable information."
    },
    {
      title: "2. Data not collected or stored",
      text: "The Service operates on a privacy-first basis. Svitlogics does not:",
      list: [
        "Require user accounts or logins.",
        "Collect any personally identifiable information (PII) such as your name, IP address, or precise location.",
        "<strong>Store the text you submit for analysis</strong> on its servers after the analysis is complete. All processing is stateless."
      ]
    },
    {
      title: "3. Third-party data processing",
      text: "The Service relies on third-party services for its core functionality:",
      list: [
        "<strong>Google AI Platform:</strong> Submitted text is sent to Google's servers for processing by its AI models (including the Gemini and Gemma families). According to Google's API policies, this data may be used to improve their services. <strong>Do not submit sensitive or personal information for analysis.</strong>",
        "<strong>Netlify Analytics:</strong> The Service uses Netlify's server-side analytics to gather anonymous, aggregate data about website traffic (e.g., page views, referrers). This method does not use client-side cookies or track individual user behavior."
      ]
    },
    {
      title: "4. Data rights",
      text: "Svitlogics does not collect or store your personal data. Consequently, requests for data access or deletion are not applicable. For information regarding data processed by Google, refer to Google's privacy policy."
    },
    {
      title: "5. Policy updates",
      text: "This Privacy Policy may be updated. Changes will be posted on this page, and the 'Last Updated' date at the top of this document will be revised."
    },
    {
      title: "6. Contact",
      text: "For questions about this policy, use the Contact page."
    }
  ]
};

// Підкомпонент для однієї секції
const PolicySection: React.FC<{ section: typeof content.sections[0] }> = ({ section }) => (
  <section aria-labelledby={`section-title-${section.title.replace(/\s+/g, '-')}`}>
    <h2 id={`section-title-${section.title.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case">
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.text && <p dangerouslySetInnerHTML={{ __html: section.text.replace(/Contact page/g, '<a href="/contact" class="text-blue-accent hover:underline focus-visible:underline">Contact page</a>') }} />}
      
      {section.list && (
        <ul className="space-y-2 list-disc ml-6">
          {section.list.map((item) => (
            <li key={item.substring(0, 20)} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  </section>
);

const PrivacyPolicyPage: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/privacy-policy" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/privacy-policy" />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4 text-left">
          {content.pageTitle}
        </h1>
        <p className="font-mono text-ui-label text-text-secondary mb-16">
          {content.lastUpdated}
        </p>
        
        <div className="max-w-3xl space-y-12">
          {content.sections.map((section) => (
            <PolicySection key={section.title} section={section} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;