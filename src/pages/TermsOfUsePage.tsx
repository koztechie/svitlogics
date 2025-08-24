import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

// --- Типізація та Константи ---

/** @description Визначає структуру підсекції. */
interface TermsSubSectionData {
  readonly subTitle: string;
  readonly text: string;
}

/** @description Визначає структуру основної секції. */
interface TermsSectionData {
  readonly id: string;
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly list?: readonly string[];
  readonly subSections?: readonly TermsSubSectionData[];
}

/**
 * @description Статичний контент сторінки. `as const` забезпечує глибоку незмінність.
 */
const content: {
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly canonicalUrl: string;
  readonly pageTitle: string;
  readonly lastUpdated: string;
  readonly sections: readonly TermsSectionData[];
} = {
  seoTitle: "Terms of Use | Svitlogics",
  seoDescription:
    "Review the official Terms of Use for the Svitlogics web application. This document governs user access, responsibilities, intellectual property rights, and limitations of liability.",
  canonicalUrl: "https://svitlogics.com/terms-of-use",
  pageTitle: "TERMS OF USE",
  lastUpdated: "August 22, 2025",
  sections: [
    {
      id: "agreement-to-terms",
      title: "1. Agreement to Terms",
      paragraphs: [
        'These Terms of Use constitute a legally binding agreement made between the user, whether personally or on behalf of an entity ("the user") and Svitlogics by Eugene Kozlovsky ("the Service," "us," or "our"), concerning user access to and use of the Svitlogics website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, "the Service").',
        "The user agrees that by accessing the Service, they have read, understood, and agree to be bound by all of these Terms of Use. <strong>If the user does not agree with all of these Terms of Use, then they are expressly prohibited from using the Service and must discontinue use immediately.</strong>",
        'Supplemental terms and conditions or documents that may be posted on the Service from time to time are hereby expressly incorporated herein by reference. The Service reserves the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. Users will be alerted about any changes by updating the "Last Updated" date of these Terms of Use, and the user waives any right to receive specific notice of each such change. It is the user\'s responsibility to periodically review these Terms of Use to stay informed of updates. Continued use of the Service by the user after the date such revised Terms of Use are posted will be deemed to be an acceptance of such changes.',
      ],
    },
    {
      id: "service-description",
      title: "2. Description of Service",
      paragraphs: [
        "Svitlogics is an AI-powered tool that provides automated analysis of textual content for propaganda, bias, and manipulation. The Service is intended as an <strong>auxiliary instrument to aid critical thinking</strong> and is not a substitute for professional, legal, financial, or medical advice, nor is it a substitute for independent fact-checking.",
        "The Service is currently offered in a public beta stage. This means that functionality may change, and the service may contain errors or inaccuracies. The Service reserves the right to modify, suspend, or discontinue its operations at any time without notice.",
      ],
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      paragraphs: [
        "Unless otherwise indicated, the Service is the proprietary property of Svitlogics. All source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Service (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of Ukraine, the United States, foreign jurisdictions, and international conventions.",
        "The Content and the Marks are provided on the Service “AS IS” for information and personal, non-commercial use only. Except as expressly provided in these Terms of Use, no part of the Service and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.",
        "Provided that the user is eligible to use the Service, they are granted a limited license to access and use the Service. All rights not expressly granted to the user in and to the Service, the Content, and the Marks are reserved.",
      ],
    },
    {
      id: "user-representations",
      title: "4. User Representations and Conduct",
      paragraphs: [
        "By using the Service, the user represents and warrants that:",
      ],
      list: [
        "The user is not a minor in the jurisdiction in which they reside; they are at least 18 years of age.",
        "The user has the legal capacity and agrees to comply with these Terms of Use.",
        "The user will not access the Service through automated or non-human means, whether through a bot, script, or otherwise, except as may be the result of standard search engine or browser usage.",
        "The user will not use the Service for any illegal or unauthorized purpose.",
        "Use of the Service will not violate any applicable law or regulation.",
      ],
    },
    {
      id: "prohibited-activities",
      title: "5. Prohibited Activities",
      paragraphs: [
        "The Service may not be accessed or used for any purpose other than that for which it is made available. The Service may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.",
        "As a user of the Service, you agree not to:",
      ],
      list: [
        "Systematically retrieve data or other content from the Service to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
        "Make any unauthorized use of the Service, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.",
        "Circumvent, disable, or otherwise interfere with security-related features of the Service, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Service and/or the Content contained therein.",
        "Engage in unauthorized framing of or linking to the Service.",
        "Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.",
        "Make improper use of our support services or submit false reports of abuse or misconduct.",
        "Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.",
        "Interfere with, disrupt, or create an undue burden on the Service or the networks or services connected to the Service.",
        "Attempt to impersonate another user or person.",
        "Use any information obtained from the Service in order to harass, abuse, or harm another person.",
        "Use the Service as part of any effort to compete with us or otherwise use the Service and/or the Content for any revenue-generating endeavor or commercial enterprise.",
        "Decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Service.",
        "Attempt to bypass any measures of the Service designed to prevent or restrict access to the Service, or any portion of the Service.",
        "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Service to you.",
        "Delete the copyright or other proprietary rights notice from any Content.",
        "Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Service or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Service.",
        "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Service.",
        "Use the Service in a manner inconsistent with any applicable laws or regulations.",
        "Submit text that is unlawful, defamatory, obscene, or that contains hate speech or sensitive personal information.",
      ],
    },
    {
      id: "submissions",
      title: "6. Submissions",
      paragraphs: [
        'The user acknowledges and agrees that any questions, comments, suggestions, ideas, feedback, or other information regarding the Service ("Submissions") provided to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to the user.',
        "The user hereby waives all moral rights to any such Submissions, and warrants that any such Submissions are original or that they have the right to submit such Submissions. The user agrees there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in their Submissions.",
      ],
    },
    {
      id: "third-party-websites",
      title: "7. Third-Party Websites and Content",
      paragraphs: [
        'The Service may contain (or users may be sent via the Service) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content").',
        "Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Service or any Third-Party Content posted on, available through, or installed from the Service, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us.",
      ],
    },
    {
      id: "term-and-termination",
      title: "8. Term and Termination",
      paragraphs: [
        "These Terms of Use shall remain in full force and effect while the Service is in use. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION.",
        "We may terminate a user's use or participation in the Service or delete any posted content or information at any time, without warning, in our sole discretion.",
      ],
    },
    {
      id: "modifications",
      title: "9. Modifications and Interruptions",
      paragraphs: [
        "We reserve the right to change, modify, or remove the contents of the Service at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on the Service. We also reserve the right to modify or discontinue all or part of the Service without notice at any time.",
        "We will not be liable to the user or any third party for any modification, price change, suspension, or discontinuance of the Service.",
        "The availability of the Service is not guaranteed. We may experience hardware, software, or other problems or need to perform maintenance related to the Service, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Service at any time or for any reason without notice. The user agrees that we have no liability whatsoever for any loss, damage, or inconvenience caused by their inability to access or use the Service during any downtime or discontinuance of the Service.",
      ],
    },
    {
      id: "governing-law",
      title: "10. Governing Law",
      paragraphs: [
        "These Terms of Use and the use of the Service are governed by and construed in accordance with the laws of Ukraine applicable to agreements made and to be entirely performed within Ukraine, without regard to its conflict of law principles.",
      ],
    },
    {
      id: "dispute-resolution",
      title: "11. Dispute Resolution",
      subSections: [
        {
          subTitle: "Informal Negotiations",
          text: 'To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use (each a "Dispute" and collectively, the “Disputes”) brought by either the user or us, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.',
        },
        {
          subTitle: "Binding Arbitration",
          text: "If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute will be finally and exclusively resolved by binding arbitration. The arbitration shall be commenced and conducted under the rules of the International Commercial Arbitration Court at the Ukrainian Chamber of Commerce and Industry. The arbitration shall take place in Kyiv, Ukraine. The arbitral proceedings shall be conducted in English. The tribunal shall consist of one (1) arbitrator.",
        },
      ],
    },
    {
      id: "disclaimer-of-warranties",
      title: "12. Disclaimer of Warranties",
      paragraphs: [
        "THE SERVICE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICE WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
        "WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICE'S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SERVICE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICE BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICE.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "13. Limitation of Liability",
      paragraphs: [
        "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO ONE HUNDRED US DOLLARS ($100.00 USD).",
      ],
    },
    {
      id: "indemnification",
      title: "14. Indemnification",
      paragraphs: [
        "The user agrees to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Service; (2) breach of these Terms of Use; (3) any breach of the representations and warranties set forth in these Terms of Use; or (4) violation of the rights of a third party, including but not limited to intellectual property rights.",
      ],
    },
    {
      id: "miscellaneous",
      title: "15. Miscellaneous",
      paragraphs: [
        "These Terms of Use and any policies or operating rules posted by us on the Service constitute the entire agreement and understanding between the user and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision.",
        "These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.",
        "If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions.",
        "There is no joint venture, partnership, employment or agency relationship created between the user and us as a result of these Terms of Use or use of the Service.",
      ],
    },
    {
      id: "contact",
      title: "16. Contact",
      paragraphs: [
        'For questions or comments about these Terms of Use, contact the Service at: <a href="mailto:hello@svitlogics.com">hello@svitlogics.com</a> or by visiting the <a href="/contact">Contact page</a>.',
      ],
    },
  ],
};

// --- Мемоїзовані та Безпечні Підкомпоненти ---
const createSanitizedHtml = (rawHtml: string): { __html: string } => {
  if (typeof window !== "undefined") {
    return {
      __html: DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ["strong", "em", "a"],
        ALLOWED_ATTR: ["href", "target", "rel"],
      }),
    };
  }
  return { __html: rawHtml };
};

