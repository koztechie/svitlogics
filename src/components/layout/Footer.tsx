import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

// --- Декларуємо глобальний об'єкт на верхньому рівні ---
declare global {
  interface Window {
    cookieconsent?: {
      openPreferencesCenter: () => void;
    };
  }
}

const footerSections = [
  {
    title: "PRODUCT",
    links: [
      { to: "/how-it-works", label: "How It Works" },
      { to: "/faq", label: "FAQ" },
      { to: "/pricing-limits", label: "Pricing & Limits" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { to: "/blog", label: "Blog" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "PROJECT",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-use", label: "Terms of Use" },
      { to: "/cookie-policy", label: "Cookie Policy" },
      { to: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} SVITLOGICS BY EUGENE KOZLOVSKY. ALL RIGHTS RESERVED.`;
  const versionText = "SVITLOGICS V0.4.0 (BETA)";

  const openCookiePreferences = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (
      window.cookieconsent &&
      typeof window.cookieconsent.openPreferencesCenter === "function"
    ) {
      window.cookieconsent.openPreferencesCenter();
    } else {
      alert(
        "Cookie preferences can be managed on the deployed version of the site."
      );
    }
  };

  // --- ВИДАЛЕНО: Дублююча декларація ---

  return (
    <footer className="bg-white border-t border-black px-4 py-8">
      <div className="max-w-container mx-auto">
        <nav
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          aria-label="Footer Navigation"
        >
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-mono font-bold text-ui-label uppercase text-black mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-mono font-medium text-ui-label capitalize text-blue-accent no-underline hover:underline focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {section.title === "LEGAL" && (
                  <li>
                    <a
                      href="#"
                      onClick={openCookiePreferences}
                      className="font-mono font-medium text-ui-label capitalize text-blue-accent no-underline hover:underline focus-visible:underline"
                    >
                      Cookie Preferences
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom section: Copyright and social links */}
        <div className="pt-8 border-t border-black">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4">
            <p className="font-mono text-ui-label text-black text-center sm:text-left uppercase">
              {copyrightText}
            </p>
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
