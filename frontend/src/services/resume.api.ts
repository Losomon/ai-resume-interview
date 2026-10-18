import type { Resume } from '@/types/resume';
import { api } from '@/lib/api';

export const resumeApi = {
  async list(): Promise<Resume[]> {
    return api<Resume[]>('/resumes');
  },

  async get(id: string): Promise<Resume | null> {
    return api<Resume>(/resumes/);
  },

  async create(title: string): Promise<Resume> {
    return api<Resume>('/resumes', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  },

  async update(id: string, patch: Partial<Resume>): Promise<Resume> {
    return api<Resume>(/resumes/, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
  },

  async remove(id: string): Promise<void> {
    return api<void>(/resumes/, {
      method: 'DELETE',
    });
  },

  async duplicate(id: string): Promise<Resume> {
    return api<Resume>(/resumes//duplicate, {
      method: 'POST',
    });
  },
};
