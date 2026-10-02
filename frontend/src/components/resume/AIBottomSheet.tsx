import { Sparkles, X, Check } from "lucide-react";
import { Button, AIMark } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { AISuggestion } from "@/types/resume";

type AIBottomSheetProps = {
  open: boolean;
  loading: boolean;
  suggestion: AISuggestion | null;
  onAccept: (suggested: string) => void;
  onDismiss: () => void;
  onClose: () => void;
};

export function AIBottomSheet({
  open,
  loading,
  suggestion,
  onAccept,
  onDismiss,
  onClose,
}: AIBottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto",
          "rounded-t-2xl border-t border-border bg-card",
          "pb-[env(safe-area-inset-bottom)]",
        )}
      >
        <div className="flex justify-center pt-3">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <AIMark size={18} />
            <span className="text-small font-semibold text-text">AI Suggestion</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted hover:bg-bg-secondary"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-5">
          {loading && (
            <div className="flex flex-col items-center gap-3 py-6">
              <AIMark size={48} thinking />
              <p className="text-small text-text-secondary">AI is analyzing…</p>
            </div>
          )}

          {!loading && suggestion && (
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Original
                </div>
                <p className="mt-1.5 rounded-button border border-border bg-bg-secondary px-3 py-2.5 text-small text-text-secondary">
                  {suggestion.original}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles size={12} />
                  Suggested
                </div>
                <p className="mt-1.5 rounded-button border border-primary/25 bg-primary-tint px-3 py-2.5 text-small text-green-deep">
                  {suggestion.suggested}
                </p>
              </div>
            </div>
          )}
        </div>

        {!loading && suggestion && (
          <div className="flex gap-2 border-t border-border p-4">
            <Button onClick={() => onAccept(suggestion.suggested)} className="flex-1">
              <Check size={16} />
              Accept
            </Button>
            <Button variant="ghost" onClick={onDismiss}>
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}