import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/utils/cn";

type ChecklistItem = {
  id: string;
  label: string;
  href: string;
  done: boolean;
};

export function CareerChecklist({ items }: { items: ChecklistItem[] }) {
  const navigate = useNavigate();
  const completed = items.filter((i) => i.done).length;
  const total = items.length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-card text-text">Your career checklist</h2>
          <p className="mt-1 text-small text-text-secondary">
            Complete these steps to get started.
          </p>
        </div>
        <span
          className="shrink-0 font-display text-[20px] font-semibold leading-none text-text-secondary"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          {completed}/{total}
        </span>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>

      <ul className="mt-5 flex flex-col">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => navigate(item.href)}
              className={cn(
                "group flex w-full items-center gap-3 py-3 text-left transition-colors duration-card",
                i > 0 && "border-t border-border",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-card",
                  item.done
                    ? "border-primary bg-primary text-text-inverse"
                    : "border-border-hover bg-card group-hover:border-primary/40",
                )}
              >
                {item.done && <Check size={11} strokeWidth={3} />}
              </span>

              <span
                className={cn(
                  "flex-1 text-small transition-colors duration-card",
                  item.done
                    ? "text-text-muted line-through"
                    : "text-text group-hover:text-primary",
                )}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}