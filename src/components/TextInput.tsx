/**
 * Svitlogics Text Input Component
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is a
 *   sober, functional input element, stripped of all non-essential visual
 *   elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable "specimen tray".
 * - Section Bravo (Clarity is a Moral Imperative): The component's purpose and
 *   structure are unambiguous. It is a transparent instrument for text input.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   borders (Neutral-500), background (White), text (Carbon Black), and states
 *   (Svitlogics Blue for focus, Signal Yellow for warnings).
 * - Section Delta (Typography): Uses 'Source Code Pro' (`font-mono`) for the
 *   input area to reinforce the feeling of examining raw, unprocessed data.
 *   UI text uses 'Inter' (`font-sans`) for controls and metrics.
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system (p-4, gap-4, gap-x-2) and maintains visual balance.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   input container with sharp corners, no shadows, and imperative controls.
 *   Implements the exact Input Processor specification from Section Foxtrot.
 * - Section Golf (Motion Philosophy): Uses subtle transitions for state changes
 *   (focus border, button states) that enhance understanding without distraction.
 * - Section Hotel (Copy & Tone of Voice): The component uses precise, technical
 *   language and avoids emotional or persuasive phrasing.
 */

import React, { useState, useMemo, useCallback } from "react";
import { Copy, Check, X } from "lucide-react";
import { Button } from "./ui/Button";
import { clsx } from "clsx";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isAnalyzing: boolean;
  maxLength: number;
}

const UI_TEXT = {
  charactersLabel: "Characters",
  wordsLabel: "Words",
  textareaPlaceholder:
    "System awaiting input. Paste text into the processor to begin analysis.",
  analyzeButtonLabel: "Initiate Analysis",
} as const;

/**
 * The Input Processor component, the system's "specimen tray".
 * It is a focused, stable environment for inputting text for analysis.
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Foxtrot (Input Processor): Implements the exact specification: a large
 *   textarea with a subtle `neutral-500` border that changes to `svitlogics-blue`
 *   on focus. The background is `#FFFFFF` to differentiate from the canvas.
 * - Section Delta (Typography): Uses `Source Code Pro` (`font-mono`) for the input
 *   area to reinforce the feeling of examining raw data. UI text uses 'Inter'.
 * - Section Charlie (Chromatic System): Uses `signal-yellow` for non-critical warnings
 *   (character limit), reserving `signal-red` for system failures.
 * - Section Echo (Spatial System): The control group maintains visual balance and
 *   consistent sizing, adhering to the 8px grid.
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

  const metrics = useMemo(() => {
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const isLimitExceeded = charCount > maxLength;
    const hasText = charCount > 0;
    return { charCount, wordCount, isLimitExceeded, hasText };
  }, [text, maxLength]);

  const handleCopy = useCallback(() => {
    if (!metrics.hasText || isCopied) return;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [text, metrics.hasText, isCopied]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={UI_TEXT.textareaPlaceholder}
        className="h-80 w-full resize-y border border-neutral-500 bg-white p-4 font-mono text-body text-carbon-black placeholder-neutral-500 transition-colors focus:border-svitlogics-blue focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
        disabled={isAnalyzing}
        autoComplete="off"
        spellCheck="false"
      />

      <div className="flex flex-col gap-4 border-x border-b border-neutral-500 bg-paper-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-small text-neutral-700">
          <span
            className={clsx({ "text-signal-yellow": metrics.isLimitExceeded })}
          >
            {UI_TEXT.charactersLabel}: {metrics.charCount} / {maxLength}
          </span>
          <span>
            {UI_TEXT.wordsLabel}: {metrics.wordCount}
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleCopy}
            disabled={!metrics.hasText || isAnalyzing || isCopied}
            title={isCopied ? "Copied" : "Copy Input Text"}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={onClear}
            disabled={!metrics.hasText || isAnalyzing}
            title="Clear Input"
          >
            <X size={16} />
          </Button>
          <Button
            variant="primary"
            onClick={onAnalyze}
            disabled={
              !metrics.hasText || isAnalyzing || metrics.isLimitExceeded
            }
          >
            {UI_TEXT.analyzeButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TextInput);
