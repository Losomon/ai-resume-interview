import { AIMark } from "@/components/ui";
import { cn } from "@/utils/cn";

type AIInterviewerProps = {
  state: "idle" | "thinking" | "speaking";
  size?: number;
  className?: string;
};

export function AIInterviewer({ state, size = 140, className }: AIInterviewerProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer warm halo */}
      <div
        className={cn(
          "absolute rounded-full bg-glow-green blur-2xl transition-opacity duration-panel",
          state === "idle" ? "opacity-40" : "opacity-70",
        )}
        style={{ width: size * 0.9, height: size * 0.9 }}
      />

      {/* Pulsing ring while speaking */}
      {state === "speaking" && (
        <span
          className="absolute animate-ping rounded-full border border-primary/30"
          style={{ width: size * 0.9, height: size * 0.9 }}
        />
      )}

      {/* Rotating ring while thinking */}
      {state === "thinking" && (
        <span
          className="absolute animate-orb-think rounded-full border-2"
          style={{
            width: size,
            height: size,
            borderColor: "rgba(21,128,61,0.15)",
            borderTopColor: "rgba(21,128,61,0.7)",
          }}
        />
      )}

      {/* Core mark */}
      <AIMark size={size * 0.5} glow thinking={state === "thinking"} />
    </div>
  );
}