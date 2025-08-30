<div align="center">
  <a href="https://svitlogics.com" title="Access the Svitlogics Analysis Instrument">
    <img src="./public/logo/SvitlogicsLogo.svg" alt="Svitlogics Logo" width="120"/>
  </a>
</div>

<h1 align="center" style="border: none; margin-top: 16px; margin-bottom: 0;">Svitlogics</h1>

<p align="center">
  <strong>An instrument for the forensic analysis of text.</strong>
</p>

<p align="center">
  This system is designed to dissect text and identify the architecture of manipulation. It operates on the principle that to resist manipulative narratives, one must first understand their mechanics.
</p>

<p align="center">
  <code>STATUS: PUBLIC BETA</code>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <code>LICENSE: CUSTOM (ETHICAL USE)</code>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <code>CONTRIBUTIONS: SEE PROTOCOL</code>
</p>

---

## I. Mission

Svitlogics was engineered in Kyiv, Ukraine, as a direct response to sustained information warfare. Its singular mission is to provide a transparent, open-source instrument for deconstructing weaponized narratives. It is a tool for journalists, researchers, and individuals who require a clinical approach to textual analysis.

## II. Methodology

The Service rejects the simplistic binary of "true/false." Instead, it provides a structured, multi-vector analysis to expose the underlying framework of influence. All submitted text is processed against five core criteria, with the AI functioning as a dispassionate analyst, not a judge.

| Criterion                  | Function                                                                    |
| :------------------------- | :-------------------------------------------------------------------------- |
| **Manipulative Content**   | Identifies logical fallacies, emotional appeals, and psychological tactics. |
| **Propagandistic Content** | Detects elements of systematic, one-sided ideological campaigns.            |
| **Disinformation**         | Assesses for verifiably false information presented with intent to deceive. |
| **Unbiased Presentation**  | Evaluates the text's commitment to fairness, objectivity, and balance.      |
| **Emotional Tone**         | Analyzes the underlying sentiment and its intensity.                        |

The output is a qualitative report intended to help the user formulate better questions. The final judgment remains with the human analyst.

> **System Caveat:** No AI analysis is infallible. This instrument is an auxiliary for human critical thinking, not a replacement. All findings require user verification.

## III. System Architecture

The system is engineered for security and user privacy through a stateless, serverless, zero-trust architecture.

- **Data Handling**: The service is **stateless**. User-submitted text is processed in-memory and **never stored or logged**.
- **Execution Environment**: The core analysis engine operates within a **secure, serverless back-end** (Netlify Functions). The client-side application (React/Vite) communicates exclusively with our own trusted API gateway.
- **AI Engine**: Analysis is performed by a high-availability cascade of premium **Google Gemini 2.5** models. All API key interactions are isolated on the server.
- **Performance**: The front-end is delivered as a **pre-rendered static site (SSG)** for near-instantaneous load times. The back-end is asynchronous, capable of handling extended processing without timeouts.

## IV. Design Philosophy

The design of Svitlogics is a functional extension of its mission, governed by **The Ethos-Driven Design System**.

> The interface adopts the aesthetic of a high-consequence laboratory. It is sober, structured, and silent. The `Inter` typeface is used for all UI controls for maximum legibility, while the `Lora` typeface is used for analyzed text to create a clear cognitive separation between the instrument and the specimen. The color palette is intentionally desaturated and clinical.

This is a **zero-embellishment** environment. All decorative elements are forbidden. The aesthetic is a direct counter-argument to the noisy, manipulative digital spaces the tool is designed to analyze.

## V. Local Development

This repository contains the full source code for the Svitlogics web application.

### Prerequisites

- Node.js (v18+)
- npm
- Netlify CLI

### Execution Protocol

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
    - Populate `.env.local` with the necessary API keys and public variables.

4.  **Initiate Local Server:**
    ```sh
    netlify dev
    ```
    The application will be served on `http://localhost:8888`.

## VI. Contributions

This is an open-source project. Contributions are considered but are subject to a strict review process for alignment with the core mission and technical standards.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full protocol.

## VII. License

The Software is licensed under the **Svitlogics Software License Agreement v4.0 ("Ethical Use and Mission-Aligned License")**, which is based on the MIT License but includes critical, non-negotiable restrictions on use.

See the [LICENSE](LICENSE) file for the full terms.

---

<div align="center">
  EUGENE KOZLOVSKY // KYIV, UKRAINE
</div>
