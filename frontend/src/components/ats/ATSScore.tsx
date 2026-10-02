import { cn } from "@/utils/cn";

type Props = {
  score: number;
  size?: number;
  className?: string;
};

export function ATSScore({ score, size = 160, className }: Props) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  const tone =
    score >= 80 ? "#15803D" : score >= 60 ? "#16A34A" : score >= 40 ? "#D97706" : "#DC2626";

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E8E4D5"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[36px] font-bold leading-none text-text">{score}</span>
        <span className="mt-1 text-xs text-text-muted">/100</span>
      </div>
    </div>
  );
}