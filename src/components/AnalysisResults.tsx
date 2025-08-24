import React, { useState, useCallback, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import clsx from "clsx";

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
 * @description Підкомпонент для стану завантаження.
 * @component
 */
const LoadingState: React.FC = React.memo(() => (
  <div className="p-4 text-center" role="status" aria-live="polite">
    <p className="font-medium uppercase text-black text-ui-label">
      ANALYZING...
    </p>
  </div>
));
LoadingState.displayName = "LoadingState";

/**
 * @description Підкомпонент для порожнього стану.
 * @component
 */
const EmptyState: React.FC = React.memo(() => (
  <div className="p-4 text-center">
    <p className="font-medium uppercase text-black text-ui-label">
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
 * @description Підкомпонент для відображення результатів.
 * @component
 */
const ResultsDisplay: React.FC<ResultsDisplayProps> = React.memo(
  ({ categories, overallSummary }) => (
    <div className="space-y-4 p-4">
      {categories.map((category) => (
        <section
          key={category.name}
          className="border-1 border-black bg-white p-4"
          aria-labelledby={`category-heading-${category.name.replace(
            /\s+/g,
            "-"
          )}`}
        >
          <h3
            id={`category-heading-${category.name.replace(/\s+/g, "-")}`}
            className="mb-2 font-medium text-black text-h3-mobile lg:text-h3-desktop"
          >
            {category.name}
          </h3>
          <p className="mb-2 font-semibold text-blue-accent text-h2-mobile lg:text-h2-desktop">
            {category.percentage !== null ? `${category.percentage}%` : "--%"}
          </p>
          <p className="text-body-main text-black">
            {category.explanation ||
              "Analysis is pending or was not returned for this category."}
          </p>
        </section>
      ))}

      {overallSummary && (
        <section
          className="border-1 border-black bg-white p-4"
          aria-labelledby="overall-summary-heading"
        >
          <h3
            id="overall-summary-heading"
            className="mb-2 font-medium text-black text-h3-mobile lg:text-h3-desktop"
          >
            OVERALL SUMMARY
          </h3>
          <p className="text-body-main text-black">{overallSummary}</p>
        </section>
      )}
    </div>
  )
);
ResultsDisplay.displayName = "ResultsDisplay";

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  // --- ВИПРАВЛЕННЯ ТУТ: Додаємо значення за замовчуванням для 'categories' ---
  categories = [],
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
    <div className="border-1 border-black bg-white">
      <header className="flex items-center justify-between border-b-1 border-black px-4 py-2">
        <div
          className="font-medium uppercase text-black text-ui-label"
          role="heading"
          aria-level={2}
        >
          {resultsTitleText}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={isCopyButtonDisabled}
          className={clsx(
            "border-1 p-2 text-black transition-colors duration-100",
            {
              "border-black bg-white hover:bg-black hover:text-white":
                !isCopied,
              "border-black bg-black text-white": isCopied,
              "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled disabled:text-text-disabled":
                true,
            }
          )}
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

      {content}
    </div>
  );
};

export default React.memo(AnalysisResults);
