import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { fadeUp, stagger, viewportOnce } from './motion';
import { cn } from '@/utils/cn';

type BillingCycle = 'monthly' | 'yearly';

const tiers = [
  {
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    cadence: 'forever',
    blurb: 'Everything you need to get started.',
    features: [
      '1 resume',
      '3 ATS analyses per month',
      '2 mock interviews per month',
      'Basic feedback report',
    ],
    cta: 'Start free',
    highlighted: false,
    custom: false,
  },
  {
    name: 'Pro',
    priceMonthly: 12,
    priceYearly: 9,
    cadence: 'per month',
    blurb: 'For anyone actively job hunting.',
    features: [
      'Unlimited resumes',
      'Unlimited ATS analyses',
      'Unlimited mock interviews',
      'Full feedback + transcript',
      'Job match recommendations',
      'Priority AI responses',
    ],
    cta: 'Start 7-day trial',
    highlighted: true,
    custom: false,
  },
  {
    name: 'Teams',
    priceMonthly: null,
    priceYearly: null,
    cadence: 'contact us',
    blurb: 'For career coaches and bootcamps.',
    features: [
      'Everything in Pro',
      'Multi-seat management',
      'Cohort analytics',
      'Custom question banks',
      'Dedicated support',
    ],
    cta: 'Talk to us',
    highlighted: false,
    custom: true,
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>('monthly');

  return (
    <section id="pricing" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-[640px] text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            Simple pricing.
            <br />
            No surprises.
          </motion.h2>

          {/* Billing toggle */}
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-button border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={cn(
                  'rounded-[6px] px-4 py-2 text-small font-medium transition-colors duration-card',
                  billing === 'monthly'
                    ? 'bg-primary-tint text-green-deep'
                    : 'text-text-secondary hover:text-text',
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('yearly')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-[6px] px-4 py-2 text-small font-medium transition-colors duration-card',
                  billing === 'yearly'
                    ? 'bg-primary-tint text-green-deep'
                    : 'text-text-secondary hover:text-text',
                )}
              >
                Yearly
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                    billing === 'yearly'
                      ? 'bg-primary text-text-inverse'
                      : 'bg-success-tint text-green-deep',
                  )}
                >
                  Save 25%
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 lg:grid-cols-3"
        >
          {tiers.map((t) => {
            const price = t.custom
              ? 'Custom'
              : billing === 'yearly'
                ? `$${t.priceYearly}`
                : `$${t.priceMonthly}`;

            const cadence = t.custom
              ? t.cadence
              : t.priceMonthly === 0
                ? 'forever'
                : billing === 'yearly'
                  ? 'per month, billed yearly'
                  : 'per month';

            return (
              <motion.div key={t.name} variants={fadeUp}>
                <Card
                  className={cn(
                    'relative flex h-full flex-col p-6',
                    t.highlighted && 'border-primary/40 shadow-card-hover',
                  )}
                >
                  {t.highlighted && (
                    <div className="absolute -top-3 left-6">
                      <Badge tone="ai">Most popular</Badge>
                    </div>
                  )}

                  <div className="text-card text-text">{t.name}</div>
                  <p className="mt-1 text-small text-text-secondary">{t.blurb}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-[36px] font-bold leading-none text-text">{price}</span>
                    <span className="text-small text-text-muted">{cadence}</span>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-small text-text-secondary"
                      >
                        <Check size={14} className="mt-1 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to="/register" className="mt-8">
                    <Button variant={t.highlighted ? 'primary' : 'secondary'} className="w-full">
                      {t.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
