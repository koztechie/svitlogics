import React from "react";
import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

// Дані для навігаційних посилань, винесені для чистоти та легкого управління
const navLinks = [
  { to: "/about", label: "ABOUT" },
  { to: "/how-it-works", label: "HOW IT WORKS" },
  { to: "/faq", label: "FAQ" },
  { to: "/pricing-limits", label: "PRICING & LIMITS" },
  { to: "/contact", label: "CONTACT" },
  { to: "/privacy-policy", label: "PRIVACY POLICY" },
  { to: "/terms-of-use", label: "TERMS OF USE" },
  { to: "/changelog", label: "CHANGELOG" },
];

const Footer: React.FC = () => {
  // const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const copyrightText = `© ${currentYear} SVITLOGICS BY EUGENE KOZLOVSKY. ALL RIGHTS RESERVED.`;
  const versionText = "SVITLOGICS V0.3.0 (BETA)";

  return (
    <footer className="bg-white border-t border-black px-4 py-8">
      <div className="max-w-container mx-auto">
        {/* Верхня секція футера з навігаційними посиланнями */}
        <nav className="mb-8" aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline focus-visible:underline"
                >
                  {
                    /* t(`footer.nav.${link.label.toLowerCase()}`) || */ link.label
                  }
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Нижня секція футера з копірайтом та версією */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 pt-8 border-t border-black">
          <p className="font-mono text-ui-label text-black text-center sm:text-left uppercase">
            {
              /* t('footer.copyright', { year: currentYear }) || */ copyrightText
            }
          </p>
          <p className="font-mono text-ui-label text-text-secondary text-center sm:text-right uppercase">
            {/* t('footer.version') || */ versionText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
