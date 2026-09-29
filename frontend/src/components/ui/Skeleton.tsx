import clsx from "clsx";
export const Skeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={clsx("relative overflow-hidden rounded-md bg-line/60", className)}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-card/70 to-transparent" />
  </div>
);
