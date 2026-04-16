import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Cape Breton Realty brand colors
        cbr: {
          50: "#faf8f7",
          100: "#f5f1ee",
          200: "#ede6e1",
          300: "#e0d5cd",
          400: "#c8b8ad",
          500: "#b11f29", // Primary brand red
          600: "#a01c26",
          700: "#891921",
          800: "#6d1519",
          900: "#581114",
          950: "#3d0c0f"
        },
        dark: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#c2c2c2",
          400: "#a8a8a8",
          500: "#808080",
          600: "#2d2d2d", // Brand dark
          700: "#1a1a1a",
          800: "#0d0d0d",
          900: "#000000"
        },
        // Listing status colors — chosen to match the pattern Sherry referenced from viewpoint
        // (active=blue, sold=red, conditional=orange) but tuned for accessibility on the map.
        status: {
          active: "#1d6fbf",
          sold: "#c53030",
          conditional: "#dd7724",
          land: "#3d8a4d"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
