import { MapPin, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { JobMatchScore } from "./JobMatchScore";
import { cn } from "@/utils/cn";
import type { Job, JobMatch } from "@/types/resume";

type Props = {
  job: Job;
  match?: JobMatch;
  saved: boolean;
  onOpen: () => void;
  onToggleSaved: () => void;
};

export function JobCard({ job, match, saved, onOpen, onToggleSaved }: Props) {
  return (
    <Card hover className="relative flex flex-col p-5">
      {/* Save button */}
      <button
        type="button"
        aria-label={saved ? "Unsave job" : "Save job"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleSaved();
        }}
        className={cn(
          "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-button",
          "transition-colors duration-card",
          saved
            ? "text-primary hover:bg-primary-tint"
            : "text-text-muted hover:bg-bg-secondary hover:text-text",
        )}
      >
        {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      </button>

      {/* Click target */}
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col items-start text-left"
      >
        <div className="flex w-full items-start gap-3 pr-10">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-[15px] font-semibold text-text">
            {job.companyInitial}
          </span>
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-text">
              {job.title}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-muted">
              {job.company}
              <span className="text-border-hover">·</span>
              <MapPin size={11} />
              {job.remote ? "Remote" : job.location}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.tags.slice(0, 4).map((t) => {
            const isMatched = match?.matchedSkills.includes(t);
            return (
              <span
                key={t}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  isMatched
                    ? "border-primary/25 bg-primary-tint text-green-deep"
                    : "border-border bg-bg-secondary text-text-secondary",
                )}
              >
                {t}
              </span>
            );
          })}
        </div>

        {/* Salary + level */}
        <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
          <span className="font-medium text-text-secondary">
            ${Math.round(job.salaryMin / 1000)}k–${Math.round(job.salaryMax / 1000)}k
          </span>
          <span className="text-border-hover">·</span>
          <span className="capitalize">{job.level}</span>
        </div>
      </button>

      {/* Match score */}
      {match && (
        <div className="absolute bottom-5 right-5">
          <JobMatchScore score={match.score} />
        </div>
      )}
    </Card>
  );
}