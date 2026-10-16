import { Link } from 'react-router-dom';
import { AIMark } from '@/components/ui';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Resume Builder', href: '/#features' },
      { label: 'ATS Analyzer', href: '/#ats' },
      { label: 'AI Interview', href: '/#interview' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-button border border-border bg-card shadow-card">
                <AIMark size={24} />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-text">
                CareerForge
                <span className="text-link-hover">.AI</span>
              </span>
            </Link>
            <p className="mt-6 font-display text-[24px] italic leading-tight text-link-hover">
              Move forward, honestly.
            </p>
            <p className="mt-3 max-w-[300px] text-small leading-relaxed text-text-secondary">
              Build a stronger resume, practise with AI, and prepare for the right opportunities.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-link-hover">
                {c.title}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/#') ? (
                      // Anchor link (from anywhere, goes to landing then scrolls)
                      <a
                        href={l.href.slice(1)}
                        className="text-small text-text-secondary underline decoration-transparent underline-offset-4 transition-colors duration-card hover:text-link-hover hover:decoration-link-hover focus-visible:text-link-hover focus-visible:decoration-link-hover"
                      >
                        {l.label}
                      </a>
                    ) : (
                      // Router link (goes to a real page)
                      <Link
                        to={l.href}
                        className="text-small text-text-secondary underline decoration-transparent underline-offset-4 transition-colors duration-card hover:text-link-hover hover:decoration-link-hover focus-visible:text-link-hover focus-visible:decoration-link-hover"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-small font-medium text-text-secondary">
            © {new Date().getFullYear()} CareerForge AI. All rights reserved.
          </p>
          <p className="rounded-button border border-border bg-card px-3.5 py-2 text-small font-medium text-link-hover shadow-card">
            Built with a warm palette and an honest AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
