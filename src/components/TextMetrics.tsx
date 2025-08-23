import React, { useState, useMemo, useCallback } from "react";
import { Trash2, Copy, Check } from "lucide-react";

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
    <div className="rounded-none border border-black bg-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-black px-4 py-3">
        <h2 className="font-mono font-medium uppercase text-ui-label text-black">
          {UI_TEXT.title}
        </h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!metrics.hasText || isAnalyzing || isCopied}
            className={`
              rounded-none border border-black p-2 transition-colors duration-100 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent
              ${
                isCopied
                  ? "cursor-default bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
              }
              ${
                !metrics.hasText || isAnalyzing
                  ? "cursor-not-allowed border-text-disabled text-text-disabled"
                  : ""
              }
            `}
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
            className="rounded-none border border-black bg-white p-2 text-black transition-colors duration-100 hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white disabled:cursor-not-allowed disabled:border-text-disabled disabled:text-text-disabled"
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
          className="h-64 w-full resize-y rounded-none border border-black bg-white p-4 font-mono font-normal text-body-main leading-body text-black placeholder-text-secondary transition-colors duration-100 focus:border-blue-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-bg-disabled"
          aria-label={UI_TEXT.textareaAriaLabel}
          disabled={isAnalyzing}
          autoComplete="off"
          aria-invalid={metrics.isLimitExceeded}
          aria-describedby="char-count-status"
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-black bg-white p-4">
        <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0">
          <div className="order-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-ui-label sm:order-1">
            <span
              id="char-count-status"
              className={
                metrics.isLimitExceeded
                  ? "text-status-error"
                  : "text-text-secondary"
              }
              aria-live="polite" // Оголошує зміни, коли ліміт перевищено
            >
              {UI_TEXT.charactersLabel}{" "}
              <strong
                className={
                  metrics.isLimitExceeded
                    ? "font-medium text-status-error"
                    : "font-medium text-black"
                }
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
            className="order-1 rounded-none border-2 px-4 py-2 font-mono font-medium uppercase text-ui-label transition-colors duration-100 active:translate-y-[0.5px] active:transform sm:order-2 border-blue-accent bg-blue-accent text-white hover:border-blue-accent-hover hover:bg-blue-accent-hover active:bg-blue-accent-active disabled:cursor-not-allowed disabled:border-text-disabled disabled:bg-bg-disabled disabled:text-text-disabled"
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
