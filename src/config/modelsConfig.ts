// src/config/modelsConfig.ts

/**
 * Defines the structure for a single AI model's configuration.
 */
export interface ModelConfig {
  /** The technical name of the model used in API calls (e.g., 'gemini-1.5-flash'). */
  name: string;
  /** A user-friendly name for displaying the model in the UI or logs. */
  displayName: string;
  /** The maximum number of tokens per minute (TPM) allowed for this model's free tier. */
  tpm: number;
  /** The maximum number of requests per minute (RPM) allowed for this model's free tier. */
  rpm: number;
  /** A numerical priority for the fallback system. Lower numbers indicate higher priority. */
  priority: number;
  /** Indicates if the model is currently enabled for use in the fallback cascade. */
  enabled: boolean;
  /** The maximum number of output tokens this model can generate in a single response. */
  maxOutputTokens: number;
  /** The type of model (e.g., 'gemini', 'gemma'). Useful if different models require different API endpoints. */
  type: 'gemini' | 'gemma';
}

// A private array of all potential models with their respective configurations.
const allModels: ModelConfig[] = [
  // Priority 1: The fastest and most capable primary model.
  { 
    name: 'gemini-2.5-flash', 
    displayName: 'Gemini 2.5 Flash', 
    tpm: 250_000, 
    rpm: 10, 
    priority: 1, 
    enabled: true, 
    maxOutputTokens: 8192, // Although it supports more, 8192 is more than enough for our JSON output.
    type: 'gemini' 
  },
  // Priority 2: A slightly different version, good as the first fallback.
  { 
    name: 'gemini-2.5-flash-lite-preview-06-17', 
    displayName: 'Gemini 2.5 Flash-Lite Preview', 
    tpm: 250_000, 
    rpm: 15, 
    priority: 2, 
    enabled: true, 
    maxOutputTokens: 8192,
    type: 'gemini' 
  },
  // Priority 3 & 4: Older, but very powerful models with high TPM, good for high-load scenarios.
  { 
    name: 'gemini-2.0-flash', 
    displayName: 'Gemini 2.0 Flash', 
    tpm: 1_000_000, 
    rpm: 15, 
    priority: 3, 
    enabled: true, 
    maxOutputTokens: 8192, 
    type: 'gemini' 
  },
  { 
    name: 'gemini-2.0-flash-lite', 
    displayName: 'Gemini 2.0 Flash-Lite', 
    tpm: 1_000_000, 
    rpm: 30, 
    priority: 4, 
    enabled: true, 
    maxOutputTokens: 8192, 
    type: 'gemini' 
  },
  // Priority 5 & 6: Deprecated but still functional as deeper fallbacks.
  { 
    name: 'gemini-1.5-flash', 
    displayName: 'Gemini 1.5 Flash (Deprecated)', 
    tpm: 250_000, 
    rpm: 15, 
    priority: 5, 
    enabled: true, 
    maxOutputTokens: 8192, 
    type: 'gemini' 
  },
  { 
    name: 'gemini-1.5-flash-8b', 
    displayName: 'Gemini 1.5 Flash 8B (Deprecated)', 
    tpm: 250_000, 
    rpm: 15, 
    priority: 6, 
    enabled: true, 
    maxOutputTokens: 8192, 
    type: 'gemini' 
  },
  // Priority 7: The final, most constrained fallback model. This model determines our baseline character limits.
  { 
    name: 'gemma-3-4b-it',
    displayName: 'Gemma 3 4B', 
    tpm: 15_000, 
    rpm: 30, 
    priority: 7, 
    enabled: true, 
    maxOutputTokens: 4096, // A safe value for this model.
    type: 'gemma' 
  },
];

/**
 * The final, exported array of models to be used in the application.
 * It only includes enabled models and is sorted by priority (lowest number first).
 */
export const MODELS_CASCADE: ModelConfig[] = allModels
  .filter(model => model.enabled)
  .sort((a, b) => a.priority - b.priority);