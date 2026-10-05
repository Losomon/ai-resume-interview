import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Card, Badge, Progress } from '@/components/ui';
import { ATSScore } from '@/components/ats/ATSScore';
import { scaleReveal, slideInLeft, viewportOnce } from './motion';

export function ATSSection() {
  return (
    <section id="ats" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Visual (left on desktop) */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="order-2 lg:order-1"
        >
          <Card className="p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <ATSScore score={87} />
              <div>
                <Badge tone="progress">Excellent match</Badge>
                <p className="mt-3 text-small leading-relaxed text-text-secondary">
                  Your resume matches the role well. A few keywords are missing.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <Row label="Keywords" value={91} />
              <Row label="Experience" value={88} />
              <Row label="Formatting" value={96} />
              <Row label="Skills" value={76} />
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Potential gaps
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Docker', 'AWS', 'CI/CD'].map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-attention/20 bg-attention-tint px-2.5 py-0.5 text-xs font-medium text-attention"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-text-muted">
                These skills are mentioned in the job description but not found in your resume. Only
                add them if genuinely true.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Copy (right on desktop) */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="order-1 lg:order-2"
        >
          <Badge tone="info">ATS Analyzer</Badge>
          <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[42px]">
            See exactly how your
            <br />
            resume matches the job.
          </h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-text-secondary">
            We tell you the difference between missing evidence and an actual skill gap — and we
            never suggest you claim something you don't have.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {[
              'Real keyword extraction from the job description',
              'Score breakdown by keywords, experience, formatting, skills',
              'Honest gap reporting: evidence vs. real gaps',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-small text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-info" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Analyze my resume
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const ATSection = ATSSection;

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-small text-text-secondary">{label}</span>
      <Progress value={value} tone={value >= 80 ? 'primary' : 'success'} />
      <span className="w-10 text-right text-small font-medium text-text">{value}%</span>
    </div>
  );
}
