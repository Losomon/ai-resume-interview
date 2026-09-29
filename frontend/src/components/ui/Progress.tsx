import { motion } from "framer-motion";
const t = { primary: "bg-primary", ok: "bg-ok", info: "bg-info", warn: "bg-warn" };
export function Progress({ value, label, tone = "primary", hideLabel }: { value: number; label: string; tone?: keyof typeof t; hideLabel?: boolean }) {
  return (<div>{!hideLabel && <div className="flex justify-between text-sm mb-1.5"><span>{label}</span><span className="text-ink tabular-nums">{value}%</span></div>}
    <div className="h-1.5 rounded-full bg-line overflow-hidden" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div className={`h-full rounded-full ${t[tone]}`} initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut" }} /></div></div>);
}
