import clsx from "clsx"; import { Link } from "react-router-dom";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost"; size?: "md" | "lg"; to?: string };
/** Pass `to` to render a real link (never nest a button inside a link). */
export function Button({ variant = "primary", size = "md", to, className, children, ...p }: Props) {
  const cls = clsx("inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors active:scale-[0.98]",
    size === "md" ? "h-12 md:h-11 px-[18px] text-sm" : "h-[52px] px-6 text-base",
    variant === "primary" ? "bg-primary hover:bg-primary-hover text-white" : "border border-line bg-card text-ink hover:bg-elevated", className);
  return to ? <Link to={to} className={cls}>{children}</Link> : <button className={cls} {...p}>{children}</button>;
}
