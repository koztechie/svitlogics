import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Heading } from "../components/ui/Heading";

const content = {
  seoTitle: "Cookie Policy | Analytics and Consent | Svitlogics",
  seoDescription:
    "Review the Cookie Policy for Svitlogics. Understand how we use minimal cookies for analytics and how to manage your consent.",
  pageTitle: "Cookie Policy",
  lastUpdated: "August 22, 2025",
};

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        {/* --- ВИПРАВЛЕННЯ ТУТ: Додано кінцевий слеш --- */}
        <link rel="canonical" href="https://svitlogics.com/cookie-policy/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta
          property="og:url"
          content="https://svitlogics.com/cookie-policy/"
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
            <section aria-labelledby="introduction">
              <Heading as="h2" id="introduction" className="mb-6">
                1. Introduction
              </Heading>
              <div className="space-y-4">
                <p>
                  This Cookie Policy explains how Svitlogics ("the Service,"
                  "we," "us," or "our") uses cookies and similar tracking
                  technologies on our website, svitlogics.com. This policy is
                  designed to be read in conjunction with our main{" "}
                  <Link
                    to="/privacy-policy/" // Додано слеш
                    className="font-sans text-svitlogics-blue hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p>
                  Our use of cookies is minimal and aligns with our core
                  principles of privacy and data minimization. We do not use
                  cookies for advertising, marketing, or user profiling. Our
                  sole use of non-essential cookies is for anonymized website
                  analytics, which helps us understand how the Service is used
                  and how to improve it. By using our cookie consent banner, you
                  have full control over the use of these non-essential cookies.
                </p>
              </div>
            </section>

            <section aria-labelledby="what-are-cookies">
              <Heading as="h2" id="what-are-cookies" className="mb-6">
                2. What Are Cookies?
              </Heading>
              <div className="space-y-4">
                <p>
                  A cookie is a small text file that a website stores on your
                  computer or mobile device when you visit the site. It enables
                  the website to remember your actions and preferences (such as
                  consent choices) over a period of time, so you do not have to
                  keep re-entering them whenever you come back to the site or
                  browse from one page to another.
                </p>
                <p>Cookies can be classified in several ways:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>First-party vs. Third-party:</strong> First-party
                    cookies are set by the website you are visiting (in this
                    case, Svitlogics). Third-party cookies are set by a domain
                    other than the one you are visiting, such as Google
                    Analytics.
                  </li>
                  <li>
                    <strong>Session vs. Persistent:</strong> Session cookies are
                    temporary and are deleted as soon as you close your browser.
                    Persistent cookies remain on your device for a set period or
                    until you manually delete them.
                  </li>
                </ul>
              </div>
            </section>

            <section aria-labelledby="how-we-use-cookies">
              <Heading as="h2" id="how-we-use-cookies" className="mb-6">
                3. How We Use Cookies
              </Heading>
              <div className="space-y-4">
                <p>
                  Svitlogics uses a limited number of cookies for two specific
                  purposes: remembering your consent choices and collecting
                  aggregated, anonymous analytics data.
                </p>

                <div className="pt-2">
                  <Heading as="h3" className="mb-4">
                    3.1. Essential Cookies (Strictly Necessary)
                  </Heading>
                  <p>
                    These cookies are essential for the website to function
                    correctly and cannot be disabled in our systems. They do not
                    store any personally identifiable information.
                  </p>
                  <ul className="list-disc space-y-2 pl-6 mt-4">
                    <li>
                      <strong>Consent Cookie:</strong> We use a first-party
                      persistent cookie to store your consent preferences. This
                      cookie remembers whether you have accepted or rejected our
                      use of analytics cookies, so we do not have to ask you on
                      every visit. This cookie is considered strictly necessary.
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Heading as="h3" className="mb-4">
                    3.2. Analytics Cookies (Non-Essential)
                  </Heading>
                  <p>
                    These cookies are optional and will{" "}
                    <strong>
                      only be activated if you provide your explicit consent
                    </strong>{" "}
                    by clicking "Accept" on our cookie banner. They are provided
                    by our third-party analytics service, Google Analytics.
                  </p>
                  <ul className="list-disc space-y-2 pl-6 mt-4">
                    <li>
                      <strong>Google Analytics Cookies:</strong> These cookies
                      are used to collect information about how visitors use our
                      Service. We use this information to compile reports and to
                      help us improve the site. The cookies collect information
                      in an anonymous form, including the number of visitors to
                      the website, where visitors have come to the website from,
                      and the pages they visited. This data is aggregated and
                      does not allow us to identify individual users.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="contact">
              <Heading as="h2" id="contact" className="mb-6">
                8. Contact Us
              </Heading>
              <p>
                If you have questions about this Cookie Policy, you may contact
                us by email at{" "}
                <a
                  href="mailto:hello@svitlogics.com"
                  className="font-sans text-svitlogics-blue hover:underline"
                >
                  hello@svitlogics.com
                </a>{" "}
                or by visiting our{" "}
                <Link
                  to="/contact/" // Додано слеш
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

export default React.memo(CookiePolicyPage);
