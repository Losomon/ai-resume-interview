import { useState, useRef, useEffect } from "react";
import { Building2, MapPin, MoreVertical, Trash2, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { Application } from "@/types/resume";

type Props = {
  app: Application;
  onRemove: (id: string) => void;
  onOpen: (app: Application) => void;
};

export function ApplicationCard({ app, onRemove, onOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const updated = new Date(app.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  function onDragStart(e: React.DragEvent) {
    setDragging(true);
    e.dataTransfer.setData("application/id", app.id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragEnd() {
    setDragging(false);
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={cn(
        "group relative cursor-grab rounded-card border border-border bg-card p-3.5 shadow-card transition-all duration-card",
        "hover:-translate-y-0.5 hover:border-border-hover hover:shadow-card-hover",
        "active:cursor-grabbing",
        dragging && "opacity-40",
      )}
    >
      {/* Drag handle */}
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 text-text-muted opacity-0 transition-opacity duration-card group-hover:opacity-60">
        <GripVertical size={14} />
      </div>

      <button
        type="button"
        onClick={() => onOpen(app)}
        className="flex w-full flex-col items-start text-left pl-3"
      >
        <div className="flex w-full items-start gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-[13px] font-semibold text-text">
            {app.companyInitial}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="line-clamp-2 text-[13px] font-semibold leading-snug text-text">
              {app.jobTitle}
            </h4>
            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-text-muted">
              <Building2 size={10} />
              {app.company}
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 text-[11px] text-text-muted">
            <MapPin size={10} />
            {app.location}
          </span>
          {typeof app.matchScore === "number" && (
            <Badge tone={app.matchScore >= 80 ? "progress" : app.matchScore >= 60 ? "attention" : "neutral"}>
              {app.matchScore}% match
            </Badge>
          )}
        </div>

        {app.notes && (
          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">
            {app.notes}
          </p>
        )}

        <p className="mt-2 text-[10px] text-text-muted">Updated {updated}</p>
      </button>

      {/* Menu */}
      <div ref={menuRef} className="absolute right-2 top-2">
        <button
          type="button"
          aria-label="Options"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-button text-text-muted transition-all duration-card",
            "opacity-0 group-hover:opacity-100",
            menuOpen && "bg-bg-secondary opacity-100",
            "hover:bg-bg-secondary hover:text-text",
          )}
        >
          <MoreVertical size={14} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-8 z-10 w-36 rounded-button border border-border bg-card p-1 shadow-card-hover">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onRemove(app.id);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-problem-tint hover:text-problem"
            >
              <Trash2 size={12} />
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}