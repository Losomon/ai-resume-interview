import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AIMark } from "@/components/ui";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-bg">
      {/* Warm grid + green glow, matches the landing direction */}
      <div className="pointer-events-none absolute inset-0 bg-grid-warm" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-glow-green opacity-60" />

      <div className="relative flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex h-[72px] items-center px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <AIMark size={26} />
            <span className="text-[17px] font-semibold tracking-tight text-text">
              CareerForge
            </span>
          </Link>
        </header>

        {/* Center */}
        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-8 text-center">
              <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text">
                {title}
              </h1>
              <p className="mt-2 text-small text-text-secondary">{subtitle}</p>
            </div>

            <div className="rounded-card border border-border bg-card p-7 shadow-card">
              {children}
            </div>

            <div className="mt-6 text-center text-small text-text-secondary">
              {footer}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}