import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
  flush?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, flush = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-card border border-border bg-card shadow-card',
        !flush && 'p-5',
        hover && [
          'transition-all duration-card ease-out',
          'hover:-translate-y-0.5',
          'hover:border-border-hover hover:shadow-card-hover',
        ],
        className,
      )}
      {...props}
    />
  ),
)
Card.displayName = 'Card'