import { Sparkles, X, Check, Undo2, Loader2 } from 'lucide-react';
import { Button, AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { AISuggestionOption, AISuggestionTone } from '@/types/resume';

export type AIBottomSheetProps = {
  open: boolean;
  loading: boolean;
  streaming: boolean;
  original: string;
  context?: string;
  options: AISuggestionOption[];
  streamedText: string;
  activeOptionId: string | null;
  activeTone: AISuggestionTone;
  canUndo: boolean;
  onToneChange: (tone: AISuggestionTone) => void;
  onOptionChange: (id: string) => void;
  onAccept: (text: string) => void;
  onDismiss: () => void;
  onClose: () => void;
  onUndo: () => void;
};

const TONES: { id: AISuggestionTone; label: string }[] = [
  { id: 'balanced', label: 'Balanced' },
  { id: 'concise', label: 'Concise' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'technical', label: 'Technical' },
];

export function AIBottomSheet({
  open,
  loading,
  streaming,
  original,
  context,
  options,
  streamedText,
  activeOptionId,
  activeTone,
  canUndo,
  onToneChange,
  onOptionChange,
  onAccept,
  onDismiss,
  onClose,
  onUndo,
}: AIBottomSheetProps) {
  if (!open) return null;

  const activeOption = options.find((o) => o.id === activeOptionId) ?? options[0] ?? null;

  const displayText = streaming ? streamedText : (activeOption?.text ?? '');

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text/20 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto',
          'rounded-t-2xl border-t border-border bg-card',
          'pb-[env(safe-area-inset-bottom)]',
        )}
      >
        <div className="flex justify-center pt-3">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div className="flex items-center gap-2">
            <AIMark size={18} />
            <span className="text-small font-semibold text-text">AI Suggestion</span>
          </div>
          <div className="flex items-center gap-1">
            {canUndo && (
              <button
                type="button"
                onClick={onUndo}
                aria-label="Undo last change"
                className="flex h-8 items-center gap-1.5 rounded-button px-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
              >
                <Undo2 size={13} />
                Undo
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted hover:bg-bg-secondary"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tone selector */}
        <div className="flex flex-wrap gap-1 border-b border-border px-5 py-3">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onToneChange(t.id)}
              disabled={loading || streaming}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-card',
                activeTone === t.id
                  ? 'border-primary bg-primary-tint text-green-deep'
                  : 'border-border bg-card text-text-secondary hover:border-border-hover hover:text-text',
                (loading || streaming) && 'opacity-60 cursor-wait',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          {loading && !streaming && (
            <div className="flex flex-col items-center gap-3 py-6">
              <AIMark size={48} thinking />
              <p className="text-small text-text-secondary">AI is analyzing…</p>
            </div>
          )}

          {!loading && original && (
            <div className="flex flex-col gap-4">
              {/* Original */}
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Original
                </div>
                <p className="mt-1.5 rounded-button border border-border bg-bg-secondary px-3 py-2.5 text-small text-text-secondary">
                  {original}
                </p>
              </div>

              {/* Option tabs */}
              {!streaming && options.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  {options.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => onOptionChange(o.id)}
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-card',
                        activeOption?.id === o.id
                          ? 'border-primary bg-primary-tint text-green-deep'
                          : 'border-border bg-card text-text-secondary hover:border-border-hover hover:text-text',
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Suggested */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles size={12} />
                  Suggested
                  {streaming && <Loader2 size={11} className="animate-spin opacity-70" />}
                </div>
                <p className="mt-1.5 rounded-button border border-primary/25 bg-primary-tint px-3 py-2.5 text-small text-green-deep">
                  {displayText}
                  {streaming && (
                    <span className="ml-0.5 inline-block h-3.5 w-0.5 -mb-0.5 animate-pulse bg-green-deep/70" />
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !streaming && activeOption && (
          <div className="flex gap-2 border-t border-border p-4">
            <Button onClick={() => onAccept(activeOption.text)} className="flex-1">
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
