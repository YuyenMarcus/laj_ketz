import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "laj-forest": "#0A361E",
        "laj-lime": "#1F5F3A",
        "laj-light": "#E3E0C9",
        "laj-ink": "#0F2B1D",
        beige: "#E3E0C9",
        darkText: "#0F2B1D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      boxShadow: {
        glow: "0 24px 60px -20px rgba(10, 54, 30, 0.35)",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;

