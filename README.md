<div align="center">
  <a href="https://svitlogics.com" title="Access the Instrument">
    <img src="./assets/readme/SvitlogicsLogo.svg" alt="Svitlogics Logo" width="140"/>
  </a>
</div>

<h1 align="center" style="border: none; margin-top: 20px; margin-bottom: 0;">SVITLOGICS</h1>

<p align="center">
  <strong>AN INSTRUMENT FOR DECONSTRUCTING NARRATIVES.</strong>
</p>

<p align="center">
  This is not a "truth machine." It is a tool engineered to dissect text, revealing the architecture of manipulation. It operates on a single principle: to resist manipulation, you must first understand its mechanics.
</p>

<p align="center">
  <code>STATUS: PUBLIC BETA</code>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <code>LICENSE: MIT</code>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <code>CONTRIBUTIONS: WELCOME</code>
</p>

---

## I. GENESIS: A REACTION TO WEAPONIZED NARRATIVE

Svitlogics was not born from a business plan. It was forged in Kyiv, Ukraine, as a direct reaction to the daily reality of information warfare. Its genesis was a single, viral post that masterfully weaponized human tragedy to normalize poor service—a microcosm of the sophisticated manipulation that defines the modern information environment. People saw patriotism; I saw a meticulously constructed deception.

This project is the operationalization of that dissent. It is a solo-developed, fully open-source instrument built on the conviction that clarity is a form of resistance.

## II. THE INSTRUMENT: METHODOLOGY OF DECONSTRUCTION

The Service rejects the simplistic binary of "true/false." Instead, it provides a structured, multi-vector analysis to expose the underlying framework of influence. All submitted text is processed against five core criteria, with the AI functioning as an analyst, not a judge.

| Criterion                  | Function                                                                    |
| :------------------------- | :-------------------------------------------------------------------------- |
| **Manipulative Content**   | Identifies logical fallacies, emotional appeals, and psychological tactics. |
| **Propagandistic Content** | Detects elements of systematic, one-sided ideological campaigns.            |
| **Disinformation**         | Assesses for verifiably false information presented with intent to deceive. |
| **Unbiased Presentation**  | Evaluates the text's commitment to fairness, objectivity, and balance.      |
| **Emotional Tone**         | Analyzes the underlying sentiment and its intensity.                        |

The output is a data-driven report. It is not an answer. It is a tool designed to help you formulate better questions. The final judgment remains with the user.

> **OPERATIONAL CAVEAT:** No AI is infallible. This instrument is an auxiliary for human critical thinking, not a replacement. Use at your own discretion.

## III. ARCHITECTURE: ZERO-TRUST, STATELESS, SERVERLESS

The system is engineered for absolute security and user privacy. There are no compromises.

- **DATA HANDLING**: The service is **stateless**. User-submitted text is processed in-memory and **never stored**. The most secure data is the data that does not exist.
- **EXECUTION ENVIRONMENT**: The core analysis engine operates within a **secure, serverless back-end** ([Netlify Functions](https://www.netlify.com/platform/functions/)). The client-side application (React/Vite) only ever communicates with our own trusted API gateway.
- **AI ENGINE**: Analysis is performed by a high-availability cascade of premium **Google Gemini 2.5** models. All API key interactions are isolated on the server, eliminating any possibility of client-side exposure.
- **PERFORMANCE**: The front-end is delivered as a **pre-rendered static site (SSG)**, ensuring near-zero load times. The back-end is asynchronous, capable of handling extended processing without timeouts.

This is a zero-trust architecture. We do not trust the client. We do not store user data.

## IV. AESTHETIC: PURE MINIMALIST-BRUTALIST

The design is a function. It is an extension of the mission.

> The user interface is unapologetically clear. Every element, from the universal use of `IBM Plex Mono` to the stark black-and-white palette, is a deliberate choice to support clarity and transparency. The user experience is designed to be as direct and honest as the analysis it presents.

This is a **zero-embellishment** environment. No rounded corners, no shadows, no gradients, no decorative animations. The aesthetic is raw, geometric, and functional. It is a reflection of the tool's purpose: to strip away the artifice and reveal the underlying structure.

## V. DEPLOYMENT & DEVELOPMENT

This repository contains the full source code for the Svitlogics web application.

### Prerequisites

- Node.js (v18+)
- npm
- Netlify CLI

### Local Execution Protocol

1.  **Clone Repository:**

    ```sh
    git clone https://github.com/koztechie/svitlogics.git && cd svitlogics
    ```

2.  **Install Dependencies:**

    ```sh
    npm install
    ```

3.  **Configure Environment:**

    - Duplicate the example environment file: `cp .env.example .env.local`
    - Populate `.env.local` with the necessary API keys (`GOOGLE_AI_KEY`, `TURNSTILE_SECRET_KEY`) and public variables (`VITE_GTM_ID`, `VITE_TURNSTILE_SITE_KEY`).

4.  **Initiate Local Server:**
    ```sh
    netlify dev
    ```
    The application will be served on `http://localhost:8888`.

## VI. CONTRIBUTIONS

This is an open-source project. Independent analysis and contributions are encouraged. All contributions will be reviewed for alignment with the core mission and technical standards.

See [CONTRIBUTING.md](CONTRIBUTING.md) for operational guidelines.

## VII. LICENSE

**MIT License**. You are free to use, modify, and distribute this code. See `LICENSE` for full terms.

---

<div align="center">
  EUGENE KOZLOVSKY // KYIV, UKRAINE
</div>
