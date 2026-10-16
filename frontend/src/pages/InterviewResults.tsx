import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, FileText, Info } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, AIMark } from "@/components/ui";
import { InterviewFeedbackReport } from "@/components/interview/InterviewFeedbackReport";
import { useInterviewStore } from "@/store/interviewStore";

export default function InterviewResults() {
  const navigate = useNavigate();
  const { session, reset } = useInterviewStore();

  useEffect(() => {
    if (!session?.feedback) navigate("/interview", { replace: true });
  }, [session, navigate]);

  if (!session?.feedback) return null;

  const scores = session.feedback.scores;
  const subs = [
    { key: "communication", label: "Communication", value: scores.communication },
    { key: "technical", label: "Technical", value: scores.technical },
    { key: "confidence", label: "Confidence", value: scores.confidence },
  ];
  const weakest = subs.reduce((a, b) => (a.value < b.value ? a : b));

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
          <div className="flex flex-wrap gap-2">
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

      {/* Scoring explanation */}
      <Card className="mb-4 p-5">
        <div className="flex items-start gap-3">
          <Info size={16} className="mt-0.5 shrink-0 text-info" />
          <div>
            <p className="text-small font-medium text-text">
              How this score is calculated
            </p>
            <p className="mt-1 text-small leading-relaxed text-text-secondary">
              We score each answer on length, action verbs, measurable results,
              and structure. The overall score is the average across all
              questions, weighted toward communication and technical depth.
              This measures <span className="text-text">your practice session</span> — it's
              not a prediction of whether an employer will hire you.
            </p>
          </div>
        </div>
      </Card>

      <InterviewFeedbackReport feedback={session.feedback} />

      {/* Practice weakest area */}
      {weakest.value < 80 && (
        <Card className="mt-4 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-small font-medium text-text">
                Weakest area: <span className="text-attention">{weakest.label}</span>
              </p>
              <p className="mt-1 text-small text-text-secondary">
                Focus a new session on {weakest.label.toLowerCase()} to move this number fastest.
              </p>
            </div>
            <Button onClick={practiceAgain} className="shrink-0">
              <RotateCcw size={14} />
              Practice {weakest.label.toLowerCase()}
            </Button>
          </div>
        </Card>
      )}

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
                  <p className="text-small font-medium text-text">{q.text}</p>
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