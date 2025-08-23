import React, { useState, useCallback, useMemo } from "react";
import { Copy, Check } from "lucide-react";

// --- Типізація та Константи ---

/**
 * @description Визначає структуру даних для однієї категорії аналізу.
 */
export interface Category {
  /** @description Назва категорії. */
  name: string;
  /** @description Оцінка в процентах. `null`, якщо дані ще не отримані. */
  percentage: number | null;
  /** @description Текстове пояснення результату. `null`, якщо дані ще не отримані. */
  explanation: string | null;
}

/**
 * @description Визначає контракт пропсів для головного компонента `AnalysisResults`.
 */
export interface AnalysisResultsProps {
  /** @description Масив об'єктів категорій для відображення. */
  categories: Category[];
  /** @description Прапорець, що вказує на процес аналізу. Якщо `true`, відображається спінер. */
  isAnalyzing: boolean;
  /** @description Загальний підсумок аналізу. */
  overallSummary: string;
}

const COPY_SUCCESS_TIMEOUT = 2000; // ms

// --- Мемоїзовані Підкомпоненти ---

/**
 * @description Підкомпонент для стану завантаження. Мемоїзований, оскільки є статичним.
 * @component
 */
const LoadingState: React.FC = React.memo(() => (
  <div className="p-16 text-center" role="status" aria-live="polite">
    <p className="font-mono font-medium uppercase text-ui-label text-black">
      ANALYZING...
    </p>
  </div>
));
LoadingState.displayName = "LoadingState";

/**
 * @description Підкомпонент для порожнього стану. Мемоїзований, оскільки є статичним.
 * @component
 */
const EmptyState: React.FC = React.memo(() => (
  <div className="p-16 text-center">
    <p className="font-mono font-medium uppercase text-ui-label text-black">
      RESULTS WILL APPEAR HERE AFTER ANALYSIS
    </p>
  </div>
));
EmptyState.displayName = "EmptyState";

/**
 * @description Пропси для компонента `ResultsDisplay`.
 */
type ResultsDisplayProps = Pick<
  AnalysisResultsProps,
  "categories" | "overallSummary"
>;

/**
 * @description Підкомпонент для відображення результатів. Мемоїзований для запобігання
 * ре-рендерам, якщо пропси `categories` та `overallSummary` не змінилися.
 * @component
 */
const ResultsDisplay: React.FC<ResultsDisplayProps> = React.memo(
  ({ categories, overallSummary }) => (
    <div className="p-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <section
            key={category.name}
            className="rounded-none border border-black bg-white p-4"
            aria-labelledby={`category-heading-${category.name}`}
          >
            <h3
              id={`category-heading-${category.name}`}
              className="font-mono font-medium text-h3-mobile normal-case text-black mb-2 lg:text-h3-desktop"
            >
              {category.name}
            </h3>
            <p className="font-mono font-bold text-h2-mobile text-blue-accent mb-3 lg:text-h2-desktop">
              {category.percentage !== null ? `${category.percentage}%` : "--%"}
            </p>
            <p className="font-mono font-normal text-body-main leading-body text-black">
              {category.explanation ||
                "Analysis is pending or was not returned for this category."}
            </p>
          </section>
        ))}
      </div>

      {overallSummary && (
        <section
          className="rounded-none border border-black bg-white p-4 mt-4"
          aria-labelledby="overall-summary-heading"
        >
          <h3
            id="overall-summary-heading"
            className="font-mono font-medium text-h3-mobile normal-case text-black mb-2 lg:text-h3-desktop"
          >
            OVERALL SUMMARY
          </h3>
          <p className="font-mono font-normal text-body-main leading-body text-black">
            {overallSummary}
          </p>
        </section>
      )}
    </div>
  )
);
ResultsDisplay.displayName = "ResultsDisplay";

/**
 * @description
 * Рендерить всю секцію результатів аналізу, включаючи заголовок та
 * один з трьох можливих станів: Завантаження, Результати, або Порожній стан.
 *
 * @component
 * @param {AnalysisResultsProps} props - Пропси компонента.
 * @example
 * <AnalysisResults
 *   categories={[{ name: 'Toxicity', percentage: 10, explanation: 'Low toxicity' }]}
 *   isAnalyzing={false}
 *   overallSummary="The text is generally safe."
 * />
 */
const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  categories,
  isAnalyzing,
  overallSummary,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const hasResults = useMemo(
    () => categories.some((cat) => cat.percentage !== null) || !!overallSummary,
    [categories, overallSummary]
  );

  const handleCopy = useCallback(() => {
    if (!hasResults) return;

    const details = categories
      .map(
        (category) =>
          `${category.name}: ${
            category.percentage !== null ? `${category.percentage}%` : "--%"
          }\n${
            category.explanation || "Analysis not available for this category."
          }`
      )
      .join("\n\n");

    const textToCopy = `OVERALL SUMMARY:\n${overallSummary}\n\n---DETAILS---\n\n${details}`;

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), COPY_SUCCESS_TIMEOUT);
      },
      (err) => {
        console.error("Error: Failed to copy results to clipboard.", err);
      }
    );
  }, [categories, overallSummary, hasResults]);

  // Створення контенту один раз для уникнення дублювання логіки в JSX
  const content = useMemo(() => {
    if (isAnalyzing) {
      return <LoadingState />;
    }
    if (hasResults) {
      return (
        <ResultsDisplay
          categories={categories}
          overallSummary={overallSummary}
        />
      );
    }
    return <EmptyState />;
  }, [isAnalyzing, hasResults, categories, overallSummary]);

  const resultsTitleText = "ANALYSIS RESULTS";
  const copyLabel = "Copy results";
  const copiedLabel = "Copied!";

  const isCopyButtonDisabled = !hasResults || isAnalyzing || isCopied;

  return (
    <div className="rounded-none border border-black bg-white">
      {/* Заголовок секції */}
      <header className="flex items-center justify-between border-b border-black px-4 py-3">
        <h2 className="font-mono font-medium uppercase text-ui-label text-black">
          {resultsTitleText}
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          disabled={isCopyButtonDisabled}
          className={`
            rounded-none border border-black p-2 transition-colors duration-100 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent
            ${
              isCopied
                ? "cursor-default bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
            }
            ${
              isCopyButtonDisabled && !isCopied
                ? "cursor-not-allowed border-text-disabled text-text-disabled"
                : ""
            }
          `}
          aria-label={isCopied ? copiedLabel : copyLabel}
          title={isCopied ? copiedLabel : copyLabel}
        >
          <span aria-live="polite" className="sr-only">
            {isCopied ? copiedLabel : copyLabel}
          </span>
          {isCopied ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            <Copy size={16} strokeWidth={2} />
          )}
        </button>
      </header>

      {/* Умовний рендеринг одного з трьох станів */}
      {content}
    </div>
  );
};

export default React.memo(AnalysisResults);
