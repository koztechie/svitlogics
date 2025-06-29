import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';

import AnalysisResults, { AnalysisResultsProps } from '../components/AnalysisResults';
import TextInput from '../components/TextInput';
import LanguageSelector, { AnalysisLanguage } from '../components/LanguageSelector';
import { analyzeTextWithSvitlogicsAI, SvitlogicsAnalysisResponse, SvitlogicsErrorResponse } from '../services/gemmaApiService';

import { MODELS_CASCADE } from '../config/modelsConfig';
import { SYSTEM_PROMPT_TOKEN_COUNT, OUTPUT_BUFFER_TOKENS, CHARS_PER_TOKEN } from '../config/promptConfig';

// Початковий стан для результатів аналізу
const initialResultsState: Omit<AnalysisResultsProps, 'isAnalyzing'> = {
  categories: [
    { name: 'Manipulative Content', percentage: null, explanation: null },
    { name: 'Propagandistic Content', percentage: null, explanation: null },
    { name: 'Disinformation', percentage: null, explanation: null },
    { name: 'Unbiased Presentation', percentage: null, explanation: null },
    { name: 'Emotional Tone', percentage: null, explanation: null },
  ],
  overallSummary: '',
};

// Визначаємо найнижчий TPM з каскаду для безпечних лімітів
const weakestModelTpm = Math.min(...MODELS_CASCADE.map(m => m.tpm));

/**
 * The main page of the Svitlogics application.
 * It orchestrates the text input, language selection, analysis process, and results display.
 */
