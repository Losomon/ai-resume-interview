import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-card border border-border bg-card shadow-card',
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