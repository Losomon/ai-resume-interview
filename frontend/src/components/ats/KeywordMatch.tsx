import { Check, X, HelpCircle } from "lucide-react";
import { cn } from "@/utils/cn";
import type { ATSKeywordMatch } from "@/types/resume";

export function KeywordMatch({ matches }: { matches: ATSKeywordMatch[] }) {
  const matched = matches.filter((m) => m.matched);
  const evidence = matches.filter((m) => !m.matched && m.needsEvidence);
  const gap = matches.filter((m) => !m.matched && !m.needsEvidence);

  const allMatched = matched.length === matches.length && matches.length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* All clear */}
      {allMatched && (
        <div className="flex items-start gap-2.5 rounded-button border border-primary/25 bg-primary-tint px-4 py-3">
          <Check size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-small leading-relaxed text-green-deep">
            Every keyword from this job description appears in your resume.
            That's rare — you're well aligned on paper.
          </p>
        </div>
      )}

      {matched.length > 0 && (
        <Section
          title={`Matched (${matched.length})`}
          tone="good"
          icon={<Check size={14} />}
          keywords={matched.map((m) => m.keyword)}
          note="These appear in both your resume and the job description."
        />
      )}

      {evidence.length > 0 && (
        <Section
          title={`Missing evidence (${evidence.length})`}
          tone="warn"
          icon={<HelpCircle size={14} />}
          keywords={evidence.map((m) => m.keyword)}
          note="You have something related. If you've used these too, say so — but only if it's true."
        />
      )}

      {gap.length > 0 && (
        <Section
          title={`Actual gaps (${gap.length})`}
          tone="bad"
          icon={<X size={14} />}
          keywords={gap.map((m) => m.keyword)}
          note="Not in your resume, and nothing related found. This is a real gap — build it or leave it off."
        />
      )}

      {/* Nothing at all */}
      {matches.length === 0 && (
        <p className="text-small text-text-muted">
          No keywords could be extracted from this job description. Try
          pasting the requirements section.
        </p>
      )}
    </div>
  );
}

function Section({
  title,
  tone,
  icon,
  keywords,
  note,
}: {
  title: string;
  tone: "good" | "warn" | "bad";
  icon: React.ReactNode;
  keywords: string[];
  note?: string;
}) {
  const colors = {
    good: "text-green-deep",
    warn: "text-attention",
    bad: "text-problem",
  } as const;

  const chipColors = {
    good: "bg-primary-tint text-green-deep border-primary/20",
    warn: "bg-attention-tint text-attention border-attention/20",
    bad: "bg-problem-tint text-problem border-problem/20",
  } as const;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide",
          colors[tone],
        )}
      >
        {icon}
        {title}
      </div>
      {note && (
        <p className="mt-1.5 max-w-[520px] text-xs leading-relaxed text-text-muted">
          {note}
        </p>
      )}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {keywords.map((k) => (
          <span
            key={k}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-medium",
              chipColors[tone],
            )}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}