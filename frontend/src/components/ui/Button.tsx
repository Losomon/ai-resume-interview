import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'default' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-text-inverse hover:bg-primary-hover shadow-card hover:shadow-card-hover',
  secondary:
    'bg-card text-text border border-border hover:border-border-hover hover:bg-card-elevated',
  ghost:
    'bg-transparent text-text-secondary hover:text-text hover:bg-bg-secondary',
}

const sizes: Record<Size, string> = {
  default: 'h-11 px-[18px] rounded-button text-small',
  lg:      'h-[52px] px-6 rounded-button-lg text-body',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', loading, disabled, className, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium',
        'transition-all duration-card ease-out',
        'hover:-translate-y-px active:translate-y-0',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-orb-think rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  ),
)
Button.displayName = 'Button'