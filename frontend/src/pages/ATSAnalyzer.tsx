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

export default function ATSAnalyzer() {
  const { resumes, fetchAll, update } = useResumeStore();
  const {
    analysis,
    analyzing,
    error,
    analyze,
    reset,
  } = useATSStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Auto-select first resume
  useEffect(() => {
    if (!selectedId && resumes.length > 0) setSelectedId(resumes[0].id);
  }, [resumes, selectedId]);

  const selected = resumes.find((r) => r.id === selectedId) ?? null;

  async function onAnalyze() {
    if (!selected) return;
    const result = await analyze(selected);
    // Persist the score back onto the resume — this is what powers
    // the score chip in the builder topbar.
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
              className="text-small font-medium text-text-secondary hover:text-primary transition-colors"
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

          {analyzing && (
            <Card className="p-10">
              <div className="flex flex-col items-center gap-4">
                <AIMark size={64} thinking />
                <p className="text-small text-text-secondary">AI is analyzing…</p>
                <div className="flex gap-1 text-primary">
                  <span className="animate-dot-1">●</span>
                  <span className="animate-dot-2">●</span>
                  <span className="animate-dot-3">●</span>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-40 rounded-card" />
                <Skeleton className="h-40 rounded-card" />
              </div>
            </Card>
          )}

          {analysis && !analyzing && (
            <div className="flex flex-col gap-4">
              {/* Score */}
              <Card className="p-6">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                  <ATSScore score={analysis.score.overall} />
                  <div className="flex-1">
                    <div className="text-small font-medium text-text-secondary">
                      Overall match
                    </div>
                    <div className="mt-1 text-[28px] font-bold leading-tight text-text">
                      {analysis.score.overall >= 80
                        ? "Excellent match"
                        : analysis.score.overall >= 60
                          ? "Good match"
                          : analysis.score.overall >= 40
                            ? "Fair match"
                            : "Needs work"}
                    </div>
                    <p className="mt-2 text-small text-text-secondary">
                      Based on {analysis.matches.length} keywords extracted from
                      the job description.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <ATSScoreBreakdown score={analysis.score} />
                </div>
              </Card>

              {/* Keywords */}
              <Card className="p-6">
                <h3 className="text-card text-text">Keyword match</h3>
                <div className="mt-4">
                  <KeywordMatch matches={analysis.matches} />
                </div>
              </Card>

              {/* Strengths + suggestions */}
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