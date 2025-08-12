import React, { useState, useMemo } from "react";
import { Trash2, Copy, Check } from "lucide-react";
// import { useTranslation } from 'react-i18next';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  maxLength: number;
}

/**
 * A comprehensive text input component for Svitlogics.
 * It includes a textarea, action buttons (Copy, Clear, Analyze), and real-time metrics,
 * all styled according to the "Pure Minimalist-Brutalist" design system.
 */
const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  onAnalyze,
  isAnalyzing,
  maxLength,
}) => {
  // const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  // Тексти для UI
  const title = "TEXT INPUT";
  const copyLabel = "Copy text";
  const clearLabel = "Clear text";
  const copiedLabel = "Copied!";
  const charactersLabel = "CHARACTERS:";
  const wordsLabel = "WORDS:";
  const textareaPlaceholder = "Enter or paste your text here for analysis...";
  const textareaAriaLabel = "Text input for analysis";
  const analyzeButtonText = "ANALYZE";
  const analyzingButtonText = "ANALYZING...";

  const handleClear = () => setText("");

  const handleCopy = () => {
    if (text.trim()) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const wordCount = useMemo(
    () => (text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0),
    [text]
  );
  const charCount = text.length;
  const isLimitExceeded = maxLength ? charCount > maxLength : false;

  return (
    <div className="border border-black bg-white rounded-none">
      {/* Header - іконку видалено для відповідності дизайн-системі */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black">
        <h2 className="font-mono font-medium text-ui-label uppercase text-black">
          {title}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text.trim() || isAnalyzing || isCopied}
            className={`
              p-2 border border-black rounded-none transition-colors duration-100 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent
              ${
                isCopied
                  ? "bg-black text-white cursor-default" // Inverted style for "Copied!" state
                  : "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
              }
              ${
                (!text.trim() || isAnalyzing) && !isCopied
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
          <button
            type="button"
            onClick={handleClear}
            disabled={!text.trim() || isAnalyzing}
            className="p-2 border border-black bg-white text-black rounded-none transition-colors duration-100 
                       hover:bg-black hover:text-white 
                       focus-visible:bg-black focus-visible:text-white 
                       disabled:text-text-disabled disabled:border-text-disabled disabled:cursor-not-allowed"
            aria-label={clearLabel}
            title={clearLabel}
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={textareaPlaceholder}
          className="w-full h-64 p-4 font-mono font-normal text-body-main leading-body resize-y 
                     border border-black bg-white text-black placeholder-text-secondary 
                     focus:border-blue-accent focus:outline-none 
                     rounded-none transition-colors duration-100 
                     disabled:bg-bg-disabled disabled:cursor-not-allowed"
          aria-label={textareaAriaLabel}
          disabled={isAnalyzing}
          maxLength={maxLength}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-black bg-white">
        <div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:items-center sm:gap-y-0">
          <div className="flex flex-wrap gap-x-4 gap-y-1 order-2 sm:order-1 text-ui-label font-mono">
            <span
              className={`text-text-secondary ${
                isLimitExceeded ? "text-status-error" : ""
              }`}
            >
              {charactersLabel}{" "}
              <strong className="font-medium text-black">{charCount}</strong> /{" "}
              {maxLength}
            </span>
            <span className="text-text-secondary">
              {wordsLabel}{" "}
              <strong className="font-medium text-black">{wordCount}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onAnalyze}
            disabled={!text.trim() || isAnalyzing || isLimitExceeded}
            className="px-4 py-2 font-mono font-medium text-ui-label uppercase border-1 rounded-none order-1 sm:order-2 
                       transition-colors duration-100 
                       bg-blue-accent text-white border-blue-accent 
                       hover:bg-blue-accent-hover hover:border-blue-accent-hover 
                       active:bg-blue-accent-active active:transform active:translate-y-[0.5px] 
                       disabled:bg-bg-disabled disabled:text-text-disabled disabled:border-text-disabled disabled:cursor-not-allowed"
          >
            {isAnalyzing ? analyzingButtonText : analyzeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
