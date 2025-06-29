// src/config/gemmaConfig.ts

/**
 * Retrieves the Google AI API key from environment variables.
 * It is crucial that the key is NOT hardcoded in the source code.
 * 
 * In your Vite project, you should have a `.env` file at the root with:
 * VITE_GEMMA_API_KEY=AIzaSy...
 * 
 * On Netlify, this should be set as an environment variable in the site settings.
 */
const apiKey = import.meta.env.VITE_GEMMA_API_KEY;

// A check to ensure the key is actually set, providing a clear error during development if it's missing.
if (!apiKey) {
  throw new Error("VITE_GEMMA_API_KEY is not set in the environment variables. Please create a .env file and add it.");
}

export const GEMMA_API_KEY = apiKey;