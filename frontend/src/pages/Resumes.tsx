import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { Button, Skeleton } from '@/components/ui';
import { ResumeCard } from '@/components/resume/ResumeCard';
import { ResumeEmptyState } from '@/components/resume/ResumeEmptyState';
import { NewResumeModal } from '@/components/resume/NewResumeModal';
import {
  ResumeSortFilter,
  type SortKey,
  type FilterKey,
} from '@/components/resume/ResumeSortFilter';
import { useResumeStore } from '@/store/resumeStore';
import type { Resume } from '@/types/resume';

export default function Resumes() {
  const { resumes, loading, fetchAll, create, remove, duplicate, update } = useResumeStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>('updated');
  const [filter, setFilter] = useState<FilterKey>('all');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function onCreate(title: string) {
    await create(title);
  }

  async function onDuplicate(id: string) {
    await duplicate(id);
  }

  async function onRename(id: string, title: string) {
    await update(id, { title });
  }

  // Counts for the filter chips (before filtering)
  const counts = useMemo(() => {
    const total = resumes.length;
    const strong = resumes.filter((r) => (r.atsScore ?? 0) >= 80).length;
    const needs = resumes.filter((r) => typeof r.atsScore === 'number' && r.atsScore < 60).length;
    return { all: total, strong, 'needs-work': needs };
  }, [resumes]);

  // Apply filter + sort
  const visible = useMemo(() => {
    let list = [...resumes];

    if (filter === 'strong') {
      list = list.filter((r) => (r.atsScore ?? 0) >= 80);
    } else if (filter === 'needs-work') {
      list = list.filter((r) => typeof r.atsScore === 'number' && r.atsScore < 60);
    }

    list.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'ats') {
        const av = a.atsScore ?? -1;
        const bv = b.atsScore ?? -1;
        return bv - av;
      }
      // updated
      return b.updatedAt.localeCompare(a.updatedAt);
    });

    return list;
  }, [resumes, filter, sort]);

  const showEmpty = !loading && resumes.length === 0;
  const showFilteredEmpty = !loading && resumes.length > 0 && visible.length === 0;

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

      {/* Sort + filter — only visible when there's at least one resume */}
      {!loading && resumes.length > 0 && (
        <ResumeSortFilter
          sort={sort}
          filter={filter}
          onSortChange={setSort}
          onFilterChange={setFilter}
          counts={counts}
        />
      )}

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[172px] rounded-card" />
          ))}
        </div>
      )}

      {showEmpty && <ResumeEmptyState onCreate={() => setModalOpen(true)} />}

      {showFilteredEmpty && (
        <div className="rounded-card border border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <p className="text-small text-text-secondary">No resumes match this filter.</p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="mt-3 text-small font-medium text-primary hover:text-primary-hover"
          >
            Clear filter
          </button>
        </div>
      )}

      {!loading && visible.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((resume: Resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={remove}
              onDuplicate={onDuplicate}
              onRename={onRename}
            />
          ))}
        </div>
      )}

      <NewResumeModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={onCreate} />
    </>
  );
}
