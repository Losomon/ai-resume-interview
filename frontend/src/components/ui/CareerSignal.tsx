import { motion } from "framer-motion";
const nodes = [{ x: 40, l: "Resume" }, { x: 300, l: "ATS" }, { x: 560, l: "Interview" }, { x: 800, l: "Readiness" }];
const d = "M40 60 C 170 10, 170 110, 300 60 S 430 10, 560 60 S 690 110, 800 60";
/** A signal that travels Resume → ATS → Interview → Readiness. Draws on scroll, then a pulse runs along it. */
export function CareerSignal() {
  return (
    <svg viewBox="0 0 840 120" className="w-full" role="img" aria-label="Your path: Resume, ATS, Interview, Career readiness">
      <defs><linearGradient id="sig" x1="0" x2="1"><stop stopColor="#7C5CFC" /><stop offset="1" stopColor="#38BDF8" /></linearGradient></defs>
      <path d={d} fill="none" stroke="#202A3A" strokeWidth="2" />
      <motion.path d={d} fill="none" stroke="url(#sig)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 2, ease: "easeInOut" }} />
      <motion.circle r="5" fill="#A78BFA" style={{ offsetPath: `path("${d}")`, filter: "drop-shadow(0 0 6px #A78BFA)" }}
        initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }} />
      {nodes.map((n, i) => (
        <g key={n.l}>
          <motion.circle cx={n.x} cy={60} r="7" fill="#070A12" stroke="#7C5CFC" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.5, type: "spring" }} />
          <text x={n.x} y={94} textAnchor="middle" fill="#CBD5E1" fontSize="13">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}
