/** Single source of truth for designers: mirrors tailwind.config.ts. Rendered on /design-system. */
export const PALETTE = [
  { name: "bg", hex: "#070A12", use: "Page background" }, { name: "card", hex: "#101624", use: "Cards" },
  { name: "elevated", hex: "#151C2B", use: "Raised surfaces" }, { name: "line", hex: "#202A3A", use: "Borders" },
  { name: "primary", hex: "#7C5CFC", use: "AI / brand" }, { name: "info", hex: "#38BDF8", use: "Information" },
  { name: "ok", hex: "#22C55E", use: "Progress" }, { name: "warn", hex: "#F59E0B", use: "Attention" },
  { name: "bad", hex: "#EF4444", use: "Problems" }, { name: "ink", hex: "#F8FAFC", use: "Headings" },
] as const;
export const NAV = [
  { to: "/dashboard", label: "Dashboard" }, { to: "/resumes", label: "My Resumes" }, { to: "/ats", label: "ATS Analyzer" },
  { to: "/interview", label: "AI Interviews" }, { to: "/jobs", label: "Job Matches" }, { to: "/coach", label: "Career Coach" }, { to: "/applications", label: "Applications" },
] as const;
