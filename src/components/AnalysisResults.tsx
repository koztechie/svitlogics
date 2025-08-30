/**
 * Svitlogics Analysis Results Component (The Crown Jewel)
 *
 * Adherence to The Ethos-Driven Design System:
 * - Section Alpha (Design is an Act of Resistance): This component is the
 *   sober, functional presentation layer for the core analysis. It strips away
 *   all non-essential visual elements and decorative attributes.
 * - Section Alpha (Interface is a Laboratory): The design is calibrated for
 *   precision and objectivity, serving as a clear, predictable display for
 *   analysis data. It is the primary workbench for examining results.
 * - Section Alpha (Truth is a Process, Not a Product): The component presents
 *   evidence and observations without delivering a simplistic verdict. It shows
 *   the raw data for the user to interpret.
 * - Section Bravo (Clarity is a Moral Imperative): The structure is
 *   unambiguous. Findings are clearly separated and labeled. The copy/export
 *   function provides a clean, unadorned text report.
 * - Section Charlie (Chromatic System): Employs the prescribed palette for
 *   text (Carbon Black, Semantic colors), UI scaffolding (Neutral grays), and
 *   interactive elements (Svitlogics Blue).
 * - Section Echo (Spatial System): Enforces disciplined spacing using the 8px
 *   grid system (px-4, py-2, p-4, gap-4) and maintains visual balance.
 * - Section Delta (Typography): Strictly follows the typographic hierarchy.
 *   Uses 'Inter' (`font-sans`) for headings and labels, and 'Lora' (`font-serif`)
 *   for findings text, creating the instrument/specimen distinction.
 * - Section Foxtrot (Component Architecture): Embodies a purely functional
 *   container with sharp corners, no shadows, and imperative controls.
 *   Implements the exact Analysis Report specification from Section Foxtrot.
 * - Section Golf (Motion Philosophy): Uses subtle transitions for state changes
 *   (copy button, loading indicator) that enhance understanding without distraction.
 * - Section Hotel (Copy & Tone of Voice): The component and its exported text
 *   use precise, technical language and avoid emotional or persuasive phrasing.
 */

import React, { useState, useCallback, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { Heading } from "./ui/Heading";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

// --- Type Definition ---

export interface AnalysisFinding {
  findingType: string;
  observation: string | null;
}

export interface AnalysisResultsProps {
  findings: AnalysisFinding[];
  isAnalyzing: boolean;
  overallSummary: string;
}

const findingColorMap: Record<string, string> = {
  "Manipulative Content": "text-semantic-violet",
  "Propagandistic Content": "text-semantic-teal",
  Disinformation: "text-semantic-terracotta",
  "Unbiased Presentation": "text-semantic-slate",
  "Emotional Tone": "text-semantic-amber",
};

// --- Sub-components ---

const LoadingState: React.FC = React.memo(() => (
  <div className="p-4" role="status" aria-live="polite">
    <div className="h-1 w-full overflow-hidden bg-neutral-300">
      {/* 
        NOTE: The 'indeterminate-progress' animation should be defined in `tailwind.config.js` 
        to adhere to the system's principle of centralized motion definitions.
      */}
      <div className="h-1 w-full origin-left-right animate-[indeterminate-progress_1.5s_ease-in-out_infinite] bg-svitlogics-blue"></div>
    </div>
    <p className="mt-2 text-center font-sans text-small text-neutral-700">
      Analysis in progress...
    </p>
  </div>
));
LoadingState.displayName = "LoadingState";

const EmptyState: React.FC = React.memo(() => (
  <div className="p-8 text-center">
    <Heading as="h3">System Awaiting Input</Heading>
    <p className="mx-auto mt-2 max-w-prose font-serif text-body text-neutral-700">
      The analysis report will be rendered in this panel. Submit text via the
      processor to begin.
    </p>
  </div>
));
EmptyState.displayName = "EmptyState";

const FindingsSummary: React.FC<{
  findings: AnalysisFinding[];
  overallSummary: string;
}> = React.memo(({ findings, overallSummary }) => (
  <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
    {findings.map(
      (finding) =>
        finding.observation && (
          <Card key={finding.findingType} className="flex flex-col p-4">
            <h4
              className={`font-sans text-small font-semibold ${
                findingColorMap[finding.findingType] || "text-carbon-black"
              }`}
            >
              {finding.findingType}
            </h4>
            <p className="mt-2 flex-grow font-serif text-body text-carbon-black">
              {finding.observation}
            </p>
          </Card>
        )
    )}
    {overallSummary && (
      <Card className="p-4 md:col-span-2">
        <h4 className="font-sans text-small font-semibold text-carbon-black">
          Overall Summary
        </h4>
        <p className="mt-2 font-serif text-body text-carbon-black">
          {overallSummary}
        </p>
      </Card>
    )}
  </div>
));
FindingsSummary.displayName = "FindingsSummary";

// --- Main Component ---

/**
 * The primary component for displaying analysis results, the "Crown Jewel" of the interface.
 * Adherence to The Ethos-Driven Design System:
 * - Section Bravo (Data as Inquiry): Presents qualitative "observations", not scores.
 * - Section Delta (Typography): Strictly follows the hierarchy (h3, h4, p) and the
 *   Inter/Lora font distinction.
 * - Section Echo (Spatial System): All internal padding adheres to the 8px grid.
 * - Section Hotel (Tone): The exported text report is clinical and unadorned.
 */
const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  findings = [],
  isAnalyzing,
  overallSummary,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const hasResults = useMemo(
    () => findings.some((f) => f.observation !== null) || !!overallSummary,
    [findings, overallSummary]
  );

  const handleCopy = useCallback(() => {
    if (!hasResults) return;
    const reportText = [
      `Svitlogics Analysis Report\n`,
      `Overall Summary:\n${overallSummary || "Not available."}`,
      ...findings
        .filter((f) => f.observation)
        .map((f) => `\n---\n\n${f.findingType}:\n${f.observation}`),
    ].join("");

    navigator.clipboard.writeText(reportText.trim()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [findings, overallSummary, hasResults]);

  const content = useMemo(() => {
    if (isAnalyzing) return <LoadingState />;
    if (hasResults)
      return (
        <FindingsSummary findings={findings} overallSummary={overallSummary} />
      );
    return <EmptyState />;
  }, [isAnalyzing, hasResults, findings, overallSummary]);

  return (
    <div className="border border-neutral-500">
      <header className="flex items-center justify-between border-b border-neutral-500 bg-paper-white px-4 py-2">
        <Heading as="h3">Analysis Report</Heading>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleCopy}
          disabled={!hasResults || isAnalyzing || isCopied}
          title={isCopied ? "Copied" : "Export Report as Text"}
          aria-label={isCopied ? "Report Copied" : "Export Report as Text"}
        >
          {isCopied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
        </Button>
      </header>
      {content}
    </div>
  );
};

export default React.memo(AnalysisResults);
