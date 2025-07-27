import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import InterfaceLanguageSwitcher from './InterfaceLanguageSwitcher';

// Навігаційні елементи для десктопу
const navItems = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/how-it-works", label: "HOW IT WORKS" },
  { to: "/faq", label: "FAQ" },
];

// Розширений набір для мобільного меню
const mobileNavItems = [
  ...navItems,
  { to: "/pricing-limits", label: "PRICING & LIMITS" },
  { to: "/contact", label: "CONTACT" },
  { to: "/privacy-policy", label: "PRIVACY POLICY" },
  { to: "/terms-of-use", label: "TERMS OF USE" },
  { to: "/changelog", label: "CHANGELOG" },
];

/**
 * Main application header.
 * Contains the logo, primary desktop navigation, and a collapsible mobile menu.
 */
const Header: React.FC = () => {
  // const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Автоматично закриває мобільне меню при зміні сторінки
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative bg-white border-b border-black">
      <div className="max-w-container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" aria-label="Svitlogics Homepage">
          <img 
            src="/svitlogics-logo-s-only.svg" 
            alt="Svitlogics Logo" 
            className="h-8 w-auto" // Встановлюємо висоту 32px
          />
        </Link>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center gap-x-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <CustomNavLink to={item.to}>
                    {item.label}
                  </CustomNavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            type="button"
            className="flex items-center justify-center p-2 border border-black bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white transition-colors duration-100 rounded-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X size={20} strokeWidth={2}/> : <Menu size={20} strokeWidth={2}/>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-black border-x border-black"
        >
          <nav className="px-4 py-4" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-y-3">
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

// Reusable NavLink component
interface CustomNavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children, mobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = "font-mono font-medium text-ui-label uppercase text-blue-accent no-underline transition-colors duration-100 rounded-none";
  const stateClasses = "hover:underline focus-visible:underline";
  const activeClasses = "underline"; // A simple underline for the active link
  
  const mobileSpecificClasses = mobile ? "block w-full py-2 text-left" : "py-1";

  return (
    <RouterNavLink
      to={to}
      className={`${baseClasses} ${stateClasses} ${isActive ? activeClasses : ''} ${mobileSpecificClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </RouterNavLink>
  );
};

export default Header;