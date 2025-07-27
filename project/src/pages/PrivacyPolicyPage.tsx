import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Фінальний контент з урахуванням Google Analytics
const content = {
  seoTitle: "Privacy Policy | Svitlogics",
  seoDescription: "Understand how Svitlogics handles data. This policy details information usage, third-party services like Google Analytics, and our commitment to user privacy.",
  pageTitle: "PRIVACY POLICY",
  lastUpdated: "Last Updated: June 30, 2025",
  sections: [
    {
      title: "1. Overview",
      text: "This Privacy Policy outlines how Svitlogics (\"the Service\") handles information. The Service is designed with a privacy-first approach."
    },
    {
      title: "2. Data I Do Not Collect",
      text: "I do not require user accounts and do not collect any personally identifiable information (PII) such as your name, email address, or precise location. **The text you submit for analysis is not stored on Svitlogics' servers**; all processing is stateless."
    },
    {
      title: "3. Third-Party Data Processing",
      text: "To provide its functionality, the Service relies on third-party services:",
      list: [
        "<strong>Google AI Platform:</strong> Submitted text is sent to Google's servers for analysis. According to Google's API policies, this data may be used to improve their services. <strong>Do not submit sensitive or personal information.</strong>",
        "<strong>Google Analytics & Tag Manager:</strong> To understand how visitors interact with the Service and to improve it, I use Google Analytics. This service places cookies on your device to collect standard internet log information and visitor behavior data in an anonymous form.",
        "<strong>Netlify:</strong> The application is hosted on Netlify. Netlify may collect access logs, including IP addresses, for security and operational purposes."
      ]
    },
    {
      title: "4. Cookies and Analytics",
      text: "The anonymous data collected by Google Analytics includes information like page views, session duration, and general user location (e.g., country). This information is used exclusively to compile statistical reports on website activity. Google will not associate your IP address with any other data held by Google. You can learn more about how Google uses this data in <a href=\"https://policies.google.com/technologies/partner-sites\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-accent hover:underline\">Google's Privacy & Terms</a>.",
    },
    {
      title: "5. Data Rights",
      text: "Since Svitlogics does not store your personal data, requests for data access or deletion are not applicable to the Service itself. For information regarding data processed by Google, please refer to their respective privacy policies."
    },
    {
      title: "6. Policy Updates",
      text: "This Privacy Policy may be updated. Changes will be posted on this page, and the 'Last Updated' date will be revised."
    },
    {
      title: "7. Contact",
      text: "For questions about this policy, please use the <a href=\"/contact\" class=\"text-blue-accent hover:underline\">Contact page</a>."
    }
  ]
};

// Підкомпонент для однієї секції
const PolicySection: React.FC<{ section: any }> = ({ section }) => (
  <section aria-labelledby={`section-title-${section.title.replace(/\s+/g, '-')}`}>
    <h2 id={`section-title-${section.title.replace(/\s+/g, '-')}`} className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case">
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.text && <p dangerouslySetInnerHTML={{ __html: section.text }} />}
      {section.list && (
        <ul className="space-y-2 list-disc ml-6">
          {section.list.map((item: string) => (
            <li key={item.substring(0, 20)} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  </section>
);

const PrivacyPolicyPage: React.FC = () => {
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