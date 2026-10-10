import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AIMark } from '@/components/ui';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

const trustLines = ['No credit card required', 'Free to start', 'Your data stays yours'];

const softSpring = { type: 'spring' as const, stiffness: 80, damping: 20 };

function SplitText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const letters = text.split('');
  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: '0.4em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...softSpring, delay: delay + i * 0.022 }}
          className="inline-block"
          aria-hidden
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-bg lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ====================================================
          LEFT — the brand side (hidden on mobile)
          ==================================================== */}
      <aside className="relative hidden overflow-hidden lg:flex lg:flex-col">
        {/* Warm gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-glow-warm via-bg to-glow-green opacity-70" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-warm opacity-60" />

        {/* Top — wordmark */}
        <div className="relative z-10 flex h-[88px] items-center px-12">
          <Link to="/" className="flex items-center gap-2.5">
            <AIMark size={26} />
            <span className="text-[17px] font-semibold tracking-tight text-text">
              CareerForge
              <span className="text-primary">.AI</span>
            </span>
          </Link>
        </div>

        {/* Center — the moment */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-sm"
          >
            <AIMark size={12} />
            Powered by AI — build a stronger career
          </motion.div>

          <h1 className="mt-10 font-display text-[52px] leading-[1.02] tracking-[-0.03em] text-text xl:text-[68px]">
            <SplitText text="Your career," delay={0.2} />
            <br />
            <span className="bg-gradient-to-br from-primary via-primary to-green-deep bg-clip-text text-transparent">
              <SplitText text="engineered." delay={0.7} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 1.4 }}
            className="mt-8 max-w-[440px] text-[16px] leading-relaxed text-text-secondary"
          >
            Every suggestion is honest. Nothing invented. Your resume, ATS score, and interview
            practice — in one place.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 1.6 }}
            className="mt-12 flex flex-col gap-3"
          >
            {trustLines.map((line) => (
              <li key={line} className="flex items-center gap-2.5 text-small text-text-secondary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-tint">
                  <Check size={11} className="text-green-deep" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom — quiet footnote */}
        <div className="relative z-10 px-12 pb-10">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} CareerForge AI</p>
        </div>
      </aside>

      {/* ====================================================
          RIGHT — the form column
          ==================================================== */}
      <main className="relative flex min-h-screen flex-col">
        {/* Mobile logo */}
        <div className="flex h-[72px] items-center px-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2.5">
            <AIMark size={24} />
            <span className="text-[16px] font-semibold tracking-tight text-text">
              CareerForge
              <span className="text-primary">.AI</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 0.15 }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-8">
              <h1 className="font-display text-[32px] leading-tight tracking-[-0.02em] text-text">
                {title}
              </h1>
              <p className="mt-2 text-small text-text-secondary">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 text-center text-small text-text-secondary">{footer}</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
