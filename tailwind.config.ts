import type { Config } from "tailwindcss";

/**
 * Design tokens measured from the Web Developer Portfolio Website template.
 * at a 1440px desktop frame, then mapped to role-based CSS variables so the
 * light theme can reuse the same utilities.
 *
 * Spacing from the file already lands on Tailwind's default scale:
 * 8, 16, 24, 32, 40, 48, 64, 128px → 2, 4, 6, 8, 10, 12, 16, 32.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1440px",
      },
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        deep: "rgb(var(--deep) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        field: "rgb(var(--field) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        chip: "#97F9EB",
        "chip-ink": "#292F36",
        "chip-muted": "#43454D",
        js: "#E7A020",
        reactbrand: "#28A9E0",
        node: "#3C873A",
        tailwind: "#0C73B8",
      },
      fontFamily: {
        sans: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        display: ["Ubuntu", "system-ui", "sans-serif"],
      },
      fontSize: {
        watermark: ["117px", { lineHeight: "134px" }],
        hero: ["64px", { lineHeight: "72px" }],
        title: ["64px", { lineHeight: "72px" }],
        stat: ["48px", { lineHeight: "62px" }],
        lead: ["32px", { lineHeight: "42px" }],
        nav: ["24px", { lineHeight: "32px" }],
        button: ["20px", { lineHeight: "24px" }],
        body: ["16px", { lineHeight: "20px" }],
        small: ["14px", { lineHeight: "18px" }],
      },
      borderRadius: {
        pill: "32px",
        sheet: "40px",
        stat: "80px",
      },
      boxShadow: {
        glow: "-4px -4px 2px 0 rgb(18 247 214)",
        card: "2px 2px 4px 0 rgb(0 0 0 / 0.25)",
        lift: "0 18px 40px rgb(0 0 0 / 0.28)",
      },
      maxWidth: {
        page: "1440px",
        copy: "745px",
        sheet: "880px",
        form: "960px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        caret: "caret 1.05s steps(1) infinite",
        float: "float 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
