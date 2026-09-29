import clsx from "clsx";
type P = React.HTMLAttributes<HTMLDivElement> & { flush?: boolean };
/** 1px border, 10px radius, hairline shadow. `flush` removes padding (tables, split panels). */
export const Card = ({ className, flush, ...p }: P) => (<div className={clsx("bg-card border border-line rounded-card shadow-[0_1px_2px_rgb(0_0_0/0.04)]", !flush && "p-5", className)} {...p} />);
