import { motion } from "framer-motion";
import { SparkIcon } from "./SparkIcon";
export type OrbState = "idle" | "thinking" | "speaking";
/** Signature visual. idle = breathe, thinking = spinning ring + orbiting particles, speaking = expand/contract. */
export function AIOrb({ state = "idle", size = 220 }: { state?: OrbState; size?: number }) {
  const speak = state === "speaking";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} role="img" aria-label={`AI interviewer, ${state}`}>
      <div className="absolute inset-0 rounded-full blur-3xl bg-primary/30" />
      {state === "thinking" && (
        <>
          <div className="absolute inset-2 rounded-full animate-spin360 [animation-duration:2.4s]" style={{ background: "conic-gradient(from 0deg,transparent 60%,#38BDF8,#A78BFA,transparent)", mask: "radial-gradient(circle,transparent 62%,#000 64%)", WebkitMask: "radial-gradient(circle,transparent 62%,#000 64%)" }} />
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute left-1/2 top-1/2 h-0 w-0" animate={{ rotate: 360 }} transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}>
              <span className="block h-1.5 w-1.5 rounded-full bg-info" style={{ transform: `translate(${size / 2 - 8 - i * 10}px,0)` }} />
            </motion.span>
          ))}
        </>
      )}
      <motion.div className="relative rounded-full grid place-items-center"
        style={{ width: size * 0.62, height: size * 0.62, background: "radial-gradient(circle at 30% 25%,#C4B5FD,#7C5CFC 45%,#2A1B6B 100%)", boxShadow: "0 0 60px #7C5CFC66, inset 0 0 30px #ffffff22" }}
        animate={speak ? { scale: [1, 1.12, 0.96, 1.08, 1] } : { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: speak ? 1.1 : 3.2, repeat: Infinity, ease: "easeInOut" }}>
        <SparkIcon size={size * 0.2} className="text-white" animate="glow" />
      </motion.div>
    </div>
  );
}
