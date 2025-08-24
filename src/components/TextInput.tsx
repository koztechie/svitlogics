import React, { useState, useCallback, useMemo } from "react";
import { Copy, Trash2, Check, AlertCircle } from "lucide-react";
import clsx from "clsx";

// --- Типізація та Константи ---

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isAnalyzing: boolean;
  maxLength: number;
}

const UI_TEXT = {
  inputTitle: "TEXT INPUT",
  placeholder: "Enter or paste your text here for analysis...",
  copyLabel: "Copy text",
  copiedLabel: "Copied!",
  clearLabel: "Clear text",
  analyzeButton: "ANALYZE",
  // --- ВИПРАВЛЕННЯ ТУТ: Правильна назва властивості ---
  analyzingButtonText: "ANALYZING...",
  charactersLabel: "CHARACTERS:",
  wordsLabel: "WORDS:",
} as const;

const COPY_SUCCESS_TIMEOUT = 2000;

// --- Головний Компонент ---
const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  onAnalyze,
  onClear,
  isAnalyzing,
  maxLength,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const metrics = useMemo(() => {
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const isOverLimit = charCount > maxLength;
    const hasText = charCount > 0;
    return { charCount, wordCount, isOverLimit, hasText };
  }, [text, maxLength]);

  const handleCopy = useCallback(() => {
    if (!metrics.hasText || isCopied) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_SUCCESS_TIMEOUT);
    });
  }, [text, metrics.hasText, isCopied]);

  return (
    <div className="border-1 border-black bg-white">
      <header className="flex items-center justify-between border-b-1 border-black px-4 py-2">
        <label
          htmlFor="text-input-area"
          className="font-medium uppercase text-black text-ui-label"
        >
          {UI_TEXT.inputTitle}
        </label>
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!metrics.hasText || isAnalyzing || isCopied}
            className="border-1 border-black p-2 text-black transition-colors duration-100 enabled:hover:bg-black enabled:hover:text-white disabled:cursor-not-allowed disabled:border-disabled disabled:text-text-disabled"
            aria-label={isCopied ? UI_TEXT.copiedLabel : UI_TEXT.copyLabel}
            title={isCopied ? UI_TEXT.copiedLabel : UI_TEXT.copyLabel}
          >
            {isCopied ? (
              <Check size={16} strokeWidth={3} />
            ) : (
              <Copy size={16} strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={!metrics.hasText || isAnalyzing}
            className="border-1 border-black p-2 text-black transition-colors duration-100 enabled:hover:bg-black enabled:hover:text-white disabled:cursor-not-allowed disabled:border-disabled disabled:text-text-disabled"
            aria-label={UI_TEXT.clearLabel}
            title={UI_TEXT.clearLabel}
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className="relative">
        <textarea
          id="text-input-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={UI_TEXT.placeholder}
          className="w-full min-h-[250px] border-none bg-white p-4 font-mono text-body-main text-black placeholder:text-text-secondary focus:outline-none focus:ring-0"
          disabled={isAnalyzing}
          autoComplete="off"
          aria-invalid={metrics.isOverLimit}
        />
      </div>

      <footer className="flex flex-col items-center justify-between gap-4 border-t-1 border-black p-4 sm:flex-row">
        <div
          className={clsx("font-mono text-ui-label", {
            "text-status-error": metrics.isOverLimit,
            "text-text-secondary": !metrics.isOverLimit,
          })}
        >
          {metrics.isOverLimit && (
            <AlertCircle
              size={16}
              className="mr-2 inline-block text-status-error"
            />
          )}
          <span>{UI_TEXT.charactersLabel}</span>
          <span className="font-medium text-black"> {metrics.charCount}</span>
          <span> / {maxLength}</span>
          <span className="ml-4">{UI_TEXT.wordsLabel}</span>
          <span className="font-medium text-black"> {metrics.wordCount}</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing || !metrics.hasText || metrics.isOverLimit}
          className="w-full border-1 border-blue-accent bg-blue-accent px-8 py-3 font-bold uppercase text-ui-label text-white transition-colors duration-100 enabled:hover:bg-blue-accent-hover enabled:active:bg-blue-accent-active disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled disabled:text-text-disabled sm:w-auto"
        >
          {isAnalyzing ? UI_TEXT.analyzingButtonText : UI_TEXT.analyzeButton}
        </button>
      </footer>
    </div>
  );
};

export default React.memo(TextInput);
