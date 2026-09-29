import { Card } from "../ui/Card"; import { Button } from "../ui/Button";
type P = { label: string; title: string; meta: string; cta: string; to: string };
export const ActionPanel = ({ label, title, meta, cta, to }: P) => (<Card className="flex flex-col justify-between gap-5"><div><p className="text-sm text-mute">{label}</p><p className="mt-1 text-lg font-medium text-ink">{title}</p><p className="text-sm">{meta}</p></div><Button to={to} variant="ghost" className="self-start">{cta}</Button></Card>);
export const ResumeCard = () => <ActionPanel label="Resume" title="Software Engineer Resume" meta="Updated yesterday" cta="Open resume" to="/resumes" />;
export const ATSCard = () => <ActionPanel label="ATS performance" title="87%" meta="Average match" cta="Analyze jobs" to="/ats" />;
