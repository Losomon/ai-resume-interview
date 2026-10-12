import "dotenv/config"; import { z } from "zod";
/** Fails at boot with a readable message instead of at 3am on the first login. */
export const env = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"), PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1), JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  ACCESS_TTL_MINUTES: z.coerce.number().default(15), REFRESH_TTL_DAYS: z.coerce.number().default(7), CORS_ORIGIN: z.string().default("http://localhost:5173"),
  ANTHROPIC_API_KEY: z.string().optional().transform((v) => v || undefined), ANTHROPIC_MODEL: z.string().default("claude-sonnet-5-5"),
}).parse(process.env);
