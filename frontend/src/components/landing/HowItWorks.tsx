import { motion } from "framer-motion";
import { FileText, Target, Mic } from "lucide-react";
import { Card } from "@/components/ui";
import { fadeUp, stagger, viewportOnce } from "./motion";

const steps = [
  {
    n: "01",
    title: "Build your resume",
    body: "Start with a template, add your experience, and let AI tighten every bullet.",
    icon: FileText,
  },
  {
    n: "02",
    title: "Match to the job",
    body: "Paste a job description. We show exactly where you match and where you don't.",
    icon: Target,
  },
  {
    n: "03",
    title: "Practice the interview",
    body: "Run a focused mock session. Get a report and track your readiness score.",
    icon: Mic,
  },
];

export function HowItWorks() {
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
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[40px]"
          >
            Three steps. One loop.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[16px] leading-relaxed text-text-secondary"
          >
            Improve, measure, repeat. Your readiness score moves every time.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {steps.map(({ n, title, body, icon: Icon }) => (
            <motion.div key={n} variants={fadeUp}>
              <Card className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-tint text-primary">
                    <Icon size={20} />
                  </span>
                  <span className="text-[28px] font-bold leading-none text-border-hover">
                    {n}
                  </span>
                </div>
                <h3 className="mt-5 text-card text-text">{title}</h3>
                <p className="mt-2 text-small leading-relaxed text-text-secondary">
                  {body}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}