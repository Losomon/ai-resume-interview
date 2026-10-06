import { complete, REWRITE_SYSTEM, rewritePrompt, streamRewrite, TONES } from "../lib/llm.js";
export const rewriteStream = streamRewrite;
/** Several tonal options for one text, generated in parallel. Mock text (labelled) when no API key is set. */
export async function suggestions(text: string, tones: readonly (typeof TONES)[number][]) {
  return Promise.all(tones.map(async (tone) => ({ tone, text: (await complete(REWRITE_SYSTEM, rewritePrompt(text, tone), 400)) ?? `[mock, ${tone}] ${text} Add a measurable result, for example [X]%.` })));
}
