import React, { useState, useCallback } from "react"; // Додаємо useState
import { Copy, Check } from "lucide-react"; // Додаємо іконку Check
// import { useTranslation } from 'react-i18next';

export interface Category {
  name: string;
  percentage: number | null;
  explanation: string | null;
}

export interface AnalysisResultsProps {
  categories: Category[];
  isAnalyzing: boolean;
  overallSummary: string;
}

// Підкомпонент для стану завантаження
const LoadingState: React.FC = () => {
  return (
    <div className="p-16 text-center">
      <p className="font-mono font-medium text-ui-label uppercase text-black">
        ANALYZING...
      </p>
    </div>
  );
};

// Підкомпонент для порожнього стану
const EmptyState: React.FC = () => {
  return (
    <div className="p-16">
      <p className="text-center font-mono font-medium text-ui-label uppercase text-black">
        RESULTS WILL APPEAR HERE AFTER ANALYSIS
      </p>
    </div>
  );
};

// Підкомпонент для відображення результатів
const ResultsDisplay: React.FC<
  Pick<AnalysisResultsProps, "categories" | "overallSummary">
> = ({ categories, overallSummary }) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="border border-black p-4 bg-white rounded-none"
          >
            <h3 className="font-mono font-medium text-h3-mobile lg:text-h3-desktop normal-case text-black mb-2">
              {category.name}
            </h3>
            <p className="font-mono font-bold text-h2-mobile lg:text-h2-desktop text-blue-accent mb-3">
              {category.percentage !== null ? `${category.percentage}%` : "--%"}
            </p>
            <p className="font-mono font-normal text-body-main leading-body text-black">
              {category.explanation ||
                "Analysis is pending or was not returned for this category."}
            </p>
          </div>
        ))}
      </div>

      {overallSummary && (
        <div className="border border-black p-4 bg-white rounded-none mt-4">
          <h3 className="font-mono font-medium text-h3-mobile lg:text-h3-desktop normal-case text-black mb-2">
            OVERALL SUMMARY
          </h3>
          <p className="font-mono font-normal text-body-main leading-body text-black">
            {overallSummary}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Renders the entire analysis results section, including its header and
 * conditionally displaying one of three states: Loading, Results, or Empty.
 */
const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  categories,
  isAnalyzing,
  overallSummary,
}) => {
  const [isCopied, setIsCopied] = useState(false); // Додаємо стан для відстеження копіювання

  const hasResults =
    categories.some((cat) => cat.percentage !== null) || !!overallSummary;
  const resultsTitleText = "ANALYSIS RESULTS";
  const copyLabel = "Copy results";
  const copiedLabel = "Copied!";

  const handleCopy = useCallback(() => {
    if (!hasResults) return; // Запобіжник на випадок, якщо кнопка видима, але даних немає

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

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Скидаємо стан через 2 секунди
      })
      .catch((err) => {
        console.error("Failed to copy results:", err);
      });
  }, [categories, overallSummary, hasResults]);

  return (
    <div className="border border-black bg-white rounded-none">
      {/* Заголовок секції - з оновленою кнопкою копіювання */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black">
        <h2 className="font-mono font-medium text-ui-label uppercase text-black">
          {resultsTitleText}
        </h2>

        {/* --- ОНОВЛЕНА КНОПКА --- */}
        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasResults || isAnalyzing || isCopied}
          className={`
            p-2 border border-black rounded-none transition-colors duration-100 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent
            ${
              isCopied
                ? "bg-black text-white cursor-default"
                : "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
            }
            ${
              (!hasResults || isAnalyzing) && !isCopied
                ? "text-text-disabled border-text-disabled cursor-not-allowed"
                : ""
            }
          `}
          aria-label={isCopied ? copiedLabel : copyLabel}
          title={isCopied ? copiedLabel : copyLabel}
        >
          {isCopied ? (
            <Check size={16} strokeWidth={3} />
          ) : (
            <Copy size={16} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Умовний рендеринг одного з трьох станів */}
      {isAnalyzing ? (
        <LoadingState />
      ) : hasResults ? (
        <ResultsDisplay
          categories={categories}
          overallSummary={overallSummary}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AnalysisResults;
