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
        "laj-forest": "#2E8B57",
        "laj-lime": "#6FBF73",
        "laj-light": "#F7F1E6",
        "laj-ink": "#0F2B1D",
        beige: "#F7F1E6",
        darkText: "#0F2B1D",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 45px -15px rgba(46, 139, 87, 0.35)",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;

