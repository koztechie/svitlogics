import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";
// import { useTranslation } from 'react-i18next';

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
  const currentYear = new Date().getFullYear();

  const copyrightText = `© ${currentYear} SVITLOGICS BY EUGENE KOZLOVSKY. ALL RIGHTS RESERVED.`;
  const versionText = "SVITLOGICS V0.3.3 (BETA)";

  return (
    <footer className="bg-white border-t border-black px-4 py-8">
      <div className="max-w-container mx-auto">
        {/* Top section: Navigation links */}
        <nav className="mb-8" aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="font-mono font-medium text-ui-label uppercase text-blue-accent no-underline hover:underline focus-visible:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* --- МОДИФІКАЦІЯ ТУТ: Оновлена нижня секція --- */}
        <div className="pt-8 border-t border-black">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4">
            {/* Ліва сторона: Копірайт */}
            <p className="font-mono text-ui-label text-black text-center sm:text-left uppercase">
              {copyrightText}
            </p>

            {/* Права сторона: Версія та іконки */}
            <div className="flex items-center justify-center sm:justify-end gap-x-6">
              <p className="font-mono text-ui-label text-text-secondary uppercase">
                {versionText}
              </p>
              <div className="flex items-center gap-x-4">
                <a
                  href="https://github.com/koztechie/svitlogics"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Svitlogics on GitHub"
                  title="View Svitlogics on GitHub"
                  className="text-black hover:text-blue-accent transition-colors duration-100"
                >
                  <Github size={24} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:hello@svitlogics.com"
                  aria-label="Contact via Email"
                  title="Contact via Email"
                  className="text-black hover:text-blue-accent transition-colors duration-100"
                >
                  <Mail size={24} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
