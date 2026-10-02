import { useATSStore } from "@/store/atsStore";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

type Props = {
  onAnalyze: () => void;
  analyzing: boolean;
  disabled?: boolean;
};

export function JobDescriptionInput({ onAnalyze, analyzing, disabled }: Props) {
  const jd = useATSStore((s) => s.jobDescription);
  const setJd = useATSStore((s) => s.setJobDescription);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-small font-medium text-text-secondary">
        Job description
      </label>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={12}
        placeholder="Paste the full job description here…"
        className={cn(
          "w-full rounded-button border border-border bg-card px-3.5 py-3 text-small leading-relaxed text-text",
          "placeholder:text-text-muted",
          "transition-colors duration-card",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
        )}
      />
      <Button onClick={onAnalyze} loading={analyzing} disabled={disabled || !jd.trim()}>
        Analyze Resume
      </Button>
    </div>
  );
}