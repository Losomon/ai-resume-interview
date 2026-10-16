import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, ListChecks, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Card, Skeleton, AIMark } from "@/components/ui";
import { CoachMessageBubble } from "@/components/coach/CoachMessageBubble";
import { CoachComposer, type ContextItem } from "@/components/coach/CoachComposer";
import { CoachEmptyState } from "@/components/coach/CoachEmptyState";
import { LearningPlanCard } from "@/components/coach/LearningPlan";
import { useCoachStore } from "@/store/coachStore";
import { useResumeStore } from "@/store/resumeStore";
import { useATSStore } from "@/store/atsStore";
import { useInterviewStore } from "@/store/interviewStore";
import { cn } from "@/utils/cn";

type Tab = "chat" | "plan";

export default function CareerCoach() {
  const { resumes, fetchAll } = useResumeStore();
  const { analysis } = useATSStore();
  const { session } = useInterviewStore();
  const {
    messages,
    plan,
    thinking,
    planning,
    send,
    generatePlan,
    toggleStep,
    reset,
  } = useCoachStore();

  const [tab, setTab] = useState<Tab>("chat");
  const [context, setContext] = useState<ContextItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const activeResume = useMemo(
    () =>
      resumes.length > 0
        ? resumes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
        : null,
    [resumes],
  );

  const availableContext: ContextItem[] = useMemo(() => {
    const items: ContextItem[] = [];
    if (activeResume) {
      items.push({ id: `resume-${activeResume.id}`, type: "resume", label: activeResume.title });
    }
    if (analysis) {
      items.push({
        id: `ats-${analysis.resumeId}`,
        type: "ats",
        label: `ATS report · ${analysis.score.overall}/100`,
      });
    }
    if (session?.feedback) {
      items.push({
        id: `interview-${session.id}`,
        type: "interview",
        label: `Interview · ${session.config.role}`,
      });
    }
    return items;
  }, [activeResume, analysis, session]);

  async function handleGeneratePlan() {
    const goal = activeResume?.headline || "Land a stronger role";
    await generatePlan(activeResume, analysis, goal);
    setTab("plan");
  }

  function addContext(item: ContextItem) {
    setContext((c) => (c.some((x) => x.id === item.id) ? c : [...c, item]));
  }

  function removeContext(id: string) {
    setContext((c) => c.filter((x) => x.id !== id));
  }

  return (
    <>
      <PageHeader
        title="AI Career Coach"
        subtitle="Let's build your future."
        actions={
          <div className="flex gap-2">
            {messages.length > 0 && (
              <Button variant="ghost" onClick={reset}>
                Clear chat
              </Button>
            )}
            <Button onClick={handleGeneratePlan} loading={planning}>
              <Sparkles size={16} />
              {plan ? "Regenerate plan" : "Generate plan"}
            </Button>
          </div>
        }
      />

      <p className="mb-6 max-w-[560px] text-[15px] leading-relaxed text-text-secondary">
        Get personalized career advice, discover skills to develop, and turn
        your goals into an actionable plan.
      </p>

      <div className="mb-4 flex gap-1 rounded-button border border-border bg-card p-1 lg:hidden">
        <TabButton active={tab === "chat"} onClick={() => setTab("chat")} icon={<MessageSquare size={14} />}>
          Chat
        </TabButton>
        <TabButton active={tab === "plan"} onClick={() => setTab("plan")} icon={<ListChecks size={14} />}>
          Plan
        </TabButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_440px]">
        <Card className={cn("flex h-[660px] flex-col overflow-hidden", tab === "plan" && "hidden lg:flex")}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
            {messages.length === 0 && !thinking && (
              <CoachEmptyState onPick={(text) => send(text, activeResume, analysis)} />
            )}

            {messages.length > 0 && (
              <div className="flex flex-col gap-4">
                {messages.map((m) => (
                  <CoachMessageBubble key={m.id} message={m} />
                ))}

                {thinking && (
                  <div className="flex items-center gap-3">
                    <AIMark size={28} thinking />
                    <div className="rounded-card border border-border bg-card px-4 py-3 text-small text-text-secondary shadow-card">
                      <span className="inline-flex gap-1">
                        <span className="animate-dot-1">●</span>
                        <span className="animate-dot-2">●</span>
                        <span className="animate-dot-3">●</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <CoachComposer
            onSend={(text) => send(text, activeResume, analysis)}
            disabled={thinking}
            context={context}
            availableContext={availableContext}
            onAddContext={addContext}
            onRemoveContext={removeContext}
          />
        </Card>

        <div className={cn("min-w-0", tab === "chat" && "hidden lg:block")}>
          {planning && (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[120px] rounded-card" />
              <Skeleton className="h-[90px] rounded-card" />
              <Skeleton className="h-[90px] rounded-card" />
              <Skeleton className="h-[90px] rounded-card" />
            </div>
          )}

          {!planning && plan && (
            <LearningPlanCard
              plan={plan}
              onToggleStep={toggleStep}
              onReset={handleGeneratePlan}
            />
          )}

          {!planning && !plan && (
            <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <AIMark size={48} />
              <h3 className="mt-5 text-card text-text">No plan yet</h3>
              <p className="mt-2 max-w-[280px] text-small leading-relaxed text-text-secondary">
                Generate a step-by-step learning plan based on your resume and
                latest ATS analysis.
              </p>
              <Button onClick={handleGeneratePlan} loading={planning} className="mt-6">
                <Sparkles size={16} />
                Generate my plan
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-[6px] px-3 py-2 text-small font-medium transition-colors duration-card",
        active
          ? "bg-primary-tint text-green-deep"
          : "text-text-secondary hover:bg-bg-secondary hover:text-text",
      )}
    >
      {icon}
      {children}
    </button>
  );
}