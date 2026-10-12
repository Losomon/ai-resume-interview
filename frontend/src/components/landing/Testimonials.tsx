import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui';
import { fadeUp, stagger, viewportOnce } from './motion';

const testimonials = [
  {
    name: 'Amara Okafor',
    role: 'Product Designer',
    initials: 'AO',
    avatarTone: 'ai' as const,
    quote:
      "The AI rewrites are the first ones I've seen that make my bullets more specific without making things up. Genuinely useful.",
    stars: 5,
  },
  {
    name: 'Daniel Reyes',
    role: 'Software Engineer',
    initials: 'DR',
    avatarTone: 'info' as const,
    quote:
      'Running a mock interview the night before a real one completely changed how I prepared. The feedback was blunt in the right way.',
    stars: 5,
  },
  {
    name: 'Priya Shah',
    role: 'Marketing Manager',
    initials: 'PS',
    avatarTone: 'attention' as const,
    quote:
      "The ATS analyzer told me exactly which keywords were missing and — importantly — which ones I shouldn't fake. That honesty matters.",
    stars: 5,
  },
  {
    name: 'Marcus Bennett',
    role: 'Recent Graduate',
    initials: 'MB',
    avatarTone: 'ai' as const,
    quote:
      'I went from a generic resume to one that actually matched the jobs I was applying for. Three interviews in the first week.',
    stars: 5,
  },
];

const avatarToneClass = {
  ai: 'bg-primary-tint text-green-deep',
  info: 'bg-info-tint text-info',
  attention: 'bg-attention-tint text-attention',
} as const;

export function Testimonials() {
  return (
    <section className="bg-bg-secondary py-24 lg:py-32">
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
            Testimonials
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            What people actually
            <br />
            say after using it.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <Card className="flex h-full flex-col p-6">
                {/* Stars */}
                <div className="flex gap-1" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="fill-attention text-attention" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-secondary">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-small font-semibold ${avatarToneClass[t.avatarTone]}`}
                  >
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-small font-semibold text-text">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
