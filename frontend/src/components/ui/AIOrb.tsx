import { motion } from "framer-motion"; import { SparkIcon } from "./SparkIcon";
export type OrbState = "idle" | "thinking" | "speaking";
/** Flat AI status marker (kept as AIOrb for import stability). idle: still, thinking: rotating arc, speaking: soft ring pulse. */
export function AIOrb({ state = "idle", size = 48 }: { state?: OrbState; size?: number }) {
  return (<span role="img" aria-label={`Interviewer ${state}`} className="relative inline-grid place-items-center rounded-full border border-line bg-card" style={{ width: size, height: size }}>
    {state === "thinking" && <span className="absolute -inset-px rounded-full border-2 border-transparent border-t-primary animate-spin360" />}
    {state === "speaking" && <motion.span className="absolute inset-0 rounded-full border border-primary" animate={{ scale: [1, 1.25], opacity: [0.6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }} />}
    <SparkIcon size={size * 0.42} /></span>);
}
