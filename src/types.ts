// src/types.ts

/**
 * Defines the structure for a single analysis category result.
 * This is the primary data structure used throughout the application,
 * from the API service response to the UI components.
 */
export interface AnalysisCategory {
  /** The name of the category (e.g., "Manipulative Content"). */
  name: string;
  
  /** The assessed score for this category, from 0 to 100, or null if not yet analyzed. */
  percentage: number | null;
  
  /** A brief textual justification for the assigned score, or null if not yet analyzed. */
  explanation: string | null;
}

/**
 * Defines the structure for the complete, successful analysis response from the Svitlogics AI service.
 */
export interface SvitlogicsAnalysisResponse {
  analysis_results: {
    category_name: string;
    percentage_score: number;
    justification: string;
  }[];
  overall_summary: string;
  usedModelName: string;
}

/**
 * Defines the structure for an error response from the Svitlogics AI service.
 */
export interface SvitlogicsErrorResponse {
  error: string;
}