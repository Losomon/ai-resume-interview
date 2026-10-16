import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button, Card, Badge, Progress, AIMark } from '@/components/ui';
import { fadeUp, stagger, scaleReveal, viewportOnce } from './motion';

const breakdown = [
  { label: 'Resume', value: 92, tone: 'primary' as const },
  { label: 'ATS', value: 78, tone: 'success' as const },
  { label: 'Interview', value: 86, tone: 'primary' as const },
  { label: 'Skills', value: 68, tone: 'attention' as const },
];

export function CareerReadiness() {
  return (
    <section className="bg-bg py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Copy */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <Badge tone="progress">Career Readiness</Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[42px]"
          >
            One score that
            <br />
            moves with you.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-text-secondary"
          >
            Your readiness score combines resume quality, ATS match, interview performance, and
            skill depth — updated every time you improve something.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-7 flex flex-col gap-3">
            {[
              'Live, not a one-time test',
              'Broken down into what to do next',
              'Honest — measured only from your real data',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-small text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8">
            <Link to="/register">
              <Button size="lg">
                See my readiness
                <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Card className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-small font-medium text-text-secondary">
                <AIMark size={16} />
                Career Readiness
              </div>
              <Badge tone="progress">
                <TrendingUp size={11} />
                Improving
              </Badge>
            </div>

            {/* Big score */}
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[72px] font-bold leading-none text-text">82</span>
              <span className="text-small text-text-muted">/100</span>
            </div>

            {/* Breakdown — 4 rows */}
            <div className="mt-8 flex flex-col gap-4">
              {breakdown.map((r) => (
                <div key={r.label} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-small text-text-secondary">{r.label}</span>
                  <Progress value={r.value} tone={r.tone} className="flex-1" />
                  <span className="w-10 shrink-0 text-right text-small font-medium text-text">
                    {r.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Next step callout */}
            <div className="mt-8 rounded-button border border-border bg-bg-secondary p-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                <AIMark size={12} />
                Recommended next step
              </div>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                Add 2 missing skills to reach an ATS score of 90+.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
