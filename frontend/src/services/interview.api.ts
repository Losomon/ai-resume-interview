import type {
  InterviewConfig,
  InterviewQuestion,
  InterviewAnswer,
  InterviewFeedback,
} from "@/types/resume";

const LATENCY = 700;

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/* ---------- question bank ---------- */

const BEHAVIORAL: string[] = [
  "Tell me about a time you disagreed with a teammate. How did you handle it?",
  "Describe a project you're proud of and what your specific contribution was.",
  "Tell me about a time you had to learn something quickly to deliver work.",
  "Give an example of when you received difficult feedback. What did you do?",
  "Describe a situation where you had to prioritize between competing deadlines.",
];

const TECHNICAL: string[] = [
  "Walk me through how you'd debug a performance issue in a web application.",
  "Explain a technical decision you made recently and the trade-offs involved.",
  "How would you design a system that needs to scale from 100 to 1 million users?",
  "Tell me about a challenging technical problem you solved and how you approached it.",
  "What's your process for reviewing someone else's code?",
];

const SITUATIONAL: string[] = [
  "If you inherited a legacy codebase with no tests, how would you start improving it?",
  "A stakeholder asks for a feature that conflicts with your architecture. What do you do?",
  "You notice a security vulnerability in production. How do you respond?",
];

function pickQuestions(config: InterviewConfig): InterviewQuestion[] {
  const pool: InterviewQuestion[] = [];

  const add = (texts: string[], category: InterviewQuestion["category"]) => {
    texts.forEach((text) => {
      pool.push({ id: crypto.randomUUID(), text, category });
    });
  };

  if (config.type === "behavioral") {
    add(BEHAVIORAL, "behavioral");
    add(SITUATIONAL, "situational");
  } else if (config.type === "technical") {
    add(TECHNICAL, "technical");
    add(SITUATIONAL, "situational");
  } else {
    add(BEHAVIORAL, "behavioral");
    add(TECHNICAL, "technical");
    add(SITUATIONAL, "situational");
  }

  // Stable shuffle
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, config.questionCount);
}

/* ---------- scoring ---------- */

function scoreLength(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 10) return 40;
  if (words < 30) return 65;
  if (words < 80) return 85;
  if (words < 180) return 92;
  return 80; // too long
}

function scoreSpecificity(text: string): number {
  const hasNumbers = /\d+%|\d+x|\$\d|\b\d{2,}\b/.test(text);
  const hasAction = /\b(built|shipped|led|designed|implemented|reduced|improved|migrated|launched)\b/i.test(text);
  const hasSituation = /\b(when|while|during|at the time|the team|my manager|the client)\b/i.test(text);
  let score = 50;
  if (hasNumbers) score += 20;
  if (hasAction) score += 15;
  if (hasSituation) score += 15;
  return Math.min(100, score);
}

function scoreStructure(text: string): number {
  const hasSentences = /[.!?]/.test(text);
  const hasTransition = /\b(first|then|next|finally|because|however|so)\b/i.test(text);
  const hasConclusion = /\b(result|outcome|learned|impact|ultimately)\b/i.test(text);
  let score = 50;
  if (hasSentences) score += 15;
  if (hasTransition) score += 15;
  if (hasConclusion) score += 20;
  return Math.min(100, score);
}

function scoreAnswers(answers: InterviewAnswer[]): InterviewFeedback {
  if (answers.length === 0) {
    return {
      scores: { overall: 0, communication: 0, technical: 0, confidence: 0 },
      strengths: [],
      improvements: ["Complete at least one answer to receive feedback."],
      perQuestion: [],
    };
  }

  let comm = 0;
  let tech = 0;
  let conf = 0;

  const perQuestion = answers.map((a) => {
    const l = scoreLength(a.text);
    const s = scoreSpecificity(a.text);
    const st = scoreStructure(a.text);

    comm += st;
    tech += s;
    conf += Math.round((l + s) / 2);

    return {
      questionId: a.questionId,
      note:
        s >= 80
          ? "Specific and well-supported."
          : s >= 60
            ? "Good, but could use more concrete detail."
            : "Try adding a specific example or metric.",
    };
  });

  const n = answers.length;
  const communication = Math.round(comm / n);
  const technical = Math.round(tech / n);
  const confidence = Math.round(conf / n);
  const overall = Math.round((communication + technical + confidence) / 3);

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (communication >= 80) strengths.push("Clear and structured responses.");
  else improvements.push("Structure answers with a beginning, middle, and end.");

  if (technical >= 80) strengths.push("Strong technical substance and specifics.");
  else improvements.push("Add measurable outcomes or technical decisions.");

  if (confidence >= 80) strengths.push("Answers had good depth and detail.");
  else improvements.push("Expand on your answers — aim for 60–120 words.");

  if (strengths.length === 0) strengths.push("You completed the interview — that's the first step.");
  if (improvements.length === 0) improvements.push("Keep practicing to maintain this level.");

  return {
    scores: { overall, communication, technical, confidence },
    strengths,
    improvements,
    perQuestion,
  };
}

/* ---------- public API ---------- */

export const interviewApi = {
  async generate(config: InterviewConfig): Promise<InterviewQuestion[]> {
    return delay(pickQuestions(config));
  },

  async evaluate(answers: InterviewAnswer[]): Promise<InterviewFeedback> {
    return delay(scoreAnswers(answers), 1400);
  },
};