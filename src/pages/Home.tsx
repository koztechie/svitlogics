/**
 * Svitlogics Home Page
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (The Interface is a Laboratory, Not a Stage): This page serves
 *   as the primary analytical workbench. The structure is sober, functional, and
 *   devoid of theatricality. It is a controlled environment for critical inquiry.
 * - Section Bravo (Clarity is a Moral Imperative): The component hierarchy and
 *   data flow are transparent. State management is explicit and predictable.
 * - Section Bravo (Data as Inquiry, Not Verdict): The AnalysisResults component
 *   presents findings as structured observations, not absolute judgments.
 * - Section Bravo (Respect the User's Intellect): The interface provides dense,
 *   high-value information (methodology, findings) and trusts the user to process it.
 * - Section Bravo (Engineered for Focus): A single-column layout with generous
 *   whitespace and a rigid grid creates a distraction-free analytical environment.
 * - Section Delta (Typography): A strict separation between Inter (UI) and Lora
 *   (content/specimen) is maintained throughout the page.
 * - Section Echo (Spatial & Grid System): All spacing uses the 8px grid.
 *   Generous whitespace is used as a cognitive buffer.
 * - Section Foxtrot (Component Architecture): Sub-components are functional
 *   instruments, not decorative elements.
 * - Section Hotel (Copy & Tone of Voice): All microcopy is clinical, direct,
 *   and educational. There is no persuasive or colloquial language.
 */

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Helmet } from "react-helmet-async";
import AnalysisResults, {
  AnalysisFinding,
} from "../components/AnalysisResults";
import TextInput from "../components/TextInput";
import LanguageSelector, {
  AnalysisLanguage,
} from "../components/LanguageSelector";
import { startAnalysis, checkAnalysisStatus } from "../services/aiApiService";
import { Heading } from "../components/ui/Heading";

// --- Types and Constants ---

interface AnalysisData {
  findings: AnalysisFinding[];
  overallSummary: string;
}

const initialFindings: AnalysisFinding[] = [
  { findingType: "Manipulative Content", observation: null },
  { findingType: "Propagandistic Content", observation: null },
  { findingType: "Disinformation", observation: null },
  { findingType: "Unbiased Presentation", observation: null },
  { findingType: "Emotional Tone", observation: null },
];

const initialAnalysisData: AnalysisData = {
  findings: initialFindings,
  overallSummary: "",
};

const SAFE_CHARACTER_LIMIT = 15000;

// --- Content (Pure Text, No HTML) ---

const content = {
  seoTitle: "Svitlogics | AI Text Analyzer for Bias & Disinformation",
  seoDescription:
    "Analyze text for manipulation, propaganda, and bias with Svitlogics. An AI tool to empower critical thinking in English & Ukrainian. Engineered in Kyiv.",
  canonicalUrl: "https://svitlogics.com/",
  mainHeading: "Disinformation & Manipulation Analysis",
  introParagraph:
    "An independent AI tool that analyzes text for propaganda, bias, and manipulation. Svitlogics provides structured insights to aid, not replace, human critical thinking.",
  methodology: {
    title: "Methodology and Mission",
    paragraphs: [
      "The mission of Svitlogics is to provide an accessible, transparent tool for identifying manipulative techniques. This system was developed from Kyiv, Ukraine, driven by the need to counter pervasive information warfare. The core principle is that understanding how manipulation works is the first step toward resisting it.",
      "The analysis is performed by a high-availability cascade of large language models guided by a detailed, custom-calibrated system prompt, which instructs the AI to assess the text against five core criteria:",
    ],
    criteria: [
      {
        term: "Manipulative Content:",
        definition:
          "Identifies logical fallacies, emotional appeals, and psychological tactics.",
      },
      {
        term: "Propagandistic Content:",
        definition:
          "Detects elements of systematic, one-sided ideological campaigns.",
      },
      {
        term: "Disinformation:",
        definition:
          "Assesses for verifiably false information presented with intent to deceive.",
      },
      {
        term: "Unbiased Presentation:",
        definition:
          "Evaluates the text's commitment to fairness, objectivity, and balance.",
      },
      {
        term: "Emotional Tone:",
        definition: "Analyzes the underlying sentiment and its intensity.",
      },
    ],
    finalParagraph:
      "It is critical to understand that no AI analysis is infallible. Svitlogics is not designed to deliver a final “truth” verdict. Its purpose is to provide structured data and justifications, empowering you to form your own, more informed conclusions.",
  },
};

