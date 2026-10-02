import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function CoachComposer({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t border-border bg-bg p-4">
      <div className="flex items-end gap-2 rounded-card border border-border bg-card p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask anything…"
          className={cn(
            "max-h-[160px] min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-small text-text",
            "placeholder:text-text-muted",
            "focus:outline-none",
          )}
        />
        <Button onClick={submit} disabled={disabled || !value.trim()} className="shrink-0">
          <Send size={16} />
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-text-muted">
        Enter to send · Shift+Enter for a new line
      </p>
    </div>
  );
}