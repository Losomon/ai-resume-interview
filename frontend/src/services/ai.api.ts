import type { AISuggestion } from "@/types/resume";

const LATENCY = 900;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY));
}

export const aiApi = {
  async rewrite(text: string, context?: string): Promise<AISuggestion> {
    // Simple mock: pad short sentences into a fuller bullet with metrics
    const cleaned = text.trim().replace(/\.$/, "");

    const suggested =
      cleaned.length < 60
        ? `${cleaned}, improving performance by ~30% and reducing manual effort across the team.`
        : `${cleaned}. Delivered measurable impact by shipping iteratively and collaborating across functions.`;

    return delay({
      id: crypto.randomUUID(),
      original: text,
      suggested,
      reason: context
        ? `Aligned with "${context}"`
        : "Adds specificity and measurable outcomes.",
    });
  },
};