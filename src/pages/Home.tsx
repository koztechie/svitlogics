// src/pages/Home.tsx

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

import AnalysisResults, {
  AnalysisResultsProps,
  Category,
} from "../components/AnalysisResults";
import TextInput from "../components/TextInput";
import LanguageSelector, {
  AnalysisLanguage,
} from "../components/LanguageSelector";
import {
  startAnalysis,
  checkAnalysisStatus,
  AnalysisStatusResponse,
} from "../services/aiApiService";

// --- Типи, Константи та Кастомні Хуки ---

/** @description Тип для стану API-запиту, що використовується в машині станів. */
type ApiStatus = "idle" | "loading" | "polling" | "success" | "error";

/** @description Структура стану, керованого кастомним хуком `useTextAnalysis`. */
interface AnalysisState {
  status: ApiStatus;
  data: Omit<AnalysisResultsProps, "isAnalyzing">;
  error: string | null;
}

/** @description Початковий стан для результатів аналізу. */
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
const POLLING_INTERVAL = 3000; // ms
const ANALYSIS_TIMEOUT = 90000; // ms

/**
 * @description Кастомний хук, що інкапсулює всю логіку, пов'язану з процесом аналізу тексту.
 * @returns {{
 *   analysisState: AnalysisState,
 *   start: (text: string, language: AnalysisLanguage) => Promise<void>,
 *   reset: () => void
 * }} Об'єкт зі станом аналізу та функціями для керування ним.
 */
const useTextAnalysis = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    status: "idle",
    data: initialResultsState,
    error: null,
  });

  const pollingRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const cleanupTimers = useCallback(() => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return cleanupTimers;
  }, [cleanupTimers]);

  const handleAnalysisSuccess = useCallback(
    (result: NonNullable<AnalysisStatusResponse["data"]>) => {
      cleanupTimers();
      const updatedCategories: Category[] = result.analysis_results.map(
        (backendCategory) => ({
          name: backendCategory.category_name,
          percentage: backendCategory.percentage_score,
          explanation: backendCategory.justification,
        })
      );
      const finalCategories = initialResultsState.categories.map(
        (cat) => updatedCategories.find((upd) => upd.name === cat.name) || cat
      );
      setAnalysisState({
        status: "success",
        data: {
          categories: finalCategories,
          overallSummary: result.overall_summary || "",
        },
        error: null,
      });
    },
    [cleanupTimers]
  );

  const handleAnalysisFailure = useCallback(
    (errorMessage: string) => {
      cleanupTimers();
      setAnalysisState((prev) => ({
        ...prev,
        status: "error",
        data: initialResultsState,
        error: errorMessage,
      }));
    },
    [cleanupTimers]
  );

  const start = useCallback(
    async (text: string, language: AnalysisLanguage) => {
      cleanupTimers();
      setAnalysisState({
        status: "loading",
        data: initialResultsState,
        error: null,
      });

      try {
        const { taskId } = await startAnalysis(text, language);
        setAnalysisState((prev) => ({ ...prev, status: "polling" }));

        timeoutRef.current = setTimeout(
          () =>
            handleAnalysisFailure(
              "Error: Server response timed out. Please try again."
            ),
          ANALYSIS_TIMEOUT
        );

        pollingRef.current = setInterval(async () => {
          try {
            const statusResponse = await checkAnalysisStatus(taskId);
            if (statusResponse.status === "completed" && statusResponse.data) {
              handleAnalysisSuccess(statusResponse.data);
            } else if (statusResponse.status === "failed") {
              handleAnalysisFailure(
                `Error: ${
                  statusResponse.error || "Analysis failed on the server."
                }`
              );
            }
          } catch (pollError: any) {
            handleAnalysisFailure(
              `Error: Failed to check analysis status. ${pollError.message}`
            );
          }
        }, POLLING_INTERVAL);
      } catch (startError: any) {
        handleAnalysisFailure(
          `Error: Failed to start analysis. ${startError.message}`
        );
      }
    },
    [cleanupTimers, handleAnalysisSuccess, handleAnalysisFailure]
  );

  const reset = useCallback(() => {
    cleanupTimers();
    setAnalysisState({
      status: "idle",
      data: initialResultsState,
      error: null,
    });
  }, [cleanupTimers]);

  return { analysisState, start, reset };
};

/**
 * @description Безпечно рендерить HTML-рядок, попередньо очистивши його.
 * @param {string} rawHtml - Необроблений HTML-рядок.
 * @returns {{ __html: string }} Об'єкт, сумісний з `dangerouslySetInnerHTML`.
 */
const createSanitizedHtml = (rawHtml: string): { __html: string } => {
  const styledHtml = rawHtml.replace(
    /<em>(.*?)<\/em>/g,
    '<em class="not-italic font-medium">$1</em>'
  );
  const sanitizedHtml = DOMPurify.sanitize(styledHtml, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ["strong", "em"],
  });
  return { __html: sanitizedHtml };
};

