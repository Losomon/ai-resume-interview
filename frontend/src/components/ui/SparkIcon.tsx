import clsx from "clsx";
type Props = { size?: number; className?: string; animate?: "static" | "pulse" | "spin" | "glow"; label?: string };
const anim = { static: "", pulse: "animate-breathe", spin: "animate-spin360", glow: "animate-breathe drop-shadow-[0_0_8px_#A78BFA]" };
/** The one AI mark. Never type the ✦ character. Decorative unless `label` is given. */
export function SparkIcon({ size = 16, className, animate = "static", label }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={clsx("text-primary-glow", anim[animate], className)}
      aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
      <path d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5-5.6.7-9.8 4.9-10.5 10.5C11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z" />
    </svg>
  );
}
