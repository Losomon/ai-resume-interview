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

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = text.split('');
  return (
    <span aria-label={text}>
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
    <div className="min-h-screen bg-bg lg:grid lg:grid-cols-[55fr_45fr]">
      {/* ====================================================
          LEFT — the brand side (hidden on mobile)
          ==================================================== */}
      <aside className="relative hidden overflow-hidden lg:flex lg:flex-col">
        {/* Warm gradient — INLINE, so it always renders.
            Fixed colors, not theme tokens. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #E9C96A 0%, #F7F0D8 38%, #FDFCF7 58%, #D9EFD4 82%, #BFE3B4 100%)',
          }}
        />

        {/* Subtle grid — INLINE */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(60,50,30,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(60,50,30,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top — wordmark */}
        <div className="relative z-10 flex h-[88px] items-center px-12">
          <Link to="/" className="flex items-center gap-2.5">
            <AIMark size={26} />
            <span className="text-[17px] font-semibold tracking-tight text-[#1C1917]">
              CareerForge
              <span className="text-[#15803D]">.AI</span>
            </span>
          </Link>
        </div>

        {/* Center — the moment */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8E4D5] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#57534E] backdrop-blur-sm"
          >
            <AIMark size={12} />
            Powered by AI — build a stronger career
          </motion.div>

          {/* FIX 2: use style-based font-family as a belt-and-braces for Fraunces */}
          <h1
            className="mt-10 text-[52px] leading-[1.02] tracking-[-0.03em] text-[#1C1917] xl:text-[68px]"
            style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}
          >
            <SplitText text="Your career," delay={0.2} />
            <br />
            {/* FIX 3: inline gradient so it always resolves */}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #15803D 0%, #14532D 100%)',
              }}
            >
              <SplitText text="engineered." delay={0.7} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 1.4 }}
            className="mt-8 max-w-[440px] text-[16px] leading-relaxed text-[#57534E]"
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
              <li key={line} className="flex items-center gap-2.5 text-small text-[#57534E]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7]">
                  <Check size={11} className="text-[#14532D]" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom — copyright */}
        <div className="relative z-10 px-12 pb-10">
          <p className="text-xs text-[#A8A29E]">© {new Date().getFullYear()} CareerForge AI</p>
        </div>
      </aside>

      {/* ====================================================
          RIGHT — the form column (theme-aware)
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
              {/* FIX 2: font-family via style so it can't be missed */}
              <h1
                className="text-[32px] leading-tight tracking-[-0.02em] text-text"
                style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}
              >
                {title}
              </h1>
              {/* FIX 5: text-body (15px) instead of text-small (14px) */}
              <p className="mt-2 text-body text-text-secondary">{subtitle}</p>
            </div>

            {children}

            <div className="mt-8 text-center text-small text-text-secondary">{footer}</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
