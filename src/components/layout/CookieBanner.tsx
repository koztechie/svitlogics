import React from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";

const CookieBanner: React.FC = () => {
  const { consent, giveConsent } = useCookieConsent();

  // Не показуємо банер, якщо вибір вже зроблено
  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 z-50">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-body-main flex-grow text-center sm:text-left">
          We use analytics cookies to improve your experience. Your choice will
          be stored for one year.
        </p>
        <div className="flex items-center gap-x-3 flex-shrink-0">
          <button
            onClick={() => giveConsent(false)}
            className="font-mono text-ui-label uppercase rounded-none border border-black px-4 py-2 bg-white text-black hover:bg-black hover:text-white transition-colors duration-100"
          >
            Reject
          </button>
          <button
            onClick={() => giveConsent(true)}
            className="font-mono text-ui-label uppercase rounded-none border border-blue-accent px-4 py-2 bg-blue-accent text-white hover:bg-blue-accent-hover hover:border-blue-accent-hover transition-colors duration-100"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
