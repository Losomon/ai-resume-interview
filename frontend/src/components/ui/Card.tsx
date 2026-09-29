import clsx from "clsx";
export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("bg-card border border-line rounded-card p-5 transition duration-[180ms] hover:border-[#344054] hover:-translate-y-0.5", className)} {...p} />
);
