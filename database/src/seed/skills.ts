import { db } from "../cli/env.js"; import { skills } from "../schema/index.js"; import { SKILL_CATALOG } from "../catalog.js";
export const seedSkills = () => db.insert(skills).values(SKILL_CATALOG.map((name) => ({ name }))).onConflictDoNothing();
