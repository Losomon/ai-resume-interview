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
        title="Interview Prep"
        subtitle="Your next interview starts here."
      />

      <p className="mb-8 max-w-[520px] text-[16px] leading-relaxed text-text-secondary">
        Build confidence, practice real-world questions, and get feedback to
        improve your answers.
      </p>

      <InterviewSetup onStart={onStart} loading={generating} />
    </>
  );
}