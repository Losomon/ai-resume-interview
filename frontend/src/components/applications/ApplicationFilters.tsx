import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  sort: "recent" | "oldest" | "interview" | "followup";
  onSortChange: (s: "recent" | "oldest" | "interview" | "followup") => void;
};

export function ApplicationFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-[360px]">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by company or job title…"
          className={cn(
            "h-11 w-full rounded-button border border-border bg-card pl-9 pr-9 text-small text-text",
            "placeholder:text-text-muted",
            "transition-colors duration-card",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          )}
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as typeof sort)}
        className={cn(
          "h-11 rounded-button border border-border bg-card px-3 text-small text-text",
          "transition-colors duration-card",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
        )}
      >
        <option value="recent">Most recent</option>
        <option value="oldest">Oldest first</option>
        <option value="interview">Upcoming interview</option>
        <option value="followup">Upcoming follow-up</option>
      </select>
    </div>
  );
}