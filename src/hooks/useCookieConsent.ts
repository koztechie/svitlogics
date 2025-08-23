import { useState, useEffect, useCallback } from "react";

const COOKIE_NAME = "svitlogics-cookie-consent";
const IS_BROWSER = typeof window !== "undefined";

type ConsentValue = boolean | null;

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    if (!IS_BROWSER) return;

    const storedConsent = localStorage.getItem(COOKIE_NAME);
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent));
    } else {
      setConsent(null);
    }
  }, []);

  const giveConsent = useCallback((hasConsented: boolean) => {
    if (!IS_BROWSER) return;

    localStorage.setItem(COOKIE_NAME, JSON.stringify(hasConsented));
    setConsent(hasConsented);

    // Цей код є надлишковим, оскільки логіка в index.html
    // спрацює при перезавантаженні, але ми залишимо його для надійності
    if (window.dataLayer) {
      const consentState = hasConsented ? "granted" : "denied";
      window.dataLayer.push({
        event: "consent",
        consent_mode_update: {
          analytics_storage: consentState,
        },
      });
    }

    // Перезавантаження сторінки - найнадійніший спосіб застосувати згоду
    window.location.reload();
  }, []);

  return { consent, giveConsent };
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}
