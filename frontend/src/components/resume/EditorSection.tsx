import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

type EditorSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function EditorSection({ title, children, defaultOpen = true }: EditorSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-bg-secondary"
      >
        <span className="text-small font-semibold text-text">{title}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-text-muted transition-transform duration-card",
            open && "rotate-180",
          )}
        />
      </button>

      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}