---
description: Enforces the use of current, stable APIs and discourages deprecated methods.
---

When using a third-party library or platform API (e.g., Netlify Functions, React), you must prioritize using the most current, stable, and officially recommended methods.

1.  **Assume APIs Evolve:** Do not rely solely on potentially outdated training data.
2.  **Prioritize Official Documentation:** Mentally cross-reference proposed solutions with current documentation. For example, for invoking Netlify background functions, the modern approach is a `fetch` request with the `x-netlify-invoke: background` header, not the deprecated `invoke` function.
3.  **Avoid Deprecated Methods:** Actively avoid generating code that uses functions marked as "deprecated." If you must, add a comment explaining why.