const generateId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[\s().]/g, "-")
    .replace(/[/]/g, "");

interface TermsSubSectionProps {
  subSection: TermsSubSectionData;
}
const TermsSubSection: React.FC<TermsSubSectionProps> = React.memo(
  ({ subSection }) => (
    <div className="pt-4">
      <h3 className="mb-4 font-medium text-black text-h3-mobile lg:text-h3-desktop">
        {subSection.subTitle}
      </h3>
      <p dangerouslySetInnerHTML={createSanitizedHtml(subSection.text)} />
    </div>
  )
);
TermsSubSection.displayName = "TermsSubSection";

interface TermsSectionProps {
  section: TermsSectionData;
}
const TermsSection: React.FC<TermsSectionProps> = React.memo(({ section }) => {
  const headingId = useMemo(() => generateId(section.title), [section.title]);
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
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
            {section.list.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={createSanitizedHtml(item)}
              />
            ))}
          </ul>
        )}
        {section.subSections?.map((sub) => (
          <TermsSubSection key={sub.subTitle} subSection={sub} />
        ))}
      </div>
    </section>
  );
});
TermsSection.displayName = "TermsSection";

/**
 * @description Статична сторінка "Terms of Use".
 * @component
 */
const TermsOfUsePage: React.FC = () => {
  const renderedSections = useMemo(
    () =>
      content.sections.map((section) => (
        <TermsSection key={section.id} section={section} />
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

export default React.memo(TermsOfUsePage);