// --- Sub-components ---

const ApiErrorDisplay: React.FC<{ error: string | null }> = ({ error }) => {
  if (!error) return null;
  return (
    <div
      className="border border-signal-red bg-signal-red/10 p-4 font-sans text-small text-signal-red"
      role="alert"
    >
      <span className="font-semibold">System Error:</span>{" "}
      {error.replace("Error: ", "")}
    </div>
  );
};

const MethodologySection: React.FC<{ content: typeof content.methodology }> = ({
  content,
}) => (
  <section id="methodology-section" className="mx-auto max-w-prose">
    <Heading as="h2" className="mb-6 text-center">
      {content.title}
    </Heading>
    <div className="space-y-4 font-serif text-body text-carbon-black">
      {content.paragraphs.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
      <ul className="list-disc space-y-2 py-2 pl-6">
        {content.criteria.map((criterion, index) => (
          <li key={index}>
            <strong>{criterion.term}</strong> {criterion.definition}
          </li>
        ))}
      </ul>
      <p>
        <strong>{content.finalParagraph}</strong>
      </p>
    </div>
  </section>
);

/**
 * The main application page, serving as the user's primary "workbench".
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Laboratory, Not a Stage): The layout is structured, sober, and
 *   focused entirely on the analysis workflow.
 * - Section Delta (Typography): Strictly enforces the Inter/Lora font distinction
 *   between the UI (instrument) and content (specimen).
 * - Section Echo (Spatial System): Utilizes a single-column, focused layout with
 *   generous whitespace and adherence to the 8px grid.
 */
const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [analysisLanguage, setAnalysisLanguage] =
    useState<AnalysisLanguage>("en");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] =
    useState<AnalysisData>(initialAnalysisData);
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
          ? "Input text is required for analysis."
          : `Text exceeds the maximum length of ${SAFE_CHARACTER_LIMIT} characters.`
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
          "Analysis timed out. The server may be under heavy load. Please try again."
        );
      }, 90000);

      pollingIntervalRef.current = setInterval(async () => {
        try {
          const statusResponse = await checkAnalysisStatus(taskId);
          if (statusResponse.status === "completed" && statusResponse.data) {
            cleanupTimers();
            setIsAnalyzing(false);
            const result = statusResponse.data;
            const updatedFindings: AnalysisFinding[] =
              result.analysis_results.map((cat) => ({
                findingType: cat.category_name,
                observation: cat.justification,
              }));
            setAnalysisData({
              findings: initialFindings.map(
                (f) =>
                  updatedFindings.find(
                    (u) => u.findingType === f.findingType
                  ) || f
              ),
              overallSummary: result.overall_summary || "",
            });
          } else if (statusResponse.status === "failed") {
            cleanupTimers();
            setIsAnalyzing(false);
            setApiError(
              statusResponse.error || "Analysis failed on the server."
            );
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
      setApiError(e.message);
    }
  }, [text, analysisLanguage, cleanupTimers]);

  useEffect(() => {
    const storedLang = localStorage.getItem("svitlogics_language");
    if (storedLang === "uk" || storedLang === "en")
      setAnalysisLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("svitlogics_language", analysisLanguage);
  }, [analysisLanguage]);

  const softwareAppJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Svitlogics",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "WebPlatform",
      description: content.seoDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: "Eugene Kozlovsky" },
    }),
    [content.seoDescription]
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

      <div className="container-main py-16">
        <section className="mx-auto max-w-prose text-left">
          <Heading as="h1" className="mb-4">
            {content.mainHeading}
          </Heading>
          <p className="font-serif text-h4 text-carbon-black">
            {content.introParagraph}
          </p>
        </section>
      </div>

      <div className="container-main pb-16">
        <div className="space-y-12">
          <section id="analysis-workbench" className="space-y-8">
            <LanguageSelector
              selectedLanguage={analysisLanguage}
              onLanguageChange={(lang) => {
                setAnalysisLanguage(lang);
                handleClear();
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

          <section aria-live="polite" aria-atomic="true" className="space-y-8">
            <ApiErrorDisplay error={apiError} />
            <AnalysisResults
              findings={analysisData.findings}
              isAnalyzing={isAnalyzing}
              overallSummary={analysisData.overallSummary}
            />
          </section>

          <div className="pt-8">
            <MethodologySection content={content.methodology} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
