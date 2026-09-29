import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A12", bg2: "#0B0F19", card: "#101624", elevated: "#151C2B", line: "#202A3A",
        primary: { DEFAULT: "#7C5CFC", hover: "#6D4FE8", glow: "#A78BFA" },
        info: "#38BDF8", ok: "#22C55E", warn: "#F59E0B", bad: "#EF4444",
        ink: "#F8FAFC", soft: "#CBD5E1", mute: "#64748B",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      borderRadius: { card: "14px" },
      transitionDuration: { DEFAULT: "180ms" },
      keyframes: {
        breathe: { "0%,100%": { transform: "scale(1)", opacity: ".75" }, "50%": { transform: "scale(1.04)", opacity: "1" } },
        spin360: { to: { transform: "rotate(360deg)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        dots: { "0%,80%,100%": { opacity: ".25" }, "40%": { opacity: "1" } },
      },
      animation: { breathe: "breathe 3.2s ease-in-out infinite", spin360: "spin360 14s linear infinite", shimmer: "shimmer 1.6s infinite" },
    },
  },
} satisfies Config;
