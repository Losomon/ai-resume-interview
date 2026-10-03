import { cn } from "@/utils/cn";

export function JobMatchScore({ score, size = 48 }: { score: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  const tone =
    score >= 80 ? "#15803D" : score >= 60 ? "#16A34A" : score >= 40 ? "#D97706" : "#DC2626";

  return (
    <div
      className="relative inline-flex items-center justify-center"
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
          style={{ transition: "stroke-dashoffset 500ms ease-out" }}
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-text">{score}</span>
    </div>
  );
}