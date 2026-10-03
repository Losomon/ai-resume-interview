import { useEffect } from "react";
import { X, MapPin, DollarSign, Calendar, Bookmark, BookmarkCheck } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { JobMatchScore } from "./JobMatchScore";
import { cn } from "@/utils/cn";
import type { Job, JobMatch } from "@/types/resume";

type Props = {
  job: Job | null;
  match?: JobMatch;
  saved: boolean;
  onClose: () => void;
  onToggleSaved: () => void;
  onApply: () => void;
};

export function JobDetails({
  job,
  match,
  saved,
  onClose,
  onToggleSaved,
  onApply,
}: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (job) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [job, onClose]);

  if (!job) return null;

  const posted = new Date(job.postedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          "relative flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-bg",
          "border-l border-border shadow-card-hover",
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
          >
            <X size={18} />
          </button>
          <span className="text-small font-medium text-text-secondary">Job details</span>

          <button
            type="button"
            onClick={onToggleSaved}
            className={cn(
              "ml-auto flex h-9 w-9 items-center justify-center rounded-button transition-colors duration-card",
              saved
                ? "text-primary hover:bg-primary-tint"
                : "text-text-muted hover:bg-bg-secondary hover:text-text",
            )}
            aria-label={saved ? "Unsave" : "Save"}
          >
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Header block */}
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-[18px] font-semibold text-text">
              {job.companyInitial}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-[22px] font-bold leading-snug text-text">
                {job.title}
              </h2>
              <p className="mt-1 text-small text-text-secondary">{job.company}</p>
            </div>
            {match && <JobMatchScore score={match.score} size={56} />}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2">
            <Meta icon={<MapPin size={12} />}>
              {job.remote ? "Remote" : job.location}
            </Meta>
            <Meta icon={<DollarSign size={12} />}>
              ${Math.round(job.salaryMin / 1000)}k–${Math.round(job.salaryMax / 1000)}k
            </Meta>
            <Meta icon={<Calendar size={12} />}>Posted {posted}</Meta>
            <Badge tone="neutral" className="capitalize">
              {job.level}
            </Badge>
          </div>

          {/* Skill match */}
          {match && (
            <div className="flex flex-col gap-4">
              {match.matchedSkills.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-green-deep">
                    You match ({match.matchedSkills.length})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {match.matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-primary/25 bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-green-deep"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {match.missingSkills.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-attention">
                    Not in your resume ({match.missingSkills.length})
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {match.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-attention/20 bg-attention-tint px-2.5 py-0.5 text-xs font-medium text-attention"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-small font-semibold text-text">About the role</h3>
            <p className="mt-2 text-small leading-relaxed text-text-secondary">
              {job.description}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-small font-semibold text-text">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-xs text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="sticky bottom-0 mt-auto flex gap-2 border-t border-border bg-bg/95 px-6 py-4 backdrop-blur-md">
          <Button className="flex-1" onClick={onApply}>
            Apply now
          </Button>
          <Button variant="secondary" onClick={onToggleSaved}>
            {saved ? "Saved" : "Save"}
          </Button>
        </footer>
      </aside>
    </div>
  );
}

function Meta({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-text-secondary">
      {icon}
      {children}
    </span>
  );
}