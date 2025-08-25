import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

import AnalysisResults, { Category } from "../components/AnalysisResults";
import TextInput from "../components/TextInput";
import LanguageSelector, { AnalysisLanguage } from "../components/LanguageSelector";
import { startAnalysis, checkAnalysisStatus } from "../services/aiApiService";

interface AnalysisData {
  categories: Category[];
  overallSummary: string;
}

const initialCategories: Category[] = [
  { name: "Manipulative Content", percentage: null, explanation: null },
  { name: "Propagandistic Content", percentage: null, explanation: null },
  { name: "Disinformation", percentage: null, explanation: null },
  { name: "Unbiased Presentation", percentage: null, explanation: null },
  { name: "Emotional Tone", percentage: null, explanation: null },
];

const initialAnalysisData: AnalysisData = {
  categories: initialCategories,
  overallSummary: "",
};

const SAFE_CHARACTER_LIMIT = 15000;

const createSanitizedHtml = (rawHtml: string): { __html: string } => {
  const styledHtml = rawHtml.replace(
    /<em>(.*?)<\/em>/g,
    '<em class="not-italic font-medium">$1</em>'
  );
  if (typeof window !== 'undefined') {
    return { __html: DOMPurify.sanitize(styledHtml, { USE_PROFILES: { html: true }, ALLOWED_TAGS: ["strong", "em"] }) };
  }
  return { __html: styledHtml };
};


const Home: React.FC = () => {
  const content = {
    seoTitle: "Svitlogics | AI Text Analyzer for Bias & Disinformation",
    seoDescription:
      "Analyze text for manipulation, propaganda, and bias with Svitlogics. An AI tool to empower critical thinking in English & Ukrainian. By Eugene Kozlovsky.",
    canonicalUrl: "https://svitlogics.com/",
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
  const [analysisData, setAnalysisData] = useState<AnalysisData>(initialAnalysisData);
  const [apiError, setApiError] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupTimers = useCallback(() => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return cleanupTimers;
  }, [cleanupTimers]);

  const handleClear = useCallback(() => {
    setText("");
    setAnalysisData(initialAnalysisData);
    setApiError(null);
    setIsAnalyzing(false);
    cleanupTimers();
  }, [cleanupTimers]);

  const handleAnalyze = useCallback(async () => {
    const inputText = text.trim();
    setApiError(null);
    setAnalysisData(initialAnalysisData);

    if (!inputText || inputText.length > SAFE_CHARACTER_LIMIT) {
      setApiError(
        !inputText 
        ? "Error: Input text is required for analysis." 
        : `Error: Text exceeds the maximum length of ${SAFE_CHARACTER_LIMIT} characters.`
      );
      return;
    }

    setIsAnalyzing(true);
    cleanupTimers();

    try {
      const { taskId } = await startAnalysis(inputText, analysisLanguage);

      timeoutRef.current = setTimeout(() => {
        cleanupTimers();
        setIsAnalyzing(false);
        setApiError(
          "Error: Analysis timed out. The server may be under heavy load. Please try again."
        );
      }, 90000);

      pollingIntervalRef.current = setInterval(async () => {
        try {
          const statusResponse = await checkAnalysisStatus(taskId);

          if (statusResponse.status === "completed" && statusResponse.data) {
            cleanupTimers();
            setIsAnalyzing(false);

            const result = statusResponse.data;
            const updatedCategories: Category[] = result.analysis_results.map(
              (cat) => ({
                name: cat.category_name,
                percentage: cat.percentage_score,
                explanation: cat.justification,
              })
            );

            setAnalysisData({
              categories: initialCategories.map(c => updatedCategories.find(u => u.name === c.name) || c),
              overallSummary: result.overall_summary || "",
            });
          } else if (statusResponse.status === "failed") {
            cleanupTimers();
            setIsAnalyzing(false);
            setApiError(`Error: ${statusResponse.error || "Analysis failed on the server."}`);
          }
        } catch (pollError: any) {
          cleanupTimers();
          setIsAnalyzing(false);
          setApiError(`Error checking status: ${pollError.message}`);
        }
      }, 3000);
    } catch (e: any) {
      cleanupTimers();
      setIsAnalyzing(false);
      setApiError(`Error: ${e.message}`);
    }
  }, [text, analysisLanguage, cleanupTimers]);

  useEffect(() => {
    const storedLang = localStorage.getItem("svitlogics_language");
    if (storedLang === "uk" || storedLang === "en") {
        setAnalysisLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("svitlogics_language", analysisLanguage);
  }, [analysisLanguage]);

  const softwareAppJsonLd = useMemo(() => ({
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
  }), [content.seoDescription]);

  return (
    <div>
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
                handleClear(); // Скидаємо все при зміні мови 
              }}
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
                  dangerouslySetInnerHTML={createSanitizedHtml(p)}
                />
              ))}
              <ul className="list-disc ml-6 space-y-2 pt-2">
                {content.newSection.criteria.map((criterion, index) => (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={createSanitizedHtml(criterion)}
                  />
                ))}
              </ul>
              <p
                className="pt-4"
                dangerouslySetInnerHTML={createSanitizedHtml(
                  content.newSection.finalParagraph
                )}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;