/**
 * Svitlogics Layout Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional structural element, stripped of all non-essential visual
 *   elements and decorative attributes. It establishes a serious, focused environment.
 * - Section Alpha (Interface is a Laboratory): The design provides a stable,
 *   predictable canvas that recedes to allow the primary content (the analysis tools)
 *   to become the focus.
 * - Section Bravo (Clarity is a Moral Imperative): The component's structure is
 *   unambiguous and purpose-driven. It clearly defines the document flow.
 * - Section Charlie (Chromatic System): Employs the prescribed `paper-white` background
 *   color to reduce eye strain during prolonged analytical sessions.
 * - Section Echo (Spatial System): Enforces a rigid, full-height flexbox column
 *   layout (`flex min-h-screen flex-col`) that creates a stable, predictable viewport
 *   structure. This directly fulfills the "Engineered for Focus" principle by
 *   preventing layout shift and providing a calm spatial foundation.
 * - Section Foxtrot (Component Architecture): This is a pure structural container.
 *   It has no decorative attributes, shadows, or visual embellishments. Its function
 *   is purely to organize the viewport.
 * - Section Hotel (Copy & Tone of Voice): The component's documentation uses
 *   precise, technical language.
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout: The foundational structural component for the Svitlogics interface.
 * It establishes the primary visual canvas and ensures a stable, predictable
 * viewport structure (header, main content, footer).
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Charlie (Chromatic System): Utilizes `bg-paper-white` for the main canvas
 *   to reduce eye strain during prolonged analysis sessions.
 * - Section Echo (Spatial System): Employs a full-height flexbox column to create an
 *   ordered and stable environment, fulfilling the "Engineered for Focus" principle.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-paper-white">
      <Helmet>
        {/* Global metadata for the Svitlogics system */}
        <meta property="og:site_name" content="Svitlogics" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://svitlogics.com/svitlogics-og-banner.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
      </Helmet>

      <Header />

      <main className="w-full flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
