import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8ebfff",
          400: "#599eff",
          500: "#3377ff",
          600: "#1b55f5",
          700: "#1440e1",
          800: "#1734b6",
          900: "#19308f",
          950: "#141f57",
        },
        surface: {
          0: "#ffffff",
          50: "#f6f8fa",
          100: "#f0f2f5",
          200: "#e8ebef",
          300: "#d1d5dc",
          400: "#b1b7c2",
          500: "#8c95a5",
          600: "#6e778a",
          700: "#576073",
          800: "#424b5e",
          900: "#333c4d",
          950: "#1c2028",
        },
        dark: {
          0: "#0d1117",
          50: "#161b22",
          100: "#1c2129",
          200: "#262c36",
          300: "#373e49",
          400: "#454d59",
          500: "#6e7681",
          600: "#8b949e",
          700: "#b1bac4",
          800: "#c9d1d9",
          900: "#e6edf3",
          950: "#f0f6fc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
