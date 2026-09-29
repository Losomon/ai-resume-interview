import { AIOrb } from "../components/ui/AIOrb"; import { useInterviewStore } from "../store/interviewStore";
/** Focused view: no sidebar. TODO(Phase 9): compose components/interview/* here. */
export default function InterviewRoom() { const orb = useInterviewStore((s) => s.orb);
  return <main className="min-h-screen grid place-items-center"><AIOrb state={orb} size={260} /></main>; }
