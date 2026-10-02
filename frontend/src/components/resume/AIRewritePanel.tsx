import { Sparkles, X, Check } from 'lucide-react';
import { Button, AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { AISuggestion } from '@/types/resume';

type AIRewritePanelProps = {
  open: boolean;
  loading: boolean;
  suggestion: AISuggestion | null;
  onAccept: (suggested: string) => void;
  onDismiss: () => void;
  onClose: () => void;
};

export function AIRewritePanel({
  open,
  loading,
  suggestion,
  onAccept,
  onDismiss,
  onClose,
}: AIRewritePanelProps) {
  return (
    <aside
      className={cn(
        'hidden xl:flex xl:flex-col xl:w-[340px] shrink-0',
        'border-l border-border bg-card',
        'transition-transform duration-panel ease-out',
        open ? 'translate-x-0' : 'translate-x-full opacity-0 pointer-events-none',
      )}
    >
      {/* Header */}
      <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
        <div className="flex items-center gap-2">
          <AIMark size={18} />
          <span className="text-small font-semibold text-text">AI Suggestion</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted hover:bg-bg-secondary hover:text-text transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {loading && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <AIMark size={48} thinking />
            <p className="text-small text-text-secondary">AI is analyzing…</p>
            <div className="flex gap-1 text-primary">
              <span className="animate-dot-1">●</span>
              <span className="animate-dot-2">●</span>
              <span className="animate-dot-3">●</span>
            </div>
          </div>
        )}

        {!loading && suggestion && (
          <div className="flex flex-col gap-5">
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

            {suggestion.reason && <p className="text-xs text-text-muted">{suggestion.reason}</p>}
          </div>
        )}

        {!loading && !suggestion && (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <AIMark size={40} />
            <p className="text-small text-text-muted">
              Select any text in the editor and click{' '}
              <span className="font-medium text-text-secondary">Improve with AI</span>.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
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
    </aside>
  );
}
