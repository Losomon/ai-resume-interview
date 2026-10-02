import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AIInterviewer } from "@/components/interview/AIInterviewer";
import { QuestionCard } from "@/components/interview/QuestionCard";
import { AnswerInput } from "@/components/interview/AnswerInput";
import { InterviewTimer } from "@/components/interview/InterviewTimer";
import { AIMark } from "@/components/ui";
import { useInterviewStore } from "@/store/interviewStore";

export default function InterviewRoom() {
  const navigate = useNavigate();
  const { session, answer, submit, evaluating } = useInterviewStore();

  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [elapsed, setElapsed] = useState(0);

  // Redirect out if no session
  useEffect(() => {
    if (!session) navigate("/interview", { replace: true });
  }, [session, navigate]);

  // When moving to a new question, load any saved draft
  useEffect(() => {
    if (!session) return;
    const q = session.questions[index];
    const existing = session.answers.find((a) => a.questionId === q.id);
    setDraft(existing?.text ?? "");
    setElapsed(0);
  }, [index, session]);

  if (!session) return null;

  const question = session.questions[index];
  const total = session.questions.length;
  const isLast = index === total - 1;
  const hasAnswer = draft.trim().length > 0;

  async function onSubmit() {
    answer(question.id, draft, elapsed);
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    // Last question — evaluate
    await submit();
    navigate("/interview/results");
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <header className="flex h-[72px] items-center justify-between border-b border-border bg-bg/85 px-6 backdrop-blur-md lg:px-10">
        <div className="flex items-center gap-2.5">
          <AIMark size={22} />
          <span className="text-[15px] font-semibold text-text">CareerForge AI</span>
        </div>
        <span className="text-small text-text-muted">
          Question {index + 1} of {total}
        </span>
      </header>

      {/* Progress bar */}
      <div className="h-1 w-full bg-bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-panel ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Main */}
      <main className="mx-auto flex max-w-[720px] flex-col items-center gap-8 px-6 py-12">
        <AIInterviewer state={evaluating ? "thinking" : "idle"} size={140} />

        <div className="w-full">
          <QuestionCard question={question} />
        </div>

        <InterviewTimer running={!evaluating} onTick={setElapsed} />

        <div className="w-full">
          <AnswerInput
            value={draft}
            onChange={setDraft}
            onSubmit={onSubmit}
            submitting={evaluating}
            submitLabel={isLast ? "Finish Interview" : "Next Question"}
          />
        </div>

        <p className="text-center text-xs text-text-muted">
          Take your time. Aim for 60–120 words per answer.
        </p>
      </main>
    </div>
  );
}