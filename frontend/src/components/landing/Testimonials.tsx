import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { fadeUp, stagger, viewportOnce } from "./motion";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Product Designer",
    initials: "AO",
    quote:
      "The AI rewrites are the first ones I've seen that make my bullets more specific without making things up. Genuinely useful.",
    color: "bg-primary-tint text-green-deep",
  },
  {
    name: "Daniel Reyes",
    role: "Software Engineer",
    initials: "DR",
    quote:
      "Running a mock interview the night before a real one completely changed how I prepared. The feedback was blunt in the right way.",
    color: "bg-info-tint text-info",
  },
  {
    name: "Priya Shah",
    role: "Marketing Manager",
    initials: "PS",
    quote:
      "The ATS analyzer told me exactly which keywords were missing and — importantly — which ones I shouldn't fake. That honesty matters.",
    color: "bg-attention-tint text-attention",
  },
  {
    name: "Marcus Bennett",
    role: "Recent Graduate",
    initials: "MB",
    quote:
      "I went from a generic resume to one that actually matched the jobs I was applying for. Three interviews in the first week.",
    color: "bg-primary-tint text-green-deep",
  },
];

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
              <Card className="h-full p-6">
                <p className="text-[15px] leading-relaxed text-text-secondary">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-small font-semibold ${t.color}`}
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