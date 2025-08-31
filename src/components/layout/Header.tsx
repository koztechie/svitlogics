import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink as RouterNavLink,
  useLocation,
  NavLinkRenderProps,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import SvitlogicsLogo from "../../assets/logo/SvitlogicsLogo.svg?react";
import { clsx } from "clsx";

const navItems = [
  { to: "/", label: "Analysis" },
  { to: "/how-it-works/", label: "Methodology" }, // Додано слеш
  { to: "/about/", label: "About" }, // Додано слеш
  { to: "/faq/", label: "FAQ" }, // Додано слеш
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative border-b border-carbon-black bg-paper-white">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* --- ВИПРАВЛЕННЯ ТУТ: Додано прихований анкорний текст --- */}
        <Link to="/" aria-label="Svitlogics Analysis Home">
          <SvitlogicsLogo
            className="h-10 w-auto text-svitlogics-blue"
            aria-hidden="true"
          />
          <span className="sr-only">Svitlogics Home</span>
        </Link>

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-x-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <CustomNavLink to={item.to}>{item.label}</CustomNavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            type="button"
            className="flex items-center justify-center border border-neutral-500 p-2 text-carbon-black transition-colors hover:border-carbon-black hover:bg-neutral-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        role="region"
        className={clsx(
          "absolute top-full left-0 w-full border-b border-carbon-black bg-paper-white md:hidden",
          { block: isMenuOpen, hidden: !isMenuOpen }
        )}
      >
        <nav className="px-4 pt-2 pb-4 sm:px-6" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.to}>
                <CustomNavLink to={item.to} isMobile>
                  {item.label}
                </CustomNavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

interface CustomNavLinkProps {
  to: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
  isMobile = false,
}) => {
  // Applies styles directly to RouterNavLink, avoiding unnecessary DOM elements
  // and ensuring global focus styles are not overridden.
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }: NavLinkRenderProps) =>
        clsx(
          "font-sans text-small font-semibold transition-colors",
          isMobile ? "block w-full py-4 text-left" : "py-2",
          isActive
            ? "text-svitlogics-blue underline"
            : "text-carbon-black hover:text-svitlogics-blue hover:underline"
        )
      }
      // Removed the redundant 'aria-current' prop.
      // The NavLink component handles this attribute automatically.
    >
      {children}
    </RouterNavLink>
  );
};

export default React.memo(Header);
