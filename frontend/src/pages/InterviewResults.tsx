import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, FileText } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, AIMark } from "@/components/ui";
import { InterviewFeedbackReport } from "@/components/interview/InterviewFeedbackReport";
import { useInterviewStore } from "@/store/interviewStore";

export default function InterviewResults() {
  const navigate = useNavigate();
  const { session, reset } = useInterviewStore();

  // Redirect if there's no completed session
  useEffect(() => {
    if (!session?.feedback) navigate("/interview", { replace: true });
  }, [session, navigate]);

  if (!session?.feedback) return null;

  function practiceAgain() {
    reset();
    navigate("/interview");
  }

  return (
    <>
      <PageHeader
        title="Interview Complete"
        subtitle="Here's a breakdown of your performance."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/resumes")}>
              <FileText size={16} />
              View resume
            </Button>
            <Button onClick={practiceAgain}>
              <RotateCcw size={16} />
              Practice again
            </Button>
          </div>
        }
      />

      <InterviewFeedbackReport feedback={session.feedback} />

      {/* Transcript */}
      <Card className="mt-4 p-5">
        <h3 className="text-small font-semibold text-text">Transcript</h3>
        <div className="mt-4 flex flex-col gap-5">
          {session.questions.map((q, i) => {
            const a = session.answers.find((ans) => ans.questionId === q.id);
            return (
              <div key={q.id}>
                <div className="flex items-start gap-3">
                  <AIMark size={16} className="mt-1 shrink-0" />
                  <p className="text-small font-medium text-text">
                    {q.text}
                  </p>
                </div>
                <p className="mt-2 whitespace-pre-line pl-7 text-small leading-relaxed text-text-secondary">
                  {a?.text || <span className="italic text-text-muted">No answer</span>}
                </p>
                <p className="mt-1 pl-7 text-xs text-text-muted">
                  Q{i + 1} · {a?.durationSec ?? 0}s
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}