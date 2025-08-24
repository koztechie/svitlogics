import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SvitlogicsLogo from "../../assets/logo/SvitlogicsLogo.svg?react";

// --- Типізація та Константи ---

/**
 * @description Конфігурація навігаційних елементів для десктопної версії.
 * Визначена поза компонентом, щоб уникнути повторного створення.
 * @type {readonly NavItem[]}
 */
const navItems = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/how-it-works", label: "HOW IT WORKS" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "BLOG" },
] as const;

/**
 * @description Розширений набір для мобільного меню.
 * @type {readonly NavItem[]}
 */
const mobileNavItems = [
  ...navItems,
  { to: "/pricing-limits", label: "PRICING & LIMITS" },
  { to: "/contact", label: "CONTACT" },
  { to: "/privacy-policy", label: "PRIVACY POLICY" },
  { to: "/terms-of-use", label: "TERMS OF USE" },
  { to: "/changelog", label: "CHANGELOG" },
  { to: "/cookie-policy", label: "COOKIE POLICY" },
  { to: "/disclaimer", label: "DISCLAIMER" },
] as const;

// --- Допоміжні Компоненти (Оптимізовані) ---

/**
 * @description Пропси для мемоїзованого компонента `CustomNavLink`.
 */
interface CustomNavLinkProps {
  /** @description Шлях призначення. */
  to: string;
  /** @description Вміст посилання, зазвичай текст. */
  children: React.ReactNode;
  /** @description Прапорець для застосування стилів мобільної версії. */
  mobile?: boolean;
}

/**
 * @description
 * Мемоїзований компонент-обгортка над `RouterNavLink` від `react-router-dom`.
 * Використовує функціонал `NavLink` для автоматичного визначення активного стану
 * замість ручного порівняння через `useLocation`, що є значно продуктивнішим.
 *
 * @component
 */
const CustomNavLink: React.FC<CustomNavLinkProps> = React.memo(
  ({ to, children, mobile = false }) => {
    // Класи обчислюються один раз і передаються `NavLink`
    const getClassName = useCallback(
      ({ isActive }: { isActive: boolean }): string => {
        const baseClasses =
          "font-medium uppercase text-blue-accent text-ui-label transition-colors duration-100";
        const stateClasses = "hover:underline focus-visible:underline";
        const activeClasses = isActive ? "underline" : "no-underline";
        const mobileSpecificClasses = mobile
          ? "block w-full py-2 text-left"
          : "py-2";
        return `${baseClasses} ${stateClasses} ${activeClasses} ${mobileSpecificClasses}`;
      },
      [mobile]
    );

    return (
      <RouterNavLink to={to} className={getClassName} end>
        {children}
      </RouterNavLink>
    );
  }
);

CustomNavLink.displayName = "CustomNavLink"; // Для кращого дебагінгу

/**
 * @description
 * Головний хедер застосунку.
 * Містить логотип, основну навігацію для десктопу та мобільне меню, що розгортається.
 * Компонент мемоїзовано для запобігання зайвим ре-рендерам.
 * @component
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Ефект для закриття меню при зміні маршруту.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Ефект для керування доступністю (a11y): блокування скролу та повернення фокусу.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    // Функція очищення, що виконується при розмонтуванні компонента або зміні `isMenuOpen`
    return () => {
      document.body.style.overflow = originalOverflow;
      // Повернення фокусу на кнопку меню після його закриття
      if (!isMenuOpen) {
        menuButtonRef.current?.focus();
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="relative border-b-1 border-black bg-white">
      <div className="container-main flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-baseline"
          aria-label="Svitlogics homepage"
        >
          <SvitlogicsLogo className="h-8 w-auto text-black" />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <CustomNavLink to={item.to}>{item.label}</CustomNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            className="flex items-center justify-center border-1 border-black bg-white p-2 text-black transition-colors duration-100 hover:bg-black hover:text-white"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <Menu size={20} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog" // role="dialog" є більш семантичним для модальних вікон
          aria-modal="true" // Повідомляє скрін-рідерам, що вміст поза цим меню неактивний
          className="absolute left-0 top-full w-full border-b-1 border-x-1 border-black bg-white md:hidden"
        >
          <nav className="p-4" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-y-2">
              {mobileNavItems.map((item) => (
                <li key={item.to}>
                  <CustomNavLink to={item.to} mobile>
                    {item.label}
                  </CustomNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
