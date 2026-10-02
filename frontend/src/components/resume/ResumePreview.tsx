import type { Resume } from "@/types/resume";

type ResumePreviewProps = {
  resume: Resume;
};

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="mx-auto w-full max-w-[720px] rounded-card border border-border bg-card p-10 shadow-card">
      {/* Header */}
      <header className="border-b border-border pb-6">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text">
          {resume.fullName || "Your Name"}
        </h1>
        {resume.headline && (
          <p className="mt-1 text-small text-text-secondary">{resume.headline}</p>
        )}
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mt-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Summary
          </h2>
          <p className="mt-2 text-small leading-relaxed text-text-secondary">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Experience
          </h2>
          <div className="mt-3 flex flex-col gap-5">
            {resume.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-small font-semibold text-text">
                    {e.role || "Role"}
                  </h3>
                  <span className="shrink-0 text-xs text-text-muted">
                    {e.startDate} — {e.endDate ?? "Present"}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{e.company}</p>
                {e.description && (
                  <p className="mt-2 whitespace-pre-line text-small leading-relaxed text-text-secondary">
                    {e.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Education
          </h2>
          <div className="mt-3 flex flex-col gap-4">
            {resume.education.map((ed) => (
              <div key={ed.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-small font-semibold text-text">{ed.degree}</h3>
                  <span className="shrink-0 text-xs text-text-muted">
                    {ed.startDate} — {ed.endDate ?? "Present"}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{ed.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Skills
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {resume.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-xs text-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}