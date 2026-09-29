import { Card } from "../ui/Card";
const rows = [["Sep 28", "Resume updated", "2 changes"], ["Sep 27", "ATS analysis: Backend Developer", "87%"], ["Sep 26", "Interview session", "16 min"], ["Sep 24", "Added Java project", "Completed"]]; // placeholder data
export const RecentActivity = () => (<Card flush className="overflow-hidden"><h2 className="border-b border-line bg-elevated px-5 py-3 text-sm font-semibold text-ink">Recent activity</h2>
  <table className="w-full text-sm"><thead className="sr-only"><tr><th>Date</th><th>Event</th><th>Result</th></tr></thead><tbody>{rows.map(([d, e, r]) => (
    <tr key={d + e} className="border-b border-line last:border-0"><td className="w-24 whitespace-nowrap py-2.5 pl-5 text-mute">{d}</td><td className="py-2.5 text-ink">{e}</td><td className="py-2.5 pr-5 text-right tabular-nums">{r}</td></tr>))}</tbody></table></Card>);
