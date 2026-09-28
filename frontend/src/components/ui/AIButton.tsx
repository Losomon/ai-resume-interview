import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

/**
 * The canonical "✨ Improve with AI" action.
 * Purple-soft background, distinct from primary so users recognize AI actions.
 */
export const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  ({ className, loading, disabled, label = 'Improve with AI', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center gap-2 rounded-md px-4 h-9 text-[13px] font-medium',
          'bg-primary-soft text-[#C4B5FD] border border-[#47358A]',
          'hover:bg-[#2B2050] transition-colors duration-150 ease-out-quick',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'disabled:opacity-45 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        {children ?? label}
      </button>
    );
  },
);

AIButton.displayName = 'AIButton';