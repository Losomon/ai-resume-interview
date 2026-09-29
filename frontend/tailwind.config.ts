import type { Config } from "tailwindcss";
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: v("bg"), bg2: v("bg2"), card: v("card"), elevated: v("elevated"), line: v("line"),
      primary: { DEFAULT: v("primary"), hover: v("primary-hover"), glow: v("primary-glow") },
      info: v("info"), ok: v("ok"), warn: v("warn"), bad: v("bad"), ink: v("ink"), soft: v("soft"), mute: v("mute") },
    fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    borderRadius: { card: "10px" },
    transitionDuration: { DEFAULT: "150ms" },
    keyframes: { spin360: { to: { transform: "rotate(360deg)" } }, shimmer: { "100%": { transform: "translateX(100%)" } }, breathe: { "0%,100%": { opacity: ".6" }, "50%": { opacity: "1" } } },
    animation: { breathe: "breathe 2s ease-in-out infinite", spin360: "spin360 1s linear infinite", shimmer: "shimmer 1.6s infinite" },
  } },
} satisfies Config;
