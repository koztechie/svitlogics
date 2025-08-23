import React from "react";
import { Helmet } from "react-helmet-async";

// --- НОВИЙ, РОЗШИРЕНИЙ КОНТЕНТ ПОЛІТИКИ ---
const content = {
  seoTitle: "Privacy Policy | Svitlogics",
  seoDescription:
    "Review the comprehensive Svitlogics Privacy Policy. This document details our data handling practices, use of third-party services like Google AI and Netlify, and our commitment to a privacy-first, stateless architecture.",
  pageTitle: "PRIVACY POLICY",
  lastUpdated: "August 22, 2025",
  sections: [
    {
      title: "1. Introduction and Core Principles",
      paragraphs: [
        'This Privacy Policy governs the manner in which Svitlogics ("the Service," "we," "our," or "us") handles information. Svitlogics is an independent project developed by Eugene Kozlovsky. This document is written to be as clear and direct as the Service itself, adhering to our core principles of transparency and respect for user privacy.',
        "Our approach to privacy is foundational to the Service's mission. We operate on a **privacy-first, data-minimization model**. This means we are engineered from the ground up to collect the absolute minimum information necessary to function, and we do not store any user-submitted content. This policy will detail the specific types of data that are processed, why they are processed, and by whom.",
        "By accessing or using Svitlogics, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, you are not permitted to use the Service.",
      ],
    },
    {
      title: "2. Information We Do Not Collect or Store",
      paragraphs: [
        "To be unequivocally clear, Svitlogics is architected to avoid the collection and storage of personally identifiable information (PII). We believe that the most secure data is data that is never collected.",
        "Specifically, we **DO NOT**:",
      ],
      list: [
        "Require user accounts or registration.",
        "Collect personal details such as your name, email address, physical address, or phone number.",
        "Store the text you submit for analysis. All processing is **stateless**. The content you provide is transmitted securely to our back-end, processed in memory, sent to the relevant AI API, and then immediately discarded. It is never written to a database or any form of persistent storage controlled by Svitlogics.",
        "Collect sensitive personal information such as health data, financial details, or biometric information. We explicitly instruct users not to submit such information, as detailed in our Terms of Use.",
      ],
    },
    {
      title: "3. Information We Process (and Why)",
      paragraphs: [
        "While we do not collect PII directly, the operation of a modern web application requires the processing of some data. This data is handled by us and our essential third-party service providers. The legal basis for this processing under GDPR is primarily **Legitimate Interest** (to operate and secure the service) and **Performance of a Contract** (to provide the analysis you request).",
      ],
      subSections: [
        {
          subTitle: "3.1. User-Submitted Text for Analysis",
          text: "This is the core data required for the Service to function. When you submit text for analysis, it is processed as follows: it is sent from your browser via a secure (HTTPS) connection to our serverless back-end function hosted on Netlify. Our function then forwards this text to a third-party AI provider for analysis. The response is sent back to you, and the original text is discarded from our system. **Your text is the payload, not the product.**",
        },
        {
          subTitle: "3.2. Automatically Collected Data (Derivative Data)",
          text: "When you visit Svitlogics, our third-party service providers may automatically collect certain information necessary for security, performance, and basic analytics. This includes:",
          list: [
            "**Log Data:** Like most websites, our hosting provider (Netlify) collects server logs. These logs may include your IP address, browser type, operating system, the referring web page, pages visited, and timestamps. This data is essential for security monitoring, diagnosing technical problems, and preventing abuse.",
            "**Analytics Data:** Through Google Analytics, we collect anonymized information about user interaction. This includes metrics like session duration, page views, and approximate geographical location (country/city level). This data is aggregated and cannot be used to identify an individual user. Its sole purpose is to help us understand how the Service is used so we can improve it.",
          ],
        },
      ],
    },
    {
      title: "4. Third-Party Service Providers",
      paragraphs: [
        "Svitlogics is an independent project and relies on a small number of carefully selected, industry-leading third-party services to function. We do not control these services, and their use of your information is governed by their own privacy policies. We have chosen these providers based on their commitment to security and privacy.",
        "Our key third-party providers are:",
      ],
      list: [
        "<strong>Google AI Platform (Vertex AI):</strong> This is the core engine of our analysis. The text you submit is sent from our secure back-end to Google's AI models (e.g., Gemini) for processing. We do not send any other user data (like your IP address) along with this text. Google's use of this data is governed by their <a href='https://cloud.google.com/terms/data-processing-addendum' target='_blank' rel='noopener noreferrer' class='text-blue-accent hover:underline'>Data Processing Addendum</a>. As a user, you must adhere to our instruction not to submit sensitive personal information.",
        "<strong>Netlify:</strong> Our website and serverless back-end functions are hosted on Netlify. Netlify acts as a data processor, handling the infrastructure that delivers the Service to you. Their data processing practices are detailed in their <a href='https://www.netlify.com/privacy/' target='_blank' rel='noopener noreferrer' class='text-blue-accent hover:underline'>Privacy Policy</a> and <a href='https://www.netlify.com/dpa/' target='_blank' rel='noopener noreferrer' class='text-blue-accent hover:underline'>DPA</a>.",
        "<strong>Google Analytics:</strong> We use this service to gather anonymized statistics about website traffic. We have configured Google Analytics to respect user consent choices via Google Consent Mode v2. All data sent to Google Analytics is processed according to their <a href='https://policies.google.com/technologies/partner-sites' target='_blank' rel='noopener noreferrer' class='text-blue-accent hover:underline'>Privacy & Terms</a>.",
        "<strong>Cloudflare:</strong> We use Cloudflare Turnstile for bot protection. This service may process certain technical data to distinguish between human users and automated scripts, as described in their <a href='https://www.cloudflare.com/privacypolicy/' target='_blank' rel='noopener noreferrer' class='text-blue-accent hover:underline'>Privacy Policy</a>.",
      ],
    },
    {
      title: "5. Use of Cookies and Tracking Technologies",
      paragraphs: [
        "Svitlogics uses a minimal number of cookies, primarily for the purpose of analytics and managing your consent preferences.",
        'A "cookie" is a small text file that is stored on your device when you visit a website. We use a **cookie consent banner** to request your permission before setting any non-essential cookies, in compliance with GDPR and other privacy regulations.',
      ],
      list: [
        "<strong>Essential Cookies:</strong> We use a single, first-party cookie to store your consent preferences. This cookie is necessary for the website to remember your choice and is therefore not subject to prior consent.",
        '<strong>Analytics Cookies (Non-Essential):</strong> If you provide consent, Google Analytics will place cookies on your device (e.g., `_ga`, `_gid`) to collect anonymous data about your session. These cookies help us understand user behavior but are not required for the Service to function. **These cookies will not be set unless you explicitly click "Accept" on our cookie consent banner.**',
      ],
      finalParagraph:
        'You can change your cookie preferences at any time by clicking the "Cookie Preferences" link in the website footer.',
    },
    {
      title: "6. International Data Transfers",
      paragraphs: [
        "As Svitlogics is developed in Ukraine and utilizes service providers based primarily in the United States, information processed by the Service may be transferred across international borders. When you, as a user from the European Economic Area (EEA), UK, or Switzerland, use our Service, your data (such as IP address and analytics data) is transferred to servers located in the US.",
        "We ensure that such transfers are lawful and secure. For all transfers of data from the EEA, UK, or Switzerland to countries without an adequacy decision (like the US), we rely on **Standard Contractual Clauses (SCCs)**. Our service providers (Google, Netlify, Cloudflare) incorporate SCCs into their Data Processing Agreements, which provides a legal framework to ensure that your data receives an adequate level of protection as required by GDPR.",
      ],
    },
    {
      title: "7. Data Security",
      paragraphs: [
        "We take the security of your data seriously. While we minimize the data we handle, we employ appropriate technical and organizational measures to protect the information that is processed. These measures include:",
      ],
      list: [
        "<strong>Encryption in Transit:</strong> All communication between your browser and our servers, and between our servers and third-party APIs, is encrypted using Transport Layer Security (TLS/HTTPS).",
        "<strong>Serverless Architecture:</strong> Our back-end logic runs in isolated, stateless serverless functions. This architecture reduces the attack surface compared to traditional servers.",
        "<strong>Secure Service Providers:</strong> We rely on the robust security infrastructure of our providers (Netlify, Google, Cloudflare), who are leaders in the industry and maintain high standards of security compliance.",
      ],
    },
    {
      title: "8. Your Data Rights",
      paragraphs: [
        "Under privacy laws such as GDPR and CCPA, you have certain rights regarding your personal information. Svitlogics is committed to upholding these rights.",
        "As we do not maintain user accounts or store personal information, most traditional data rights requests are not applicable in the same way. However, you still have the following rights:",
      ],
      list: [
        "<strong>Right to Information:</strong> You have the right to be informed about how your data is processed. This Privacy Policy serves to fulfill that right.",
        "<strong>Right of Access:</strong> You can request information about what limited data (primarily related to analytics) might be associated with your browsing session. We will provide instructions on how to access this data through Google Analytics' own tools.",
        "<strong>Right to Erasure (Right to be Forgotten):</strong> As we do not store your data, there is no personal data held by Svitlogics to erase. Any data held by Google Analytics is anonymized and subject to its own retention policies.",
        '<strong>Right to Object/Withdraw Consent:</strong> You have the absolute right to reject the use of analytics cookies via our consent banner. If you have previously given consent, you can withdraw it at any time by accessing the "Cookie Preferences" in the footer and changing your settings.',
      ],
      finalParagraph:
        'To exercise any of these rights or ask questions, please contact us at <a href="mailto:hello@svitlogics.com" class="text-blue-accent hover:underline">hello@svitlogics.com</a>.',
    },
    {
      title: "9. Children's Privacy",
      paragraphs: [
        "Svitlogics is not intended for or targeted at children under the age of 18. We do not knowingly collect any personal information from children. If you believe that we may have inadvertently collected such information, please contact us so we can take appropriate steps.",
      ],
    },
    {
      title: "10. Policy Updates",
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed.',
      ],
    },
    {
      title: "11. Contact Information",
      paragraphs: [
        "For any questions, concerns, or requests related to this Privacy Policy, please do not hesitate to contact us. All inquiries are reviewed directly by the developer.",
        'You can reach us via email at: <a href="mailto:hello@svitlogics.com" class="text-blue-accent hover:underline">hello@svitlogics.com</a> or by visiting our <a href="/contact" class="text-blue-accent hover:underline">Contact page</a>.',
      ],
    },
  ],
};

