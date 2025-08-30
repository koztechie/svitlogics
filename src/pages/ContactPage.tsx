/**
 * Svitlogics Contact Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This page presents
 *   information in a sober, structured manner, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable information resource.
 * - Section Bravo (Clarity is a Moral Imperative): The content structure,
 *   contact information, and purpose are unambiguous and purpose-driven.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays, Svitlogics Blue) and background (Paper White).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system and constrains content to `max-w-prose` for optimal readability.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for headings and UI elements,
 *   and 'Lora' (`font-serif`) for body copy, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely informational
 *   container with no decorative attributes or shadows. Uses Card component properly.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";
import { Card } from "../components/ui/Card";

const content = {
  seoTitle: "Contact | Svitlogics",
  seoDescription:
    "Contact information for general inquiries, technical support, and research or professional use of the Svitlogics text analysis tool.",
  pageTitle: "Contact Information",
  sections: [
    {
      id: "general-inquiries",
      title: "General Inquiries",
      paragraphs: [
        "For all questions, technical issues, or performance feedback, please direct communications to the following address:",
      ],
      contact: {
        email: "hello@svitlogics.com", // Standardized for system-wide consistency.
      },
      footer: "All messages are reviewed directly by the developer.",
    },
    {
      id: "collaboration",
      title: "Research and Professional Use",
      paragraphs: [
        "Svitlogics is available for collaboration with journalists, academic institutions, fact-checking organizations, and researchers.",
        "Please use the contact address for inquiries regarding:",
      ],
      list: [
        "Project partnerships and data analysis.",
        "Integration possibilities or potential API access.",
        "Custom feature requirements for professional use cases.",
      ],
    },
  ],
};

const ContactSection: React.FC<{ section: (typeof content.sections)[0] }> = ({
  section,
}) => (
  <section aria-labelledby={section.id}>
    <Card className="p-6">
      <Heading as="h2" id={section.id} className="mb-4">
        {section.title}
      </Heading>
      <div className="space-y-4">
        {section.paragraphs?.map((p, index) => (
          <p key={index} className="font-serif text-body text-carbon-black">
            {p}
          </p>
        ))}

        {section.contact && (
          <div className="py-2">
            <a
              href={`mailto:${section.contact.email}`}
              className="font-sans text-body text-svitlogics-blue hover:underline"
            >
              {section.contact.email}
            </a>
          </div>
        )}

        {section.list && (
          <ul className="list-disc space-y-2 pl-6">
            {section.list.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="font-serif text-body text-carbon-black"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {section.footer && (
          <p className="mt-4 font-sans text-small text-neutral-700">
            {section.footer}
          </p>
        )}
      </div>
    </Card>
  </section>
);

/**
 * Renders the contact information page.
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Clarity is a Moral Imperative): Ensures a single, consistent
 *   contact point across the application. Avoids all decorative elements.
 * - Section Delta (Typography): Strictly uses 'Inter' for headings/UI and 'Lora'
 *   for body copy to maintain the instrument/specimen distinction.
 * - Section Echo (Spatial System): Content is constrained to `max-w-prose` (75ch)
 *   for optimal readability, with all spacing adhering to the 8px grid.
 */
const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/contact" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/contact" />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          <Heading as="h1" className="mb-12 text-left">
            {content.pageTitle}
          </Heading>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <ContactSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ContactPage);
