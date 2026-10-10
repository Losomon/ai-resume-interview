import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, RefreshCw, AlertTriangle, X, Check } from "lucide-react";
import { Button, Card, Badge, Progress } from "@/components/ui";
import { scaleReveal, slideInLeft, viewportOnce } from "./motion";

type ScanResult = {
  score: number;
  matched: string[];
  evidence: string[];
  gaps: string[];
  breakdown: { label: string; value: number }[];
};

const SAMPLE_JD_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Spring Boot",
  "CI/CD",
  "GraphQL",
  "Kubernetes",
];

const INITIAL_TEXT =
  "Full Stack Developer with 5 years experience. Built REST APIs in Node.js backed by PostgreSQL. Shipped production React and TypeScript applications. Comfortable with AWS deployments.";

function runScan(text: string): ScanResult {
  const lower = text.toLowerCase();
  const matched: string[] = [];
  const evidence: string[] = [];
  const gaps: string[] = [];

  // Related-skill map — mirrors the RELATED table in ats.service.ts
  const related: Record<string, string[]> = {
    "spring boot": ["java"],
    docker: ["kubernetes", "ci/cd", "linux"],
    kubernetes: ["docker"],
    aws: ["azure", "gcp"],
    "ci/cd": ["docker", "kubernetes"],
    graphql: ["rest", "api"],
    typescript: ["javascript"],
    react: ["javascript", "typescript"],
    "node.js": ["javascript", "typescript"],
    postgresql: ["sql"],
  };

  for (const skill of SAMPLE_JD_SKILLS) {
    const key = skill.toLowerCase();
    const hasDirect = lower.includes(key);
    const hasRelated = (related[key] ?? []).some((r) => lower.includes(r));

    if (hasDirect) matched.push(skill);
    else if (hasRelated) evidence.push(skill);
    else gaps.push(skill);
  }

  const keywordScore = Math.round((matched.length / SAMPLE_JD_SKILLS.length) * 100);
  const hasMetrics = /\d+%|\d+x|\$\d|reduced|increased|improved/.test(lower);
  const expScore = hasMetrics ? 88 : 62;
  const formatScore = text.trim().length > 80 ? 92 : 68;
  const skillScore = Math.round((matched.length / 6) * 100);

  const score = Math.round(
    keywordScore * 0.4 + expScore * 0.3 + skillScore * 0.2 + formatScore * 0.1,
  );

  return {
    score: Math.min(100, Math.max(0, score)),
    matched,
    evidence,
    gaps,
    breakdown: [
      { label: "Keywords",   value: keywordScore },
      { label: "Experience", value: expScore },
      { label: "Formatting", value: formatScore },
      { label: "Skills",     value: skillScore },
    ],
  };
}

export function ATSection() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  function onScan() {
    setScanning(true);
    setResult(null);
    // Simulate the ~1.1s analysis wait, matching the real analyzer's latency.
    setTimeout(() => {
      setResult(runScan(text));
      setScanning(false);
    }, 1100);
  }

  return (
    <section id="ats" className="bg-bg py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Copy (left on desktop) */}
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
            We tell you the difference between missing evidence and an actual
            skill gap — and we never suggest you claim something you don't have.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {[
              "Real keyword extraction from the job description",
              "Score breakdown by keywords, experience, formatting, skills",
              "Honest gap reporting: evidence vs. real gaps",
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

        {/* Interactive demo (right on desktop) */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="order-2 lg:order-1"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-info" />
                <span className="text-small font-semibold text-text">
                  Free ATS scan demo
                </span>
              </div>
              <span className="text-xs text-text-muted">Paste & test</span>
            </div>

            {/* Textarea */}
            <div className="mt-5">
              <label className="mb-2 block text-xs font-medium text-text-muted">
                Resume summary draft
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full resize-none rounded-button border border-border bg-bg px-3 py-2.5 text-small leading-relaxed text-text placeholder:text-text-muted transition-colors duration-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                placeholder="Paste a short summary or a few bullets from your resume…"
              />
            </div>

            {/* Scan button */}
            <Button onClick={onScan} loading={scanning} className="mt-4 w-full">
              {!scanning && <Zap size={14} />}
              {scanning ? "Scanning…" : "Run instant scan"}
            </Button>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5 flex flex-col gap-5 rounded-button border border-border bg-bg-secondary p-4"
              >
                {/* Score */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">
                      Simulated ATS score
                    </span>
                    <span
                      className={
                        result.score >= 80
                          ? "text-[24px] font-bold leading-none text-green-deep"
                          : result.score >= 60
                            ? "text-[24px] font-bold leading-none text-attention"
                            : "text-[24px] font-bold leading-none text-problem"
                      }
                    >
                      {result.score}
                      <span className="text-xs font-normal text-text-muted">
                        /100
                      </span>
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress
                      value={result.score}
                      tone={
                        result.score >= 80
                          ? "primary"
                          : result.score >= 60
                            ? "success"
                            : "attention"
                      }
                    />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  {result.breakdown.map((b) => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="w-20 text-[11px] text-text-secondary">
                        {b.label}
                      </span>
                      <Progress
                        value={b.value}
                        tone={b.value >= 80 ? "primary" : "success"}
                        className="flex-1"
                      />
                      <span className="w-8 text-right text-[11px] font-medium text-text">
                        {b.value}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Matched */}
                {result.matched.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-green-deep">
                      <Check size={12} />
                      Matched ({result.matched.length})
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.matched.map((k) => (
                        <span
                          key={k}
                          className="rounded-full border border-primary/25 bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-green-deep"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing evidence */}
                {result.evidence.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-attention">
                      <AlertTriangle size={12} />
                      Missing evidence ({result.evidence.length})
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted">
                      You may already have these — make them explicit if so.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.evidence.map((k) => (
                        <span
                          key={k}
                          className="rounded-full border border-attention/20 bg-attention-tint px-2.5 py-0.5 text-xs font-medium text-attention"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gaps */}
                {result.gaps.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-problem">
                      <X size={12} />
                      Real gaps ({result.gaps.length})
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted">
                      Not found in your text. Only add if genuinely true.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {result.gaps.map((k) => (
                        <span
                          key={k}
                          className="rounded-full border border-problem/20 bg-problem-tint px-2.5 py-0.5 text-xs font-medium text-problem"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {!result && !scanning && (
              <p className="mt-4 text-center text-xs text-text-muted">
                This is a preview. The real analyzer uses your actual resume.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}