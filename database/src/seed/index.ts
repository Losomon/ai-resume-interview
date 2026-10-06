import { pool } from "../cli/env.js"; import { seedSkills } from "./skills.js"; import { seedJobs } from "./jobs.js"; import { seedUsers, DEMO } from "./users.js";
if (process.env.NODE_ENV === "production") throw new Error("Refusing to seed in production");
await seedSkills(); await seedJobs(); await seedUsers();
console.log(`Seeded skills, 12 jobs and a demo user: ${DEMO.email} / ${DEMO.password}`); await pool.end();
