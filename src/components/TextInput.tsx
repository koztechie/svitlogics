import React, { useState, useMemo, useCallback } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import clsx from "clsx";

// --- Типізація та Константи ---

/**
 * @description Визначає контракт пропсів для компонента `TextInput`.
 */
interface TextInputProps {
  /** @description Поточне значення текстового поля. */
  text: string;
  /** @description Колбек для оновлення тексту. */
  setText: (text: string) => void;
  /** @description Колбек, що викликається при натисканні кнопки "Analyze". */
  onAnalyze: () => void;
  /** @description Колбек для очищення текстового поля. */
  onClear: () => void;
  /** @description Прапорець, що вказує на процес аналізу (блокує UI). */
  isAnalyzing: boolean;
  /** @description Максимальна дозволена кількість символів. */
  maxLength: number;
}

const COPY_SUCCESS_TIMEOUT = 2000; // ms

const UI_TEXT = {
  title: "TEXT INPUT",
  copyLabel: "Copy text",
  clearLabel: "Clear text",
  copiedLabel: "Copied!",
  charactersLabel: "CHARACTERS:",
  wordsLabel: "WORDS:",
  textareaPlaceholder: "Enter or paste your text here for analysis...",
  textareaAriaLabel: "Text input for analysis",
  analyzeButtonText: "ANALYZE",
  analyzingButtonText: "ANALYZING...",
} as const;

/**
 * @description
 * Комплексний компонент для вводу тексту, що включає текстове поле,
 * кнопки дій (Копіювати, Очистити, Аналізувати) та метрики в реальному часі.
 *
 * @component
 * @param {TextInputProps} props - Пропси компонента.
 */
const TextInput: React.FC<TextInputProps> = ({
  text,
  setText,
  onAnalyze,
  onClear,
  isAnalyzing,
  maxLength,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // --- Мемоїзовані обчислення та колбеки ---

  const metrics = useMemo(() => {
    const trimmedText = text.trim();
    const charCount = text.length;
    const wordCount = trimmedText
      ? trimmedText.split(/\s+/).filter(Boolean).length
      : 0;
    const isLimitExceeded = charCount > maxLength;
    const hasText = trimmedText.length > 0;

    return { charCount, wordCount, isLimitExceeded, hasText };
  }, [text, maxLength]);

  const handleCopy = useCallback(() => {
    if (!metrics.hasText || isCopied) return;

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), COPY_SUCCESS_TIMEOUT);
      },
      (err) => {
        console.error("Failed to copy text:", err);
      }
    );
  }, [text, metrics.hasText, isCopied]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <div className="border-1 border-black bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b-1 border-black px-4 py-2">
        <h2 className="font-medium uppercase text-black text-ui-label">
          {UI_TEXT.title}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!metrics.hasText || isAnalyzing || isCopied}
            className={clsx(
              "border-1 p-2 transition-colors duration-100",
              {
                "border-black bg-white text-black hover:bg-black hover:text-white":
                  !isCopied,
                "border-black bg-black text-white": isCopied,
              },
              "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled disabled:text-text-disabled"
            )}
            aria-label={isCopied ? UI_TEXT.copiedLabel : UI_TEXT.copyLabel}
            title={isCopied ? UI_TEXT.copiedLabel : UI_TEXT.copyLabel}
          >
            <span aria-live="polite" className="sr-only">
              {isCopied ? UI_TEXT.copiedLabel : ""}
            </span>
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
            className="border-1 border-black bg-white p-2 text-black transition-colors duration-100 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled disabled:text-text-disabled"
            aria-label={UI_TEXT.clearLabel}
            title={UI_TEXT.clearLabel}
          >
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Textarea */}
      <div className="p-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={UI_TEXT.textareaPlaceholder}
          className="h-64 w-full resize-y border-1 p-4 text-body-main text-black placeholder-text-secondary transition-colors duration-100 focus:border-blue-accent focus:outline-none disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled"
          aria-label={UI_TEXT.textareaAriaLabel}
          disabled={isAnalyzing}
          autoComplete="off"
          aria-invalid={metrics.isLimitExceeded}
          aria-describedby="char-count-status"
        />
      </div>

      {/* Footer */}
      <footer className="border-t-1 border-black bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="order-2 flex flex-wrap gap-x-4 gap-y-1 text-ui-label sm:order-1">
            <span
              id="char-count-status"
              className={clsx({
                "text-status-error": metrics.isLimitExceeded,
                "text-text-secondary": !metrics.isLimitExceeded,
              })}
              aria-live="polite"
            >
              {UI_TEXT.charactersLabel}{" "}
              <strong
                className={clsx("font-medium", {
                  "text-status-error": metrics.isLimitExceeded,
                  "text-black": !metrics.isLimitExceeded,
                })}
              >
                {metrics.charCount}
              </strong>{" "}
              / {maxLength}
            </span>
            <span className="text-text-secondary">
              {UI_TEXT.wordsLabel}{" "}
              <strong className="font-medium text-black">
                {metrics.wordCount}
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onAnalyze}
            disabled={
              !metrics.hasText || isAnalyzing || metrics.isLimitExceeded
            }
            className="order-1 border-1 border-blue-accent bg-blue-accent px-4 py-2 font-medium uppercase text-ui-label text-white transition-colors duration-100 hover:border-blue-accent-hover hover:bg-blue-accent-hover active:translate-y-[0.5px] active:bg-blue-accent-active disabled:cursor-not-allowed disabled:border-disabled disabled:bg-bg-disabled disabled:text-text-disabled sm:order-2"
          >
            {isAnalyzing
              ? UI_TEXT.analyzingButtonText
              : UI_TEXT.analyzeButtonText}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(TextInput);
