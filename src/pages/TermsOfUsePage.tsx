/**
 * Svitlogics Terms of Use Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   legal information in a sober, structured manner, stripped of all non-essential
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
const content = {
  seoTitle: "Terms of Use | Service Agreement | Svitlogics",
  seoDescription:
    "Read the official Terms of Use for the Svitlogics service. This document governs your access to and use of the text analysis tool.",
  pageTitle: "Terms of Use",
  lastUpdated: "August 22, 2025",
};

/**
 * Renders the Terms of Use page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Delta (Typography): Strictly uses 'Inter' for headings and 'Lora' for all
 *   body copy, creating the instrument/specimen distinction.
 * - Section Echo (Spatial System): The entire content is constrained to `max-w-prose` (75ch)
 *   for optimal long-form readability. Spacing follows the 8px grid.
 * - Section Bravo (Clarity is a Moral Imperative): `dangerouslySetInnerHTML` is strictly avoided.
 */
const TermsOfUsePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/terms-of-use/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta
          property="og:url"
          content="https://svitlogics.com/terms-of-use/"
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
            <section aria-labelledby="agreement">
              <Heading as="h2" id="agreement" className="mb-6">
                1. Agreement to Terms
              </Heading>
              <div className="space-y-4">
                <p>
                  These Terms of Use constitute a legally binding agreement made
                  between you ("you") and Svitlogics ("we," "us," or "our"),
                  concerning your access to and use of the Svitlogics website
                  and services (collectively, "the Service").
                </p>
                <p>
                  By accessing the Service, you agree that you have read,
                  understood, and agree to be bound by all of these Terms of
                  Use.{" "}
                  <strong>
                    If you do not agree with all of these Terms of Use, you are
                    expressly prohibited from using the Service and must
                    discontinue use immediately.
                  </strong>
                </p>
              </div>
            </section>

            <section aria-labelledby="ip-rights">
              <Heading as="h2" id="ip-rights" className="mb-6">
                3. Intellectual Property Rights
              </Heading>
              <div className="space-y-4">
                <p>
                  Unless otherwise indicated, the Service is our proprietary
                  property. All source code, databases, functionality, software,
                  and text on the Service (collectively, the “Content”) and the
                  trademarks and logos contained therein (the “Marks”) are owned
                  or controlled by us or licensed to us, and are protected by
                  copyright and trademark laws.
                </p>
                <p>
                  The Content and the Marks are provided on the Service “AS IS”
                  for your information and personal, non-commercial use only.
                  Except as expressly provided, no part of the Service and no
                  Content or Marks may be copied, reproduced, or otherwise
                  exploited for any commercial purpose without our express prior
                  written permission.
                </p>
              </div>
            </section>

            <section aria-labelledby="prohibited">
              <Heading as="h2" id="prohibited" className="mb-6">
                5. Prohibited Activities
              </Heading>
              <div className="space-y-4">
                <p>
                  You may not access or use the Service for any purpose other
                  than that for which we make it available. As a user, you agree
                  not to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Systematically retrieve data from the Service to create or
                    compile a collection, database, or directory without written
                    permission from us.
                  </li>
                  <li>
                    Circumvent, disable, or otherwise interfere with
                    security-related features of the Service.
                  </li>
                  <li>
                    Engage in any automated use of the system, such as using
                    scripts, data mining, robots, or similar data gathering and
                    extraction tools.
                  </li>
                  <li>
                    Interfere with, disrupt, or create an undue burden on the
                    Service or its networks.
                  </li>
                  <li>
                    Attempt to decipher, decompile, disassemble, or reverse
                    engineer any of the software comprising the Service.
                  </li>
                  <li>
                    Submit text that is unlawful, defamatory, obscene, or that
                    contains hate speech or sensitive personal information.
                  </li>
                </ul>
              </div>
            </section>

            <section aria-labelledby="termination">
              <Heading as="h2" id="termination" className="mb-6">
                8. Term and Termination
              </Heading>
              <p>
                These Terms of Use shall remain in full force and effect while
                you use the Service. We reserve the right to, in our sole
                discretion and without notice or liability, deny access to and
                use of the Service to any person for any reason.
              </p>
            </section>

            <section aria-labelledby="liability">
              <Heading as="h2" id="liability" className="mb-6">
                13. Limitation of Liability
              </Heading>
              <p>
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section aria-labelledby="contact">
              <Heading as="h2" id="contact" className="mb-6">
                16. Contact
              </Heading>
              <p>
                For questions about these Terms, please contact us via our{" "}
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

export default TermsOfUsePage;
