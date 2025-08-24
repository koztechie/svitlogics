import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

// --- Типізація та Константи ---

/**
 * @description Визначає структуру підсекції всередині основної секції Політики.
 */
interface PolicySubSectionData {
  readonly subTitle: string;
  readonly text?: string;
  readonly listHeader?: string;
  readonly list?: readonly string[];
  readonly finalParagraph?: string;
}

/**
 * @description Визначає структуру основної секції контенту Політики.
 */
interface PolicySectionData {
  readonly id: string;
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly list?: readonly string[];
  readonly subSections?: readonly PolicySubSectionData[];
  readonly finalParagraph?: string;
}

/**
 * @description Об'єкт конфігурації для сторінки Політики Конфіденційності.
 */
const content: {
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly canonicalUrl: string;
  readonly pageTitle: string;
  readonly lastUpdated: string;
  readonly sections: readonly PolicySectionData[];
} = {
  seoTitle: "Privacy Policy | Svitlogics",
  seoDescription:
    "Review the comprehensive Svitlogics Privacy Policy. This document details our data handling practices, use of third-party services like Google AI and Netlify, and our commitment to a privacy-first, stateless architecture.",
  canonicalUrl: "https://svitlogics.com/privacy-policy",
  pageTitle: "PRIVACY POLICY",
  lastUpdated: "August 22, 2025",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction and Core Principles",
      paragraphs: [
        'This Privacy Policy governs the manner in which Svitlogics ("the Service," "we," "our," or "us") handles information. Svitlogics is an independent project developed by Eugene Kozlovsky. This document is written to be as clear and direct as the Service itself, adhering to our core principles of transparency and respect for user privacy.',
        "Our approach to privacy is foundational to the Service's mission. We operate on a <strong>privacy-first, data-minimization model</strong>. This means we are engineered from the ground up to collect the absolute minimum information necessary to function, and we do not store any user-submitted content. This policy will detail the specific types of data that are processed, why they are processed, and by whom.",
        "By accessing or using Svitlogics, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, you are not permitted to use the Service.",
      ],
    },
    {
      id: "no-collection",
      title: "2. Information We Do Not Collect or Store",
      paragraphs: [
        "To be unequivocally clear, Svitlogics is architected to avoid the collection and storage of personally identifiable information (PII). We believe that the most secure data is data that is never collected.",
        "Specifically, we <strong>DO NOT</strong>:",
      ],
      list: [
        "Require user accounts or registration.",
        "Collect personal details such as your name, email address, physical address, or phone number.",
        "Store the text you submit for analysis. All processing is <strong>stateless</strong>. The content you provide is transmitted securely to our back-end, processed in memory, sent to the relevant AI API, and then immediately discarded. It is never written to a database or any form of persistent storage controlled by Svitlogics.",
        "Collect sensitive personal information such as health data, financial details, or biometric information. We explicitly instruct users not to submit such information, as detailed in our Terms of Use.",
      ],
    },
    {
      id: "information-processed",
      title: "3. Information Processed (and Why)",
      paragraphs: [
        "While PII is not collected directly, the operation of a modern web application requires the processing of some data. This data is handled by the Service and its essential third-party service providers. The legal basis for this processing under GDPR is primarily <strong>Legitimate Interest</strong> (to operate and secure the service) and <strong>Performance of a Contract</strong> (to provide the analysis you request).",
      ],
      subSections: [
        {
          subTitle: "3.1. Submitted text for analysis",
          text: "This is the core data required for the Service to function. When a user submits text for analysis, it is sent from the user's browser via a secure (HTTPS) connection to a serverless back-end function hosted on Netlify. The function then forwards this text to a third-party AI provider for analysis. The response is sent back to the user, and the original text is discarded from our system. <strong>Your text is the payload, not the product.</strong>",
        },
        {
          subTitle: "3.2. Automatically collected data (Derivative Data)",
          text: "When you visit Svitlogics, our third-party service providers may automatically collect certain information necessary for security, performance, and basic analytics. This includes:",
          list: [
            "<strong>Log Data:</strong> Like most websites, our hosting provider (Netlify) collects server logs. These logs may include your IP address, browser type, operating system, the referring web page, pages visited, and timestamps. This data is essential for security monitoring, diagnosing technical problems, and preventing abuse.",
            "<strong>Analytics Data:</strong> Through Google Analytics, we collect anonymized information about user interaction. This includes metrics like session duration, page views, and approximate geographical location (country/city level). This data is aggregated and cannot be used to identify an individual user. Its sole purpose is to help us understand how the Service is used so we can improve it.",
          ],
        },
      ],
    },
    {
      id: "third-parties",
      title: "4. Third-Party Service Providers",
      paragraphs: [
        "Svitlogics is an independent project and relies on a small number of carefully selected, industry-leading third-party services to function. We do not control these services, and their use of your information is governed by their own privacy policies. We have chosen these providers based on their commitment to security and privacy.",
        "Our key third-party providers are:",
      ],
      list: [
        "<strong>Google AI Platform (Vertex AI):</strong> This is the core engine of our analysis. The text you submit is sent from our secure back-end to Google's AI models (e.g., Gemini) for processing. We do not send any other user data (like your IP address) along with this text. Google's use of this data is governed by their <a href='https://cloud.google.com/terms/data-processing-addendum' target='_blank' rel='noopener noreferrer'>Data Processing Addendum</a>. As a user, you must adhere to our instruction not to submit sensitive personal information.",
        "<strong>Netlify:</strong> Our website and serverless back-end functions are hosted on Netlify. Netlify acts as a data processor, handling the infrastructure that delivers the Service to you. Their data processing practices are detailed in their <a href='https://www.netlify.com/privacy/' target='_blank' rel='noopener noreferrer'>Privacy Policy</a> and <a href='https://www.netlify.com/dpa/' target='_blank' rel='noopener noreferrer'>DPA</a>.",
        "<strong>Google Analytics:</strong> We use this service to gather anonymized statistics about website traffic. We have configured Google Analytics to respect user consent choices via Google Consent Mode v2. All data sent to Google Analytics is processed according to their <a href='https://policies.google.com/technologies/partner-sites' target='_blank' rel='noopener noreferrer'>Privacy & Terms</a>.",
        "<strong>Cloudflare:</strong> We use Cloudflare Turnstile for bot protection. This service may process certain technical data to distinguish between human users and automated scripts, as described in their <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>.",
      ],
    },
    {
      id: "cookies",
      title: "5. Use of Cookies and Tracking Technologies",
      paragraphs: [
        "Svitlogics uses a minimal number of cookies, primarily for the purpose of analytics and managing your consent preferences.",
        'A "cookie" is a small text file that is stored on your device when you visit a website. We use a <strong>cookie consent banner</strong> to request your permission before setting any non-essential cookies, in compliance with GDPR and other privacy regulations.',
      ],
      subSections: [
        {
          subTitle: "5.1. Essential Cookies (Strictly Necessary)",
          text: "These cookies are essential for the website to function correctly and cannot be disabled. They do not store any personally identifiable information.",
          list: [
            "<strong>Consent Cookie:</strong> We use a first-party persistent cookie to store your consent preferences. This cookie remembers whether you have accepted or rejected our use of analytics cookies, so we do not have to ask you on every visit. This cookie is considered strictly necessary.",
          ],
        },
        {
          subTitle: "5.2. Analytics Cookies (Non-Essential)",
          text: 'These cookies are optional and will <strong>only be activated if you provide your explicit consent</strong> by clicking "Accept" on our cookie banner. They are provided by our third-party analytics service, Google Analytics.',
          list: [
            "<strong>Google Analytics Cookies (e.g., `_ga`, `_gid`):</strong> These cookies are used to collect information about how visitors use our Service. We use this information to compile reports and to help us improve the site. The cookies collect information in an anonymous form, including the number of visitors to the website, where visitors have come to the website from, and the pages they visited. This data is aggregated and does not allow us to identify individual users.",
          ],
        },
      ],
      finalParagraph:
        'You can change your cookie preferences at any time. For full details, please see our <a href="/cookie-policy">Cookie Policy</a>.',
    },
    {
      id: "international-transfers",
      title: "6. International Data Transfers",
      paragraphs: [
        "As Svitlogics is developed in Ukraine and utilizes service providers based primarily in the United States, information processed by the Service may be transferred across international borders. When you, as a user from the European Economic Area (EEA), UK, or Switzerland, use our Service, your data (such as IP address and analytics data) is transferred to servers located in the US.",
        "We ensure that such transfers are lawful and secure. For all transfers of data from the EEA, UK, or Switzerland to countries without an adequacy decision (like the US), we rely on <strong>Standard Contractual Clauses (SCCs)</strong>. Our service providers (Google, Netlify, Cloudflare) incorporate SCCs into their Data Processing Agreements, which provides a legal framework to ensure that your data receives an adequate level of protection as required by GDPR.",
      ],
    },
    {
      id: "data-security",
      title: "7. Data Security",
      paragraphs: [
        "We take the security of your data seriously. While we minimize the data we handle, we employ appropriate technical and organizational measures to protect the information that is processed. These measures include:",
      ],
      list: [
        "<strong>Encryption in Transit:</strong> All communication between your browser and our servers, and between our servers and third-party APIs, is encrypted using Transport Layer Security (TLS/HTTPS).",
        "<strong>Serverless Architecture:</strong> Our back-end logic runs in isolated, stateless functions. This architecture reduces the attack surface compared to traditional servers.",
        "<strong>Secure Service Providers:</strong> We rely on the robust security infrastructure of our providers (Netlify, Google, Cloudflare), who are leaders in the industry and maintain high standards of security compliance.",
      ],
    },
    {
      id: "data-rights",
      title: "8. Your Data Rights",
      paragraphs: [
        "Under privacy laws such as GDPR and CCPA, you have certain rights regarding your personal information. Svitlogics is committed to upholding these rights.",
        "As we do not maintain user accounts or store personal information, most traditional data rights requests are not applicable in the same way. However, you still have the following rights:",
      ],
      list: [
        "<strong>Right to Information:</strong> You have the right to be informed about how your data is processed. This Privacy Policy serves to fulfill that right.",
        "<strong>Right of Access:</strong> You can request information about what limited data (primarily related to analytics) might be associated with your browsing session. We will provide instructions on how to access this data through Google Analytics' own tools.",
        "<strong>Right to Erasure (Right to be Forgotten):</strong> As we do not store your data, there is no personal data held by Svitlogics to erase. Any data held by Google Analytics is anonymized and subject to its own retention policies.",
        "<strong>Right to Object/Withdraw Consent:</strong> You have the absolute right to reject the use of analytics cookies via our consent banner. If you have previously given consent, you can withdraw it at any time by changing your settings via the link in our footer.",
      ],
      finalParagraph:
        'To exercise any of these rights or ask questions, please contact us at <a href="mailto:hello@svitlogics.com">hello@svitlogics.com</a>.',
    },
    {
      id: "childrens-privacy",
      title: "9. Children's Privacy",
      paragraphs: [
        "Svitlogics is not intended for or targeted at children under the age of 18. We do not knowingly collect any personal information from children. If you believe that we may have inadvertently collected such information, please contact us so we can take appropriate steps.",
      ],
    },
    {
      id: "policy-updates",
      title: "10. Policy Updates",
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed.',
      ],
    },
    {
      id: "contact-info",
      title: "11. Contact Information",
      paragraphs: [
        "For any questions, concerns, or requests related to this Privacy Policy, please do not hesitate to contact us. All inquiries are reviewed directly by the developer.",
        'You can reach us via email at: <a href="mailto:hello@svitlogics.com">hello@svitlogics.com</a> or by visiting our <a href="/contact">Contact page</a>.',
      ],
    },
  ],
};

