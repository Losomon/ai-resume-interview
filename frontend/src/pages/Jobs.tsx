import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { Card, Skeleton, AIMark } from '@/components/ui';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobDetails } from '@/components/jobs/JobDetails';
import { useJobStore } from '@/store/jobStore';
import { useResumeStore } from '@/store/resumeStore';
import { useATSStore } from '@/store/atsStore';
import { useApplicationStore } from '@/store/applicationStore';
import type { Job } from '@/types/resume';

export default function Jobs() {
  const navigate = useNavigate();

  const { resumes, fetchAll } = useResumeStore();
  const { analysis } = useATSStore();
  const { jobs, matches, loading, filters, saved, search, toggleSaved } = useJobStore();

  const applications = useApplicationStore((s) => s.applications);
  const fetchApplications = useApplicationStore((s) => s.fetchAll);
  const addApplication = useApplicationStore((s) => s.add);

  const [openJobId, setOpenJobId] = useState<string | null>(null);

  // Pick most recent resume as the matching context
  const activeResume =
    resumes.length > 0
      ? resumes.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
      : null;

  // Load resumes once
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Load applications so we can detect "already in tracker"
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Re-search whenever filters change
  useEffect(() => {
    search(activeResume, analysis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, activeResume?.id, analysis?.resumeId]);

  const openJob = jobs.find((j) => j.id === openJobId) ?? null;

  async function onApply(job: Job) {
    const alreadyTracked = applications.some((a) => a.jobId === job.id);

    if (alreadyTracked) {
      // Already in tracker — just close the details and navigate to Applications
      setOpenJobId(null);
      navigate('/applications');
      return;
    }

    const match = matches[job.id];

    await addApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyInitial: job.companyInitial,
      location: job.remote ? 'Remote' : job.location,
      matchScore: match?.score,
    });

    setOpenJobId(null);
    navigate('/applications');
  }

  return (
    <>
      <PageHeader
        title="Job Matches"
        subtitle={
          activeResume
            ? `Matched against "${activeResume.title}"`
            : 'Create a resume to see match scores.'
        }
      />

      <Card className="mb-6 p-4">
        <JobFilters />
      </Card>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-card" />
          ))}
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <Card className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <AIMark size={48} />
          <h3 className="mt-5 text-card text-text">No matching jobs</h3>
          <p className="mt-2 max-w-[320px] text-small text-text-secondary">
            Try adjusting your filters or clearing the search.
          </p>
        </Card>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              match={matches[job.id]}
              saved={saved.includes(job.id)}
              onOpen={() => setOpenJobId(job.id)}
              onToggleSaved={() => toggleSaved(job.id)}
            />
          ))}
        </div>
      )}

      <JobDetails
        job={openJob}
        match={openJob ? matches[openJob.id] : undefined}
        saved={openJob ? saved.includes(openJob.id) : false}
        onClose={() => setOpenJobId(null)}
        onToggleSaved={() => openJob && toggleSaved(openJob.id)}
        onApply={() => openJob && onApply(openJob)}
      />
    </>
  );
}
