import React from "react";
import { Helmet } from "react-helmet-async";
import { Heading } from "../components/ui/Heading";
import { Card } from "../components/ui/Card";

// --- ОНОВЛЕНО: Додано вступний параграф ---
const content = {
  seoTitle: "Contact | Inquiries and Collaboration | Svitlogics",
  seoDescription:
    "Contact the developer of Svitlogics for technical support, general inquiries, or research and professional collaboration opportunities.",
  pageTitle: "Contact Information",
  introParagraph:
    "This page provides the official contact channels for the Svitlogics project. All inquiries are received and processed directly by the developer to ensure clear and direct communication.",
  sections: [
    {
      id: "general-inquiries",
      title: "General Inquiries",
      paragraphs: [
        "For all questions, technical issues, or performance feedback, please direct communications to the following address:",
      ],
      contact: {
        email: "hello@svitlogics.com",
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

const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/contact/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/contact/" />
      </Helmet>

      <div className="container-main py-16">
        <div className="mx-auto max-w-prose">
          {/* --- ОНОВЛЕНО: Додано рендеринг вступного параграфу --- */}
          <header className="mb-12 text-left">
            <Heading as="h1" className="mb-4">
              {content.pageTitle}
            </Heading>
            <p className="font-serif text-h4 text-carbon-black">
              {content.introParagraph}
            </p>
          </header>

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
