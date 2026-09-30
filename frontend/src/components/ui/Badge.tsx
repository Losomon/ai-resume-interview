import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'ai' | 'progress' | 'info' | 'attention' | 'problem' | 'neutral'

const tones: Record<Tone, string> = {
  ai:        'bg-primary-tint text-green-deep',
  progress:  'bg-success-tint text-green-deep',
  info:      'bg-info-tint text-info',
  attention: 'bg-attention-tint text-attention',
  problem:   'bg-problem-tint text-problem',
  neutral:   'bg-bg-secondary text-text-secondary',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone }

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}