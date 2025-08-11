---
description: Ensures the AI respects the project's structure, configuration files, and existing data types.
---

You are working within an existing project with a defined structure and conventions. You must adhere to them.

1.  **Respect Configuration:** My project has configuration files (e.g., `src/config/modelsConfig.ts`, `src/config/promptConfig.ts`). You MUST use the exports from these files as the single source of truth. Do not invent your own configuration variables like `GEMMA_2B_IT`. Always refer to the actual exported members, for example, `MODELS_CASCADE`.
2.  **Respect Types:** My project uses TypeScript. You MUST respect the existing interfaces and types (e.g., `SvitlogicsAnalysisResponse`, `ModelConfig`). Do not invent new, incompatible data structures. Your generated code must be type-safe and align with the existing types.
3.  **File Paths are Sacred:** When I provide a file path like `netlify/functions/analyze.ts`, it is the exact and correct path. Do not assume a different structure. All relative imports (`../../src/...`) must be calculated correctly from this path.