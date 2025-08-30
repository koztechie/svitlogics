/**
 * Svitlogics Privacy Policy Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   privacy information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   section organization, and information presentation are unambiguous.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays, Svitlogics Blue) and background (Paper White).
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
import { Link } from "react-router-dom";
import { Heading } from "../components/ui/Heading";

// Content is now pure text, stripped of all HTML for safe rendering.
// Headings are converted to Title Case to match the clinical tone.
const content = {
  seoTitle: "Privacy Policy | Svitlogics",
  seoDescription:
    "Review the Svitlogics Privacy Policy. This document details our data handling practices, use of third-party services, and our commitment to a privacy-first, stateless architecture.",
  pageTitle: "Privacy Policy",
  lastUpdated: "August 22, 2025",
};

/**
 * Renders the full Privacy Policy page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): Strictly uses 'Inter' for headings and 'Lora' for all
 *   body copy, creating the instrument/specimen distinction. Links are rendered in 'Inter'
 *   to signify their interactive nature.
 * - Section Echo (Spatial System): The entire content is constrained to `max-w-prose` (75ch)
 *   for optimal long-form readability. Spacing follows the 8px grid.
 * - Section Bravo (Clarity is a Moral Imperative): The content is structured with clear
 *   headings and no decorative elements. `dangerouslySetInnerHTML` is strictly avoided.
 */
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

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-4 text-left">
            {content.pageTitle}
          </Heading>
          <p className="mb-16 font-sans text-small text-neutral-700">
            Last Updated: {content.lastUpdated}
          </p>

          <div className="space-y-12 font-serif text-body text-carbon-black">
            {/* Section 1 */}
            <section aria-labelledby="introduction">
              <Heading as="h2" id="introduction" className="mb-6">
                1. Introduction and Core Principles
              </Heading>
              <div className="space-y-4">
                <p>
                  This Privacy Policy governs the manner in which Svitlogics
                  ("the Service," "we," "our," or "us") handles information.
                  This document is written to be as clear and direct as the
                  Service itself, adhering to our core principles of
                  transparency and respect for user privacy.
                </p>
                <p>
                  Our approach to privacy is foundational to the Service's
                  mission. We operate on a{" "}
                  <strong>privacy-first, data-minimization model</strong>. This
                  means we are engineered from the ground up to collect the
                  absolute minimum information necessary to function, and we do
                  not store any user-submitted content.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section aria-labelledby="no-collection">
              <Heading as="h2" id="no-collection" className="mb-6">
                2. Information We Do Not Collect or Store
              </Heading>
              <div className="space-y-4">
                <p>
                  To be unequivocally clear, Svitlogics is architected to avoid
                  the collection and storage of personally identifiable
                  information (PII). We believe that the most secure data is
                  data that is never collected. Specifically, we{" "}
                  <strong>DO NOT</strong>:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Require user accounts or registration.</li>
                  <li>
                    Collect personal details such as your name, email address,
                    or phone number.
                  </li>
                  <li>
                    Store the text you submit for analysis. All processing is{" "}
                    <strong>stateless</strong>. The content you provide is
                    transmitted securely, processed in memory, and then
                    immediately discarded.
                  </li>
                  <li>
                    Collect sensitive personal information. We explicitly
                    instruct users not to submit such information.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section aria-labelledby="info-processing">
              <Heading as="h2" id="info-processing" className="mb-6">
                3. Information We Process (and Why)
              </Heading>
              <div className="space-y-6">
                <p>
                  While we do not collect PII directly, the operation of a
                  modern web application requires the processing of some data by
                  us and our essential third-party service providers.
                </p>
                <div>
                  <Heading as="h3" className="mb-4">
                    3.1. User-Submitted Text for Analysis
                  </Heading>
                  <p>
                    This is the core data required for the Service to function.
                    When you submit text, it is sent via a secure (HTTPS)
                    connection to our serverless back-end, which forwards it to
                    a third-party AI provider for analysis. The response is sent
                    back to you, and the original text is discarded from our
                    system. Your text is the payload, not the product.
                  </p>
                </div>
                <div>
                  <Heading as="h3" className="mb-4">
                    3.2. Automatically Collected Data
                  </Heading>
                  <ul className="list-disc space-y-2 pl-6">
                    <li>
                      <strong>Log Data:</strong> Our hosting provider (Netlify)
                      collects server logs which may include your IP address,
                      browser type, and timestamps, essential for security
                      monitoring and diagnostics.
                    </li>
                    <li>
                      <strong>Analytics Data:</strong> Through Google Analytics,
                      we collect anonymized, aggregated information like session
                      duration and page views to understand how the Service is
                      used and improve it.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section aria-labelledby="third-party">
              <Heading as="h2" id="third-party" className="mb-6">
                4. Third-Party Service Providers
              </Heading>
              <div className="space-y-4">
                <p>
                  Svitlogics relies on a small number of carefully selected,
                  industry-leading third-party services to function. Their use
                  of your information is governed by their own privacy policies.
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Google AI Platform (Vertex AI)</strong>
                  </li>
                  <li>
                    <strong>Netlify</strong> (Hosting and Functions)
                  </li>
                  <li>
                    <strong>Google Analytics</strong> (Site Metrics)
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section aria-labelledby="cookies">
              <Heading as="h2" id="cookies" className="mb-6">
                5. Use of Cookies and Tracking Technologies
              </Heading>
              <div className="space-y-4">
                <p>
                  Svitlogics uses a minimal number of cookies, primarily for
                  analytics and managing your consent preferences. A cookie is a
                  small text file stored on your device. We use a{" "}
                  <strong>cookie consent banner</strong> to request your
                  permission before setting any non-essential cookies.
                </p>
                <p>
                  You can change your cookie preferences at any time by clicking
                  the "Manage Cookie Consent" link in the website footer.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section aria-labelledby="data-transfers">
              <Heading as="h2" id="data-transfers" className="mb-6">
                6. International Data Transfers
              </Heading>
              <p>
                As Svitlogics utilizes service providers based primarily in the
                United States, information processed by the Service may be
                transferred across international borders. We ensure that such
                transfers are lawful and secure, relying on Standard Contractual
                Clauses (SCCs) as provided by our partners to ensure data
                receives an adequate level of protection as required by GDPR.
              </p>
            </section>

            {/* Section 7 */}
            <section aria-labelledby="data-security">
              <Heading as="h2" id="data-security" className="mb-6">
                7. Data Security
              </Heading>
              <div className="space-y-4">
                <p>
                  We employ appropriate technical and organizational measures to
                  protect the information that is processed. These measures
                  include:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Encryption in Transit:</strong> All communication is
                    encrypted using TLS/HTTPS.
                  </li>
                  <li>
                    <strong>Serverless Architecture:</strong> Our back-end logic
                    runs in isolated, stateless serverless functions, reducing
                    the attack surface.
                  </li>
                  <li>
                    <strong>Secure Service Providers:</strong> We rely on the
                    robust security infrastructure of our industry-leading
                    providers.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section aria-labelledby="data-rights">
              <Heading as="h2" id="data-rights" className="mb-6">
                8. Your Data Rights
              </Heading>
              <div className="space-y-4">
                <p>
                  Under privacy laws such as GDPR, you have certain rights
                  regarding your personal information. As we do not store your
                  data, most traditional requests are not applicable. However,
                  you have the right to information (via this policy) and the
                  right to withdraw consent for analytics cookies at any time.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section aria-labelledby="childrens-privacy">
              <Heading as="h2" id="childrens-privacy" className="mb-6">
                9. Children's Privacy
              </Heading>
              <p>
                Svitlogics is not intended for or targeted at children under the
                age of 18. We do not knowingly collect any personal information
                from children.
              </p>
            </section>

            {/* Section 10 */}
            <section aria-labelledby="policy-updates">
              <Heading as="h2" id="policy-updates" className="mb-6">
                10. Policy Updates
              </Heading>
              <p>
                We may update this Privacy Policy from time to time. When we
                make changes, we will update the "Last Updated" date at the top
                of this policy. We encourage you to review this policy
                periodically.
              </p>
            </section>

            {/* Section 11 */}
            <section aria-labelledby="contact">
              <Heading as="h2" id="contact" className="mb-6">
                11. Contact Information
              </Heading>
              <p>
                For any questions or concerns related to this Privacy Policy,
                please contact us via email at{" "}
                <a
                  href="mailto:hello@svitlogics.com"
                  className="font-sans text-svitlogics-blue hover:underline"
                >
                  hello@svitlogics.com
                </a>{" "}
                or by visiting our{" "}
                <Link
                  to="/contact"
                  className="font-sans text-svitlogics-blue hover:underline"
                >
                  Contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PrivacyPolicyPage);
