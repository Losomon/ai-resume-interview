import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { EditorSection } from './EditorSection';
import { cn } from '@/utils/cn';
import type { Resume, ExperienceItem, EducationItem } from '@/types/resume';

type ResumeEditorProps = {
  resume: Resume;
  onChange: (patch: Partial<Resume>) => void;
  onRequestAI: (text: string, context: string, apply: (s: string) => void) => void;
};

export function ResumeEditor({ resume, onChange, onRequestAI }: ResumeEditorProps) {
  /* ---------- generic field patch ---------- */
  function patchField<K extends keyof Resume>(key: K, value: Resume[K]) {
    onChange({ [key]: value } as Partial<Resume>);
  }

  /* ---------- experience ---------- */
  function addExperience() {
    const next: ExperienceItem = {
      id: crypto.randomUUID(),
      role: '',
      company: '',
      startDate: '',
      endDate: null,
      description: '',
    };
    patchField('experience', [...resume.experience, next]);
  }

  function updateExperience(id: string, patch: Partial<ExperienceItem>) {
    patchField(
      'experience',
      resume.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }

  function removeExperience(id: string) {
    patchField(
      'experience',
      resume.experience.filter((e) => e.id !== id),
    );
  }

  /* ---------- education ---------- */
  function addEducation() {
    const next: EducationItem = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: null,
    };
    patchField('education', [...resume.education, next]);
  }

  function updateEducation(id: string, patch: Partial<EducationItem>) {
    patchField(
      'education',
      resume.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  }

  function removeEducation(id: string) {
    patchField(
      'education',
      resume.education.filter((e) => e.id !== id),
    );
  }

  /* ---------- skills ---------- */
  function addSkill(raw: string) {
    const value = raw.trim();
    if (!value || resume.skills.includes(value)) return;
    patchField('skills', [...resume.skills, value]);
  }

  function removeSkill(skill: string) {
    patchField(
      'skills',
      resume.skills.filter((s) => s !== skill),
    );
  }

  return (
    <div className="flex flex-col">
      {/* ---------- Profile ---------- */}
      <EditorSection title="Profile">
        <div className="flex flex-col gap-4">
          <Input
            label="Full name"
            value={resume.fullName}
            onChange={(e) => patchField('fullName', e.target.value)}
            placeholder="John Doe"
          />
          <Input
            label="Headline"
            value={resume.headline}
            onChange={(e) => patchField('headline', e.target.value)}
            placeholder="Senior Software Engineer"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-small font-medium text-text-secondary">Summary</label>
            <textarea
              value={resume.summary}
              onChange={(e) => patchField('summary', e.target.value)}
              rows={4}
              placeholder="A short paragraph about who you are and what you do."
              className={cn(
                'w-full rounded-button border border-border bg-card px-3.5 py-3 text-body text-text',
                'placeholder:text-text-muted',
                'transition-colors duration-card',
                'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
              )}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onRequestAI(resume.summary, 'resume summary', (s) => patchField('summary', s))
                }
                disabled={!resume.summary.trim()}
                className="inline-flex items-center gap-1.5 rounded-button px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary-tint disabled:pointer-events-none disabled:opacity-40"
              >
                <Sparkles size={12} />
                Improve with AI
              </button>
            </div>
          </div>
        </div>
      </EditorSection>

      {/* ---------- Experience ---------- */}
      <EditorSection title="Experience">
        <div className="flex flex-col gap-5">
          {resume.experience.map((e) => (
            <div key={e.id} className="rounded-button border border-border bg-bg-secondary p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Role"
                  value={e.role}
                  onChange={(ev) => updateExperience(e.id, { role: ev.target.value })}
                  placeholder="Senior Software Engineer"
                />
                <Input
                  label="Company"
                  value={e.company}
                  onChange={(ev) => updateExperience(e.id, { company: ev.target.value })}
                  placeholder="Tech Solutions Inc."
                />
                <Input
                  label="Start"
                  value={e.startDate}
                  onChange={(ev) => updateExperience(e.id, { startDate: ev.target.value })}
                  placeholder="Jan 2021"
                />
                <Input
                  label="End"
                  value={e.endDate ?? ''}
                  onChange={(ev) => updateExperience(e.id, { endDate: ev.target.value || null })}
                  placeholder="Present"
                />
              </div>

              <div className="mt-3 flex flex-col gap-1.5">
                <label className="text-small font-medium text-text-secondary">Description</label>
                <textarea
                  value={e.description}
                  onChange={(ev) => updateExperience(e.id, { description: ev.target.value })}
                  rows={4}
                  placeholder="What did you build, ship, or improve?"
                  className={cn(
                    'w-full rounded-button border border-border bg-card px-3.5 py-3 text-body text-text',
                    'placeholder:text-text-muted',
                    'transition-colors duration-card',
                    'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                  )}
                />
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => removeExperience(e.id)}
                    className="inline-flex items-center gap-1.5 rounded-button px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:bg-problem-tint hover:text-problem"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onRequestAI(e.description, e.role || 'experience', (s) =>
                        updateExperience(e.id, { description: s }),
                      )
                    }
                    disabled={!e.description.trim()}
                    className="inline-flex items-center gap-1.5 rounded-button px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary-tint disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Sparkles size={12} />
                    Improve with AI
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Button variant="secondary" onClick={addExperience}>
            <Plus size={16} />
            Add experience
          </Button>
        </div>
      </EditorSection>

      {/* ---------- Education ---------- */}
      <EditorSection title="Education">
        <div className="flex flex-col gap-5">
          {resume.education.map((ed) => (
            <div key={ed.id} className="rounded-button border border-border bg-bg-secondary p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Degree"
                  value={ed.degree}
                  onChange={(ev) => updateEducation(ed.id, { degree: ev.target.value })}
                  placeholder="BSc Computer Science"
                />
                <Input
                  label="Institution"
                  value={ed.institution}
                  onChange={(ev) => updateEducation(ed.id, { institution: ev.target.value })}
                  placeholder="University of Technology"
                />
                <Input
                  label="Start"
                  value={ed.startDate}
                  onChange={(ev) => updateEducation(ed.id, { startDate: ev.target.value })}
                  placeholder="2017"
                />
                <Input
                  label="End"
                  value={ed.endDate ?? ''}
                  onChange={(ev) => updateEducation(ed.id, { endDate: ev.target.value || null })}
                  placeholder="2021"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeEducation(ed.id)}
                  className="inline-flex items-center gap-1.5 rounded-button px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:bg-problem-tint hover:text-problem"
                >
                  <Trash2 size={12} />
                  Remove
                </button>
              </div>
            </div>
          ))}

          <Button variant="secondary" onClick={addEducation}>
            <Plus size={16} />
            Add education
          </Button>
        </div>
      </EditorSection>

      {/* ---------- Skills ---------- */}
      <EditorSection title="Skills">
        <SkillsEditor skills={resume.skills} onAdd={addSkill} onRemove={removeSkill} />
      </EditorSection>
    </div>
  );
}

/* ---------- Skills sub-component ---------- */

function SkillsEditor({
  skills,
  onAdd,
  onRemove,
}: {
  skills: string[];
  onAdd: (s: string) => void;
  onRemove: (s: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs text-text-secondary"
          >
            {s}
            <button
              type="button"
              onClick={() => onRemove(s)}
              aria-label={`Remove ${s}`}
              className="text-text-muted transition-colors hover:text-problem"
            >
              ×
            </button>
          </span>
        ))}
        {skills.length === 0 && <p className="text-small text-text-muted">No skills added yet.</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem('skill') as HTMLInputElement;
          onAdd(input.value);
          input.value = '';
        }}
        className="flex gap-2"
      >
        <input
          name="skill"
          placeholder="Add a skill and press Enter"
          className={cn(
            'h-10 flex-1 rounded-button border border-border bg-card px-3 text-small text-text',
            'placeholder:text-text-muted',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
          )}
        />
        <Button type="submit" variant="secondary">
          Add
        </Button>
      </form>
    </div>
  );
}
