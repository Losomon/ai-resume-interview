import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/utils/cn";
import { useJobStore } from "@/store/jobStore";
import type { JobLevel } from "@/types/resume";

const LOCATIONS = ["All locations", "Remote", "Hybrid"];
const LEVELS: (JobLevel | "all")[] = ["all", "junior", "mid", "senior", "lead"];
const SALARIES = [0, 100000, 130000, 160000, 200000];

export function JobFilters() {
  const { filters, setFilters } = useJobStore();

  const activeCount =
    (filters.location !== "All locations" ? 1 : 0) +
    (filters.remoteOnly ? 1 : 0) +
    (filters.level !== "all" ? 1 : 0) +
    (filters.minSalary > 0 ? 1 : 0);

  function clear() {
    setFilters({
      location: "All locations",
      remoteOnly: false,
      level: "all",
      minSalary: 0,
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-button border border-border bg-card px-3 transition-colors duration-card focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <Search size={16} className="shrink-0 text-text-muted" />
          <input
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            placeholder="Search jobs, companies, or skills…"
            className="flex-1 bg-transparent text-small text-text placeholder:text-text-muted focus:outline-none"
          />
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex h-11 items-center gap-1.5 rounded-button border border-border bg-card px-3 text-small text-text-secondary transition-colors duration-card hover:border-border-hover hover:text-text"
          >
            <X size={14} />
            Clear filters
            <Badge tone="ai">{activeCount}</Badge>
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterGroup label="Location">
          {LOCATIONS.map((l) => (
            <Chip
              key={l}
              active={filters.location === l}
              onClick={() => setFilters({ location: l })}
            >
              {l}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Level">
          {LEVELS.map((l) => (
            <Chip
              key={l}
              active={filters.level === l}
              onClick={() => setFilters({ level: l })}
            >
              {l === "all" ? "All" : l.charAt(0).toUpperCase() + l.slice(1)}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Min salary">
          {SALARIES.map((s) => (
            <Chip
              key={s}
              active={filters.minSalary === s}
              onClick={() => setFilters({ minSalary: s })}
            >
              {s === 0 ? "Any" : `$${Math.round(s / 1000)}k+`}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Remote">
          <Chip
            active={filters.remoteOnly}
            onClick={() => setFilters({ remoteOnly: !filters.remoteOnly })}
          >
            <SlidersHorizontal size={11} className="mr-1 inline" />
            Remote only
          </Chip>
        </FilterGroup>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-text-muted">{label}:</span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-card",
        active
          ? "border-primary bg-primary-tint text-green-deep"
          : "border-border bg-card text-text-secondary hover:border-border-hover hover:text-text",
      )}
    >
      {children}
    </button>
  );
}