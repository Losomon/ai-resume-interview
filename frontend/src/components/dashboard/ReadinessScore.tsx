import { motion } from "framer-motion"; import { Card } from "../ui/Card";
export function ReadinessScore({ value = 82 }: { value?: number }) { const r = 54, c = 2 * Math.PI * r;
  return (<Card className="grid place-items-center py-8"><p className="text-sm text-mute mb-3">Career readiness</p>
    <div className="relative"><svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`Readiness ${value} out of 100`}><circle cx="70" cy="70" r={r} fill="none" stroke="#202A3A" strokeWidth="10" />
      <motion.circle cx="70" cy="70" r={r} fill="none" stroke="#7C5CFC" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} transform="rotate(-90 70 70)" initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 1.4, ease: "easeOut" }} /></svg>
      <span className="absolute inset-0 grid place-items-center text-4xl font-bold text-ink">{value}</span></div></Card>); }
