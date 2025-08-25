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
  Category,
} from "../components/AnalysisResults";
import TextInput from "../components/TextInput";
import LanguageSelector, {
  AnalysisLanguage,
} from "../components/LanguageSelector";
import { startAnalysis, checkAnalysisStatus } from "../services/aiApiService";

const initialResultsState: Omit<AnalysisResultsProps, "isAnalyzing"> = {
  categories: [
    { name: "Manipulative Content", percentage: null, explanation: null },
    { name: "Propagandistic Content", percentage: null, explanation: null },
    { name: "Disinformation", percentage: null, explanation: null },
    { name: "Unbiased Presentation", percentage: null, explanation: null },
    { name: "Emotional Tone", percentage: null, explanation: null },
  ],
  overallSummary: "",
};

const SAFE_CHARACTER_LIMIT = 15000;

const Home: React.FC = () => {
  const content = {
    seoTitle: "Svitlogics | AI Text Analyzer for Bias & Disinformation",
    seoDescription:
      "Analyze text for manipulation, propaganda, and bias with Svitlogics. An AI tool to empower critical thinking in English & Ukrainian. By Eugene Kozlovsky.",
    mainHeading: "DISINFORMATION & MANIPULATION ANALYSIS",
    introParagraph:
      "An independent AI tool that analyzes text for propaganda, bias, and manipulation. Svitlogics provides structured insights to aid your critical thinking.",
    newSection: {
      title: "Methodology and mission",
      paragraphs: [
        "My mission with Svitlogics is straightforward: to provide an accessible, transparent tool for identifying manipulative techniques. I developed it as a solo project from Kyiv, Ukraine, driven by the need to counter pervasive information warfare. The core principle is that understanding <em>how</em> manipulation works is the first step toward resisting it.",
        "The analysis is performed by a high-availability cascade of Google AI models, including the Gemini and Gemma families. This system ensures reliability by automatically falling back to an alternative model if a primary one is at capacity. Each model is guided by a detailed, custom-calibrated system prompt, which instructs the AI to assess the text against five core criteria.",
        "The analysis focuses on these five areas:",
      ],
      criteria: [
        "<strong>Manipulative Content:</strong> Identifies logical fallacies, emotional appeals, and psychological tactics.",
        "<strong>Propagandistic Content:</strong> Detects elements of systematic, one-sided ideological campaigns.",
        "<strong>Disinformation:</strong> Assesses for verifiably false information presented with intent to deceive.",
        "<strong>Unbiased Presentation (Impartiality):</strong> Evaluates the text's commitment to fairness, objectivity, and balance.",
        "<strong>Emotional Tone:</strong> Analyzes the underlying sentiment and its intensity.",
      ],
      finalParagraph:
        'It is important to understand that <strong>no AI analysis is 100% infallible</strong>. Svitlogics is not designed to deliver a final "truth" verdict. Its purpose is to provide structured data and justifications, empowering you to form your own, more informed conclusions.',
    },
  };

  const [text, setText] = useState<string>("");
  const [analysisLanguage, setAnalysisLanguage] =
    useState<AnalysisLanguage>("en");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(initialResultsState);
  const [apiError, setApiError] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedLang = localStorage.getItem("svitlogics_language");
    if (storedLang === "uk" || storedLang === "en") {
      if (storedLang !== analysisLanguage) {
        setAnalysisLanguage(storedLang);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("svitlogics_language", analysisLanguage);
  }, [analysisLanguage]);

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const maxChars = SAFE_CHARACTER_LIMIT;

  const resetAnalysisDisplay = useCallback(() => {
    setAnalysisData(initialResultsState);
  }, []);

  const handleClear = useCallback(() => {
    setText("");
    resetAnalysisDisplay();
    setApiError(null);
    setIsAnalyzing(false);
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [resetAnalysisDisplay]);

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
        {/* --- ВИПРАВЛЕННЯ ТУТ: h2 замінено на div з ARIA-атрибутами --- */}
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
