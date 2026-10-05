import { cn } from '@/utils/cn'

type ProgressProps = {
  value: number
  tone?: 'primary' | 'success' | 'attention' | 'warn' | 'problem'
  label?: string
  hideLabel?: boolean
  className?: string
}

const tones: Record<NonNullable<ProgressProps['tone']>, string> = {
  primary:   'bg-primary',
  success:   'bg-success',
  attention: 'bg-attention',
  warn:      'bg-attention',
  problem:   'bg-problem',
}

export function Progress({ value, tone = 'primary', label, hideLabel, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && !hideLabel && <span className="text-small text-text-secondary">{label}</span>}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-bg-secondary"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-panel ease-out', tones[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}