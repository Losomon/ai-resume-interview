import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneStyles: Record<Tone, string> = {
  neutral: 'bg-surface-elevated text-content-secondary border-border',
  primary: 'bg-primary-soft text-[#C4B5FD] border-[#47358A]',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  danger: 'bg-danger/10 text-danger border-danger/30',
  info: 'bg-info/10 text-info border-info/30',
};

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-caption',
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}