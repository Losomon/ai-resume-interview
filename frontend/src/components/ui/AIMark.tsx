import { cn } from '@/utils/cn'

type AIMarkProps = {
  size?: number
  glow?: boolean
  thinking?: boolean
  className?: string
}

export function AIMark({
  size = 24,
  glow,
  thinking = false,
  className,
}: AIMarkProps) {
  const showGlow = glow ?? size >= 40

  return (
    <span
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {showGlow && (
        <span
          className="absolute rounded-full bg-glow-warm blur-md"
          style={{
            width: size * 1.8,
            height: size * 1.8,
            opacity: 0.5,
          }}
        />
      )}

      {thinking && (
        <span
          className="absolute animate-orb-think rounded-full border"
          style={{
            width: size * 1.5,
            height: size * 1.5,
            borderColor: 'rgba(21,128,61,0.25)',
            borderTopColor: 'rgba(21,128,61,0.8)',
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={cn('relative', !thinking && 'animate-orb-breathe')}
      >
        <path
          d="M12 2.5
             C12 2.5 8.5 7.2 8.5 11.4
             C8.5 14.4 10 16.2 12 17.2
             C14 16.2 15.5 14.4 15.5 11.4
             C15.5 7.2 12 2.5 12 2.5 Z"
          fill="#15803D"
        />
        <path
          d="M12 17.2
             C10.2 17.2 9 18.4 9 20
             C9 21.4 10.2 22.5 12 22.5
             C13.8 22.5 15 21.4 15 20
             C15 18.4 13.8 17.2 12 17.2 Z"
          fill="#166534"
        />
      </svg>
    </span>
  )
}