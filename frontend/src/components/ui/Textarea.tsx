import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const messageId = `${textareaId}-msg`;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[13px] font-medium text-content-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={hint || error ? messageId : undefined}
          className={cn(
            'min-h-[120px] w-full rounded-md bg-bg-secondary px-4 py-3 text-body text-content-primary',
            'border transition-colors duration-150 ease-out-quick resize-y',
            'placeholder:text-content-muted',
            'focus:outline-none focus:ring-[3px] focus:ring-primary/12 focus:border-primary',
            error ? 'border-danger focus:border-danger focus:ring-danger/12' : 'border-[#273244]',
            'disabled:opacity-45 disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {(hint || error) && (
          <p
            id={messageId}
            className={cn('text-[12px]', error ? 'text-danger' : 'text-content-muted')}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';