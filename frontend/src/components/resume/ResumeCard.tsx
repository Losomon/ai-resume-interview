import { useNavigate } from "react-router-dom";
import { FileText, MoreVertical, Trash2, Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Card, Badge } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { Resume } from "@/types/resume";

type ResumeCardProps = {
  resume: Resume;
  onDelete: (id: string) => void;
};

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const updated = new Date(resume.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card
      hover
      className="group relative flex flex-col overflow-hidden p-5"
    >
      {/* Click target — whole card opens the builder */}
      <button
        type="button"
        onClick={() => navigate(`/resumes/${resume.id}`)}
        className="flex flex-1 flex-col items-start text-left"
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
            <FileText size={18} />
          </span>
          {typeof resume.atsScore === "number" && (
            <Badge tone={resume.atsScore >= 80 ? "progress" : resume.atsScore >= 60 ? "attention" : "problem"}>
              ATS {resume.atsScore}
            </Badge>
          )}
        </div>

        <h3 className="mt-4 line-clamp-2 text-card text-text">
          {resume.title}
        </h3>

        {resume.headline && (
          <p className="mt-1 line-clamp-1 text-small text-text-secondary">
            {resume.headline}
          </p>
        )}

        <p className="mt-3 text-xs text-text-muted">
          Updated {updated}
        </p>
      </button>

      {/* Menu — positioned top-right */}
      <div ref={menuRef} className="absolute right-3 top-3">
        <button
          type="button"
          aria-label="Resume options"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-button",
            "text-text-muted transition-all duration-card",
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            menuOpen && "opacity-100 bg-bg-secondary",
            "hover:bg-bg-secondary hover:text-text",
          )}
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <div
            className={cn(
              "absolute right-0 top-9 z-10 w-40",
              "rounded-button border border-border bg-card p-1",
              "shadow-card-hover",
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/resumes/${resume.id}`);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(resume.id);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-problem-tint hover:text-problem"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}