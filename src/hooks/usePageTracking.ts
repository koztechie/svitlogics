import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const GTM_ID = import.meta.env.VITE_GTM_ID;

/**
 * A custom hook that tracks page views for a Single Page Application (SPA).
 * It listens for changes in the URL path and sends a 'pageview' event
 * to Google Tag Manager with the new path.
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    if (GTM_ID) {
      // This creates a dataLayer event that can be used to trigger tags in GTM
      TagManager.dataLayer({
        dataLayer: {
          event: "pageview",
          page: location.pathname + location.search,
        },
      });
    }
  }, [location]);
}
