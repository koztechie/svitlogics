import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Define the interface for the component's props
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout is the main site wrapper component.
 * It provides a consistent structure with a header, a main content area, and a footer.
 * It uses Flexbox to ensure the footer is always at the bottom of the viewport,
 * even on pages with little content.
 * The styling adheres to the "Pure Minimalist-Brutalist (Light Theme)" design system.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Main wrapper div:
    // - `flex flex-col`: Arranges Header, main, and Footer vertically.
    // - `min-h-screen`: Ensures the layout takes up at least the full viewport height.
    // - `bg-white`: Sets the primary background color as per the design system.
    // - Text color and font family are inherited from the styles applied to `body` in `src/index.css`.
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Main content area */}
      {/* - `flex-grow`: Allows this element to expand and push the footer down. */}
      {/* - `w-full`: Ensures it takes the full width before centering the container inside. */}
      <main className="flex-grow w-full">
        {/*
          Content container:
          - `.container-main`: A custom component class defined in `src/index.css`.
             It should apply `max-width: 1024px` and `margin-left: auto`, `margin-right: auto`.
          - `px-4`: Provides a 16px horizontal padding on both sides.
          - `py-16`: Provides a 64px vertical padding (top and bottom) to create the defined "Section spacing"
             between the header/footer and the page content, ensuring ample raw space.
        */}
        <div className="container-main py-16">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;