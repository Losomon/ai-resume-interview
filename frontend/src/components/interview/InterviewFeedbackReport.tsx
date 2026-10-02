import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui";
import { ATSScore } from "@/components/ats/ATSScore";
import type { InterviewFeedback } from "@/types/resume";

export function InterviewFeedbackReport({ feedback }: { feedback: InterviewFeedback }) {
  const { scores, strengths, improvements, perQuestion } = feedback;

  const subs: { label: string; value: number }[] = [
    { label: "Communication", value: scores.communication },
    { label: "Technical",     value: scores.technical },
    { label: "Confidence",    value: scores.confidence },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Overall */}
      <Card className="p-6 flex flex-col items-center gap-6 sm:flex-row">
        <ATSScore score={scores.overall} />
        <div className="flex-1 text-center sm:text-left">
          <div className="text-small font-medium text-text-secondary">Overall</div>
          <div className="mt-1 text-[28px] font-bold leading-tight text-text">
            {scores.overall >= 80
              ? "Strong performance"
              : scores.overall >= 60
                ? "Solid performance"
                : "Needs more practice"}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {subs.map((s) => (
              <div key={s.label}>
                <div className="text-[22px] font-bold leading-none text-text">{s.value}</div>
                <div className="mt-1 text-xs text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Strengths + improvements */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-small font-semibold text-green-deep">
            <CheckCircle2 size={16} />
            What you did well
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {strengths.map((s) => (
              <li key={s} className="flex gap-2 text-small text-text-secondary">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 text-small font-semibold text-attention">
            <AlertCircle size={16} />
            Areas to improve
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {improvements.map((s) => (
              <li key={s} className="flex gap-2 text-small text-text-secondary">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-attention" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Per-question notes */}
      {perQuestion.length > 0 && (
        <Card className="p-5">
          <h3 className="text-small font-semibold text-text">Per-question notes</h3>
          <div className="mt-3 flex flex-col gap-3">
            {perQuestion.map((p, i) => (
              <div key={p.questionId} className="flex gap-3 text-small">
                <span className="shrink-0 font-semibold text-text-muted">
                  Q{i + 1}
                </span>
                <span className="text-text-secondary">{p.note}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}