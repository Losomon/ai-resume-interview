import { AIMark } from "@/components/ui";
import { cn } from "@/utils/cn";
import type { CoachMessage } from "@/types/resume";

export function CoachMessageBubble({ message }: { message: CoachMessage }) {
  const isCoach = message.role === "coach";

  return (
    <div className={cn("flex w-full gap-3", !isCoach && "flex-row-reverse")}>
      {isCoach && (
        <div className="mt-0.5 shrink-0">
          <AIMark size={28} />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-card px-4 py-3 text-small leading-relaxed shadow-card sm:max-w-[75%]",
          isCoach
            ? "border border-border bg-card text-text"
            : "bg-primary text-text-inverse",
        )}
      >
        {message.text}
      </div>
    </div>
  );
}