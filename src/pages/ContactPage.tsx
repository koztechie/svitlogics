import React from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
// import { useTranslation } from 'react-i18next';

// Фінальний контент з покращеним формулюванням
const content = {
  seoTitle: "Contact | Svitlogics",
  seoDescription:
    "Contact Eugene Kozlovsky for general inquiries, technical support, or to discuss research and professional use of the Svitlogics AI text analysis tool.",
  pageTitle: "CONTACT",
  sections: [
    {
      id: "general-inquiries",
      title: "General inquiries",
      paragraphs: [
        "For questions, technical issues, or performance feedback, contact:",
      ],
      contact: {
        email: "hello@svitlogics.com",
      },
      footer: "All messages are reviewed directly by the developer.",
    },
    {
      id: "collaboration",
      title: "Research and professional use",
      paragraphs: [
        "Svitlogics is available for collaboration with journalists, academic institutions, fact-checking organizations, and researchers.",
        "Please use the contact email above for inquiries regarding:",
      ],
      list: [
        "Project partnerships and data analysis",
        "Integration possibilities or API access",
        "Custom feature requirements for professional use cases",
      ],
    },
  ],
};

// Підкомпонент для однієї секції
const ContactSection: React.FC<{ section: (typeof content.sections)[0] }> = ({
  section,
}) => (
  <section
    aria-labelledby={section.id}
    className="border border-black bg-white p-6 rounded-none"
  >
    <h2
      id={section.id}
      className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-4 normal-case"
    >
      {section.title}
    </h2>
    <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
      {section.paragraphs?.map((p, index) => (
        <p key={index}>{p}</p>
      ))}

      {section.contact && (
        <div className="py-2">
          <a
            href={`mailto:${section.contact.email}`}
            className="inline-flex items-center gap-x-3 bg-white text-black border border-black px-4 py-2 
                       font-mono font-medium text-ui-label uppercase rounded-none no-underline
                       hover:bg-black hover:text-white 
                       focus-visible:bg-black focus-visible:text-white
                       transition-colors duration-100"
          >
            <span>{section.contact.email}</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      )}

      {section.footer && <p>{section.footer}</p>}

      {/* Оскільки 'listTitle' було видалено з даних, видаляємо і його відображення тут */}
      {/* {section.listTitle && <p className="pt-2">{section.listTitle}</p>} <-- ВИДАЛЕНО ЦЕЙ РЯДОК */}

      {section.list && (
        <ul className="list-disc ml-6 space-y-2 pt-2">
          {section.list.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

const ContactPage: React.FC = () => {
  // const { t } = useTranslation();

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

      <div className="container-main pt-16 pb-16">
        <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-12 lg:mb-16 text-left">
          {content.pageTitle}
        </h1>

        <div className="max-w-3xl space-y-8">
          {content.sections.map((section) => (
            <ContactSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