/**
 * @description Безпечно рендерить HTML-рядок, попередньо очистивши його.
 * @param {string} rawHtml - Необроблений HTML-рядок.
 * @returns {{ __html: string }} Об'єкт, сумісний з `dangerouslySetInnerHTML`.
 */
const createSanitizedHtml = (rawHtml: string): { __html: string } => {
  if (typeof window !== "undefined") {
    const styledHtml = rawHtml.replace(
      /<em>(.*?)<\/em>/g,
      '<em class="not-italic font-medium">$1</em>'
    );
    return {
      __html: DOMPurify.sanitize(styledHtml, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ["strong", "em", "a"],
        ALLOWED_ATTR: ["href", "target", "rel"],
      }),
    };
  }
  return { __html: rawHtml };
};

/** @description Пропси для підкомпонента `PolicySubSection`. */
interface PolicySubSectionProps {
  subSection: PolicySubSectionData;
}

const PolicySubSection: React.FC<PolicySubSectionProps> = React.memo(
  ({ subSection }) => (
    <div className="pt-4">
      <h3 className="mb-4 font-medium text-black text-h3-mobile lg:text-h3-desktop">
        {subSection.subTitle}
      </h3>
      {subSection.text && (
        <p
          className="mb-4"
          dangerouslySetInnerHTML={createSanitizedHtml(subSection.text)}
        />
      )}
      {subSection.listHeader && <p className="mb-4">{subSection.listHeader}</p>}
      {subSection.list && (
        <ul className="ml-6 list-disc space-y-2">
          {subSection.list.map((item: string) => (
            <li
              key={item.substring(0, 20)}
              dangerouslySetInnerHTML={createSanitizedHtml(item)}
            />
          ))}
        </ul>
      )}
      {subSection.finalParagraph && (
        <p
          className="mt-4"
          dangerouslySetInnerHTML={createSanitizedHtml(
            subSection.finalParagraph
          )}
        />
      )}
    </div>
  )
);
PolicySubSection.displayName = "PolicySubSection";

