import { Card } from "../ui/Card"; import { Progress } from "../ui/Progress";
/** Reusable summary tile (Resume / ATS / Interview). */
export const StatCard = ({ label, value, tone }: { label: string; value: number; tone?: string }) => (<Card><p className="text-sm text-mute mb-1">{label}</p><p className="text-3xl font-semibold text-ink tabular-nums mb-4">{value}</p><Progress label={label} value={value} tone={tone} /></Card>);
export const ResumeCard = () => <StatCard label="Resume" value={92} />;
