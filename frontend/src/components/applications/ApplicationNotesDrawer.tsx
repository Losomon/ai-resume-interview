import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { STAGES } from "@/services/application.api";
import { cn } from "@/utils/cn";
import type { Application, ApplicationStage } from "@/types/resume";

type Props = {
  app: Application | null;
  onClose: () => void;
  onMove: (id: string, stage: ApplicationStage) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemove: (id: string) => void;
};

export function ApplicationNotesDrawer({
  app,
  onClose,
  onMove,
  onUpdateNotes,
  onRemove,
}: Props) {
  const [notes, setNotes] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (app) {
      setNotes(app.notes);
      setSavedAt(null);
    }
  }, [app]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (app) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [app, onClose]);

  if (!app) return null;

  // Debounced save
  useEffect(() => {
    if (!app) return;
    if (notes === app.notes) return;
    const t = setTimeout(() => {
      onUpdateNotes(app.id, notes);
      setSavedAt(new Date().toLocaleTimeString());
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-text/20 backdrop-blur-sm" onClick={onClose} />

      <aside className="relative flex h-full w-full max-w-[480px] flex-col overflow-y-auto border-l border-border bg-bg shadow-card-hover">
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
          <span className="text-small font-medium text-text-secondary">Application</span>

          <button
            type="button"
            onClick={() => {
              onRemove(app.id);
              onClose();
            }}
            aria-label="Remove application"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-problem-tint hover:text-problem"
          >
            <Trash2 size={16} />
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Header block */}
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-[16px] font-semibold text-text">
              {app.companyInitial}
            </span>
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold leading-snug text-text">
                {app.jobTitle}
              </h2>
              <p className="mt-0.5 text-small text-text-secondary">
                {app.company} · {app.location}
              </p>
            </div>
          </div>

          {/* Stage picker */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Stage
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onMove(app.id, s.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-card",
                    app.stage === s.id
                      ? "border-primary bg-primary-tint text-green-deep"
                      : "border-border bg-card text-text-secondary hover:border-border-hover hover:text-text",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-1.5 text-small text-text-secondary">
            {typeof app.matchScore === "number" && (
              <div className="flex items-center gap-2">
                <span className="text-text-muted">Match score:</span>
                <Badge tone={app.matchScore >= 80 ? "progress" : "attention"}>
                  {app.matchScore}%
                </Badge>
              </div>
            )}
            {app.appliedAt && (
              <div className="flex items-center gap-2">
                <span className="text-text-muted">Applied:</span>
                <span>{new Date(app.appliedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Notes
              </div>
              {savedAt && (
                <span className="text-[11px] text-text-muted">Saved {savedAt}</span>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              placeholder="Interview prep, contacts, follow-up reminders…"
              className={cn(
                "mt-2 w-full rounded-button border border-border bg-card px-3.5 py-3 text-small leading-relaxed text-text",
                "placeholder:text-text-muted",
                "transition-colors duration-card",
                "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              )}
            />
          </div>

          <Button variant="secondary" onClick={onClose}>
            Done
          </Button>
        </div>
      </aside>
    </div>
  );
}