import { Card } from "../ui/Card"; import { Progress } from "../ui/Progress";
export function ReadinessScore({ value = 82, delta = 6 }: { value?: number; delta?: number }) {
  return (<Card><p className="text-sm text-mute">Career readiness</p>
    <div className="mt-1 flex items-baseline gap-3"><span className="text-3xl font-semibold text-ink tabular-nums">{value}<span className="ml-1 text-base font-normal text-mute">/ 100</span></span><span className="text-sm text-ok">+{delta} this month</span></div>
    <div className="mt-3"><Progress label="Career readiness" value={value} hideLabel /></div>
    <p className="mt-3 text-sm">Your profile is progressing well. Three areas need attention.</p></Card>); }
