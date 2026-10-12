import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button, Card, Progress, AIMark } from '@/components/ui';
import { viewportOnce } from './motion';

/* ---------- spring presets ---------- */
const spring = { type: 'spring' as const, stiffness: 90, damping: 20, mass: 0.8 };
const softSpring = { type: 'spring' as const, stiffness: 60, damping: 22 };

/* ---------- stagger + fade (kept for consistency with other sections) ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: spring },
};

/* ---------- character-split animation ---------- */
function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const letters = text.split('');
  return (
    <span className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            ...spring,
            delay: delay + i * 0.025,
          }}
          className="inline-block"
          aria-hidden
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- count-up ---------- */
function CountUp({
  to,
  duration = 1.4,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          mv.set(to);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mv, to]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export function Hero() {
  /* Scroll-linked parallax on the product preview */
  const { scrollY } = useScroll();
  const previewY = useTransform(scrollY, [0, 400], [0, -40]);
  const previewRotate = useTransform(scrollY, [0, 400], [0, -1.5]);
  const glowOpacity = useTransform(scrollY, [0, 400], [0.6, 0.25]);

  return (
    <section className="relative overflow-hidden bg-bg pt-[72px]">
      {/* Warm grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-warm" />

      {/* Green glow — repositioned, animated */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -top-24 -left-32 h-[620px] w-[820px] bg-glow-green"
      />

      {/* Warm glow — top right, behind the preview */}
      <div className="pointer-events-none absolute -right-40 top-40 h-[520px] w-[520px] bg-glow-warm opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 pb-24 pt-20 lg:px-16 lg:pb-40 lg:pt-32">
        {/* Asymmetric grid: text left, preview right */}
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-16">
          {/* ---------- TEXT COLUMN ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto flex max-w-[640px] flex-col items-start text-left lg:mx-0"
          >
            {/* Eyebrow badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-text-secondary shadow-card">
                <AIMark size={14} />
                Powered by AI — build a stronger career
              </div>
            </motion.div>

            {/* Headline — character-split */}
            <h1 className="mt-8 font-display text-[44px] leading-[1.02] tracking-[-0.03em] text-text sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[84px]">
              <SplitText text="Your career," delay={0.2} />
              <br />
              <span className="bg-gradient-to-br from-primary via-primary to-green-deep bg-clip-text text-transparent">
                <SplitText text="engineered." delay={0.7} />
              </span>
            </h1>

            {/* Subhead */}
            <motion.p
              variants={item}
              className="mt-8 max-w-[520px] text-[17px] leading-relaxed text-text-secondary lg:text-[18px]"
            >
              AI-powered tools to build a stronger career with confidence. Resume, ATS, and
              interview prep — in one <span className="text-text">honest</span> place.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button size="lg">
                  Build my resume
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  <Sparkles size={16} />
                  Practice interview
                </Button>
              </Link>
            </motion.div>

            {/* Stats row — 4 cards, left-aligned, no centered grid */}
            <motion.div
              variants={item}
              className="mt-14 grid w-full max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { label: 'Rewrite tones', value: '5' },
                { label: 'Interview formats', value: '3' },
                { label: 'Recognized skills', value: '12' },
                { label: 'Fabricated facts', value: '0' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-[32px] font-semibold leading-none text-text">
                    {s.value}
                  </span>
                  <span className="mt-2 text-[11px] uppercase tracking-wide text-text-muted">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- PREVIEW COLUMN — bleeds off the right ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 4 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ ...softSpring, delay: 0.4 }}
            style={{
              perspective: 1200,
              y: previewY,
              rotateZ: previewRotate,
            }}
            className="relative lg:-mr-32 xl:-mr-48"
          >
            {/* Warm halo behind the preview */}
            <div className="pointer-events-none absolute -inset-6 bg-glow-warm opacity-40 blur-3xl" />

            <div className="relative rounded-card border border-border bg-card p-3 shadow-card-hover">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-3 pb-3 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="ml-3 font-mono text-[10px] text-text-muted">
                  app.careerforge.ai/dashboard
                </span>
              </div>

              <div className="grid gap-3 rounded-[10px] bg-bg-secondary p-5 lg:grid-cols-[1fr_280px]">
                <div className="flex flex-col gap-3">
                  <Card className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-small font-medium text-text-secondary">
                        Career Readiness
                      </span>
                      <AIMark size={16} />
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <CountUp to={82} className="text-[48px] font-bold leading-none text-text" />
                      <span className="text-small text-text-muted">/100</span>
                    </div>
                    <div className="mt-5 flex flex-col gap-2.5">
                      <ScoreRow label="Resume" value={92} delay={0.3} />
                      <ScoreRow label="ATS" value={78} delay={0.4} />
                      <ScoreRow label="Interview" value={86} delay={0.5} />
                      <ScoreRow label="Skills" value={68} delay={0.6} />
                    </div>
                  </Card>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <MiniStat label="Resume" value="92%" />
                    <MiniStat label="ATS" value="87" />
                    <MiniStat label="Interview" value="84" />
                  </div>
                </div>

                <Card className="p-5">
                  <span className="text-small font-medium text-text-secondary">Recommended</span>
                  <div className="mt-4 flex flex-col gap-3">
                    <RecommendRow text="Improve ATS score" tone="ai" />
                    <RecommendRow text="Practice interview" tone="progress" />
                    <RecommendRow text="Update resume" tone="neutral" />
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function ScoreRow({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs text-text-secondary">{label}</span>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
        className="h-2 rounded-full bg-bg-secondary"
      >
        <div
          className={`h-full rounded-full ${
            value >= 80 ? 'bg-primary' : value >= 60 ? 'bg-success' : 'bg-attention'
          }`}
          style={{ width: `${value}%` }}
        />
      </motion.div>
      <span className="w-9 text-right text-xs font-medium text-text">{value}%</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1 text-[20px] font-semibold text-text">{value}</div>
    </Card>
  );
}

function RecommendRow({ text, tone }: { text: string; tone: 'ai' | 'progress' | 'neutral' }) {
  const dot = {
    ai: 'bg-primary',
    progress: 'bg-success',
    neutral: 'bg-text-muted',
  }[tone];

  return (
    <div className="flex items-center gap-2.5 text-small text-text-secondary">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {text}
    </div>
  );
}
