import { Check, Clock } from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { LearningPlan } from "@/types/resume";

type Props = {
  plan: LearningPlan;
  onToggleStep: (id: string) => void;
  onReset: () => void;
};

const categoryTone: Record<
  LearningPlan["steps"][number]["category"],
  { label: string; tone: "ai" | "info" | "attention" | "progress" | "neutral" }
> = {
  skill:         { label: "Skill",         tone: "ai" },
  portfolio:     { label: "Portfolio",     tone: "info" },
  certification: { label: "Certification", tone: "attention" },
  interview:     { label: "Interview",     tone: "progress" },
  resume:        { label: "Resume",        tone: "neutral" },
};

export function LearningPlanCard({ plan, onToggleStep, onReset }: Props) {
  const total = plan.steps.length;
  const done = plan.steps.filter((s) => s.completed).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-small font-semibold text-text">Your learning plan</div>
            <p className="mt-1 text-small text-text-secondary">{plan.summary}</p>
            <p className="mt-3 text-xs text-text-muted">
              Goal: <span className="font-medium text-text-secondary">{plan.goal}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-[28px] font-bold leading-none text-text">{pct}%</div>
            <div className="mt-1 text-xs text-text-muted">
              {done}/{total} steps
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-panel ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Card>

      {/* Steps */}
      <div className="flex flex-col gap-2.5">
        {plan.steps.map((step) => {
          const cat = categoryTone[step.category];
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onToggleStep(step.id)}
              className={cn(
                "group flex w-full items-start gap-3 rounded-card border bg-card p-4 text-left transition-all duration-card",
                step.completed
                  ? "border-primary/25 bg-primary-tint/40"
                  : "border-border hover:-translate-y-px hover:border-border-hover hover:shadow-card",
              )}
            >
              {/* Checkbox */}
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-card",
                  step.completed
                    ? "border-primary bg-primary text-text-inverse"
                    : "border-border-hover bg-card group-hover:border-primary/50",
                )}
              >
                {step.completed && <Check size={12} strokeWidth={3} />}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge tone={cat.tone}>{cat.label}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={11} />~{step.estimatedHours}h
                  </span>
                </div>
                <div
                  className={cn(
                    "mt-2 text-small font-medium leading-snug",
                    step.completed
                      ? "text-text-muted line-through"
                      : "text-text",
                  )}
                >
                  {step.title}
                </div>
                <p
                  className={cn(
                    "mt-1 text-small leading-relaxed",
                    step.completed ? "text-text-muted" : "text-text-secondary",
                  )}
                >
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={onReset}>
          Generate a new plan
        </Button>
      </div>
    </div>
  );
}