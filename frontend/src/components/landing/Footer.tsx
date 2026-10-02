import { Link } from "react-router-dom";
import { AIMark } from "@/components/ui";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Resume Builder", href: "#features" },
      { label: "ATS Analyzer",   href: "#ats" },
      { label: "AI Interview",   href: "#interview" },
      { label: "Pricing",        href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",   href: "#" },
      { label: "Blog",    href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms",   href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <AIMark size={26} />
              <span className="text-[17px] font-semibold tracking-tight text-text">
                CareerForge
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-small leading-relaxed text-text-secondary">
              The AI career operating system for serious job seekers.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {c.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-small text-text-secondary transition-colors duration-card hover:text-text"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} CareerForge AI. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with a warm palette and an honest AI.
          </p>
        </div>
      </div>
    </footer>
  );
}