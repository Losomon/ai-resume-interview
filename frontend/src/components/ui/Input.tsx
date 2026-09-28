import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, success, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-msg`;

    const state = error ? 'error' : success ? 'success' : 'default';

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-content-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={state === 'error'}
            aria-describedby={hint || error || success ? messageId : undefined}
            className={cn(
              'h-[46px] w-full rounded-md bg-bg-secondary px-4 text-body text-content-primary',
              'border transition-colors duration-150 ease-out-quick',
              'placeholder:text-content-muted',
              'focus:outline-none focus:ring-[3px] focus:ring-primary/12',
              state === 'default' && 'border-[#273244] focus:border-primary',
              state === 'error' && 'border-danger focus:border-danger focus:ring-danger/12',
              state === 'success' && 'border-success focus:border-success',
              'disabled:opacity-45 disabled:cursor-not-allowed',
              (state === 'error' || state === 'success') && 'pr-10',
              className,
            )}
            {...props}
          />
          {state === 'error' && (
            <AlertCircle
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-danger"
              aria-hidden
            />
          )}
          {state === 'success' && (
            <Check
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success"
              aria-hidden
            />
          )}
        </div>
        {(hint || error || success) && (
          <p
            id={messageId}
            className={cn(
              'text-[12px]',
              state === 'error' && 'text-danger',
              state === 'success' && 'text-success',
              state === 'default' && 'text-content-muted',
            )}
          >
            {error ?? success ?? hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';