import type { AISuggestion, AISuggestionOption, AISuggestionTone } from '@/types/resume';

const BASE_LATENCY = 400;

function delay<T>(value: T, ms = BASE_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ---------- tone transforms ---------- */

function trim(s: string): string {
  return s.trim().replace(/\.$/, '');
}

function transform(text: string, tone: AISuggestionTone): AISuggestionOption {
  const cleaned = trim(text);

  switch (tone) {
    case 'concise':
      return {
        id: crypto.randomUUID(),
        label: 'Concise',
        text: `${cleaned}.`,
      };

    case 'metrics':
      return {
        id: crypto.randomUUID(),
        label: 'Metrics',
        text:
          cleaned.length < 60
            ? `${cleaned}, improving performance by ~30% and reducing manual effort across the team.`
            : `${cleaned}. Delivered measurable impact by shipping iteratively and collaborating across functions.`,
      };

    case 'leadership':
      return {
        id: crypto.randomUUID(),
        label: 'Leadership',
        text: `${cleaned}. Led cross-functional collaboration and mentored teammates through delivery.`,
      };

    case 'technical':
      return {
        id: crypto.randomUUID(),
        label: 'Technical',
        text: `${cleaned}. Designed and implemented the solution end-to-end, including architecture decisions and trade-off analysis.`,
      };

    case 'balanced':
    default:
      return {
        id: crypto.randomUUID(),
        label: 'Balanced',
        text:
          cleaned.length < 60
            ? `${cleaned}, delivering a measurable improvement for the team.`
            : `${cleaned}. Focused on clarity, ownership, and measurable outcomes.`,
      };
  }
}

/* ---------- streaming ---------- */

function* tokenize(text: string): Generator<string> {
  const parts = text.split(/(\s+)/);
  for (const p of parts) {
    if (p.length === 0) continue;
    yield p;
  }
}

async function* streamText(text: string, msPerToken = 22): AsyncGenerator<string> {
  let built = '';
  for (const token of tokenize(text)) {
    built += token;
    yield built;
    await new Promise((r) => setTimeout(r, msPerToken));
  }
}

/* ---------- public API ---------- */

export const aiApi = {
  /**
   * Legacy non-streaming rewrite — kept for compatibility with any code
   * still calling the original signature.
   */
  async rewrite(text: string, context?: string): Promise<AISuggestion> {
    const opt = transform(text, 'metrics');
    return delay({
      id: opt.id,
      original: text,
      suggested: opt.text,
      reason: context ? `Aligned with "${context}"` : 'Adds specificity and measurable outcomes.',
    });
  },

  /** Returns several tone variants at once. */
  async suggestions(
    text: string,
    context?: string,
    tones: AISuggestionTone[] = ['balanced', 'concise', 'metrics'],
  ): Promise<{
    original: string;
    context?: string;
    options: AISuggestionOption[];
  }> {
    const options = tones.map((t) => transform(text, t));
    return delay({ original: text, context, options }, 500);
  },

  /**
   * Streams a single suggestion token-by-token.
   * Yields the accumulated text each tick.
   */
  rewriteStream(text: string, tone: AISuggestionTone = 'balanced'): AsyncGenerator<string> {
    const opt = transform(text, tone);
    return streamText(opt.text);
  },
};
