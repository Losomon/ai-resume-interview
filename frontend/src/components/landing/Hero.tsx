import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button, Card, Progress, AIMark } from "@/components/ui";
import { dashboardRise, fadeUp, viewportOnce, stagger } from "./motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-[72px]">
      {/* Warm grid + green glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid-warm" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[620px] w-[920px] -translate-x-1/2 bg-glow-green opacity-60" />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-20">
        {/* Text */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-[760px] flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-text-secondary shadow-card">
              <AIMark size={14} />
              Powered by AI — build a stronger career
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-hero-sm text-text sm:text-hero-md lg:text-hero"
          >
            Your Career.
            <br />
            <span className="bg-gradient-to-br from-primary to-green-deep bg-clip-text text-transparent">
              Engineered.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-text-secondary"
          >
            AI-powered tools to build a stronger career with confidence.
            Resume, ATS, and interview prep — in one place.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link to="/register">
              <Button size="lg">
                Build My Resume
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                <Sparkles size={16} />
                Practice Interview
              </Button>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs text-text-muted">
            Trusted by 50,000+ job seekers worldwide
          </motion.p>
        </motion.div>

        {/* Product preview */}
        <motion.div
          variants={dashboardRise}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          style={{ perspective: 1200 }}
          className="relative mx-auto mt-16 max-w-[1080px] lg:mt-20"
        >
          {/* Warm halo behind card */}
          <div className="pointer-events-none absolute -inset-8 bg-glow-warm opacity-40 blur-3xl" />

          <div className="relative rounded-card border border-border bg-card p-3 shadow-card-hover">
            {/* Mock window chrome */}
            <div className="flex items-center gap-2 px-3 pb-3 pt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
            </div>

            {/* Dashboard preview */}
            <div className="grid gap-3 rounded-[10px] bg-bg-secondary p-5 lg:grid-cols-[1fr_320px]">
              <div className="flex flex-col gap-3">
                <Card className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-small font-medium text-text-secondary">
                      Career Readiness
                    </span>
                    <AIMark size={16} />
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-[42px] font-bold leading-none text-text">82</span>
                    <span className="text-small text-text-muted">/100</span>
                  </div>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <ScoreRow label="Resume"    value={92} />
                    <ScoreRow label="ATS"       value={78} />
                    <ScoreRow label="Interview" value={86} />
                    <ScoreRow label="Skills"    value={68} />
                  </div>
                </Card>

                <div className="grid gap-3 sm:grid-cols-3">
                  <MiniStat label="Resume" value="92%" />
                  <MiniStat label="ATS" value="87" />
                  <MiniStat label="Interview" value="84" />
                </div>
              </div>

              <Card className="p-5">
                <span className="text-small font-medium text-text-secondary">
                  Recommended
                </span>
                <div className="mt-4 flex flex-col gap-3">
                  <RecommendRow text="Improve ATS score" tone="ai" />
                  <RecommendRow text="Practice interview" tone="progress" />
                  <RecommendRow text="Update resume" tone="neutral" />
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- small helpers ---------- */

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs text-text-secondary">{label}</span>
      <Progress value={value} tone={value >= 80 ? "primary" : value >= 60 ? "success" : "attention"} />
      <span className="w-9 text-right text-xs font-medium text-text">{value}%</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-text-muted">{label}</div>
      <div className="mt-1 text-[20px] font-semibold text-text">{value}</div>
    </Card>
  );
}

function RecommendRow({ text, tone }: { text: string; tone: "ai" | "progress" | "neutral" }) {
  const dot = { ai: "bg-primary", progress: "bg-success", neutral: "bg-text-muted" }[tone];
  return (
    <div className="flex items-center gap-2.5 text-small text-text-secondary">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {text}
    </div>
  );
}