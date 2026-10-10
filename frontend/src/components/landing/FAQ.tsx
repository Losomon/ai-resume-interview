import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from './motion';

const faqs = [
  {
    q: 'Does CareerForge write my resume for me?',
    a: "No. It suggests specific improvements to what you've already written — you always approve, edit, or reject every change. CareerForge never invents experience or qualifications.",
  },
  {
    q: 'How is the ATS score calculated?',
    a: "We extract keywords from the job description and match them against your resume's actual content. The score combines keyword coverage, experience quality, formatting, and skills depth — weighted toward keywords, which is what most real ATS systems prioritize.",
  },
  {
    q: 'What kind of interview questions does it ask?',
    a: 'Behavioral, technical, and situational questions, tailored to the role and level you select. Each session is a fresh draw from our question bank.',
  },
  {
    q: 'Can I use CareerForge for free?',
    a: "Yes. The free tier includes one resume, three ATS analyses, and two mock interviews per month. Upgrade to Pro when you're actively job hunting.",
  },
  {
    q: 'Is my data private?',
    a: "Your resume and interview data stay on your device by default in this version. When you connect a real backend, we'll publish the privacy policy in full.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-[820px] px-6 lg:px-10">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            Questions, answered.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 flex flex-col gap-3"
        >
          {faqs.map((f) => (
            <motion.details
              key={f.q}
              variants={fadeUp}
              className="group rounded-card border border-border bg-card px-5 py-4 transition-colors duration-card hover:border-border-hover"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[15px] font-medium text-text">{f.q}</span>
                <Plus
                  size={18}
                  className="shrink-0 text-text-muted transition-transform duration-card group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-small leading-relaxed text-text-secondary">{f.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
