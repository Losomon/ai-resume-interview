import { motion } from "framer-motion"; import { SparkIcon } from "./SparkIcon";
export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid place-items-center text-center py-20 gap-3">
    <SparkIcon size={32} animate="pulse" /><h2 className="text-lg font-semibold text-ink">{title}</h2><p className="max-w-sm text-sm">{body}</p>{action}</motion.div>);
}
