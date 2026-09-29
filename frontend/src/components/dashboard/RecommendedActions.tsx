import { Link } from "react-router-dom"; import { Card } from "../ui/Card"; import { SparkIcon } from "../ui/SparkIcon";
const actions = [{ to: "/ats", t: "Improve your ATS match", d: "Add evidence for 3 missing keywords" }, { to: "/interview", t: "Practice an interview", d: "10 questions, about 15 minutes" }];
export const RecommendedActions = () => (<Card><h2 className="font-semibold text-ink mb-3">Recommended actions</h2><ul className="space-y-2">{actions.map((a) => (
  <li key={a.to}><Link to={a.to} className="flex gap-3 rounded-lg p-3 hover:bg-elevated transition-colors"><SparkIcon size={18} className="mt-0.5" /><span><span className="block text-ink text-sm font-medium">{a.t}</span><span className="text-sm">{a.d}</span></span></Link></li>))}</ul></Card>);
