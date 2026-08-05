import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12211F",
        "ink-soft": "#5B726E",
        paper: "#FFFFFF",
        "paper-dim": "#F5F3EC",
        card: "#FFFFFF",
        teal: "#0F3B3A",
        "teal-2": "#0C302F",
        gold: "#C9A24A",
        "gold-light": "#D9B563",
        "gold-deep": "#8A6A2E",
        "gold-tint": "#F4EEDF",
        "on-teal": "#FFFFFF",
        line: "#E6E8EC",
        "line-on-teal": "#1E4D4B",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      letterSpacing: {
        mono: "0.14em",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
