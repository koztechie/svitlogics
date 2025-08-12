/** @type {import('tailwindcss').Config} */
export default {
  // Files to scan for Tailwind classes
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    // We completely override the default color palette to enforce our strict design system.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#000000",

      // Accent color for interactive elements
      "blue-accent": "#0000CC",
      "blue-accent-hover": "#0000AA",
      "blue-accent-active": "#000088",

      // Grayscale palette for UI
      "text-secondary": "#555555",
      "text-disabled": "#AAAAAA",
      "bg-disabled": "#F0F0F0",

      // Status colors
      "status-error": "#FF0000",
      "status-success": "#00AA00",
      "status-info": "#0000CC", // Reusing accent color
    },

    // We override the default font families.
    fontFamily: {
      // 'sans' is not used, enforcing mono font everywhere.
      mono: ['"IBM Plex Mono"', "monospace"],
    },

    // We extend the default theme with our custom values.
    extend: {
      // Custom text sizes based on our design system's typography scale
      fontSize: {
        "ui-label": "14px",
        "body-main": "16px",
        "h3-mobile": "16px",
        "h3-desktop": "18px",
        "h2-mobile": "20px",
        "h2-desktop": "24px",
        "h1-mobile": "26px",
        "h1-desktop": "32px",
        logo: "36px",
      },

      // Custom line height for body text
      lineHeight: {
        body: "1.5",
      },

      // Custom max-width for the main content container
      maxWidth: {
        container: "1024px",
      },

      // Custom border widths to match the design system
      borderWidth: {
        1: "1px", // Used for most borders
        2: "2px", // Used for status messages
      },

      // Custom border colors to reference our palette
      borderColor: (theme) => ({
        ...theme("colors"), // Makes all colors available as border-colors (e.g., border-black)
        DEFAULT: theme("colors.black"), // Sets `border` class to use black
        disabled: theme("colors.text-disabled"), // `border-disabled` will use the disabled text color
      }),

      // Optional: If you need specific spacing values from your 8px grid
      // that are not in the default scale, you can add them here.
      // e.g., spacing: { '18': '4.5rem' } for 72px
    },
  },

  plugins: [],
};
