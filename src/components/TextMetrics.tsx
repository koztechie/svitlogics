import React, { useMemo } from "react";
import { Info, FileWarning, Hash, Ruler, Pilcrow } from "lucide-react";
// import { useTranslation } from 'react-i18next';
import {
  calculateReadability,
  countSentences,
  getWordFrequency,
} from "../utils/textAnalysis";

interface TextMetricsProps {
  text: string;
}

// Підкомпонент для відображення однієї метрики
interface MetricItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, value, icon }) => (
  <li className="flex justify-between items-center font-mono text-body-main">
    <span className="flex items-center text-text-secondary">
      {icon}
      {label}:
    </span>
    <span className="font-medium text-black">{value}</span>
  </li>
);

/**
 * A component that displays statistical metrics for a given text,
 * including word count, readability scores, and top words.
 * The styling adheres to the "Pure Minimalist-Brutalist" design system.
 */
const TextMetrics: React.FC<TextMetricsProps> = ({ text }) => {
  // const { t } = useTranslation();

  const hasTextToAnalyze = useMemo(() => text.trim().length > 0, [text]);

  const metrics = useMemo(() => {
    if (!hasTextToAnalyze) return null;

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const sentenceCount = countSentences(text);
    const readability = calculateReadability(text);

    return {
      wordCount,
      sentenceCount,
      characterCount: text.length,
      avgWordsPerSentence:
        sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : "0",
      fleschKincaidScore: readability.fleschKincaid.toFixed(1),
      topWords: getWordFrequency(text).slice(0, 5),
    };
  }, [text, hasTextToAnalyze]);

  const content = {
    title: "TEXT METRICS",
    basicMetrics: "Basic metrics",
    readability: "Readability",
    topWords: "Top words",
    readabilityInfo:
      "Scores above 60 are generally considered easy to read for Flesch-Kincaid.",
    noWords: "No words to analyze.",
    emptyState: "METRICS WILL APPEAR HERE ONCE TEXT IS ENTERED.",
    metrics: {
      words: "Words",
      characters: "Characters",
      sentences: "Sentences",
      avgWordsPerSentence: "Avg. Words/Sentence",
      fleschKincaidScore: "Flesch-Kincaid Score",
    },
    topWordsOccurrence: "times",
  };

  return (
    <div className="border border-black bg-white rounded-none">
      {/* Заголовок секції - без декоративної іконки */}
      <div className="px-4 py-3 border-b border-black">
        <h2 className="font-mono font-medium text-ui-label uppercase text-black">
          {content.title}
        </h2>
      </div>

      {hasTextToAnalyze && metrics ? (
        <div className="space-y-6 p-4">
          {/* Basic Metrics Section */}
          <section aria-labelledby="basic-metrics-title">
            <h3
              id="basic-metrics-title"
              className="font-mono font-medium text-h3-desktop normal-case text-black mb-3"
            >
              {content.basicMetrics}
            </h3>
            <ul className="space-y-2">
              <MetricItem
                label={content.metrics.words}
                value={metrics.wordCount.toString()}
                icon={<Hash size={14} className="mr-2 text-text-secondary" />}
              />
              <MetricItem
                label={content.metrics.characters}
                value={metrics.characterCount.toString()}
                icon={<Ruler size={14} className="mr-2 text-text-secondary" />}
              />
              <MetricItem
                label={content.metrics.sentences}
                value={metrics.sentenceCount.toString()}
                icon={
                  <Pilcrow size={14} className="mr-2 text-text-secondary" />
                }
              />
              <MetricItem
                label={content.metrics.avgWordsPerSentence}
                value={metrics.avgWordsPerSentence}
              />
            </ul>
          </section>

          {/* Readability Section */}
          <section aria-labelledby="readability-title">
            <h3
              id="readability-title"
              className="font-mono font-medium text-h3-desktop normal-case text-black mb-3"
            >
              {content.readability}
            </h3>
            <MetricItem
              label={content.metrics.fleschKincaidScore}
              value={metrics.fleschKincaidScore}
            />
            <p className="font-mono text-ui-label text-text-secondary mt-2 flex items-center">
              <Info
                size={14}
                className="inline mr-1.5 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{content.readabilityInfo}</span>
            </p>
          </section>

          {/* Top Words Section */}
          <section aria-labelledby="top-words-title">
            <h3
              id="top-words-title"
              className="font-mono font-medium text-h3-desktop normal-case text-black mb-3"
            >
              {content.topWords}
            </h3>
            {metrics.topWords.length > 0 ? (
              <ul className="space-y-1">
                {metrics.topWords.map((word) => (
                  <li
                    key={word.word}
                    className="flex justify-between items-baseline font-mono text-body-main text-black"
                  >
                    <span>{word.word}</span>
                    <span className="text-ui-label text-text-secondary">
                      {word.count} {content.topWordsOccurrence}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-body-main text-text-secondary">
                {content.noWords}
              </p>
            )}
          </section>
        </div>
      ) : (
        /* Empty State */
        <div className="p-16 flex flex-col items-center justify-center">
          <FileWarning
            size={28}
            className="mb-3 text-black"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-center font-mono font-medium text-ui-label uppercase text-black">
            {content.emptyState}
          </p>
        </div>
      )}
    </div>
  );
};

export default TextMetrics;
