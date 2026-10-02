import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { InterviewSetup } from "@/components/interview/InterviewSetup";
import { useInterviewStore } from "@/store/interviewStore";
import type { InterviewConfig } from "@/types/resume";

export default function Interview() {
  const navigate = useNavigate();
  const { start, generating, reset } = useInterviewStore();

  async function onStart(config: InterviewConfig) {
    reset();
    await start(config);
    navigate("/interview/room");
  }

  return (
    <>
      <PageHeader
        title="AI Interviews"
        subtitle="Practice with a focused mock session and get structured feedback."
      />
      <InterviewSetup onStart={onStart} loading={generating} />
    </>
  );
}