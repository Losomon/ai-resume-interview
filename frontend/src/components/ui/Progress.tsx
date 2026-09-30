import { cn } from '@/utils/cn'

type ProgressProps = {
  value: number
  tone?: 'primary' | 'success' | 'attention' | 'problem'
  className?: string
}

const tones = {
  primary:   'bg-primary',
  success:   'bg-success',
  attention: 'bg-attention',
  problem:   'bg-problem',
}

export function Progress({ value, tone = 'primary', className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-bg-secondary', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-panel ease-out', tones[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}