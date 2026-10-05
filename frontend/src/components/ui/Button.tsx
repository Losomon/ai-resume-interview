import { cloneElement, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'default' | 'lg'

type BaseProps = {
  variant?: Variant
  size?: Size
  loading?: boolean
  children?: ReactNode
  className?: string
}

type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
  to?: undefined
  asChild?: false
}

type ButtonAsLink = BaseProps & {
  to: string
  asChild?: false
}

type ButtonAsChild = BaseProps & {
  asChild: true
  to?: undefined
  children: ReactElement
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsChild

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

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-card ease-out hover:-translate-y-px active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const { variant = 'primary', size = 'default', loading, className, children } = props
    const classes = cn(baseClasses, variants[variant], sizes[size], className)

    if ('asChild' in props && props.asChild && isValidElement(children)) {
      return cloneElement(children, {
        className: cn(classes, (children.props as { className?: string }).className),
      })
    }

    if ('to' in props && props.to) {
      return (
        <Link to={props.to} className={classes} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      )
    }

    const { disabled, ...buttonProps } = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        className={classes}
        {...buttonProps}
      >
        {loading && (
          <span className="h-4 w-4 animate-orb-think rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'