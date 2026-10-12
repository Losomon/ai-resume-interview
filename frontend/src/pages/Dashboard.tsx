import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, Button, Badge, AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';

/* ---------- the data (would come from the store in a real app) ---------- */

type Trend = 'up' | 'down' | 'flat';

type Pillar = {
  id: string;
  label: string;
  score: number;
  trend: Trend;
  delta: number;
  verdict: string;
  reason: string;
};

const pillars: Pillar[] = [
  {
    id: 'resume',
    label: 'Resume',
    score: 92,
    trend: 'up',
    delta: 4,
    verdict: 'Ready',
    reason: 'Your bullets have metrics. Good.',
  },
  {
    id: 'ats',
    label: 'ATS',
    score: 78,
    trend: 'down',
    delta: 3,
    verdict: 'Holding you back',
    reason: 'Two keywords are missing from your target jobs.',
  },
  {
    id: 'interview',
    label: 'Interview',
    score: 86,
    trend: 'up',
    delta: 6,
    verdict: 'Improving',
    reason: 'Your answers are getting sharper.',
  },
];

const readiness = 82;
const weakest = pillars.reduce((a, b) => (a.score < b.score ? a : b));

/* ---------- count-up ---------- */

function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 40, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

/* ---------- trend glyph ---------- */

function TrendGlyph({ trend, delta }: { trend: Trend; delta: number }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const color =
    trend === 'up' ? 'text-green-deep' : trend === 'down' ? 'text-attention' : 'text-text-muted';

  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', color)}>
      <Icon size={12} />
      {trend === 'up' ? '+' : trend === 'down' ? '−' : ''}
      {delta}
    </span>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative">
      {/* ====================================================
          HEADER — the diagnosis
          ==================================================== */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        className="mb-12"
      >
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">{today}</p>
        <h1
          className="mt-3 font-display text-[44px] leading-[1.02] tracking-[-0.03em] text-text lg:text-[56px]"
          style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}
        >
          Solomon.
        </h1>
        <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-text-secondary">
          Your resume is ready.{' '}
          <span className="text-text">Your ATS score is holding you back.</span> Fix that one thing
          and you move.
        </p>
      </motion.header>

      {/* ====================================================
          TIER 1 — the big number
          ==================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        className="relative overflow-hidden rounded-card border border-border bg-card p-8 lg:p-12"
      >
        {/* Warm glow behind the number */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] bg-glow-green opacity-25 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-16">
          {/* The number */}
          <div className="shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              <AIMark size={14} />
              Career Readiness
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <CountUp
                to={readiness}
                className="font-display text-[140px] leading-[0.85] tracking-[-0.05em] text-text lg:text-[180px]"
              />
              <span className="text-[20px] font-medium text-text-muted">/100</span>
            </div>
          </div>

          {/* The verdict */}
          <div className="flex-1 lg:pb-4">
            <p className="max-w-[440px] font-display text-[24px] leading-tight tracking-[-0.02em] text-text lg:text-[28px]">
              Not the number you want.
              <br />
              <span className="text-text-secondary">But closer than last week.</span>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="attention">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-attention" />
                {weakest.label} is the ceiling
              </Badge>
              <span className="text-xs text-text-muted">
                Move {weakest.label} from {weakest.score} → 90 and your readiness goes up by ~6
                points.
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================================
          TIER 2 — three pillars
          ==================================================== */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => navigate(`/${p.id === 'ats' ? 'ats' : p.id}`)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.15 + i * 0.06 }}
            className={cn(
              'group relative overflow-hidden rounded-card border border-border bg-card p-6 text-left',
              'transition-all duration-card',
              'hover:-translate-y-0.5 hover:border-border-hover hover:shadow-card-hover',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                {p.label}
              </div>
              <TrendGlyph trend={p.trend} delta={p.delta} />
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span
                className="font-display text-[56px] leading-none tracking-[-0.03em] text-text"
                style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 600 }}
              >
                {p.score}
              </span>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p
                className={cn(
                  'text-small font-medium',
                  p.trend === 'up'
                    ? 'text-green-deep'
                    : p.trend === 'down'
                      ? 'text-attention'
                      : 'text-text-secondary',
                )}
              >
                {p.verdict}
              </p>
              <p className="mt-1.5 text-small leading-relaxed text-text-secondary">{p.reason}</p>
            </div>

            <ArrowRight
              size={16}
              className="absolute bottom-6 right-6 text-text-muted opacity-0 transition-all duration-card group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary"
            />
          </motion.button>
        ))}
      </div>

      {/* ====================================================
          TIER 3 — the one thing to do
          ==================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.35 }}
        className="mt-4"
      >
        <Card className="relative overflow-hidden p-6 lg:p-8">
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-[320px] w-[320px] bg-glow-warm opacity-20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            {/* Label + heading */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                <AIMark size={14} />
                The one thing to do
              </div>
              <h2
                className="mt-4 font-display text-[28px] leading-tight tracking-[-0.02em] text-text lg:text-[36px]"
                style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}
              >
                Add 2 keywords to your resume.
              </h2>
              <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-text-secondary">
                <span className="font-medium text-text">Docker</span> and{' '}
                <span className="font-medium text-text">CI/CD</span> appear in 70% of the jobs
                you've been targeting. You don't have them listed yet.
              </p>
              <p className="mt-3 text-small italic text-text-muted">
                If you've actually used them, say so. If you haven't — build one small project this
                weekend and add it honestly.
              </p>
            </div>

            {/* Action */}
            <div className="shrink-0 lg:pt-8">
              <Button size="lg" onClick={() => navigate('/ats')}>
                See the gap
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
