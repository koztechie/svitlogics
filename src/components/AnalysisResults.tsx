import React from "react";
// import { useTranslation } from 'react-i18next';

// Типи для пропсів
interface Category {
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
  // const { t } = useTranslation();
  return (
    <div className="p-16 text-center">
      <p className="font-mono font-medium text-ui-label uppercase text-black">
        {/* t('analysisResults.analyzing', 'ANALYZING...') */}
        ANALYZING...
      </p>
    </div>
  );
};

// Підкомпонент для порожнього стану
const EmptyState: React.FC = () => {
  // const { t } = useTranslation();
  return (
    <div className="p-16">
      <p className="text-center font-mono font-medium text-ui-label uppercase text-black">
        {/* t('analysisResults.emptyState', 'RESULTS WILL APPEAR HERE AFTER ANALYSIS') */}
        RESULTS WILL APPEAR HERE AFTER ANALYSIS
      </p>
    </div>
  );
};

// Підкомпонент для відображення результатів
const ResultsDisplay: React.FC<
  Pick<AnalysisResultsProps, "categories" | "overallSummary">
> = ({ categories, overallSummary }) => {
  // const { t } = useTranslation();
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
            {/* t('analysisResults.overallSummaryTitle', 'OVERALL SUMMARY') */}
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
  // const { t } = useTranslation();
  const hasResults =
    categories.some((cat) => cat.percentage !== null) || !!overallSummary;
  const resultsTitleText = "ANALYSIS RESULTS";

  return (
    <div className="border border-black bg-white rounded-none">
      {/* Заголовок секції - без декоративної іконки */}
      <div className="px-4 py-3 border-b border-black">
        <h2 className="font-mono font-medium text-ui-label uppercase text-black">
          {/* t('analysisResults.title', resultsTitleText) */}
          {resultsTitleText}
        </h2>
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