/** @description Статичний контент сторінки. */
const content = {
  seoTitle:
    "Svitlogics | AI Text Analysis Tool for Disinformation, Bias, and Manipulation",
  seoDescription:
    "An AI tool for analyzing text for manipulation, propaganda, and bias. Svitlogics provides structured insights to empower critical thinking. Supports English and Ukrainian.",
  canonicalUrl: "https://svitlogics.com/",
  mainHeading: "TEXT ANALYSIS FOR DISINFORMATION & MANIPULATION",
  introParagraph:
    "An independent AI tool that analyzes text for propaganda, bias, and manipulation. Svitlogics provides structured insights to aid critical thinking.",
  newSection: {
    title: "Methodology and mission",
    paragraphs: [
      "My mission with Svitlogics is direct: to provide an accessible, transparent tool for identifying manipulative techniques. I developed it as a solo project from Kyiv, Ukraine, driven by the need to counter pervasive information warfare. The core principle is that understanding <em>how</em> manipulation works is the first step toward resisting it.",
      "A high-availability cascade of Google AI models, including the Gemini and Gemma families, performs the analysis. This system ensures reliability by automatically falling back to an alternative model if a primary one is at capacity. Each model is guided by a detailed, custom-calibrated system prompt, which instructs the AI to assess the text against five core criteria.",
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
      'It is important to understand that <strong>no AI analysis is 100% infallible</strong>. Svitlogics is not designed to deliver a final "truth" verdict. Its purpose is to provide structured data and justifications, empowering the user to form their own, more informed conclusions.',
  },
};

/**
 * @description Головна сторінка застосунку.
 * @component
 */
const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [analysisLanguage, setAnalysisLanguage] =
    useState<AnalysisLanguage>("en");
  const { analysisState, start, reset } = useTextAnalysis();

  const isAnalyzing =
    analysisState.status === "loading" || analysisState.status === "polling";

  useEffect(() => {
    const storedLang = localStorage.getItem("svitlogics_language");
    if (storedLang === "uk" || storedLang === "en") {
      setAnalysisLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("svitlogics_language", analysisLanguage);
  }, [analysisLanguage]);

  const handleAnalyze = useCallback(() => {
    const trimmedText = text.trim();
    if (!trimmedText || trimmedText.length > SAFE_CHARACTER_LIMIT) {
      return;
    }
    start(trimmedText, analysisLanguage);
  }, [text, analysisLanguage, start]);

  const handleClear = useCallback(() => {
    setText("");
    reset();
  }, [reset]);

  const handleLanguageChange = useCallback(
    (lang: AnalysisLanguage) => {
      setAnalysisLanguage(lang);
      if (analysisState.status !== "idle") {
        reset();
      }
    },
    [analysisState.status, reset]
  );

  const softwareAppJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Svitlogics",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "WebPlatform",
      description: content.seoDescription,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Eugene Kozlovsky",
      },
    }),
    []
  );

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href={content.canonicalUrl} />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content={content.canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(softwareAppJsonLd)}
        </script>
      </Helmet>

      <div className="container-main space-y-16">
        <header>
          <h1 className="mb-4 font-bold text-black text-h1-mobile md:uppercase lg:text-h1-desktop">
            {content.mainHeading}
          </h1>
          <p className="max-w-3xl text-body-main text-black">
            {content.introParagraph}
          </p>
        </header>

        <main className="space-y-16">
          <section
            aria-labelledby="analysis-form-heading"
            className="space-y-8"
          >
            <h2 id="analysis-form-heading" className="sr-only">
              Analysis Tool
            </h2>
            <LanguageSelector
              selectedLanguage={analysisLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <TextInput
              text={text}
              setText={setText}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
              maxLength={SAFE_CHARACTER_LIMIT}
            />
          </section>

          <section aria-live="polite" aria-atomic="true">
            {analysisState.error && (
              <div
                role="alert"
                className="mb-8 border-2 border-status-error bg-white p-4 text-status-error"
              >
                <strong className="font-medium uppercase text-ui-label">
                  Error:{" "}
                </strong>
                <span className="text-body-main">
                  {analysisState.error.replace("Error: ", "")}
                </span>
              </div>
            )}
            <AnalysisResults
              categories={analysisState.data.categories}
              isAnalyzing={isAnalyzing}
              overallSummary={analysisState.data.overallSummary}
            />
          </section>

          <section
            aria-labelledby="methodology-heading"
            className="mx-auto max-w-3xl"
          >
            <h2
              id="methodology-heading"
              className="mb-6 font-semibold text-black text-h2-mobile lg:text-h2-desktop"
            >
              {content.newSection.title}
            </h2>
            <div className="space-y-4 text-body-main text-black">
              {content.newSection.paragraphs.map((p, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={createSanitizedHtml(p)}
                />
              ))}
              <ul className="ml-6 list-disc space-y-2 pt-2">
                {content.newSection.criteria.map((criterion, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={createSanitizedHtml(criterion)}
                  />
                ))}
              </ul>
              <p
                className="pt-2"
                dangerouslySetInnerHTML={createSanitizedHtml(
                  content.newSection.finalParagraph
                )}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
