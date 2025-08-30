/**
 * Svitlogics Footer Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional navigation element, stripped of all non-essential visual
 *   elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable navigation aid.
 * - Section Bravo (Clarity is a Moral Imperative): The component's structure,
 *   content, and navigation are unambiguous. It is a transparent instrument.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Neutral grays) and interactive elements (Svitlogics Blue).
 * - Section Echo (Spatial System): Enforces a rigid 4-column grid layout with
 *   disciplined spacing using the 8px grid system (gap-8, pt-8, pb-8).
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) at the 'small'
 *   scale (`text-small`) for all text elements, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   navigation container with no decorative attributes or shadows.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

// Content is structured into four sections to perfectly fit the 4-column grid,
// ensuring a balanced and predictable layout as mandated by Section Echo.
const footerSections = [
  {
    title: "System",
    links: [
      { to: "/how-it-works", label: "Methodology" },
      { to: "/pricing-limits", label: "Access & Limits" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Project",
    links: [
      { to: "/about", label: "About Svitlogics" },
      { to: "/changelog", label: "System Changelog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Content",
    links: [{ to: "/blog", label: "Blog" }],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-use", label: "Terms of Use" },
      { to: "/cookie-policy", label: "Cookie Policy" },
      { to: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

/**
 * The primary footer component for the Svitlogics application.
 * It provides tertiary navigation and system-level information.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Echo (Spatial System): Employs a rigid 4-column grid for navigation,
 *   creating a stable and visually balanced structure. All spacing adheres to the 8px grid.
 * - Section Delta (Typography): Uses the correct text styles ('Inter' for UI text)
 *   without decorative modifications. Section titles are styled as clear, functional labels.
 * - Section Bravo (Clarity): The link structure is organized into four logical groups,
 *   enhancing clarity and ease of navigation.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} Svitlogics. All rights reserved.`;
  const versionText = "System Version 0.4.8 (Beta)";

  return (
    <footer className="border-t border-carbon-black bg-paper-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-container">
        <nav
          className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4"
          aria-label="Footer Navigation"
        >
          {footerSections.map((section) => (
            <div key={section.title}>
              {/* Replaced ambiguous <Heading> with a <p> tag styled as a
                  label, which is more semantically correct per Section Delta. */}
              <p className="mb-4 font-sans text-small font-semibold text-carbon-black">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-sans text-small text-svitlogics-blue hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-carbon-black pt-8">
          <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between">
            <p className="text-center font-sans text-small text-neutral-700 sm:text-left">
              {copyrightText}
            </p>
            <div className="flex items-center justify-center gap-x-6 sm:justify-end">
              <p className="font-sans text-small text-neutral-500">
                {versionText}
              </p>
              <div className="flex items-center gap-x-4">
                <a
                  href="https://github.com/koztechie/svitlogics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project source on GitHub"
                  className="text-carbon-black transition-colors hover:text-svitlogics-blue"
                >
                  <Github size={20} aria-hidden="true" />
                </a>
                <a
                  href="mailto:hello@svitlogics.com"
                  aria-label="Contact via Email"
                  className="text-carbon-black transition-colors hover:text-svitlogics-blue"
                >
                  <Mail size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
