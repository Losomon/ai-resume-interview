import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { slideInLeft, scaleReveal, viewportOnce } from "./motion";

export function ResumeSection() {
  return (
    <section id="features" className="bg-bg-secondary py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Copy */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <Badge tone="ai">AI Resume Builder</Badge>
          <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-text lg:text-[42px]">
            Build a resume that
            <br />
            tells your story clearly.
          </h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-text-secondary">
            Every bullet rewritten to be specific, measurable, and honest. AI
            suggests — you decide. Never fabricate a single line.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {[
              "Live preview as you type",
              "AI rewrites that add metrics, not fluff",
              "Three template-ready layouts",
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
                Start building
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          {/* Resume editor mock */}
          <Card className="p-6">
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
              <div className="text-small font-medium text-text">
                Senior Software Engineer
              </div>
              <div className="text-xs text-text-muted">Tech Solutions Inc.</div>
              <p className="mt-1 text-small leading-relaxed text-text-secondary">
                Improved API performance by 38% through query optimization and
                caching layer redesign.
              </p>

              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Java", "Spring Boot", "React", "PostgreSQL"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-xs text-text-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Floating AI suggestion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -right-4 w-[260px] max-w-[85%] rounded-card border border-primary/25 bg-primary-tint p-4 shadow-card-hover lg:-right-8"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Sparkles size={12} />
              AI Suggestion
            </div>
            <p className="mt-2 text-small leading-relaxed text-green-deep">
              Make this achievement more measurable.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-green-deep/80">
              "Improved API performance by <strong>38%</strong> through query
              optimization…"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}