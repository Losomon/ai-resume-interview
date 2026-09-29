import clsx from "clsx";
import { motion, HTMLMotionProps } from "framer-motion";
type Props = HTMLMotionProps<"button"> & { variant?: "primary" | "ghost"; size?: "md" | "lg" };
export function Button({ variant = "primary", size = "md", className, ...p }: Props) {
  return (
    <motion.button whileHover={{ y: -1 }} whileTap={{ y: 0, scale: 0.98 }}
      className={clsx("inline-flex items-center justify-center gap-2 font-medium transition-colors",
        size === "md" ? "h-12 md:h-11 px-[18px] rounded-lg text-sm" : "h-[52px] px-6 rounded-[10px] text-base",
        variant === "primary" ? "bg-primary hover:bg-primary-hover text-white shadow-[0_0_24px_-6px_#7C5CFC]" : "border border-line text-ink hover:bg-elevated",
        className)} {...p} />
  );
}
