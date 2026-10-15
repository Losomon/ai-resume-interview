import { useState } from 'react';
import { Copy, RotateCcw, Trash2, Check } from 'lucide-react';
import { AIMark } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { CoachMessage } from '@/types/resume';

type Props = {
  message: CoachMessage;
  onRetry?: (message: CoachMessage) => void;
  onDelete?: (id: string) => void;
};

export function CoachMessageBubble({ message, onRetry, onDelete }: Props) {
  const isCoach = message.role === 'coach';
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div className={cn('group flex w-full gap-3', !isCoach && 'flex-row-reverse')}>
      {isCoach && (
        <div className="mt-0.5 shrink-0">
          <AIMark size={28} />
        </div>
      )}

      <div
        className={cn('flex max-w-[85%] flex-col gap-1 sm:max-w-[75%]', !isCoach && 'items-end')}
      >
        <div
          className={cn(
            'rounded-card px-4 py-3 text-small leading-relaxed shadow-card',
            isCoach ? 'border border-border bg-card text-text' : 'bg-primary text-text-inverse',
          )}
        >
          {message.text}
        </div>

        {isCoach && (onRetry || onDelete) && (
          <div className="flex gap-1 opacity-0 transition-opacity duration-card group-hover:opacity-100">
            {onRetry && (
              <button
                type="button"
                onClick={() => onRetry(message)}
                aria-label="Retry"
                className="flex h-7 w-7 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
              >
                <RotateCcw size={12} />
              </button>
            )}
            <button
              type="button"
              onClick={copy}
              aria-label="Copy"
              className="flex h-7 w-7 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-text"
            >
              {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(message.id)}
                aria-label="Delete"
                className="flex h-7 w-7 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-problem-tint hover:text-problem"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
