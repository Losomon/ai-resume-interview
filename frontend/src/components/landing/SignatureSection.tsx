import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Check, AlertTriangle, X } from 'lucide-react';
import { Card, Badge, AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';

const JD_KEYWORDS = [
  { word: 'React', group: 'matched' as const },
  { word: 'TypeScript', group: 'matched' as const },
  { word: 'Node.js', group: 'matched' as const },
  { word: 'PostgreSQL', group: 'matched' as const },
  { word: 'Java', group: 'matched' as const },
  { word: 'Spring Boot', group: 'evidence' as const },
  { word: 'AWS', group: 'evidence' as const },
  { word: 'CI/CD', group: 'evidence' as const },
  { word: 'Docker', group: 'gap' as const },
  { word: 'Kubernetes', group: 'gap' as const },
  { word: 'GraphQL', group: 'gap' as const },
];

const GROUP_META = {
  matched: {
    label: 'Matched',
    icon: Check,
    bgClass: 'bg-primary-tint',
    borderClass: 'border-primary/25',
    textClass: 'text-green-deep',
  },
  evidence: {
    label: 'Missing evidence',
    icon: AlertTriangle,
    bgClass: 'bg-attention-tint',
    borderClass: 'border-attention/25',
    textClass: 'text-attention',
  },
  gap: {
    label: 'Real gaps',
    icon: X,
    bgClass: 'bg-problem-tint',
    borderClass: 'border-problem/25',
    textClass: 'text-problem',
  },
} as const;

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

export function SignatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [inView]);

  return (
    <section className="relative overflow-hidden bg-bg py-32 lg:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[720px] w-[1080px] -translate-x-1/2 bg-glow-green opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="mx-auto mb-20 max-w-[720px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            The honest difference
          </p>
          <h2 className="mt-6 font-display text-[40px] leading-[1.05] tracking-[-0.03em] text-text lg:text-[56px]">
            It shows you what you <em className="not-italic text-primary">actually</em> have.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-text-secondary">
            Every other ATS tool tells you to add keywords. We tell you the difference between
            something you already know but didn't write down, and something you genuinely don't have
            yet.
          </p>
        </div>

        <div ref={ref} className="mx-auto max-w-[1080px]">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
              <div className="flex items-center gap-2">
                <AIMark size={16} />
                <span className="font-mono text-xs text-text-muted">
                  app.careerforge.ai/ats/analyze
                </span>
              </div>
              <Badge tone="info">rules-v1</Badge>
            </div>

            <div className="grid gap-8 bg-bg-secondary p-8 lg:grid-cols-[1fr_360px] lg:p-10">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Job description keywords
                </div>

                <div className="relative mt-5 min-h-[320px]">
                  {stage === 0 && (
                    <div className="flex flex-wrap gap-2">
                      {JD_KEYWORDS.map((k) => (
                        <Chip key={k.word} word={k.word} state="neutral" />
                      ))}
                    </div>
                  )}

                  {stage >= 1 && (
                    <div className="grid gap-5 sm:grid-cols-3">
                      {(['matched', 'evidence', 'gap'] as const).map((groupKey, gi) => {
                        const meta = GROUP_META[groupKey];
                        const Icon = meta.icon;

                        const words =
                          groupKey === 'evidence' && stage >= 3
                            ? JD_KEYWORDS.filter(
                                (k) => k.group === 'evidence' && k.word !== 'Spring Boot',
                              )
                            : JD_KEYWORDS.filter((k) => k.group === groupKey);

                        return (
                          <div key={groupKey}>
                            <div
                              className={cn(
                                'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]',
                                meta.textClass,
                              )}
                            >
                              <Icon size={11} />
                              {meta.label}
                              <span className="text-text-muted">({words.length})</span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {words.map((k, i) => (
                                <motion.div
                                  key={k.word}
                                  layout
                                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 24,
                                    delay: stage === 1 ? gi * 0.15 + i * 0.04 : 0,
                                  }}
                                >
                                  <Chip word={k.word} state={groupKey} />
                                </motion.div>
                              ))}

                              {groupKey === 'matched' && stage >= 3 && (
                                <motion.div
                                  layout
                                  initial={{ opacity: 0, scale: 0.6 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 180,
                                    damping: 20,
                                    delay: 0.2,
                                  }}
                                >
                                  <Chip word="Spring Boot" state="moving" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {stage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-6 flex items-start gap-2.5 rounded-button border border-primary/25 bg-primary-tint px-4 py-3"
                    >
                      <Sparkles size={14} className="mt-0.5 shrink-0 text-primary" />
                      <p className="text-small leading-relaxed text-green-deep">
                        <span className="font-semibold">Spring Boot moved to evidence</span> —
                        because you already list Java. You likely have experience with it, it's just
                        not written down.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-small font-medium text-text-secondary">ATS score</span>
                    <Badge tone="progress">Strong</Badge>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <CountUp
                      to={87}
                      className="font-display text-[64px] font-semibold leading-none text-text"
                    />
                    <span className="text-small text-text-muted">/100</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-4">
                    <MiniBar label="Matched" value={stage >= 3 ? 62 : 45} tone="primary" />
                    <MiniBar label="Evidence" value={stage >= 3 ? 27 : 18} tone="attention" />
                    <MiniBar label="Real gaps" value={stage >= 3 ? 11 : 37} tone="problem" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    What this means
                  </div>
                  <p className="mt-3 text-small leading-relaxed text-text-secondary">
                    Three keywords you already have experience with are missing from your resume.
                    Two are genuine gaps worth building.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[11px] text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Never invents facts — only surfaces what's real
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-text-muted">
            Same rules run in the real analyzer. Deterministic, testable, and open about what it
            doesn't know.
          </p>
        </div>
      </div>
    </section>
  );
}

function Chip({
  word,
  state,
}: {
  word: string;
  state: 'neutral' | 'matched' | 'evidence' | 'gap' | 'moving';
}) {
  const styles = {
    neutral: 'border-border bg-card text-text-secondary',
    matched: 'border-primary/25 bg-primary-tint text-green-deep',
    evidence: 'border-attention/25 bg-attention-tint text-attention',
    gap: 'border-problem/25 bg-problem-tint text-problem',
    moving: 'border-primary bg-primary text-text-inverse shadow-glow',
  }[state];

  return (
    <motion.span
      layout
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-shadow duration-500',
        styles,
      )}
    >
      {word}
    </motion.span>
  );
}

function MiniBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'primary' | 'attention' | 'problem';
}) {
  const barClass = {
    primary: 'bg-primary',
    attention: 'bg-attention',
    problem: 'bg-problem',
  }[tone];

  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-text-secondary">{label}</span>
        <motion.span
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-text"
        >
          {value}%
        </motion.span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg">
        <motion.div
          className={cn('h-full rounded-full', barClass)}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  );
}
