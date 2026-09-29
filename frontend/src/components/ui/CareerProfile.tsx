import { motion } from "framer-motion";
const stages = [["Resume", "The source of your experience"], ["Skills", "Each one backed by evidence"], ["Experience", "Roles, projects and results"], ["Jobs", "Matched against your profile"], ["Interviews", "Practice aimed at your gaps"], ["Applications", "Tracked with the resume you sent"]];
/** Signature element: one career profile that every feature adds to. */
export function CareerProfile() {
  return (<ol className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line text-left">{stages.map(([t, d], i) => (
    <motion.li key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.35, delay: (i % 3) * 0.05 }} className="border-r border-b border-line bg-card p-5">
      <span className="text-xs text-mute tabular-nums">0{i + 1}</span><h3 className="mt-2 font-medium text-ink">{t}</h3><p className="mt-1 text-sm">{d}</p></motion.li>))}</ol>);
}
