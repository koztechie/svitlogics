# Svitlogics: Independent AI Disinformation Analyzer

[![Live Application](https://img.shields.io/badge/Live%20App-svitlogics.com-blue?style=for-the-badge&logo=netlify)](https://svitlogics.com/)

Svitlogics is an independent AI tool designed to reveal how text works. Developed as a solo project from Kyiv, Ukraine, for the World's Largest Hackathon, it provides a transparent analysis of manipulation, propaganda, and bias to empower critical thinking.

**Note:** This public repository contains the complete front-end application and back-end architecture code. However, the proprietary AI system prompts and environment variables have been excluded to protect the core intellectual property. The live application is fully functional.

## Core Features

-   **Multi-Faceted Analysis:** Assesses text against 5 criteria: Manipulation, Propaganda, Disinformation, Impartiality, and Emotional Tone.
-   **Resilient Back-End:** Utilizes a high-availability cascade of 7 Google AI models via Netlify Functions to ensure reliability.
-   **Minimalist-Brutalist UI:** A functional design philosophy that emphasizes clarity and directness.
-   **Bilingual:** Optimized for both English and Ukrainian texts.

## Tech Stack

-   **Platform:** Bolt.new
-   **Front-End:** React, TypeScript, Vite, Tailwind CSS
-   **Back-End:** Netlify Functions
-   **AI:** Google AI Platform (Gemini & Gemma families)

## To Run Locally (Demonstration Version)

1.  Clone the repository.
2.  Create a `.env` file based on `.env.example`. *Note: The analysis feature will be disabled without valid API keys and system prompts.*
3.  Run `npm install`.
4.  Run `npm run dev`.