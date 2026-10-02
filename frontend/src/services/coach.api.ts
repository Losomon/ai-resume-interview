import type {
  ATSAnalysis,
  CoachMessage,
  LearningPlan,
  LearningPlanStep,
  Resume,
} from "@/types/resume";

const LATENCY = 1000;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ---------- canned replies ---------- */

function replyFor(text: string, resume: Resume | null, ats: ATSAnalysis | null): string {
  const lower = text.toLowerCase();

  if (/\b(ats|score|keyword)\b/.test(lower)) {
    if (!ats) {
      return "You haven't run an ATS analysis yet. Go to the ATS Analyzer, paste a job description you're targeting, and I can give you specifics on what to improve.";
    }
    const missing = ats.missing.filter((m) => m.kind === "gap").slice(0, 3);
    const evidence = ats.missing.filter((m) => m.kind === "evidence").slice(0, 3);
    let reply = `Your last ATS score was ${ats.score.overall}/100. `;
    if (evidence.length) {
      reply += `First, look at these — you may already have them: ${evidence
        .map((m) => m.keyword)
        .join(", ")}. `;
    }
    if (missing.length) {
      reply += `Then consider whether these are real gaps worth addressing: ${missing
        .map((m) => m.keyword)
        .join(", ")}.`;
    }
    return reply;
  }

  if (/\b(resume|summary|bullet|experience)\b/.test(lower)) {
    if (!resume) return "Create a resume first and I can give you specific advice.";
    const short = resume.experience.filter((e) => e.description.length < 60).length;
    if (short > 0) {
      return `${short} of your experience bullets are under 60 characters. Try expanding each one to include an action, a tool, and a measurable outcome — even an approximate one ("cut load time roughly in half" is better than nothing).`;
    }
    return "Your experience bullets look solid. The next thing to look at is whether every bullet answers: what did I do, how did I do it, and what changed because of it?";
  }

  if (/\b(interview|practice|question)\b/.test(lower)) {
    return "Interviews are the phase where specificity wins. Record yourself answering one behavioral question out loud, then write down your answer. If the written version is clearer than the spoken one, that's your practice target.";
  }

  if (/\b(skill|learn|study|course)\b/.test(lower)) {
    return "Pick one skill from your ATS gaps that shows up in at least three of your target jobs. Ignore the rest for now. Depth in one beats shallow coverage of five.";
  }

  if (/\b(job|apply|application)\b/.test(lower)) {
    return "Quality over quantity. Ten tailored applications beat a hundred generic ones. For each role, run the ATS analyzer against its description — if you score below 75, either fix your resume or skip the role.";
  }

  return "Tell me a bit more — are you trying to improve your resume, prepare for an interview, or figure out which skills to prioritize? I'll give you something concrete.";
}

/* ---------- learning plan generation ---------- */

function makeStep(
  title: string,
  description: string,
  category: LearningPlanStep["category"],
  hours: number,
): LearningPlanStep {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    estimatedHours: hours,
    completed: false,
  };
}

function buildPlan(
  resume: Resume | null,
  ats: ATSAnalysis | null,
  goal: string,
): LearningPlan {
  const steps: LearningPlanStep[] = [];

  // 1. Resume cleanup
  if (!resume || !resume.summary) {
    steps.push(
      makeStep(
        "Write a sharp professional summary",
        "Three sentences: what you do, where you've done it, and what you're moving toward.",
        "resume",
        1,
      ),
    );
  }

  if (resume && resume.experience.some((e) => e.description.length < 60)) {
    steps.push(
      makeStep(
        "Expand thin experience bullets",
        "Every bullet gets an action, a tool, and a measurable outcome. Aim for 2–3 lines each.",
        "resume",
        2,
      ),
    );
  }

  // 2. Skills from ATS gaps
  if (ats) {
    const gaps = ats.missing.filter((m) => m.kind === "gap").slice(0, 3);
    for (const gap of gaps) {
      steps.push(
        makeStep(
          `Build a small project using ${gap.keyword}`,
          `Don't take a course yet — build something real. One weekend project you can talk about in an interview is worth more than three certificates.`,
          "skill",
          8,
        ),
      );
    }

    const evidence = ats.missing.filter((m) => m.kind === "evidence").slice(0, 2);
    for (const e of evidence) {
      steps.push(
        makeStep(
          `Add ${e.keyword} to your resume (if genuinely true)`,
          `You may already have this from prior work. If so, make it explicit in a bullet — don't add it to a skills list without evidence.`,
          "resume",
          0.5,
        ),
      );
    }
  } else {
    steps.push(
      makeStep(
        "Run an ATS analysis on a target job",
        "Paste a real job description you want. That gives us the actual gaps to work on.",
        "resume",
        0.5,
      ),
    );
  }

  // 3. Portfolio
  steps.push(
    makeStep(
      "Polish one project into a portfolio piece",
      "Pick your strongest project. Write a short case study: problem, approach, decisions, result. Publish it somewhere public.",
      "portfolio",
      4,
    ),
  );

  // 4. Interview practice
  steps.push(
    makeStep(
      "Run two mock interviews",
      "One behavioral, one technical. Aim for 60–120 word answers with concrete outcomes.",
      "interview",
      2,
    ),
  );

  // 5. Interview feedback loop
  steps.push(
    makeStep(
      "Review your interview feedback and revise",
      "Read the per-question notes. Pick the two weakest answers. Rewrite them and re-record.",
      "interview",
      1.5,
    ),
  );

  return {
    id: crypto.randomUUID(),
    goal,
    summary: `A ${steps.reduce((s, st) => s + st.estimatedHours, 0).toFixed(
      0,
    )}-hour plan built from your resume and latest analysis.`,
    steps,
    createdAt: new Date().toISOString(),
  };
}

/* ---------- public API ---------- */

export const coachApi = {
  async reply(
    text: string,
    resume: Resume | null,
    ats: ATSAnalysis | null,
  ): Promise<CoachMessage> {
    return delay({
      id: crypto.randomUUID(),
      role: "coach",
      text: replyFor(text, resume, ats),
      createdAt: new Date().toISOString(),
    });
  },

  async generatePlan(
    resume: Resume | null,
    ats: ATSAnalysis | null,
    goal: string,
  ): Promise<LearningPlan> {
    return delay(buildPlan(resume, ats, goal), 1400);
  },
};