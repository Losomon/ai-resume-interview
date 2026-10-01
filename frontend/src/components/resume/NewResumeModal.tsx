import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/utils/cn";

type NewResumeModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
};

const SUGGESTIONS = [
  "Software Engineer",
  "Product Designer",
  "Data Analyst",
  "Marketing Manager",
];

export function NewResumeModal({ open, onClose, onCreate }: NewResumeModalProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onCreate(title.trim());
      setTitle("");
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full max-w-[440px] rounded-card border border-border bg-card p-6",
          "shadow-card-hover",
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
        >
          <X size={16} />
        </button>

        <h2 className="text-card text-text">New resume</h2>
        <p className="mt-1 text-small text-text-secondary">
          Give it a name so you can find it later.
        </p>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <Input
            label="Resume name"
            autoFocus
            placeholder="e.g. Senior Frontend Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTitle(s)}
                className="rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary transition-colors hover:border-border-hover hover:text-text"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={!title.trim()}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}