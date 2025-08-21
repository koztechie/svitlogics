import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GTM_ID = import.meta.env.VITE_GTM_ID;

/**
 * A custom React hook that tracks page views for a Single Page Application (SPA).
 * It listens for changes in the URL path and pushes a 'page_view' event
 * directly to the window.dataLayer, which is used by Google Tag Manager.
 * This approach avoids external dependencies and works seamlessly with GDPR-compliant
 * script managers like 'cookieconsent'.
 */
export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    // Do nothing if GTM ID is not configured
    if (!GTM_ID) {
      return;
    }

    // Ensure the dataLayer exists (it's created by the GTM script in index.html)
    if (window.dataLayer) {
      // Push a standard 'page_view' event that GTM understands
      window.dataLayer.push({
        event: "page_view",
        page: {
          path: location.pathname + location.search,
          title: document.title, // Also send the current page title
        },
      });
    }
  }, [location]); // This effect re-runs on every route change
};

// Declare the dataLayer on the window object to satisfy TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