/** @description Пропси для підкомпонента `PolicySection`. */
interface PolicySectionProps {
  section: PolicySectionData;
}

const PolicySection: React.FC<PolicySectionProps> = React.memo(
  ({ section }) => (
    <section aria-labelledby={`section-title-${section.id}`}>
      <h2
        id={`section-title-${section.id}`}
        className="mb-6 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      >
        {section.title}
      </h2>
      <div className="space-y-4 text-body-main text-black">
        {section.paragraphs?.map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={createSanitizedHtml(p)} />
        ))}
        {section.list && (
          <ul className="ml-6 list-disc space-y-2 pt-2">
            {section.list.map((item: string) => (
              <li
                key={item.substring(0, 20)}
                dangerouslySetInnerHTML={createSanitizedHtml(item)}
              />
            ))}
          </ul>
        )}
        {section.subSections &&
          section.subSections.map((sub: PolicySubSectionData) => (
            <PolicySubSection key={sub.subTitle} subSection={sub} />
          ))}
        {section.finalParagraph && (
          <p
            className="pt-2"
            dangerouslySetInnerHTML={createSanitizedHtml(
              section.finalParagraph
            )}
          />
        )}
      </div>
    </section>
  )
);
PolicySection.displayName = "PolicySection";

/**
 * @description Статична сторінка "Privacy Policy".
 * @component
 */
const PrivacyPolicyPage: React.FC = () => {
  const renderedSections = useMemo(
    () =>
      content.sections.map((section) => (
        <PolicySection key={section.id} section={section} />
      )),
    []
  );

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
          <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.pageTitle}
          </h1>
          <p className="mb-16 uppercase text-text-secondary text-ui-label">
            Last Updated: {content.lastUpdated}
          </p>
        </header>

        <main className="max-w-3xl space-y-16">{renderedSections}</main>
      </div>
    </>
  );
};

export default React.memo(PrivacyPolicyPage);