const PolicySubSection: React.FC<{ subSection: any }> = ({ subSection }) => (
  <div className="mt-6">
    <h3 className="font-mono font-medium text-h3-desktop text-black mb-4 normal-case">
      {subSection.subTitle}
    </h3>
    {subSection.text && (
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: subSection.text }}
      />
    )}
    {subSection.list && (
      <ul className="space-y-2 list-disc ml-6">
        {subSection.list.map((item: string) => (
          <li
            key={item.substring(0, 20)}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
    )}
  </div>
);

const PolicySection: React.FC<{ section: any }> = ({ section }) => (
  <section
    aria-labelledby={`section-title-${section.title.replace(/\s+/g, "-")}`}
  >
    <h2
      id={`section-title-${section.title.replace(/\s+/g, "-")}`}
      className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case"
    >
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.paragraphs &&
        section.paragraphs.map((p: string, i: number) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      {section.list && (
        <ul className="space-y-2 list-disc ml-6 mt-4">
          {section.list.map((item: string) => (
            <li
              key={item.substring(0, 20)}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      )}
      {section.subSections &&
        section.subSections.map((sub: any) => (
          <PolicySubSection key={sub.subTitle} subSection={sub} />
        ))}
      {section.finalParagraph && (
        <p
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: section.finalParagraph }}
        />
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
        <meta
          property="og:url"
          content="https://svitlogics.com/privacy-policy"
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4 text-left">
          {content.pageTitle}
        </h1>
        <p className="font-mono text-ui-label text-text-secondary mb-16">
          Last Updated: {content.lastUpdated}
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
