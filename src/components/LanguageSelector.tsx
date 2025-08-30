/**
 * Svitlogics Language Selector Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional control for selecting analysis language, stripped of all
 *   non-essential visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable control element.
 * - Section Alpha (Truth is a Process, Not a Product): The component provides
 *   a clear mechanism for users to select the appropriate analytical framework
 *   for their text, emphasizing that analysis is context-dependent.
 * - Section Bravo (Clarity is a Moral Imperative): The component's purpose and
 *   interaction model are unambiguous. The active state is clearly indicated.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   UI scaffolding (`neutral-500` borders) and system state (`svitlogics-blue`
 *   for active selection).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system (px-4, py-2) and maintains visual balance.
 * - Section Delta (Typography): Uses 'Inter' (`font-sans`) for all text elements,
 *   maintaining UI/Instrument distinction. Button labels use `text-small` with
 *   standard 400 font-weight.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   segmented control with sharp corners, no shadows, and imperative interaction.
 * - Section Hotel (Copy & Tone of Voice): The component uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React from "react";
import clsx from "clsx";

export type AnalysisLanguage = "en" | "uk";

interface LanguageSelectorProps {
  selectedLanguage: AnalysisLanguage;
  onLanguageChange: (lang: AnalysisLanguage) => void;
}

const UI_TEXT = {
  sectionTitle: "Analysis Language",
  englishLabel: "English",
  ukrainianLabel: "Ukrainian",
} as const;

/**
 * A control component for selecting the analysis language.
 * It functions as a segmented control, presenting a finite set of mutually exclusive options.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Laboratory, Not a Stage): The component avoids theatricality. The
 *   active state is indicated with the primary system color (`svitlogics-blue`), not a
 *   dramatic color inversion.
 * - Section Charlie (Chromatic System): Uses `neutral-500` for borders, consistent
 *   with UI scaffolding. The active state uses `svitlogics-blue` to signify system state.
 * - Section Delta (Typography): All text uses the 'Inter' typeface. Button labels use
 *   `text-small` with the standard 400 font-weight. `uppercase` is strictly forbidden.
 * - Section Foxtrot (Component Architecture): A purely functional, rectangular design
 *   with no decorative elements.
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <section aria-labelledby="language-selector-title">
      <div className="border border-neutral-500">
        <header className="border-b border-neutral-500 bg-paper-white px-4 py-2">
          <h3
            id="language-selector-title"
            className="font-sans text-body font-semibold text-carbon-black"
          >
            {UI_TEXT.sectionTitle}
          </h3>
        </header>

        <div
          className="grid grid-cols-2"
          role="group"
          aria-label={UI_TEXT.sectionTitle}
        >
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={clsx(
              "w-full py-2 font-sans text-small transition-colors",
              selectedLanguage === "en"
                ? "cursor-default bg-svitlogics-blue text-paper-white"
                : "bg-paper-white text-carbon-black hover:bg-neutral-300"
            )}
            aria-pressed={selectedLanguage === "en"}
            disabled={selectedLanguage === "en"}
          >
            {UI_TEXT.englishLabel}
          </button>

          <button
            type="button"
            onClick={() => onLanguageChange("uk")}
            className={clsx(
              "w-full border-l border-neutral-500 py-2 font-sans text-small transition-colors",
              selectedLanguage === "uk"
                ? "cursor-default bg-svitlogics-blue text-paper-white"
                : "bg-paper-white text-carbon-black hover:bg-neutral-300"
            )}
            aria-pressed={selectedLanguage === "uk"}
            disabled={selectedLanguage === "uk"}
          >
            {UI_TEXT.ukrainianLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(LanguageSelector);
