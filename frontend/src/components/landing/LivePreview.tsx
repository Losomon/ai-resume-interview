import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Mic, Sparkles } from 'lucide-react';
import { Card, Badge, Progress, AIMark } from '@/components/ui';
import { dashboardRise, fadeUp, stagger, viewportOnce } from './motion';
import { cn } from '@/utils/cn';

type Tab = 'resume' | 'ats' | 'interview';

const TABS: { id: Tab; label: string; icon: typeof FileText; path: string }[] = [
  { id: 'resume', label: 'AI Builder', icon: FileText, path: 'resume/new' },
  { id: 'ats', label: 'ATS Analyzer', icon: Target, path: 'ats' },
  { id: 'interview', label: 'Mock Interview', icon: Mic, path: 'interview/room' },
];

export function LivePreview() {
  const [tab, setTab] = useState<Tab>('resume');

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[720px] text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <AIMark size={40} glow />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            One dashboard.
            <br />
            Three things it does well.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[16px] leading-relaxed text-text-secondary"
          >
            Click a tab to see how each tool actually works. No filler screenshots.
          </motion.p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex rounded-button border border-border bg-card p-1 shadow-card">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-small font-medium transition-colors duration-card',
                    active
                      ? 'bg-primary-tint text-green-deep'
                      : 'text-text-secondary hover:text-text',
                  )}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Window frame */}
        <motion.div
          variants={dashboardRise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          style={{ perspective: 1200 }}
          className="mx-auto mt-10 max-w-[1080px]"
        >
          <div className="rounded-card border border-border bg-card p-3 shadow-card-hover">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                <span className="ml-3 text-xs text-text-muted font-mono">
                  app.careerforge.ai/{TABS.find((t) => t.id === tab)?.path}
                </span>
              </div>
              <Badge tone="ai">Live preview</Badge>
            </div>

            {/* Tab content */}
            <div className="rounded-[10px] bg-bg-secondary p-5 lg:p-6">
              {tab === 'resume' && <ResumeTab />}
              {tab === 'ats' && <ATSTab />}
              {tab === 'interview' && <InterviewTab />}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   TAB 1 — Resume builder
   ============================================================ */
function ResumeTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      {/* Editor */}
      <Card className="p-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <div className="text-[17px] font-semibold text-text">John Doe</div>
            <div className="text-xs text-text-muted">Software Engineer</div>
          </div>
          <Badge tone="progress">92% score</Badge>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Experience
          </div>
          <div className="text-small font-medium text-text">Senior Software Engineer</div>
          <div className="text-xs text-text-muted">Tech Solutions Inc.</div>
          <p className="mt-1 text-small leading-relaxed text-text-secondary">
            Improved API performance by 38% through query optimization and caching layer redesign.
          </p>

          <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Java', 'Spring Boot', 'React', 'PostgreSQL'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* AI panel */}
      <Card className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <AIMark size={16} />
          <span className="text-small font-semibold text-text">AI Suggestion</span>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
            Original
          </div>
          <p className="mt-1.5 rounded-button border border-border bg-bg px-3 py-2.5 text-xs text-text-secondary">
            Developed a website.
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-primary">
            <Sparkles size={11} />
            Suggested
          </div>
          <p className="mt-1.5 rounded-button border border-primary/25 bg-primary-tint px-3 py-2.5 text-xs text-green-deep">
            Designed and developed a responsive full-stack web application using React, Node.js and
            PostgreSQL.
          </p>
        </div>
        <div className="mt-auto flex gap-2 pt-2">
          <div className="flex-1 rounded-button bg-primary py-2 text-center text-xs font-medium text-text-inverse">
            Accept
          </div>
          <div className="rounded-button border border-border px-3 py-2 text-xs font-medium text-text-secondary">
            Dismiss
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   TAB 2 — ATS analyzer
   ============================================================ */
function ATSTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      {/* Score + breakdown */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-small font-medium text-text-secondary">ATS Score</span>
          <Badge tone="progress">Strong match</Badge>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[42px] font-bold leading-none text-text">87</span>
          <span className="text-small text-text-muted">/100</span>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <ATSScoreRow label="Keywords" value={91} />
          <ATSScoreRow label="Experience" value={88} />
          <ATSScoreRow label="Formatting" value={96} />
          <ATSScoreRow label="Skills" value={76} />
        </div>
      </Card>

      {/* Gaps */}
      <Card className="flex flex-col gap-4 p-5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-attention">
            Missing evidence
          </div>
          <p className="mt-1.5 text-xs text-text-secondary">
            You may have these — make them explicit if so.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Spring Boot', 'AWS'].map((k) => (
              <span
                key={k}
                className="rounded-full border border-attention/20 bg-attention-tint px-2.5 py-0.5 text-xs font-medium text-attention"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-problem">
            Real gaps
          </div>
          <p className="mt-1.5 text-xs text-text-secondary">
            Not found anywhere. Only add if genuinely true.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Docker', 'CI/CD'].map((k) => (
              <span
                key={k}
                className="rounded-full border border-problem/20 bg-problem-tint px-2.5 py-0.5 text-xs font-medium text-problem"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function ATSScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs text-text-secondary">{label}</span>
      <Progress value={value} tone={value >= 80 ? 'primary' : 'success'} />
      <span className="w-9 text-right text-xs font-medium text-text">{value}%</span>
    </div>
  );
}

/* ============================================================
   TAB 3 — Mock interview
   ============================================================ */
function InterviewTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      {/* Question + timer */}
      <Card className="flex flex-col items-center justify-center p-8">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-glow-green opacity-40 blur-2xl" />
          <AIMark size={64} glow />
        </div>

        <p className="mt-6 max-w-[420px] text-center text-[17px] font-medium leading-snug text-text">
          "Tell me about a challenging technical problem you solved."
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-small font-medium tabular-nums text-text-secondary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Question 3 of 10 · 01:24
        </div>
      </Card>

      {/* Feedback preview */}
      <Card className="flex flex-col gap-4 p-5">
        <div className="text-small font-semibold text-text">Feedback preview</div>

        <FeedbackMetric label="Communication" value={88} />
        <FeedbackMetric label="Technical" value={81} />
        <FeedbackMetric label="Confidence" value={83} />

        <div className="mt-auto border-t border-border pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-green-deep">
            What you did well
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            <li className="flex gap-2 text-xs text-text-secondary">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              Clear, structured explanation
            </li>
            <li className="flex gap-2 text-xs text-text-secondary">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              Concrete technical examples
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

function FeedbackMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="text-sm font-semibold text-text">{value}</span>
      </div>
      <div className="mt-1.5">
        <Progress value={value} tone={value >= 80 ? 'primary' : 'success'} />
      </div>
    </div>
  );
}
