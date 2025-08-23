# Svitlogics Design System: Pure Minimalist-Brutalist (Light Theme)

## Core Philosophy

Svitlogics fully embraces a pure **Minimalist-Brutalist** aesthetic:

* **Maximum clarity**, **zero embellishment**.
* **Raw geometry**, **sharp edges**.
* **Content and function over form**.
* **No attempt to "soften" the experience** — we deliberately avoid rounded corners, gradients, shadows, animations, or "friendly" aesthetic cues.
* **UI is functional and unapologetic.** It communicates seriousness, efficiency, and transparency.
* **Accessibility is never sacrificed**, but aesthetic compromises to "polish" the experience are rejected.

---

## 1. Color Palette

The palette is **strictly utilitarian**, providing maximum contrast.

* **Primary Background:** `#FFFFFF` (Pure White) — full white, no soft tints.
* **Primary Text Color:** `#000000` (Pure Black) — maximum contrast.
* **Accent Color (Interactive):** `#0000CC` (Standard Web Blue) — explicitly brutalist choice to use basic blue for links and interactive elements.

  * **Hover State:** `#0000AA` (Darker Web Blue).
  * **Active State:** `#000088` (Even Darker Blue).
* **Grayscale for Structure:**

  * **Borders:** `#000000` (Black), **1px solid** — no light borders.
  * **Dividers:** `#000000` (Black), **1px solid** — only when essential.
  * **Secondary/Placeholder Text:** `#555555` — sufficient contrast.
  * **Disabled Text:** `#AAAAAA`.
  * **Disabled Background:** `#F0F0F0`.
* **Status Colors:** (pure utilitarian, no friendly hues)

  * **Error:** Background: `#FFFFFF`; Border: `#FF0000` (Red), **2px solid**; Text: `#FF0000`.
  * **Success:** Background: `#FFFFFF`; Border: `#00AA00` (Green), **2px solid**; Text: `#00AA00`.
  * **Info:** Background: `#FFFFFF`; Border: `#0000CC`, **2px solid**; Text: `#0000CC`.

---

## 2. Typography

* **Primary Font:** `IBM Plex Mono` — used universally, including body text.
* **Secondary Font:** None.
* **Rationale:** Brutalist UIs do not attempt to "smooth" the reading experience; mono-spaced type reinforces the utilitarian tone.

### Hierarchy:

* **Logo:** `IBM Plex Mono`, Bold (700), size 36px, `#0000CC`.
* **Headings (H1):** `IBM Plex Mono`, Bold (700), Desktop Size: 32px, Mobile Size: 26px, UPPERCASE (Desktop), Sentence case (Mobile), `#000000`.
* **Headings (H2):** `IBM Plex Mono`, SemiBold (600), Desktop Size: 24px, Mobile Size: 20px, Sentence case, `#000000`.
* **Headings (H3):** `IBM Plex Mono`, Medium (500), Desktop Size: 18px, Mobile Size: 16px (or same as body), Sentence case, `#000000`.
* **Body Text:** `IBM Plex Mono`, Regular (400), 16px, Line height 1.5, `#000000`.
* **UI Labels, Buttons:** `IBM Plex Mono`, Medium (500), 14px, UPPERCASE, `#000000`.
* **Links:** `#0000CC`, no underline by default, underline on hover/focus.

---

## 3. Layout & Spacing

* **Grid System:** Simple CSS Grid or Flexbox.
* **Container Width:** 1024px max-width.
* **Spacing Unit:** Strict 8px grid. No fractional spacing.
* **Alignment:** Left-aligned for all text. **No centering of H1s or UI elements unless strictly required.**

---

## 4. Interactive Elements

### General Rules:

* **Border Radius:** `0` — no rounding anywhere.
* **Box Shadows:** none.
* **Animations:** none.
* **Transitions:** only on `border-color`, `background-color`, `color`, `transform: translateY(0.5px)` permitted. Max duration: 100ms.

### Buttons:

* **Primary Action:**

  * Background: `#0000CC`.
  * Text: `#FFFFFF`.
  * Border: `1px solid #0000CC`.
  * Padding: `8px 16px`.
  * Hover: Background `#0000AA`.
  * Active: Background `#000088`; optional `transform: translateY(0.5px)`.

* **Secondary Button:**

  * Background: `#FFFFFF`.
  * Text: `#000000`.
  * Border: `1px solid #000000`.
  * Hover: Inverted colors — background `#000000`, text `#FFFFFF`.
  * Active: same as hover.

### Inputs (Textareas, Inputs):

* Background: `#FFFFFF`.
* Border: `1px solid #000000`.
* Text: `#000000`.
* Placeholder: `#555555`.
* Focus: Border becomes `#0000CC`, no outline offset.
* Disabled: Background `#F0F0F0`, Border `#AAAAAA`, Text `#AAAAAA`.

---

## 5. Containers / Cards

* **Background:** `#FFFFFF`.
* **Border:** `1px solid #000000`.
* **Padding:** `16px`.
* **Corners:** sharp (`border-radius: 0`).
* **Shadow:** none.

**Section spacing:** vertical spacing between sections = **64px**. No background tinting or boxed sections unless it is a clearly delineated card.

---

## 6. Iconography

* **Use icons ONLY when absolutely required for function.**
* **No decorative icons.**
* **Icons MUST be black (`#000000`), mono style (single weight).**
* **No color icons, no multi-tone icons.**

---

## 7. System Messages / Notifications

* **Use strictly the Status Colors above.**
* **No animation on message appearance/disappearance.**
* **Layout:** single line if possible, brutal vertical margin if multi-line.

---

## Key Brutalist Principles:

* **Raw Geometry**
* **Zero Rounding**
* **Mono Typography Everywhere**
* **Black & White Dominance**
* **Standard Web Blue for Links — no attempt to "modernize" or "beautify"**
* **No Frills**
* **No Shadows**
* **No Gradient**
* **Clear, Immediate Feedback — not "friendly" or "soft"**

---

## Accessibility (A11y)

* Color contrast always verified (Black on White, Blue on White all pass AAA).
* Keyboard navigation fully supported.
* Focus indicators always visible (at least `outline: 2px solid #0000CC`).
* ARIA attributes as needed.
* Semantic HTML strictly enforced.

---

**This Svitlogics Design System is intended as the uncompromising visual and interaction foundation of Svitlogics. All design decisions should be evaluated against the principle: “Does this improve function or clarity without aesthetic compromise?” If not — it is removed.**