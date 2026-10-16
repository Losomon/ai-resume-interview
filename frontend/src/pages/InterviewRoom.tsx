import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { AIInterviewer } from "@/components/interview/AIInterviewer";
import { QuestionCard } from "@/components/interview/QuestionCard";
import { AnswerInput } from "@/components/interview/AnswerInput";
import { InterviewTimer } from "@/components/interview/InterviewTimer";
import { ConfirmDialog } from "@/components/resume/ConfirmDialog";
import { AIMark, Button } from "@/components/ui";
import { useInterviewStore } from "@/store/interviewStore";

export default function InterviewRoom() {
  const navigate = useNavigate();
  const { session, answer, submit, evaluating, reset } = useInterviewStore();

  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [confirmEnd, setConfirmEnd] = useState(false);

  useEffect(() => {
    if (!session) navigate("/interview", { replace: true });
  }, [session, navigate]);

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
  const pct = Math.round(((index + 1) / total) * 100);

  async function onSubmit() {
    answer(question.id, draft, elapsed);
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    await submit();
    navigate("/interview/results");
  }

  function repeatQuestion() {
    setDraft("");
    setElapsed(0);
  }

  function endEarly() {
    reset();
    navigate("/interview");
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <header className="flex h-[72px] items-center justify-between border-b border-border bg-bg/85 px-6 backdrop-blur-md lg:px-10">
        <div className="flex items-center gap-2.5">
          <AIMark size={22} />
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold leading-tight text-text">
              CareerForge AI Interviewer
            </span>
            <span className="text-xs text-text-muted">
              {session.config.role} · {session.config.type} round
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-deep">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Live session
          </span>
          <span className="hidden text-small text-text-muted sm:inline">
            Question {index + 1} of {total}
          </span>
          <button
            type="button"
            onClick={() => setConfirmEnd(true)}
            aria-label="End interview"
            className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-bg-secondary hover:text-problem"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Progress bar + % */}
      <div className="flex items-center gap-3 border-b border-border bg-bg-secondary px-6 py-2.5 lg:px-10">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-all duration-panel ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-text-secondary">
          {pct}%
        </span>
      </div>

      {/* Main */}
      <main className="mx-auto flex max-w-[720px] flex-col items-center gap-8 px-6 py-12">
        <AIInterviewer state={evaluating ? "thinking" : "idle"} size={140} />

        <div className="w-full">
          <QuestionCard question={question} />
        </div>

        <div className="flex items-center gap-3">
          <InterviewTimer running={!evaluating} onTick={setElapsed} />
          <Button variant="ghost" onClick={repeatQuestion}>
            Repeat question
          </Button>
        </div>

        <div className="w-full">
          <AnswerInput
            value={draft}
            onChange={setDraft}
            onSubmit={onSubmit}
            submitting={evaluating}
            submitLabel={isLast ? "Finish interview" : "Submit answer"}
          />
        </div>

        <p className="text-center text-xs text-text-muted">
          You control when to submit your answer. Aim for 60–120 words.
        </p>
      </main>

      <ConfirmDialog
        open={confirmEnd}
        title="End this interview?"
        message="Your progress so far will be saved, but the session won't be scored. You can start a new one anytime."
        confirmLabel="End interview"
        tone="danger"
        onConfirm={endEarly}
        onCancel={() => setConfirmEnd(false)}
      />
    </div>
  );
}