import { ArrowDownWideNarrow } from "lucide-react";
import { cn } from "@/utils/cn";

export type SortKey = "updated" | "title" | "ats";
export type FilterKey = "all" | "strong" | "needs-work";

type Props = {
  sort: SortKey;
  filter: FilterKey;
  onSortChange: (s: SortKey) => void;
  onFilterChange: (f: FilterKey) => void;
  counts: { all: number; strong: number; "needs-work": number };
};

const SORTS: { id: SortKey; label: string }[] = [
  { id: "updated", label: "Recently updated" },
  { id: "title",   label: "Title (A–Z)" },
  { id: "ats",     label: "ATS score" },
];

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all",         label: "All" },
  { id: "strong",      label: "Strong (80+)" },
  { id: "needs-work",  label: "Needs work (<60)" },
];

export function ResumeSortFilter({
  sort,
  filter,
  onSortChange,
  onFilterChange,
  counts,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-card",
              filter === f.id
                ? "border-primary bg-primary-tint text-green-deep"
                : "border-border bg-card text-text-secondary hover:border-border-hover hover:text-text",
            )}
          >
            {f.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                filter === f.id
                  ? "bg-primary/15 text-green-deep"
                  : "bg-bg-secondary text-text-muted",
              )}
            >
              {counts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2">
        <ArrowDownWideNarrow size={14} className="text-text-muted" />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className={cn(
            "h-9 rounded-button border border-border bg-card px-2.5 pr-8 text-small text-text",
            "transition-colors duration-card",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          )}
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}