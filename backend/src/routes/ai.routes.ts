import { Router } from "express"; import { z } from "zod"; import { requireAuth } from "../middleware/auth.js"; import { aiLimiter } from "../middleware/rate-limit.js"; import { validateBody } from "../middleware/validate.js"; import { TONES } from "../lib/llm.js"; import * as ai from "../services/ai.service.js";
export const aiRouter = Router(); aiRouter.use(requireAuth, aiLimiter);
const text = z.string().trim().min(1).max(1500);
/** SSE over POST: consume with fetch + ReadableStream (EventSource cannot POST). Events: {delta}, then {done:true}; or `event: error`. */
aiRouter.post("/rewrite", validateBody(z.object({ text, tone: z.enum(TONES).default("professional") })), async (req, res) => {
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" }); res.flushHeaders();
  const ac = new AbortController(); res.on("close", () => ac.abort()); // stop paying for tokens when the user leaves
  try { for await (const delta of ai.rewriteStream(req.body.text, req.body.tone, ac.signal)) res.write(`data: ${JSON.stringify({ delta })}\n\n`); res.write(`data: ${JSON.stringify({ done: true })}\n\n`); }
  catch { if (!ac.signal.aborted) res.write(`event: error\ndata: ${JSON.stringify({ message: "AI is unavailable. Your text is unchanged." })}\n\n`); } finally { res.end(); }
});
aiRouter.post("/suggestions", validateBody(z.object({ text, tones: z.array(z.enum(TONES)).min(1).max(3).default(["professional", "concise", "impactful"]) })), async (req, res) => { res.json({ options: await ai.suggestions(req.body.text, req.body.tones) }); });
