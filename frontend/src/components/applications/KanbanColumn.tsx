import { useState } from "react";
import { cn } from "@/utils/cn";
import { ApplicationCard } from "./ApplicationCard";
import type { Application, ApplicationStage } from "@/types/resume";

type Props = {
  stage: ApplicationStage;
  label: string;
  accent: "neutral" | "info" | "attention" | "progress" | "problem";
  applications: Application[];
  onDrop: (id: string, stage: ApplicationStage) => void;
  onRemove: (id: string) => void;
  onOpen: (app: Application) => void;
};

const accentDot = {
  neutral:   "bg-text-muted",
  info:      "bg-info",
  attention: "bg-attention",
  progress:  "bg-success",
  problem:   "bg-problem",
} as const;

export function KanbanColumn({
  stage,
  label,
  accent,
  applications,
  onDrop,
  onRemove,
  onOpen,
}: Props) {
  const [over, setOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData("application/id");
    if (id) onDrop(id, stage);
  }

  return (
    <div className="flex min-w-[260px] flex-1 flex-col">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={cn("h-2 w-2 rounded-full", accentDot[accent])} />
        <span className="text-small font-semibold text-text">{label}</span>
        <span className="ml-1 rounded-full bg-bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
          {applications.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-1 flex-col gap-2.5 rounded-card border border-dashed p-2 transition-colors duration-card",
          over
            ? "border-primary/40 bg-primary-tint/30"
            : "border-border bg-bg-secondary/40",
        )}
      >
        {applications.length === 0 && (
          <p className="py-6 text-center text-xs text-text-muted">
            {over ? "Drop here" : "No applications"}
          </p>
        )}

        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            app={app}
            onRemove={onRemove}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}