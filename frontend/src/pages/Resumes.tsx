import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Skeleton } from "@/components/ui";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { ResumeEmptyState } from "@/components/resume/ResumeEmptyState";
import { NewResumeModal } from "@/components/resume/NewResumeModal";
import { useResumeStore } from "@/store/resumeStore";

export default function Resumes() {
  const { resumes, loading, fetchAll, create, remove } = useResumeStore();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function onCreate(title: string) {
    await create(title);
  }

  const showEmpty = !loading && resumes.length === 0;

  return (
    <>
      <PageHeader
        title="My Resumes"
        subtitle="Manage and refine every version of your story."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            New Resume
          </Button>
        }
      />

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[172px] rounded-card" />
          ))}
        </div>
      )}

      {showEmpty && <ResumeEmptyState onCreate={() => setModalOpen(true)} />}

      {!loading && resumes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} onDelete={remove} />
          ))}
        </div>
      )}

      <NewResumeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={onCreate}
      />
    </>
  );
}