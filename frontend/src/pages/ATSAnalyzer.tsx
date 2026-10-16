import { useEffect, useState } from "react";
import { FileText, Check } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card, Skeleton, AIMark } from "@/components/ui";
import { JobDescriptionInput } from "@/components/ats/JobDescriptionInput";
import { ATSScore } from "@/components/ats/ATSScore";
import { ATSScoreBreakdown } from "@/components/ats/ATSScoreBreakdown";
import { KeywordMatch } from "@/components/ats/KeywordMatch";
import { ATSBreakdown } from "@/components/ats/ATSBreakdown";
import { useATSStore } from "@/store/atsStore";
import { useResumeStore } from "@/store/resumeStore";
import { cn } from "@/utils/cn";

const STAGES = [
  "Reading resume content",
  "Extracting job requirements",
  "Comparing skills and experience",
  "Generating recommendations",
];

export default function ATSAnalyzer() {
  const { resumes, fetchAll, update } = useResumeStore();
  const { analysis, analyzing, error, analyze, reset } = useATSStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!selectedId && resumes.length > 0) setSelectedId(resumes[0].id);
  }, [resumes, selectedId]);

  // Advance the loading stages while analyzing
  useEffect(() => {
    if (!analyzing) {
      setStage(0);
      return;
    }
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [analyzing]);

  const selected = resumes.find((r) => r.id === selectedId) ?? null;

  async function onAnalyze() {
    if (!selected) return;
    const result = await analyze(selected);
    await update(selected.id, { atsScore: result.score.overall });
  }

  return (
    <>
      <PageHeader
        title="ATS Analyzer"
        subtitle="Check how well your resume matches the job description."
        actions={
          analysis && (
            <button
              type="button"
              onClick={reset}
              className="text-small font-medium text-text-secondary transition-colors hover:text-primary"
            >
              New analysis
            </button>
          )
        }
      />

      {error && (
        <div className="mb-4 rounded-button border border-problem/20 bg-problem-tint px-3 py-2 text-small text-problem">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left: resume picker + JD */}
        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="text-small font-semibold text-text">Select resume</div>
            <div className="mt-3 flex flex-col gap-1.5">
              {resumes.length === 0 && (
                <p className="text-small text-text-muted">No resumes yet.</p>
              )}
              {resumes.map((r) => {
                const isSelected = r.id === selectedId;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedId(r.id)}
                    className={cn(
                      "group flex items-center gap-3 rounded-button border px-3 py-2.5 text-left transition-colors duration-card",
                      isSelected
                        ? "border-primary bg-primary-tint"
                        : "border-border bg-card hover:border-border-hover hover:bg-bg-secondary",
                    )}
                  >
                    <FileText
                      size={16}
                      className={isSelected ? "text-primary" : "text-text-muted"}
                    />
                    <span className="min-w-0 flex-1 truncate text-small font-medium text-text">
                      {r.title}
                    </span>
                    {isSelected && <Check size={14} className="text-primary" />}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <JobDescriptionInput
              onAnalyze={onAnalyze}
              analyzing={analyzing}
              disabled={!selected}
            />
          </Card>
        </div>

        {/* Right: results */}
        <div className="min-w-0">
          {/* Empty state */}
          {!analysis && !analyzing && (
            <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <AIMark size={56} glow />
              <h3 className="mt-5 text-card text-text">Ready when you are</h3>
              <p className="mt-2 max-w-[320px] text-small text-text-secondary">
                Pick a resume, paste the job description, and CareerForge will
                show you exactly where you match and where you don't.
              </p>
            </Card>
          )}

          {/* Loading — 4 named stages */}
          {analyzing && (
            <Card className="p-10">
              <div className="flex flex-col items-center gap-5">
                <AIMark size={64} thinking />
                <p className="text-small font-medium text-text">
                  Analyzing your resume…
                </p>
              </div>

              <ol className="mx-auto mt-8 flex max-w-[360px] flex-col gap-4">
                {STAGES.map((label, i) => {
                  const done = i < stage;
                  const active = i === stage;
                  return (
                    <li key={label} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          done && "border-primary bg-primary text-text-inverse",
                          active && "border-primary bg-card",
                          !done && !active && "border-border bg-card",
                        )}
                      >
                        {done && <Check size={11} strokeWidth={3} />}
                        {active && (
                          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        )}
                      </span>
                      <span
                        className={cn(
                          "text-small transition-colors",
                          done && "text-text-muted line-through",
                          active && "font-medium text-text",
                          !done && !active && "text-text-muted",
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-40 rounded-card" />
                <Skeleton className="h-40 rounded-card" />
              </div>
            </Card>
          )}

          {/* Results */}
          {analysis && !analyzing && (
            <div className="flex flex-col gap-4">
              <Card className="p-6">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <ATSScore score={analysis.score.overall} />
                  <div className="flex-1">
                    <div className="text-small font-medium text-text-secondary">
                      Overall match
                    </div>
                    <div
                      className="mt-1 text-[28px] font-semibold leading-tight text-text"
                      style={{ fontFamily: "Fraunces, Georgia, serif" }}
                    >
                      {analysis.score.overall >= 80
                        ? "Excellent match"
                        : analysis.score.overall >= 60
                          ? "Good match"
                          : analysis.score.overall >= 40
                            ? "Fair match"
                            : "Needs work"}
                    </div>
                    <p className="mt-2 text-small leading-relaxed text-text-secondary">
                      Based on {analysis.matches.length} keywords extracted from
                      the job description. This measures how closely the wording
                      matches — not a prediction of an employer's decision.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <ATSScoreBreakdown score={analysis.score} />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-card text-text">Keyword match</h3>
                <p className="mt-1 text-small text-text-secondary">
                  Broken into three groups so you know what's real.
                </p>
                <div className="mt-5">
                  <KeywordMatch matches={analysis.matches} />
                </div>
              </Card>

              <ATSBreakdown
                strengths={analysis.strengths}
                suggestions={analysis.suggestions}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}