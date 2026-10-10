import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mic, RefreshCw, Square } from 'lucide-react';
import { Button, Card, Badge, AIMark, Progress } from '@/components/ui';
import { scaleReveal, slideInLeft, viewportOnce } from './motion';
import { cn } from '@/utils/cn';

type Status = 'idle' | 'recording' | 'analyzed';

const QUESTION = 'Tell me about a challenging technical problem you solved.';

const feedback = {
  overall: 84,
  metrics: [
    { label: 'Communication', value: 88 },
    { label: 'Technical', value: 81 },
    { label: 'Confidence', value: 83 },
  ],
  strengths: [
    'Clear, structured explanation',
    'Concrete technical examples',
    'Described the trade-offs involved',
  ],
  improvements: [
    'Add measurable results to the outcome',
    'Say what you personally did, not just the team',
  ],
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function InterviewSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (status !== 'recording') return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  function start() {
    setElapsed(0);
    setStatus('recording');
  }

  function stop() {
    setStatus('analyzed');
  }

  function reset() {
    setElapsed(0);
    setStatus('idle');
  }

  return (
    <section id="interview" className="relative overflow-hidden bg-bg-secondary py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] bg-glow-green opacity-40 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Copy */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Badge tone="ai">AI Interview</Badge>
          <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[42px]">
            Practice interviews
            <br />
            that actually help.
          </h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-text-secondary">
            Behavioral, technical, and situational questions tailored to the role you're targeting.
            Structured feedback after every session.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {[
              'Tailored questions by role and level',
              'Per-question timer with transcript',
              'Feedback on communication, technical depth, and confidence',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-small text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link to="/register">
              <Button size="lg">
                Practice interview
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Interactive demo */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Card className="relative p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AIMark size={18} />
                <span className="text-small font-semibold text-text">AI Interview</span>
              </div>
              <span className="text-xs text-text-muted">Question 3 of 10</span>
            </div>

            {/* Orb + question */}
            <div className="mt-6 flex flex-col items-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                {/* Idle glow */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-full bg-glow-green blur-2xl transition-opacity duration-panel',
                    status === 'idle' ? 'opacity-40' : 'opacity-70',
                  )}
                />

                {/* Recording pulse ring */}
                {status === 'recording' && (
                  <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/40" />
                )}

                <AIMark size={72} glow thinking={status === 'recording'} />
              </div>

              <p className="mt-6 max-w-[400px] text-center text-[17px] font-medium leading-snug text-text">
                "{QUESTION}"
              </p>

              {/* Timer */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-small font-medium tabular-nums text-text-secondary">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    status === 'recording' ? 'bg-problem animate-pulse' : 'bg-primary',
                  )}
                />
                {status === 'idle' && 'Ready when you are'}
                {status === 'recording' && formatTime(elapsed)}
                {status === 'analyzed' && `Recorded ${formatTime(elapsed)}`}
              </div>
            </div>

            {/* Action button */}
            <div className="mt-6 flex justify-center">
              {status === 'idle' && (
                <Button onClick={start} size="lg">
                  <Mic size={16} />
                  Start recording
                </Button>
              )}
              {status === 'recording' && (
                <Button onClick={stop} size="lg" variant="primary">
                  <Square size={14} />
                  Stop &amp; analyze
                </Button>
              )}
              {status === 'analyzed' && (
                <Button onClick={reset} size="lg" variant="secondary">
                  <RefreshCw size={16} />
                  Practice again
                </Button>
              )}
            </div>

            {/* Feedback — appears after stop */}
            {status === 'analyzed' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 border-t border-border pt-6"
              >
                {/* Overall */}
                <div className="flex items-baseline gap-2">
                  <span className="text-[36px] font-bold leading-none text-text">
                    {feedback.overall}
                  </span>
                  <span className="text-small text-text-muted">/100</span>
                  <span className="ml-auto">
                    <Badge tone="progress">Strong performance</Badge>
                  </span>
                </div>

                {/* Three metrics */}
                <div className="mt-5 flex flex-col gap-3">
                  {feedback.metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-text-secondary">{m.label}</span>
                      <Progress
                        value={m.value}
                        tone={m.value >= 80 ? 'primary' : 'success'}
                        className="flex-1"
                      />
                      <span className="w-9 text-right text-xs font-medium text-text">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Strengths */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-green-deep">
                    What you did well
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {feedback.strengths.map((s) => (
                      <li key={s} className="flex gap-2 text-xs text-text-secondary">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-attention">
                    Areas to improve
                  </div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {feedback.improvements.map((s) => (
                      <li key={s} className="flex gap-2 text-xs text-text-secondary">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-attention" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
