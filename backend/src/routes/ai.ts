import { Router } from "express"; import { z } from "zod"; import { requireAuth } from "../middleware/auth.js"; import { aiLimiter } from "../middleware/rateLimit.js"; import { streamRewrite, TONES } from "../services/llm.js";
export const aiRouter = Router();
/** SSE over POST: consume with fetch + ReadableStream (EventSource cannot POST). Events: {delta}, then {done:true}; or `event: error`. */
aiRouter.post("/rewrite", requireAuth, aiLimiter, async (req, res) => {
  const { text, tone } = z.object({ text: z.string().trim().min(1).max(1500), tone: z.enum(TONES).default("professional") }).parse(req.body);
  res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" }); res.flushHeaders();
  const ac = new AbortController(); res.on("close", () => ac.abort()); // stop paying for tokens when the user leaves
  try {
    for await (const delta of streamRewrite(text, tone, ac.signal)) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch { if (!ac.signal.aborted) res.write(`event: error\ndata: ${JSON.stringify({ message: "AI is unavailable. Your text is unchanged." })}\n\n`); }
  finally { res.end(); }
});
