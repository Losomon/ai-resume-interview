import { useState, type KeyboardEvent } from "react";
import { Send, Paperclip, FileText, Target, Mic, X, Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/utils/cn";

export type ContextItem = {
  id: string;
  type: "resume" | "ats" | "interview";
  label: string;
};

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  context?: ContextItem[];
  availableContext?: ContextItem[];
  onAddContext?: (item: ContextItem) => void;
  onRemoveContext?: (id: string) => void;
};

const typeIcon = {
  resume: FileText,
  ats: Target,
  interview: Mic,
} as const;

export function CoachComposer({
  onSend,
  disabled,
  context = [],
  availableContext = [],
  onAddContext,
  onRemoveContext,
}: Props) {
  const [value, setValue] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

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

  const attachedIds = new Set(context.map((c) => c.id));
  const remaining = availableContext.filter((c) => !attachedIds.has(c.id));

  return (
    <div className="border-t border-border bg-bg p-4">
      {context.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {context.map((c) => {
            const Icon = typeIcon[c.type];
            return (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary-tint px-2.5 py-1 text-xs font-medium text-green-deep"
              >
                <Icon size={11} />
                {c.label}
                {onRemoveContext && (
                  <button
                    type="button"
                    onClick={() => onRemoveContext(c.id)}
                    aria-label={`Remove ${c.label}`}
                    className="ml-0.5 text-green-deep/60 transition-colors hover:text-green-deep"
                  >
                    <X size={11} />
                  </button>
                )}
              </span>
            );
          })}
        </div>
      )}

      <div className="flex items-end gap-2 rounded-card border border-border bg-card p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        {onAddContext && availableContext.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen((v) => !v)}
              aria-label="Add career context"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-button text-text-muted transition-colors duration-card",
                "hover:bg-bg-secondary hover:text-text",
                pickerOpen && "bg-bg-secondary text-text",
              )}
            >
              <Paperclip size={16} />
            </button>

            {pickerOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setPickerOpen(false)}
                  aria-hidden
                />
                <div className="absolute bottom-12 left-0 z-20 w-[280px] rounded-button border border-border bg-card p-1 shadow-card-hover">
                  <div className="px-2.5 py-2 text-xs font-medium text-text-muted">
                    Add career context
                  </div>
                  {remaining.length === 0 ? (
                    <div className="px-2.5 py-3 text-xs text-text-muted">
                      Nothing left to add. Create a resume, run an ATS
                      analysis, or complete an interview first.
                    </div>
                  ) : (
                    remaining.map((item) => {
                      const Icon = typeIcon[item.type];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onAddContext(item);
                            setPickerOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-left text-small text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
                        >
                          <Icon size={14} />
                          <span className="min-w-0 flex-1 truncate">
                            {item.label}
                          </span>
                          <Check size={12} className="shrink-0 text-text-muted" />
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask anything about your career…"
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