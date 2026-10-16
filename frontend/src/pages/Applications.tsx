import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Briefcase, Kanban as KanbanIcon, List } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, Skeleton, AIMark } from "@/components/ui";
import { KanbanColumn } from "@/components/applications/KanbanColumn";
import { ApplicationNotesDrawer } from "@/components/applications/ApplicationNotesDrawer";
import { ApplicationSummary } from "@/components/applications/ApplicationSummary";
import { ApplicationFilters } from "@/components/applications/ApplicationFilters";
import { ApplicationRow } from "@/components/applications/ApplicationRow";
import { STAGES } from "@/services/application.api";
import { useApplicationStore } from "@/store/applicationStore";
import { cn } from "@/utils/cn";
import type { Application, ApplicationStage } from "@/types/resume";

type ViewMode = "kanban" | "list";
type SortKey = "recent" | "oldest" | "interview" | "followup";

export default function Applications() {
  const navigate = useNavigate();
  const { applications, loading, fetchAll, move, updateNotes, remove } = useApplicationStore();

  const [openApp, setOpenApp] = useState<Application | null>(null);
  const [view, setView] = useState<ViewMode>("kanban");
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (openApp) {
      const fresh = applications.find((a) => a.id === openApp.id);
      if (fresh && fresh !== openApp) setOpenApp(fresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applications]);

  function byStage(stage: ApplicationStage) {
    return applications.filter((a) => a.stage === stage);
  }

  const total = applications.length;

  const visible = useMemo(() => {
    let list = [...applications];

    if (filter === "interview") {
      list = list.filter((a) => a.stage === "interview");
    } else if (filter === "offer") {
      list = list.filter((a) => a.stage === "offer");
    } else if (filter === "followup") {
      const now = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      list = list.filter((a) => {
        const next = (a as unknown as { followUpAt?: string }).followUpAt;
        if (!next) return false;
        return new Date(next).getTime() <= now + sevenDays;
      });
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.jobTitle.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => {
      if (sort === "oldest") return a.updatedAt.localeCompare(b.updatedAt);
      return b.updatedAt.localeCompare(a.updatedAt);
    });

    return list;
  }, [applications, filter, search, sort]);

  return (
    <>
      <PageHeader
        title="Applications"
        subtitle="Track every opportunity in one place."
        actions={
          <Button onClick={() => navigate("/jobs")}>
            <Plus size={16} />
            Add application
          </Button>
        }
      />

      {loading && (
        <div className="grid gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-card" />
          ))}
        </div>
      )}

      {!loading && total === 0 && (
        <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-glow-green opacity-70 blur-xl" />
            <AIMark size={56} glow />
          </div>
          <h3 className="text-card text-text">No applications yet</h3>
          <p className="mt-2 max-w-[380px] text-small leading-relaxed text-text-secondary">
            Browse job matches and save the ones you're interested in. They'll
            appear here so you can track every stage.
          </p>
          <Button onClick={() => navigate("/jobs")} className="mt-6">
            <Briefcase size={16} />
            Browse job matches
          </Button>
        </Card>
      )}

      {!loading && total > 0 && (
        <>
          <ApplicationSummary
            applications={applications}
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex-1">
              <ApplicationFilters
                search={search}
                onSearchChange={setSearch}
                sort={sort}
                onSortChange={setSort}
              />
            </div>

            {/* View toggle */}
            <div className="flex h-11 shrink-0 rounded-button border border-border bg-card p-1">
              <button
                type="button"
                onClick={() => setView("kanban")}
                aria-label="Kanban view"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-[6px] transition-colors duration-card",
                  view === "kanban"
                    ? "bg-primary-tint text-green-deep"
                    : "text-text-muted hover:text-text",
                )}
              >
                <KanbanIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="List view"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-[6px] transition-colors duration-card",
                  view === "list"
                    ? "bg-primary-tint text-green-deep"
                    : "text-text-muted hover:text-text",
                )}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Kanban view */}
          {view === "kanban" && (
            <>
              <div className="hidden gap-4 lg:grid lg:grid-cols-5">
                {STAGES.map((s) => (
                  <KanbanColumn
                    key={s.id}
                    stage={s.id}
                    label={s.label}
                    accent={s.tone}
                    applications={byStage(s.id)}
                    onDrop={move}
                    onRemove={remove}
                    onOpen={setOpenApp}
                  />
                ))}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 lg:hidden">
                {STAGES.map((s) => (
                  <div key={s.id} className="w-[280px] shrink-0">
                    <KanbanColumn
                      stage={s.id}
                      label={s.label}
                      accent={s.tone}
                      applications={byStage(s.id)}
                      onDrop={move}
                      onRemove={remove}
                      onOpen={setOpenApp}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* List view */}
          {view === "list" && (
            <div className="flex flex-col gap-3">
              {visible.length === 0 && (
                <Card className="flex flex-col items-center px-6 py-12 text-center">
                  <p className="text-small text-text-secondary">
                    Nothing matches this filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter("all");
                      setSearch("");
                    }}
                    className="mt-3 text-small font-medium text-primary hover:text-primary-hover"
                  >
                    Clear filters
                  </button>
                </Card>
              )}
              {visible.map((app) => (
                <ApplicationRow key={app.id} app={app} onOpen={setOpenApp} />
              ))}
            </div>
          )}
        </>
      )}

      <ApplicationNotesDrawer
        app={openApp}
        onClose={() => setOpenApp(null)}
        onMove={(id, stage) => move(id, stage)}
        onUpdateNotes={updateNotes}
        onRemove={remove}
      />
    </>
  );
}