import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useResumeStore } from "@/store/resumeStore";
import { aiApi } from "@/services/ai.api";
import { useDebounce } from "@/hooks/useDebounce";
import { SectionList } from "@/components/resume/SectionList";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AIRewritePanel } from "@/components/resume/AIRewritePanel";
import { AIBottomSheet } from "@/components/resume/AIBottomSheet";
import { BuilderTopbar } from "@/components/resume/BuilderTopbar";
import { Skeleton } from "@/components/ui";
import type { Resume, AISuggestion } from "@/types/resume";

export default function ResumeBuilder() {
  const { id } = useParams<{ id: string }>();

  const load = useResumeStore((s) => s.load);
  const save = useResumeStore((s) => s.save);
  const saving = useResumeStore((s) => s.saving);
  const resumes = useResumeStore((s) => s.resumes);

  const [resume, setResume] = useState<Resume | null>(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // AI panel state
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const applyRef = useRef<((s: string) => void) | null>(null);

  /* ---------- load ---------- */
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const r = await load(id);
      if (!cancelled) {
        setResume(r);
        setLastSavedAt(r.updatedAt);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, load]);

  /* ---------- keep local state in sync if store changes elsewhere ---------- */
  useEffect(() => {
    if (!resume) return;
    const fromStore = resumes.find((r) => r.id === resume.id);
    if (fromStore && fromStore.updatedAt !== resume.updatedAt) {
      setResume(fromStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes]);

  /* ---------- debounced autosave ---------- */
  const debouncedResume = useDebounce(resume, 600);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (!debouncedResume) return;
    (async () => {
      await save(debouncedResume.id, debouncedResume);
      setLastSavedAt(new Date().toISOString());
    })();
  }, [debouncedResume, save]);

  /* ---------- editing ---------- */
  function patch(p: Partial<Resume>) {
    setResume((prev) => (prev ? { ...prev, ...p } : prev));
  }

  /* ---------- AI ---------- */
  async function requestAI(
    text: string,
    context: string,
    apply: (s: string) => void,
  ) {
    if (!text.trim()) return;
    setAiOpen(true);
    setAiLoading(true);
    setSuggestion(null);
    applyRef.current = apply;
    try {
      const s = await aiApi.rewrite(text, context);
      setSuggestion(s);
    } finally {
      setAiLoading(false);
    }
  }

  function acceptSuggestion(s: string) {
    applyRef.current?.(s);
    setSuggestion(null);
    setAiOpen(false);
    applyRef.current = null;
  }

  function dismissSuggestion() {
    setSuggestion(null);
    setAiOpen(false);
    applyRef.current = null;
  }

  /* ---------- manual save ---------- */
  async function manualSave() {
    if (!resume) return;
    await save(resume.id, resume);
    setLastSavedAt(new Date().toISOString());
  }

  /* ---------- loading state ---------- */
  if (!resume) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-10">
        <Skeleton className="h-[72px] w-full rounded-card" />
        <div className="mt-6 grid gap-4 lg:grid-cols-[200px_1fr_340px]">
          <Skeleton className="h-[420px] rounded-card" />
          <Skeleton className="h-[520px] rounded-card" />
          <Skeleton className="h-[520px] rounded-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <BuilderTopbar
        resume={resume}
        saving={saving}
        lastSavedAt={lastSavedAt}
        onSave={manualSave}
      />

      {/* Focused shell: no dashboard sidebar */}
      <div className="flex">
        {/* Section list — left */}
        <aside className="hidden w-[200px] shrink-0 border-r border-border bg-card lg:block">
          <SectionList active={activeSection} onSelect={setActiveSection} />
        </aside>

        {/* Editor — middle */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[720px] px-4 py-6 lg:px-8">
            <ResumeEditor
              resume={resume}
              onChange={patch}
              onRequestAI={requestAI}
            />
          </div>
        </main>

        {/* Preview — right (xl+) */}
        <aside className="hidden xl:block xl:w-[560px] shrink-0 overflow-y-auto border-l border-border bg-bg-secondary">
          <div className="p-6">
            <ResumePreview resume={resume} />
          </div>
        </aside>

        {/* AI panel — far right (xl+) */}
        <AIRewritePanel
          open={aiOpen}
          loading={aiLoading}
          suggestion={suggestion}
          onAccept={acceptSuggestion}
          onDismiss={dismissSuggestion}
          onClose={() => setAiOpen(false)}
        />
      </div>

      {/* AI bottom sheet — mobile */}
      <AIBottomSheet
        open={aiOpen}
        loading={aiLoading}
        suggestion={suggestion}
        onAccept={acceptSuggestion}
        onDismiss={dismissSuggestion}
        onClose={() => setAiOpen(false)}
      />
    </div>
  );
}