import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, Skeleton, AIMark } from "@/components/ui";
import { KanbanColumn } from "@/components/applications/KanbanColumn";
import { ApplicationNotesDrawer } from "@/components/applications/ApplicationNotesDrawer";
import { STAGES } from "@/services/application.api";
import { useApplicationStore } from "@/store/applicationStore";
import type { Application, ApplicationStage } from "@/types/resume";

export default function Applications() {
  const navigate = useNavigate();
  const {
    applications,
    loading,
    fetchAll,
    move,
    updateNotes,
    remove,
  } = useApplicationStore();

  const [openApp, setOpenApp] = useState<Application | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Keep the open app in sync with the store
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

  return (
    <>
      <PageHeader
        title="Applications"
        subtitle={
          total > 0
            ? `${total} application${total === 1 ? "" : "s"} in your tracker.`
            : "Track every job you save or apply to."
        }
        actions={
          <Button onClick={() => navigate("/jobs")}>
            <Plus size={16} />
            Find jobs
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
          {/* Desktop: 5 columns */}
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

          {/* Mobile: horizontal scroll */}
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