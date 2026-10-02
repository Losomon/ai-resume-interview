import { Send } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  submitLabel?: string;
};

export function AnswerInput({
  value,
  onChange,
  onSubmit,
  submitting,
  submitLabel = "Submit Answer",
}: Props) {
  const words = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Type your answer…"
        className={cn(
          "w-full rounded-button border border-border bg-card px-4 py-3 text-body leading-relaxed text-text",
          "placeholder:text-text-muted",
          "transition-colors duration-card",
          "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
        )}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">{words} words</span>
        <Button onClick={onSubmit} disabled={!value.trim()} loading={submitting}>
          <Send size={16} />
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}