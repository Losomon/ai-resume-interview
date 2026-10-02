import { Progress } from "@/components/ui";
import type { ATSScoreBreakdown as Breakdown } from "@/types/resume";

export function ATSScoreBreakdown({ score }: { score: Breakdown }) {
  const rows: { label: string; value: number }[] = [
    { label: "Keywords",   value: score.keywords },
    { label: "Experience", value: score.experience },
    { label: "Formatting", value: score.formatting },
    { label: "Skills",     value: score.skills },
  ];

  return (
    <div className="flex flex-col gap-4">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-small text-text-secondary">{label}</span>
          <Progress
            value={value}
            tone={value >= 80 ? "primary" : value >= 60 ? "success" : value >= 40 ? "attention" : "problem"}
          />
          <span className="w-10 shrink-0 text-right text-small font-medium text-text">
            {value}%
          </span>
        </div>
      ))}
    </div>
  );
}