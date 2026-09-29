import { WelcomeCard } from "../components/dashboard/WelcomeCard"; import { ResumeCard, ATSCard } from "../components/dashboard/ResumeCard";
import { ReadinessScore } from "../components/dashboard/ReadinessScore"; import { RecentActivity } from "../components/dashboard/RecentActivity"; import { RecommendedActions } from "../components/dashboard/RecommendedActions";
/** Pages compose, components render. All figures are placeholders until the API is wired. */
export default function Dashboard() {
  return (<><WelcomeCard /><div className="space-y-4"><ReadinessScore /><div className="grid gap-4 md:grid-cols-2"><ResumeCard /><ATSCard /></div><RecentActivity /><RecommendedActions /></div></>); }
