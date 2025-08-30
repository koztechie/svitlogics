/**
 * Svitlogics Header Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional identity and navigation element, stripped of all non-essential
 *   visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable system chrome.
 * - Section Bravo (Clarity is a Moral Imperative): The component's structure,
 *   navigation, and interactive elements are unambiguous and purpose-driven.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   UI chrome (Svitlogics Blue), background (Paper White), and text (Carbon Black).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system (py-4, px-4, gap-x-8, py-2, py-4) for all elements.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) at the 'small'
 *   scale (`text-small`) for all navigation links, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   navigation container with sharp corners, no shadows, and imperative labeling.
 *   Mobile menu follows a predictable collapse/expand pattern.
 * - Section Golf (Motion Philosophy): Uses CSS transitions for state changes
 *   (hover, active) that are subtle and enhance understanding.
 * - Section Hotel (Copy & Tone of Voice): The component's API and internal
 *   labels use precise, technical language.
 */

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
  { to: "/how-it-works", label: "Methodology" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

/**
 * The primary navigation and identity component of the Svitlogics system.
 * Designed according to The Ethos-Driven Design System:
 * - Section Echo (Spatial System): All padding and gaps strictly adhere to the 8px base unit.
 * - Section Foxtrot (Component Architecture): A minimal, predictable layout with a clear
 *   distinction between desktop and mobile navigation. The component structure avoids
 *   superfluous elements.
 * - Section Delta (Typography): Uses 'Inter' at the 'small' scale for all navigation
 *   links, ensuring clarity and consistency.
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the mobile menu upon navigation to a new route.
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative border-b border-carbon-black bg-paper-white">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Svitlogics Analysis Processor">
          <SvitlogicsLogo className="h-10 w-auto text-svitlogics-blue" />
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
