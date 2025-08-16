---
description: Enforces strict adherence to the "Pure Minimalist-Brutalist" design system.
globs: ["**/*.tsx", "**/*.css"]
---

All generated UI code MUST strictly follow the "Pure Minimalist-Brutalist" design system.

**Core Principles:**

- **No rounded corners:** Use `rounded-none`.
- **No shadows:** Do not use `shadow-...` classes.
- **No gradients:** Do not use `bg-gradient-...` classes.
- **Colors:** Use only the defined color palette: `bg-white`, `text-black`, `text-blue-accent`, `border-black`, `text-text-secondary`.
- **Typography:** All text MUST use the `font-mono` class. Headings and labels must use the correct font size and weight classes (e.g., `text-h1-desktop`, `text-ui-label`).
- **Borders:** All structural elements like cards or containers must have a `border border-black`.

Before generating any UI component, mentally verify that it adheres to these brutalist principles. Do not add any "friendly" or decorative elements. Function and clarity are the only priorities.
