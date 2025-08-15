import React, { useState, useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

import AnalysisResults, {
  AnalysisResultsProps,
  Category, // Імпортуємо тип Category для типізації
} from "../components/AnalysisResults";
import TextInput from "../components/TextInput";
import LanguageSelector, {
  AnalysisLanguage,
} from "../components/LanguageSelector";
import { startAnalysis, checkAnalysisStatus } from "../services/aiApiService";

// ВИДАЛЕНО: Непотрібні імпорти промптів
// import SYSTEM_PROMPT_EN from "../config/gemma_system_prompt_en.txt?raw";
// import SYSTEM_PROMPT_UK from "../config/gemma_system_prompt_uk.txt?raw";

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

  const handleAnalyze = useCallback(async () => {
    const inputText = text.trim();
    setApiError(null);
    resetAnalysisDisplay();

    if (!inputText) {
      setApiError("Error: Input text is required for analysis.");
      return;
    }
    if (inputText.length > maxChars) {
      setApiError(
        `Error: Text exceeds the maximum length of ${maxChars} characters.`
      );
      return;
    }

    setIsAnalyzing(true);

    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    try {
      const { taskId } = await startAnalysis(inputText, analysisLanguage);

      const ANALYSIS_TIMEOUT = 90000; // 90 секунд
      timeoutRef.current = setTimeout(() => {
        clearInterval(pollingIntervalRef.current!);
        setIsAnalyzing(false);
        setApiError(
          "Error: Analysis timed out. The server may be under heavy load. Please try again."
        );
      }, ANALYSIS_TIMEOUT);

      pollingIntervalRef.current = setInterval(async () => {
        try {
          const statusResponse = await checkAnalysisStatus(taskId);

          if (statusResponse.status === "completed" && statusResponse.data) {
            clearInterval(pollingIntervalRef.current!);
            clearTimeout(timeoutRef.current!);
            setIsAnalyzing(false);

            const result = statusResponse.data;

            const updatedCategories: Category[] = result.analysis_results.map(
              (backendCategory) => ({
                name: backendCategory.category_name,
                percentage: backendCategory.percentage_score,
                explanation: backendCategory.justification,
              })
            );

            const finalCategories = initialResultsState.categories.map(
              (cat) =>
                updatedCategories.find((upd) => upd.name === cat.name) || cat
            );

            setAnalysisData({
              categories: finalCategories,
              overallSummary: result.overall_summary || "",
            });
          } else if (statusResponse.status === "failed") {
            clearInterval(pollingIntervalRef.current!);
            clearTimeout(timeoutRef.current!);
            setIsAnalyzing(false);
            setApiError(
              `Error: ${
                statusResponse.error || "Analysis failed on the server."
              }`
            );
          }
        } catch (pollError: any) {
          clearInterval(pollingIntervalRef.current!);
          clearTimeout(timeoutRef.current!);
          setIsAnalyzing(false);
          setApiError(`Error checking status: ${pollError.message}`);
        }
      }, 3000);
    } catch (e: any) {
      console.error("Error starting analysis:", e);
      setIsAnalyzing(false);
      setApiError(`Error: ${e.message}`);
    }
  }, [text, analysisLanguage, maxChars, resetAnalysisDisplay]);

  const softwareAppJsonLd = {
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
  };

  return (
    <>
      <Helmet>
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href="https://svitlogics.com/" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content="https://svitlogics.com/" />
        <script type="application/ld+json">
          {JSON.stringify(softwareAppJsonLd)}
        </script>
      </Helmet>

      <div className="container-main pt-16">
        <section>
          <div className="w-full">
            <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4 text-left">
              {content.mainHeading}
            </h1>
            <p className="font-mono text-body-main leading-body text-black max-w-3xl">
              {content.introParagraph}
            </p>
          </div>
        </section>
      </div>

      <div className="container-main pt-12 lg:pt-16 pb-16">
        <div className="space-y-12 lg:space-y-16">
          <section id="analysis-form-section" className="space-y-8">
            <LanguageSelector
              selectedLanguage={analysisLanguage}
              onLanguageChange={(lang) => {
                setAnalysisLanguage(lang);
                resetAnalysisDisplay();
                setApiError(null);
              }}
            />
            <TextInput
              text={text}
              setText={setText}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
              maxLength={maxChars}
            />
          </section>

          <section aria-live="polite" aria-atomic="true">
            {apiError && (
              <div className="p-4 border-2 border-status-error bg-white text-status-error font-mono mb-8 rounded-none">
                <strong className="font-mono font-medium text-ui-label uppercase">
                  Error:
                </strong>
                <span className="font-mono font-normal text-body-main">
                  {" "}
                  {apiError.replace("Error: ", "")}
                </span>
              </div>
            )}
            <AnalysisResults
              categories={analysisData.categories}
              isAnalyzing={isAnalyzing}
              overallSummary={analysisData.overallSummary}
            />
          </section>

          <section id="methodology-section" className="max-w-3xl mx-auto">
            <h2 className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case text-center">
              {content.newSection.title}
            </h2>
            <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
              {content.newSection.paragraphs.map((p, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: p.replace(
                      /<em>(.*?)<\/em>/g,
                      '<em class="font-mono not-italic font-medium">$1</em>'
                    ),
                  }}
                />
              ))}
              <ul className="list-disc ml-6 space-y-2 pt-2">
                {content.newSection.criteria.map((criterion) => (
                  <li
                    key={criterion}
                    dangerouslySetInnerHTML={{ __html: criterion }}
                  />
                ))}
              </ul>
              <p
                className="pt-4"
                dangerouslySetInnerHTML={{
                  __html: content.newSection.finalParagraph,
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
