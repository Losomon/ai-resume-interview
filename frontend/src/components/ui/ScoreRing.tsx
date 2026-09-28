import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export interface ScoreRingProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

/**
 * Circular progress indicator with animated entrance.
 * Track: --border, Progress: --primary.
 */
export function ScoreRing({
  value,
  size = 140,
  strokeWidth = 10,
  label,
  className,
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplayed(Math.round(easeOut(t) * clamped));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ? `${label}: ${clamped}%` : `${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[30px] font-bold text-content-primary leading-none">
          {displayed}
          <span className="text-[18px] text-content-muted ml-0.5">%</span>
        </span>
        {label && (
          <span className="mt-1 text-caption text-content-muted uppercase tracking-wide">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}