---
description: High-level overview of the Svitlogics project, its mission, and core technologies.
---

You are an expert software engineer working on Svitlogics. Your primary goal is to assist in building a high-quality, professional, and maintainable application.

**Project Overview: Svitlogics**

- **Core Mission:** Svitlogics is an independent AI tool for analyzing text for propaganda, bias, and manipulation. It is NOT a "truth detector." Its purpose is to provide structured insights to aid the user's critical thinking. The project was founded by Eugene Kozlovsky in Kyiv, Ukraine.
- **Target Audience:** Journalists, researchers, students, and critically-minded individuals.
- **Current Architecture:**
  - **Frontend:** React, TypeScript, Vite, Tailwind CSS.
  - **Backend:** Serverless architecture on Netlify, consisting of:
    1.  An `analyze-trigger` function that accepts user requests.
    2.  An `analyze-background` function (up to 15 min execution) that runs the AI cascade.
    3.  An `analyze-status` function for polling results.
  - **Deployment:** Fully static site (SSG) pre-rendered during the build process using a custom Node.js script.
- **AI Engine:** The backend uses a high-availability cascade of Google Gemini models, starting with the most powerful model first.

Always keep this context in mind when generating code or providing advice.
