import clsx from "clsx";
const t = { ai: "text-primary-glow bg-primary/15", ok: "text-ok bg-ok/15", info: "text-info bg-info/15", warn: "text-warn bg-warn/15", bad: "text-bad bg-bad/15" };
export const Badge = ({ tone = "ai", children }: { tone?: keyof typeof t; children: React.ReactNode }) => (
  <span className={clsx("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", t[tone])}>{children}</span>
);
