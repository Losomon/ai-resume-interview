import { Building2, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { Application, ApplicationStage } from "@/types/resume";

type Props = {
  app: Application;
  onOpen: (app: Application) => void;
};

const stageLabel: Record<ApplicationStage, { label: string; tone: "neutral" | "info" | "attention" | "progress" | "problem" }> = {
  saved:      { label: "Saved",     tone: "neutral" },
  applied:    { label: "Applied",   tone: "info" },
  interview:  { label: "Interview", tone: "attention" },
  offer:      { label: "Offer",     tone: "progress" },
  rejected:   { label: "Rejected",  tone: "problem" },
};

export function ApplicationRow({ app, onOpen }: Props) {
  const stage = stageLabel[app.stage];

  const appliedLabel = app.appliedAt
    ? `Applied ${new Date(app.appliedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
    : "Not yet applied";

  const followUp = (app as unknown as { followUpAt?: string }).followUpAt;

  return (
    <button
      type="button"
      onClick={() => onOpen(app)}
      className={cn(
        "group flex w-full items-center gap-4 rounded-card border border-border bg-card p-4 text-left",
        "transition-all duration-card",
        "hover:-translate-y-px hover:border-border-hover hover:shadow-card-hover",
      )}
    >
      {/* Company initial */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-[15px] font-semibold text-text">
        {app.companyInitial}
      </span>

      {/* Main info */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-1 text-small font-semibold text-text">
          {app.jobTitle}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <Building2 size={10} />
            {app.company}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={10} />
            {app.location}
          </span>
        </p>
      </div>

      {/* Status */}
      <Badge tone={stage.tone}>{stage.label}</Badge>

      {/* Dates */}
      <div className="hidden min-w-[180px] shrink-0 flex-col items-end gap-1 text-right sm:flex">
        <span className="text-xs text-text-muted">{appliedLabel}</span>
        {followUp && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-attention">
            <Calendar size={10} />
            Follow up: {new Date(followUp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        )}
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-text-muted transition-transform duration-card group-hover:translate-x-0.5 group-hover:text-primary">
        →
      </span>
    </button>
  );
}