const Home: React.FC = () => {
  // const { t } = useTranslation();

  const content = {
    seoTitle: "Svitlogics | AI Text Analyzer for Bias & Disinformation",
    seoDescription: "Analyze text for manipulation, propaganda, and bias with Svitlogics. An AI tool to empower critical thinking in English & Ukrainian. By Eugene Kozlovsky.",
    mainHeading: "DISINFORMATION & MANIPULATION ANALYSIS",
    introParagraph: "An independent AI tool that analyzes text for propaganda, bias, and manipulation. Svitlogics provides structured insights to aid your critical thinking.",
    newSection: {
      title: "Methodology and mission",
      paragraphs: [
        "My mission with Svitlogics is straightforward: to provide an accessible, transparent tool for identifying manipulative techniques. I developed it as a solo project from Kyiv, Ukraine, driven by the need to counter pervasive information warfare. The core principle is that understanding <em>how</em> manipulation works is the first step toward resisting it.",
        "The analysis is performed by a high-availability cascade of Google AI models, including the Gemini and Gemma families. This system ensures reliability by automatically falling back to an alternative model if a primary one is at capacity. Each model is guided by a detailed, custom-calibrated system prompt, which instructs the AI to assess the text against five core criteria.",
        "The analysis focuses on these five areas:"
      ],
      criteria: [
        "<strong>Manipulative Content:</strong> Identifies logical fallacies, emotional appeals, and psychological tactics.",
        "<strong>Propagandistic Content:</strong> Detects elements of systematic, one-sided ideological campaigns.",
        "<strong>Disinformation:</strong> Assesses for verifiably false information presented with intent to deceive.",
        "<strong>Unbiased Presentation (Impartiality):</strong> Evaluates the text's commitment to fairness, objectivity, and balance.",
        "<strong>Emotional Tone:</strong> Analyzes the underlying sentiment and its intensity."
      ],
      finalParagraph: "It is important to understand that <strong>no AI analysis is 100% infallible</strong>. Svitlogics is not designed to deliver a final \"truth\" verdict. Its purpose is to provide structured data and justifications, empowering you to form your own, more informed conclusions."
    }
  };
  
  const [text, setText] = useState<string>('');
  const [analysisLanguage, setAnalysisLanguage] = useState<AnalysisLanguage>('en');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(initialResultsState);
  const [apiError, setApiError] = useState<string | null>(null);

  const maxChars = useMemo(() => {
    const systemPromptTokens = SYSTEM_PROMPT_TOKEN_COUNT[analysisLanguage];
    const tokenToCharRatio = CHARS_PER_TOKEN[analysisLanguage];
    const availableTokens = weakestModelTpm - systemPromptTokens - OUTPUT_BUFFER_TOKENS;
    const calculatedChars = availableTokens * tokenToCharRatio;
    return Math.floor(calculatedChars / 1000) * 1000;
  }, [analysisLanguage]);

  const resetAnalysisDisplay = useCallback(() => {
    setAnalysisData(initialResultsState);
  }, []);

  const handleAnalyze = useCallback(async () => {
    const inputText = text.trim();
    setApiError(null);
    resetAnalysisDisplay();

    if (!inputText) {
      setApiError("Error: Input text is required for analysis.");
      return;
    }
    if (inputText.length > maxChars) {
      setApiError(`Error: Text exceeds the maximum length of ${maxChars} characters for the selected language.`);
      return;
    }

    setIsAnalyzing(true);

    try {
      setIsAnalyzing(true); // Показуємо лоадер
      // В цій публічній версії основний функціонал аналізу вимкнено, оскільки пропрієтарні системні промпти видалено.
      setApiError("Error: Core analysis functionality is disabled in this public demonstration version.");
    } catch (e: any) {
      console.error("Error in handleAnalyze:", e);
      setApiError(`Error: ${e.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [text, analysisLanguage, maxChars, resetAnalysisDisplay]);

  // JSON-LD structured data for this page
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Svitlogics",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "WebPlatform",
    "description": content.seoDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Eugene Kozlovsky"
    }
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
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(softwareAppJsonLd)}
        </script>
      </Helmet>
      
      <div className="space-y-12 lg:space-y-16">
        {/* 1. Top section (H1, intro paragraph, Bolt.new badge) */}
        <section className="flex flex-col lg:flex-row lg:justify-between lg:items-start lg:gap-x-8">
          <div className="lg:w-10/12">
            <h1 className="font-mono font-bold text-h1-mobile normal-case md:uppercase lg:text-h1-desktop text-black mb-4 text-left">
              {content.mainHeading}
            </h1>
            <p className="font-mono text-body-main leading-body text-black max-w-3xl">
              {content.introParagraph}
            </p>
          </div>
          <div className="self-center mt-8 lg:mt-0 lg:self-start lg:ml-auto flex-shrink-0">
            <a href="https://bolt.new/" target="_blank" rel="noopener noreferrer" className="transition-opacity duration-100 hover:opacity-80" aria-label="Powered by Bolt.new" title="Powered by Bolt.new">
              <img 
                src="/black_circle_360x360.png" 
                alt="Powered by Bolt.new" 
                className="w-20 h-20 lg:w-[115px] lg:h-[115px]"
                width="360"
                height="360"
              />
            </a>
          </div>
        </section>
        
        {/* 2. Analyzer section (LanguageSelector, TextInput) */}
        <section className="space-y-8">
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
            isAnalyzing={isAnalyzing}
            maxLength={maxChars}
          />
        </section>
        
        {/* 3. Results & Errors section (AnalysisResults) */}
        <section aria-live="polite" aria-atomic="true">
          {apiError && (
            <div className="p-4 border-2 border-status-error bg-white text-status-error font-mono mb-8 rounded-none">
              <strong className="font-mono font-medium text-ui-label uppercase">Error:</strong> 
              <span className="font-mono font-normal text-body-main"> {apiError.replace("Error: ", "")}</span>
            </div>
          )}
          <AnalysisResults 
            categories={analysisData.categories}
            isAnalyzing={isAnalyzing} 
            overallSummary={analysisData.overallSummary}
          />
        </section>

        {/* 4. The methodology & mission section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-mono font-semibold text-h2-mobile lg:text-h2-desktop text-black mb-6 normal-case text-center">
            {content.newSection.title}
          </h2>
          <div className="space-y-4 font-mono font-normal text-body-main leading-body text-black">
            {content.newSection.paragraphs.map((p, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: p.replace(/<em>(.*?)<\/em>/g, '<em class="font-mono not-italic font-medium">$1</em>') }} />
            ))}
            <ul className="list-disc ml-6 space-y-2 pt-2">
              {content.newSection.criteria.map(criterion => (
                <li key={criterion} dangerouslySetInnerHTML={{ __html: criterion }} />
              ))}
            </ul>
            <p className="pt-4" dangerouslySetInnerHTML={{ __html: content.newSection.finalParagraph }} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;