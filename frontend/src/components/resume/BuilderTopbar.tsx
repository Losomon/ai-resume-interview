import { Link } from "react-router-dom";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { ResumeScore } from "./ResumeScore";
import type { Resume } from "@/types/resume";

type BuilderTopbarProps = {
  resume: Resume;
  saving: boolean;
  lastSavedAt: string | null;
  onSave: () => void;
};

export function BuilderTopbar({
  resume,
  saving,
  lastSavedAt,
  onSave,
}: BuilderTopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center gap-4 border-b border-border bg-bg/85 px-6 backdrop-blur-md lg:px-10">
      <Link
        to="/resumes"
        className="flex h-9 w-9 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
        aria-label="Back to resumes"
      >
        <ArrowLeft size={18} />
      </Link>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[15px] font-semibold text-text">
          {resume.title}
        </h1>
        <p className="text-xs text-text-muted">
          {saving
            ? "Saving…"
            : lastSavedAt
              ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}`
              : "Unsaved changes"}
        </p>
      </div>

      <ResumeScore score={resume.atsScore} />

      <div className="flex items-center gap-2">
        <Button variant="secondary" className="hidden md:inline-flex">
          <Eye size={16} />
          Preview
        </Button>
        <Button onClick={onSave} loading={saving}>
          <Save size={16} />
          Save
        </Button>
      </div>
    </header>
  );
}