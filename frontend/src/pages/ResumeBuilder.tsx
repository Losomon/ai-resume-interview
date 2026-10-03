import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { aiApi } from '@/services/ai.api';
import { useDebounce } from '@/hooks/useDebounce';
import { SectionList } from '@/components/resume/SectionList';
import { ResumeEditor } from '@/components/resume/ResumeEditor';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { AIRewritePanel } from '@/components/resume/AIRewritePanel';
import { AIBottomSheet } from '@/components/resume/AIBottomSheet';
import { BuilderTopbar } from '@/components/resume/BuilderTopbar';
import { Skeleton } from '@/components/ui';
import type { Resume, AISuggestionOption, AISuggestionTone, AIUndoSnapshot } from '@/types/resume';

export default function ResumeBuilder() {
  const { id } = useParams<{ id: string }>();

  const load = useResumeStore((s) => s.load);
  const save = useResumeStore((s) => s.save);
  const saving = useResumeStore((s) => s.saving);
  const resumes = useResumeStore((s) => s.resumes);

  const [resume, setResume] = useState<Resume | null>(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  /* ---------- AI panel state ---------- */
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStreaming, setAiStreaming] = useState(false);
  const [original, setOriginal] = useState('');
  const [aiContext, setAiContext] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<AISuggestionOption[]>([]);
  const [streamedText, setStreamedText] = useState('');
  const [activeOptionId, setActiveOptionId] = useState<string | null>(null);
  const [activeTone, setActiveTone] = useState<AISuggestionTone>('balanced');

  const applyRef = useRef<((s: string) => void) | null>(null);
  const streamCancelRef = useRef<{ cancelled: boolean }>({ cancelled: false });

  /* ---------- undo ---------- */
  const [undoSnapshot, setUndoSnapshot] = useState<AIUndoSnapshot | null>(null);

  /* ---------- load resume ---------- */
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

  /* ---------- sync from store ---------- */
  useEffect(() => {
    if (!resume) return;
    const fromStore = resumes.find((r) => r.id === resume.id);
    if (fromStore && fromStore.updatedAt !== resume.updatedAt) {
      setResume(fromStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes]);

  /* ---------- autosave ---------- */
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

  /* ---------- AI: request ---------- */
  async function requestAI(text: string, context: string, apply: (s: string) => void) {
    if (!text.trim()) return;

    // Cancel any previous stream before starting a new one
    streamCancelRef.current.cancelled = true;
    streamCancelRef.current = { cancelled: false };

    setAiOpen(true);
    setAiLoading(true);
    setAiStreaming(false);
    setOriginal(text);
    setAiContext(context);
    setOptions([]);
    setStreamedText('');
    setActiveOptionId(null);
    setActiveTone('balanced');
    applyRef.current = apply;

    try {
      const res = await aiApi.suggestions(text, context, ['balanced', 'concise', 'metrics']);
      if (streamCancelRef.current.cancelled) return;

      setOptions(res.options);
      setActiveOptionId(res.options[0]?.id ?? null);
      setAiLoading(false);

      // Stream the first option
      await runStream(text, 'balanced');
    } catch {
      setAiLoading(false);
    }
  }

  /* ---------- AI: stream a tone ---------- */
  async function runStream(text: string, tone: AISuggestionTone) {
    streamCancelRef.current.cancelled = true;
    streamCancelRef.current = { cancelled: false };
    const token = streamCancelRef.current;

    setAiStreaming(true);
    setStreamedText('');

    try {
      for await (const partial of aiApi.rewriteStream(text, tone)) {
        if (token.cancelled) return;
        setStreamedText(partial);
      }
    } finally {
      if (!token.cancelled) setAiStreaming(false);
    }
  }

  /* ---------- AI: tone change ---------- */
  async function onToneChange(tone: AISuggestionTone) {
    setActiveTone(tone);
    setActiveOptionId(null);
    await runStream(original, tone);
  }

  /* ---------- AI: option tab change ---------- */
  function onOptionChange(optionId: string) {
    setActiveOptionId(optionId);
    setStreamedText('');
    setAiStreaming(false);
  }

  /* ---------- AI: accept ---------- */
  function acceptSuggestion(text: string) {
    if (!applyRef.current) return;

    // Snapshot for undo — captures the apply fn and the original text
    setUndoSnapshot({
      apply: applyRef.current,
      previous: original,
      label: text,
    });

    applyRef.current(text);
    setAiOpen(false);
    setOptions([]);
    setStreamedText('');
    setActiveOptionId(null);
    applyRef.current = null;
  }

  /* ---------- AI: dismiss / close ---------- */
  function dismissSuggestion() {
    streamCancelRef.current.cancelled = true;
    setAiOpen(false);
    setOptions([]);
    setStreamedText('');
    setActiveOptionId(null);
    applyRef.current = null;
  }

  /* ---------- AI: undo ---------- */
  function undo() {
    if (!undoSnapshot) return;
    undoSnapshot.apply(undoSnapshot.previous);
    setUndoSnapshot(null);
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

      <div className="flex">
        {/* Section list — left */}
        <aside className="hidden w-[200px] shrink-0 border-r border-border bg-card lg:block">
          <SectionList active={activeSection} onSelect={setActiveSection} />
        </aside>

        {/* Editor — middle */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-[720px] px-4 py-6 lg:px-8">
            <ResumeEditor resume={resume} onChange={patch} onRequestAI={requestAI} />
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
          streaming={aiStreaming}
          original={original}
          context={aiContext}
          options={options}
          streamedText={streamedText}
          activeOptionId={activeOptionId}
          activeTone={activeTone}
          canUndo={Boolean(undoSnapshot)}
          onToneChange={onToneChange}
          onOptionChange={onOptionChange}
          onAccept={acceptSuggestion}
          onDismiss={dismissSuggestion}
          onClose={dismissSuggestion}
          onUndo={undo}
        />
      </div>

      {/* AI bottom sheet — mobile */}
      <AIBottomSheet
        open={aiOpen}
        loading={aiLoading}
        streaming={aiStreaming}
        original={original}
        context={aiContext}
        options={options}
        streamedText={streamedText}
        activeOptionId={activeOptionId}
        activeTone={activeTone}
        canUndo={Boolean(undoSnapshot)}
        onToneChange={onToneChange}
        onOptionChange={onOptionChange}
        onAccept={acceptSuggestion}
        onDismiss={dismissSuggestion}
        onClose={dismissSuggestion}
        onUndo={undo}
      />
    </div>
  );
}
