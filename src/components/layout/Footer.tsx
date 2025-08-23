import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

// --- Типізація та константи для підвищення надійності та DX ---

/**
 * @description Конфігурація даних для всіх секцій футера.
 * Визначена як константа поза компонентом, щоб уникнути її повторного створення
 * при кожному рендері. `as const` забезпечує глибоку незмінність.
 * @type {readonly FooterSection[]}
 */
const footerSections = [
  {
    title: "PRODUCT",
    links: [
      { to: "/how-it-works", label: "How it works" },
      { to: "/faq", label: "FAQ" },
      { to: "/pricing-limits", label: "Pricing & limits" },
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
      { to: "/privacy-policy", label: "Privacy policy" },
      { to: "/terms-of-use", label: "Terms of use" },
      { to: "/cookie-policy", label: "Cookie policy" },
      { to: "/disclaimer", label: "Disclaimer" },
    ],
  },
] as const;

const GITHUB_URL = "https://github.com/koztechie/svitlogics";
const CONTACT_EMAIL = "hello@svitlogics.com";

/**
 * @description
 * `Footer` — це статичний компонент, що відображає підвал сайту.
 * Він містить навігаційні посилання, інформацію про авторські права, версію
 * та посилання на соціальні мережі. Компонент мемоїзовано для оптимальної
 * продуктивності, оскільки він не залежить від пропсів і не повинен
 * ре-рендеритися без потреби.
 *
 * @component
 * @example
 * <App>
 *   <MainContent />
 *   <Footer />
 * </App>
 */
const Footer: React.FC = () => {
  // `useMemo` використовується для обчислень, які не потрібно виконувати при кожному рендері.
  // Оскільки `new Date()` може дати різний результат, краще зафіксувати його.
  const copyrightText = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return `© ${currentYear} SVITLOGICS BY EUGENE KOZLOVSKY. ALL RIGHTS RESERVED.`;
  }, []);

  const versionText = "SVITLOGICS V0.4.0 (BETA)";

  return (
    <footer className="border-t border-black bg-white px-4 py-8">
      <div className="mx-auto max-w-container">
        <nav
          className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4"
          aria-label="Footer navigation"
        >
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-mono font-bold uppercase text-ui-label text-black mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-mono font-medium capitalize text-ui-label text-blue-accent no-underline hover:underline focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom section: Copyright and social links */}
        <div className="border-t border-black pt-8">
          <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono uppercase text-ui-label text-black text-center sm:text-left">
              {copyrightText}
            </p>
            <div className="flex items-center justify-center gap-x-6 sm:justify-end">
              <p className="font-mono uppercase text-ui-label text-text-secondary">
                {versionText}
              </p>
              <div className="flex items-center gap-x-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Svitlogics on GitHub"
                  title="View Svitlogics on GitHub"
                  className="text-black transition-colors duration-100 hover:text-blue-accent"
                >
                  <Github size={24} strokeWidth={1.5} />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label="Contact via email"
                  title="Contact via email"
                  className="text-black transition-colors duration-100 hover:text-blue-accent"
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

// Мемоїзація компонента є ключовою оптимізацією. Оскільки Footer не приймає
// пропсів, React.memo гарантує, що він буде ре-рендеритися лише один раз
// (або якщо зміниться його внутрішній стан, якого тут немає).
export default React.memo(Footer);
