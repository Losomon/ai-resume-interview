import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button, Card, Badge, AIMark } from "@/components/ui";
import { AIInterviewer } from "@/components/interview/AIInterviewer";
import { scaleReveal, slideInLeft, viewportOnce } from "./motion";

export function InterviewSection() {
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
            Behavioral, technical, and situational questions tailored to the
            role you're targeting. Structured feedback after every session.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {[
              "Tailored questions by role and level",
              "Per-question timer with transcript",
              "Feedback on communication, technical depth, and confidence",
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

        {/* Visual — mock interview room */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Card className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AIMark size={18} />
                <span className="text-small font-semibold text-text">AI Interview</span>
              </div>
              <span className="text-xs text-text-muted">Question 3 of 10</span>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <AIInterviewer state="idle" size={110} />
              <p className="mt-6 text-center text-[17px] font-medium leading-snug text-text">
                "Tell me about a challenging
                <br />
                technical problem you solved."
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-small font-medium tabular-nums text-text-secondary">
                <Clock size={14} className="text-primary" />
                01:24
              </div>
            </div>

            <div className="mt-6 rounded-button border border-border bg-bg-secondary px-4 py-3 text-small text-text-muted">
              Type your answer…
            </div>

            <div className="mt-4 flex justify-end">
              <Button>Submit Answer</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}