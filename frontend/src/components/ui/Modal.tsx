import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Section 28: 520px, radius 16, rgba(0,0,0,.65) backdrop, scale 0.96→1.
 */
export function Modal({ open, onClose, title, description, children, footer, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-desc' : undefined}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden
      />
      <div
        className={cn(
          'relative w-full max-w-[520px] rounded-xl bg-surface border border-border shadow-modal',
          'animate-in zoom-in-95 duration-200 ease-out-quick',
          'flex flex-col max-h-[calc(100vh-2rem)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="space-y-1">
            {title && (
              <h2 id="modal-title" className="text-h4 text-content-primary">
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-desc" className="text-[13px] text-content-muted">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-primary transition-colors -mr-2 -mt-2 p-1"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 pb-6 overflow-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-surface-elevated rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}