import { CheckCircle2, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui";

type Props = {
  strengths: string[];
  suggestions: string[];
};

export function ATSBreakdown({ strengths, suggestions }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-5">
        <div className="flex items-center gap-2 text-small font-semibold text-green-deep">
          <CheckCircle2 size={16} />
          Strengths
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {strengths.map((s) => (
            <li key={s} className="flex gap-2 text-small text-text-secondary">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
              {s}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 text-small font-semibold text-attention">
          <Lightbulb size={16} />
          Suggestions
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {suggestions.map((s) => (
            <li key={s} className="flex gap-2 text-small text-text-secondary">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-attention" />
              {s}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}