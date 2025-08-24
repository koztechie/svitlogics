import React, { useCallback } from "react"; // --- ВИПРАВЛЕННЯ ТУТ: Видалено 'useMemo' ---
import clsx from "clsx";

// --- Типізація та Константи ---

/**
 * @description Визначає підтримувані мови для аналізу.
 * Експортується для повторного використання в інших частинах додатку (напр., для стану в Home.tsx).
 */
export type AnalysisLanguage = "en" | "uk";

/**
 * @description Визначає контракт пропсів для компонента `LanguageSelector`.
 */
interface LanguageSelectorProps {
  /** @description Поточна вибрана мова. */
  selectedLanguage: AnalysisLanguage;
  /** @description Колбек-функція, що викликається при зміні мови. */
  onLanguageChange: (lang: AnalysisLanguage) => void;
}

// --- Константи для UI. Винесені за межі компонента для запобігання повторному створенню.
const UI_TEXT = {
  sectionTitle: "ANALYSIS LANGUAGE",
  englishLabel: "ENGLISH",
  ukrainianLabel: "UKRAINIAN",
} as const;

// --- Мемоїзовані Підкомпоненти та Хелпери ---

/**
 * @description Пропси для мемоїзованого підкомпонента кнопки.
 */
interface LanguageButtonProps {
  /** @description Мова, за яку відповідає ця кнопка. */
  lang: AnalysisLanguage;
  /** @description Чи є ця кнопка зараз вибраною. */
  isActive: boolean;
  /** @description Текст кнопки. */
  children: React.ReactNode;
  /** @description Колбек, що викликається при кліку. */
  onClick: (lang: AnalysisLanguage) => void;
}

/**
 * @description
 * Мемоїзований підкомпонент для кнопки вибору мови.
 * Декомпозиція дозволяє уникнути повторного обчислення класів та зайвих ре-рендерів.
 * @component
 */
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
            // Active state (inverted secondary button)
            "cursor-default bg-black text-white": isActive,
            // Inactive state (matches secondary button hover)
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

/**
 * @description
 * Компонент, що дозволяє користувачу вибрати мову тексту для аналізу.
 * Є контрольованим компонентом, стан якого керується ззовні через пропси.
 *
 * @component
 * @param {LanguageSelectorProps} props - Пропси компонента.
 * @example
 * const [lang, setLang] = useState<AnalysisLanguage>('en');
 * <LanguageSelector selectedLanguage={lang} onLanguageChange={setLang} />
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <section aria-labelledby="language-selector-title">
      <div className="border-1 border-black">
        <header className="border-b-1 border-black bg-white px-4 py-2">
          <h2
            id="language-selector-title"
            className="font-medium uppercase text-black text-ui-label"
          >
            {UI_TEXT.sectionTitle}
          </h2>
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
