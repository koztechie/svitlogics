import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

// Define the interface for the component's props
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout is the main site wrapper component.
 * It provides a consistent structure with a header, a main content area, and a footer.
 * It uses Flexbox to ensure the footer is always at the bottom of the viewport,
 * even on pages with little content.
 * The styling adheres to the "Pure Minimalist--Brutalist (Light Theme)" design system.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Main wrapper div:
    // - `flex flex-col`: Arranges Header, main, and Footer vertically.
    // - `min-h-screen`: Ensures the layout takes up at least the full viewport height.
    // - `bg-white`: Sets the primary background color as per the design system.
    // - Text color and font family are inherited from the styles applied to `body` in `src/index.css`.
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        {/* --- ГЛОБАЛЬНІ OG-ТЕГИ ДЛЯ ВСЬОГО САЙТУ --- */}
        <meta property="og:site_name" content="Svitlogics" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        {/* --- ГЛОБАЛЬНИЙ БАНЕР --- */}
        <meta
          property="og:image"
          content="https://svitlogics.com/svitlogics-og-banner.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
      </Helmet>

      <Header />

      {/* Main content area */}
      {/* - `flex-grow`: Allows this element to expand and push the footer down. */}
      {/* - `w-full`: Ensures it takes the full width. */}
      {/* --- ВИДАЛЕНО .container-main звідси, щоб дати сторінкам повний контроль --- */}
      <main className="flex-grow w-full">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
