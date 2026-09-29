/** Token names map to CSS variables in index.css (light default, .dark override). Swatches on /design-system read them live. */
export const PALETTE = [
  { name: "bg", use: "Page" }, { name: "card", use: "Panels" }, { name: "elevated", use: "Table headers, insets" }, { name: "line", use: "1px borders" },
  { name: "primary", use: "Actions, AI marker" }, { name: "info", use: "Information" }, { name: "ok", use: "Positive change" },
  { name: "warn", use: "Needs attention" }, { name: "bad", use: "Problems" }, { name: "ink", use: "Headings" },
] as const;
export const NAV = [
  { to: "/dashboard", label: "Dashboard" }, { to: "/resumes", label: "My Resumes" }, { to: "/ats", label: "ATS Analyzer" },
  { to: "/interview", label: "AI Interviews" }, { to: "/jobs", label: "Job Matches" }, { to: "/coach", label: "Career Coach" }, { to: "/applications", label: "Applications" },
] as const;
