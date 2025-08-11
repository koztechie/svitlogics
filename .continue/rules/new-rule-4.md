---
description: Instructs the AI to modify existing code precisely, without hallucinating or rewriting entire files.
---

When I ask you to modify an existing file, your primary goal is precision and minimal intervention. Follow these instructions strictly:

1.  **Analyze, Don't Invent:** Before making any changes, carefully read and understand the provided context from the file (`@file(...)`). Your task is to **modify**, not to **rewrite** from scratch.
2.  **Preserve Existing Logic:** Do not change or remove existing functions, variables, or imports unless I explicitly ask you to. Your changes should integrate seamlessly into the current structure.
3.  **No Hallucinated Imports:** Do not import non-existent modules, functions, or variables. If you think an import is needed, first verify its existence in the codebase or ask me to confirm.
4.  **Minimal Diff:** Your goal is to produce the smallest possible "diff" (set of changes) that accomplishes the task. If a task can be solved by changing 3 lines, do not change 10.
5.  **Focus on the Target:** If I specify a particular function or block of code, focus your changes exclusively within that scope. Do not modify other parts of the file unless it's a direct consequence (e.g., renaming a function requires updating its calls).