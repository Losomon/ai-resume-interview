import { motion } from "framer-motion";
export function Progress({ value, label, tone = "#22C55E" }: { value: number; label: string; tone?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5"><span>{label}</span><span className="text-ink tabular-nums">{value}%</span></div>
      <div className="h-2 rounded-full bg-line overflow-hidden" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <motion.div className="h-full rounded-full" style={{ background: tone }} initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} />
      </div>
    </div>
  );
}
