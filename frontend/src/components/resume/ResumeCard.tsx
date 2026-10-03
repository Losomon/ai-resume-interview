import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FileText, MoreVertical, Trash2, Pencil, Copy } from 'lucide-react';
import { Card, Badge } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Resume } from '@/types/resume';

type ResumeCardProps = {
  resume: Resume;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onRename: (id: string, title: string) => void;
};

export function ResumeCard({ resume, onDelete, onDuplicate, onRename }: ResumeCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(resume.title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  // Focus title input when entering edit mode
  useEffect(() => {
    if (editing) {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }
  }, [editing]);

  // Sync draft if the resume changes externally
  useEffect(() => {
    if (!editing) setTitleDraft(resume.title);
  }, [resume.title, editing]);

  function startRename(e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(true);
  }

  function commitRename() {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== resume.title) {
      onRename(resume.id, trimmed);
    } else {
      setTitleDraft(resume.title);
    }
    setEditing(false);
  }

  function cancelRename() {
    setTitleDraft(resume.title);
    setEditing(false);
  }

  const updated = new Date(resume.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card hover className="group relative flex flex-col overflow-hidden p-5">
      {/* Click target — whole card opens the builder, unless editing */}
      <div
        onClick={() => {
          if (!editing) navigate(`/resumes/${resume.id}`);
        }}
        role={editing ? undefined : 'button'}
        tabIndex={editing ? undefined : 0}
        onKeyDown={(e) => {
          if (!editing && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            navigate(`/resumes/${resume.id}`);
          }
        }}
        className={cn('flex flex-1 flex-col items-start text-left', !editing && 'cursor-pointer')}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-tint text-primary">
            <FileText size={18} />
          </span>
          {typeof resume.atsScore === 'number' && (
            <Badge
              tone={
                resume.atsScore >= 80 ? 'progress' : resume.atsScore >= 60 ? 'attention' : 'problem'
              }
            >
              ATS {resume.atsScore}
            </Badge>
          )}
        </div>

        {/* Title — inline editable */}
        <div className="mt-4 w-full">
          {editing ? (
            <input
              ref={titleInputRef}
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commitRename();
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  cancelRename();
                }
              }}
              className={cn(
                'w-full rounded-button border border-primary bg-card px-2 py-1',
                'text-card text-text',
                'focus:outline-none focus:ring-2 focus:ring-primary/20',
              )}
            />
          ) : (
            <h3
              onDoubleClick={startRename}
              className="line-clamp-2 text-card text-text"
              title="Double-click to rename"
            >
              {resume.title}
            </h3>
          )}
        </div>

        {resume.headline && (
          <p className="mt-1 line-clamp-1 text-small text-text-secondary">{resume.headline}</p>
        )}

        <p className="mt-3 text-xs text-text-muted">Updated {updated}</p>
      </div>

      {/* Menu — positioned top-right */}
      <div ref={menuRef} className="absolute right-3 top-3">
        <button
          type="button"
          aria-label="Resume options"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-button',
            'text-text-muted transition-all duration-card',
            'opacity-0 group-hover:opacity-100 focus:opacity-100',
            menuOpen && 'opacity-100 bg-bg-secondary',
            'hover:bg-bg-secondary hover:text-text',
          )}
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <div
            className={cn(
              'absolute right-0 top-9 z-10 w-44',
              'rounded-button border border-border bg-card p-1',
              'shadow-card-hover',
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                navigate(`/resumes/${resume.id}`);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                startRename(e);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
            >
              <FileText size={14} />
              Rename
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDuplicate(resume.id);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text"
            >
              <Copy size={14} />
              Duplicate
            </button>

            <div className="my-1 border-t border-border" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(resume.id);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-small text-text-secondary transition-colors hover:bg-problem-tint hover:text-problem"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
