import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-small font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-button border bg-card px-3.5 text-body text-text',
            'placeholder:text-text-muted',
            'transition-colors duration-card',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            error ? 'border-problem' : 'border-border hover:border-border-hover',
            className,
          )}
          {...props}
        />
        {error && <span className="text-small text-problem">{error}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'