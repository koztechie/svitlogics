import React, { useCallback } from "react";
import clsx from "clsx";

// --- Типізація та Константи ---

/**
 * @description Визначає підтримувані мови для аналізу.
 */
export type AnalysisLanguage = "en" | "uk";

/**
 * @description Визначає контракт пропсів для компонента `LanguageSelector`.
 */
interface LanguageSelectorProps {
  selectedLanguage: AnalysisLanguage;
  onLanguageChange: (lang: AnalysisLanguage) => void;
}

const UI_TEXT = {
  sectionTitle: "ANALYSIS LANGUAGE",
  englishLabel: "ENGLISH",
  ukrainianLabel: "UKRAINIAN",
} as const;

// --- Мемоїзовані Підкомпоненти ---

interface LanguageButtonProps {
  lang: AnalysisLanguage;
  isActive: boolean;
  children: React.ReactNode;
  onClick: (lang: AnalysisLanguage) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = React.memo(
  ({ lang, isActive, children, onClick }) => {
    const handleClick = useCallback(() => {
      onClick(lang);
    }, [lang, onClick]);

    return (
      <button
        type="button"
        onClick={handleClick}
        className={clsx(
          "w-full py-2 font-medium uppercase text-ui-label transition-colors duration-100",
          {
            "cursor-default bg-black text-white": isActive,
            "bg-white text-black hover:bg-black hover:text-white": !isActive,
          }
        )}
        aria-pressed={isActive}
        disabled={isActive}
      >
        {children}
      </button>
    );
  }
);
LanguageButton.displayName = "LanguageButton";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <section aria-labelledby="language-selector-title">
      <div className="border-1 border-black">
        <header className="border-b-1 border-black bg-white px-4 py-2">
          {/* --- ВИПРАВЛЕННЯ ТУТ: h2 замінено на div з ARIA-атрибутами --- */}
          <div
            id="language-selector-title"
            className="font-medium uppercase text-black text-ui-label"
            role="heading"
            aria-level={2}
          >
            {UI_TEXT.sectionTitle}
          </div>
        </header>

        <div
          className="grid grid-cols-2 divide-x-1 divide-black"
          role="group"
          aria-label={UI_TEXT.sectionTitle}
        >
          <LanguageButton
            lang="en"
            isActive={selectedLanguage === "en"}
            onClick={onLanguageChange}
          >
            {UI_TEXT.englishLabel}
          </LanguageButton>
          <LanguageButton
            lang="uk"
            isActive={selectedLanguage === "uk"}
            onClick={onLanguageChange}
          >
            {UI_TEXT.ukrainianLabel}
          </LanguageButton>
        </div>
      </div>
    </section>
  );
};

export default React.memo(LanguageSelector);
