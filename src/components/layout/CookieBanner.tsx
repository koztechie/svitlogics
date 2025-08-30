/**
 * Svitlogics Cookie Consent Banner
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional element for obtaining user consent, stripped of all
 *   non-essential visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable system component.
 * - Section Bravo (Clarity is a Moral Imperative): The consent message and
 *   action buttons are unambiguous and purpose-driven. The component's behavior
 *   (appearing only when consent is needed) is clear.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   UI elements (Svitlogics Blue, Carbon Black, Paper White, Neutral grays).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system (p-4, gap-4, px-4, py-2) and maintains visual balance.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for button labels
 *   and 'Lora' (`font-serif`) for the consent message, maintaining UI/Instrument distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   consent container with sharp corners, no shadows, and imperative controls.
 * - Section Hotel (Copy & Tone of Voice): The content uses precise, technical
 *   language and avoids emotional or persuasive phrasing. The message is
 *   direct and informative.
 */

import React from "react";
import { useCookieConsent } from "../../hooks/useCookieConsent";

/**
 * CookieBanner: A system-level component for obtaining user consent for analytics.
 * Adheres to The Ethos-Driven Design System principles:
 * - Clarity is a Moral Imperative: The text is direct and unambiguous.
 * - Engineered for Focus: The component is visually unobtrusive and functional.
 * - Clinical Tone: The copy and visual presentation are unemotional and direct.
 */
const CookieBanner: React.FC = () => {
  const { consent, giveConsent } = useCookieConsent();

  // The component renders nothing if consent has already been given or rejected.
  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-carbon-black bg-paper-white p-4">
      <div className="container-main flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="flex-grow font-serif text-body text-center sm:text-left">
          This system utilizes analytics cookies to monitor and improve
          performance. Consent status is retained for a period of one year.
        </p>
        <div className="flex flex-shrink-0 items-center gap-x-4">
          {/* Secondary Action: Reject */}
          <button
            onClick={() => giveConsent(false)}
            className="border border-carbon-black bg-transparent px-4 py-2 font-sans text-small text-carbon-black transition-colors hover:bg-neutral-300"
          >
            Reject
          </button>
          {/* Primary Action: Accept */}
          <button
            onClick={() => giveConsent(true)}
            className="border border-svitlogics-blue bg-svitlogics-blue px-4 py-2 font-sans text-small text-paper-white transition hover:brightness-[85%]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
