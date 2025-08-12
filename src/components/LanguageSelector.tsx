import React from "react";
// import { useTranslation } from 'react-i18next';

// Експортуємо тип, щоб його можна було використовувати в Home.tsx для стану
export type AnalysisLanguage = "en" | "uk";

interface LanguageSelectorProps {
  selectedLanguage: AnalysisLanguage;
  onLanguageChange: (lang: AnalysisLanguage) => void;
}

/**
 * A component that allows the user to select the language of the text for analysis.
 * It presents two options (English/Ukrainian) and highlights the active selection.
 * The styling adheres to the "Pure Minimalist-Brutalist" design system.
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  // const { t } = useTranslation();

  // Тексти для UI елементів
  const sectionTitle = "ANALYSIS LANGUAGE";
  const englishLabel = "ENGLISH";
  const ukrainianLabel = "UKRAINIAN";

  // Базові стилі, спільні для обох кнопок
  const buttonBaseClasses =
    "w-full py-3 font-mono font-medium text-ui-label uppercase transition-colors duration-100 rounded-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent";

  // Стилі для активної (вибраної) кнопки
  const activeClasses = "bg-black text-white cursor-default";

  // Стилі для неактивної кнопки, без власної рамки, оскільки рамка-розділювач є на батьківському елементі
  const inactiveClasses = "bg-white text-black hover:bg-black hover:text-white";

  return (
    <section aria-labelledby="language-selector-title">
      <div className="border border-black rounded-none">
        {/* Заголовок секції - без декоративної іконки */}
        <div className="px-4 py-3 border-b border-black bg-white">
          <h2
            id="language-selector-title"
            className="font-mono font-medium text-ui-label uppercase text-black"
          >
            {/* t('languageSelector.title', sectionTitle) */}
            {sectionTitle}
          </h2>
        </div>

        {/* Контейнер для кнопок, розділених лінією */}
        <div className="grid grid-cols-2 divide-x divide-black">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`${buttonBaseClasses} ${
              selectedLanguage === "en" ? activeClasses : inactiveClasses
            }`}
            aria-pressed={selectedLanguage === "en"}
            disabled={selectedLanguage === "en"}
          >
            {/* t('languageSelector.english', englishLabel) */}
            {englishLabel}
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("uk")}
            className={`${buttonBaseClasses} ${
              selectedLanguage === "uk" ? activeClasses : inactiveClasses
            }`}
            aria-pressed={selectedLanguage === "uk"}
            disabled={selectedLanguage === "uk"}
          >
            {/* t('languageSelector.ukrainian', ukrainianLabel) */}
            {ukrainianLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguageSelector;
