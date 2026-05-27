import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7f8",
          100: "#fdecef",
          200: "#f9d4dc",
          300: "#f4b1c2",
          400: "#ea7e9e",
          500: "#d95d84",
          600: "#bd3f6b"
        },
        champagne: "#f7eadc",
        roseGold: "#c88678",
        softGold: "#d9b66f",
        pearl: "#fffdfb",
        ash: "#f4f1ef"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        luxe: "0 24px 80px rgba(132, 76, 70, 0.16)",
        glow: "0 0 34px rgba(217, 182, 111, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
