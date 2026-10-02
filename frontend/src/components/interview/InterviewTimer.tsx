import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/utils/cn";

type Props = {
  running: boolean;
  onTick?: (elapsed: number) => void;
  className?: string;
};

function format(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function InterviewTimer({ running, onTick, className }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, onTick]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5",
        "text-small font-medium text-text-secondary tabular-nums",
        className,
      )}
    >
      <Clock size={14} className={running ? "text-primary" : "text-text-muted"} />
      {format(elapsed)}
    </div>
  );
}