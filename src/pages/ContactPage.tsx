import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

// --- Типізація та Константи ---

/** @description Визначає структуру однієї контактної секції. */
interface ContactSectionData {
  readonly id: string;
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly contact?: {
    readonly email: string;
  };
  readonly list?: readonly string[];
  readonly footer?: string;
}

/**
 * @description Статичний контент для сторінки.
 * `as const` забезпечує глибоку незмінність даних.
 */
const content = {
  seoTitle: "CONTACT | SVITLOGICS",
  seoDescription:
    "Contact information for technical support, general inquiries, and professional collaboration related to the Svitlogics text analysis tool.",
  canonicalUrl: "https://svitlogics.com/contact",
  pageTitle: "CONTACT",
  sections: [
    {
      id: "general-inquiries",
      title: "General inquiries",
      paragraphs: [
        "For technical support, performance feedback, or general questions, contact:",
      ],
      contact: {
        email: "hello@svitlogics.com",
      },
      footer: "The developer reviews all correspondence directly.",
    },
    {
      id: "collaboration",
      title: "Research and professional use",
      paragraphs: [
        "Svitlogics supports collaboration with journalists, academic institutions, fact-checking organizations, and researchers for the following purposes:",
      ],
      list: [
        "Project partnerships and data analysis",
        "Integration or API access",
        "Custom feature development for professional use",
      ],
    },
  ],
} as const;

// --- Мемоїзовані Підкомпоненти ---

/**
 * @description Пропси для мемоїзованого підкомпонента `ContactSection`.
 */
interface ContactSectionProps {
  section: ContactSectionData;
}

/**
 * @description Мемоїзований компонент для відображення однієї контактної секції.
 * @component
 */
const ContactSection: React.FC<ContactSectionProps> = React.memo(
  ({ section }) => (
    <section
      aria-labelledby={section.id}
      className="border-1 border-black bg-white p-4"
    >
      <h2
        id={section.id}
        className="mb-4 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
      >
        {section.title}
      </h2>
      <div className="space-y-4 text-body-main text-black">
        {section.paragraphs?.map((p, index) => (
          <p key={index}>{p}</p>
        ))}

        {section.contact?.email && (
          <div className="pt-2">
            <a
              href={`mailto:${section.contact.email}`}
              className="inline-flex items-center gap-x-2 border-1 border-black bg-white px-4 py-2 font-medium uppercase text-black text-ui-label transition-colors duration-100 hover:bg-black hover:text-white"
            >
              <span>{section.contact.email}</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        )}

        {section.list && (
          <ul className="ml-6 list-disc space-y-2 pt-2">
            {section.list.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        )}

        {section.footer && <p className="pt-4">{section.footer}</p>}
      </div>
    </section>
  )
);
ContactSection.displayName = "ContactSection";

/**
 * @description
 * Статична сторінка "Контакти", що відображає контактну інформацію.
 *
 * @component
 */
const ContactPage: React.FC = () => {
  const renderedSections = useMemo(
    () =>
      content.sections.map((section) => (
        <ContactSection key={section.id} section={section} />
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
      </Helmet>

      <div className="container-main">
        <header>
          <h1 className="mb-16 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.pageTitle}
          </h1>
        </header>

        <main className="max-w-3xl space-y-8">{renderedSections}</main>
      </div>
    </>
  );
};

export default React.memo(ContactPage);
