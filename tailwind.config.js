/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    // --- ПАЛІТРА ТА ШРИФТИ ПОВНІСТЮ ПЕРЕВИЗНАЧЕНІ ---
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "svitlogics-blue": "#2D5B8C",
      "paper-white": "#F9F9FA",
      "carbon-black": "#1A1A1D",
      "neutral-300": "#D1D1D5",
      "neutral-500": "#A3A3A8",
      "neutral-700": "#6B6B70",
      "semantic-violet": "#8A5EAF",
      "semantic-teal": "#5A828A",
      "semantic-terracotta": "#AD6A48",
      "semantic-slate": "#6B6B70",
      "semantic-amber": "#B0893E",
      "signal-red": "#C73E3E",
      "signal-green": "#2A8C4A",
      "signal-yellow": "#D9A53B",
    },

    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Lora", "serif"],
      mono: ['"Source Code Pro"', "monospace"],
    },

    // --- РОЗШИРЕННЯ ТЕМИ ---
    extend: {
      fontSize: {
        h1: [
          "2.441rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        h2: [
          "1.953rem",
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        h3: ["1.563rem", { lineHeight: "1.2", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        small: [
          "0.8rem",
          { lineHeight: "1.7", fontWeight: "400", letterSpacing: "+0.01em" },
        ],
      },

      maxWidth: {
        container: "1440px",
        prose: "75ch",
      },

      // Всі заокруглення мають бути '0' згідно з новою DS, яка не передбачає заокруглених елементів
      borderRadius: {
        DEFAULT: "0px",
        none: "0",
        sm: "0",
        md: "0",
        lg: "0",
        full: "0",
      },

      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },

  plugins: [],
};
