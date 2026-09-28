import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

type ToastTone = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  toast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toneStyles: Record<ToastTone, string> = {
  success: 'border-success/40',
  error: 'border-danger/40',
  info: 'border-info/40',
};

const toneIcons: Record<ToastTone, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />,
  error: <AlertCircle className="h-5 w-5 text-danger" aria-hidden />,
  info: <Info className="h-5 w-5 text-info" aria-hidden />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-sm:left-4 max-sm:right-4 max-sm:bottom-5"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              'flex w-80 max-sm:w-full items-start gap-3 rounded-lg border bg-surface-elevated p-4 shadow-modal',
              'animate-in slide-in-from-bottom-2 duration-200',
              toneStyles[t.tone],
            )}
          >
            {toneIcons[t.tone]}
            <p className="flex-1 text-[13px] text-content-secondary">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-content-muted hover:text-content-primary transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}