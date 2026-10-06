import { pgTable, uuid, index, primaryKey } from "drizzle-orm/pg-core"; import { jobs } from "./jobs.js"; import { skills } from "./skills.js";
/** Join table. The skill_id index answers "which jobs need React?" without scanning anything. */
export const jobSkills = pgTable("job_skills", { jobId: uuid("job_id").notNull().references(() => jobs.id, { onDelete: "cascade" }), skillId: uuid("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }) },
  (t) => [primaryKey({ columns: [t.jobId, t.skillId] }), index("job_skills_skill_idx").on(t.skillId)]);
