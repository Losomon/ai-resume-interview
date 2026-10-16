# @careerforge/database

<<<<<<< HEAD
Complete PostgreSQL layer for CareerForge: 29 tables, generated migration, client factory, resume-content schema, and a verification suite that runs on in-memory Postgres.

## Use
    cp .env.example .env        # set DATABASE_URL
    npm install
    npm run migrate             # apply migrations/
    npm run verify              # 16 checks on in-memory Postgres, no server needed

From the API: `import { createDatabase, resumes } from "@careerforge/database"`.
After editing `src/schema/*`: `npm run generate`, read the SQL, commit it, `npm run migrate`, `npm run verify`.

## Tables (29)
| Area | Tables |
|---|---|
| Identity | users, user_profiles, user_settings, oauth_accounts, refresh_tokens, password_reset_tokens, email_verification_tokens |
| Resumes | resumes, resume_versions, resume_files, ats_analyses |
| Skills | skills |
| Jobs | jobs, job_matches, saved_jobs |
| Applications | applications, application_events |
| Interviews | interviews, interview_questions, interview_answers |
| Coach | coach_conversations, coach_messages, learning_plan_steps |
| Progress | readiness_snapshots |
| System | notifications, contact_messages, ai_usage, subscriptions, audit_log |
=======
The PostgreSQL layer for CareerForge as its own package: schema, migrations, shared validation, client factory, seed and verification. It knows nothing about Express or the frontend, and never reads `process.env` (only the CLI and seed scripts do).

```text
database/
├── package.json  tsconfig.json  drizzle.config.ts  .env.example
├── migrations/             generated SQL + meta (0000_init.sql). Commit it. Never edit an applied file
├── test/verify.mjs         applies migrations to in-memory Postgres and checks the rules
└── src/
    ├── index.ts            public API: createDatabase, every table, validation schemas, SKILL_CATALOG
    ├── client.ts           createDatabase({ connectionString }) → { db, pool }
    ├── catalog.ts          the recognised skills: one list for seed, ATS and interview scoring
    ├── schema/             one file per domain
    │   ├── users.ts  resumes.ts  ats-analyses.ts  interview-sessions.ts  applications.ts
    │   ├── coach-conversations.ts  jobs.ts  skills.ts  job-skills.ts
    │   ├── _shared.ts  _enums.ts  relations.ts  index.ts
    ├── validation/         zod contracts shared with the API (the single source of truth)
    │   └── resume-content.ts  interview.ts  application.ts  coach.ts  ats.ts  index.ts
    ├── seed/               index.ts  skills.ts  jobs.ts (12 fictional jobs)  users.ts (demo user + resume)
    └── cli/                env.ts  migrate.ts
```

## Use it
**Standalone:** `cp .env.example .env`, set `DATABASE_URL`, then `npm install && npm run migrate && npm run seed`.

**From the API** (npm workspace, see the root `package.json`):
```ts
import { createDatabase, resumes, resumeContent } from "@careerforge/database";
export const { db, pool } = createDatabase({ connectionString: process.env.DATABASE_URL! });
```
Build the package before the backend runs (`npm run build -w database`; the root `postinstall` does it, and you rerun it after schema changes). Keep one copy of `drizzle-orm` in the workspace so helpers like `eq` and `and` share types with the tables.

| Command | What it does |
|---|---|
| `npm run generate` | Diff schema into a new SQL file in `migrations/`. Read it before committing |
| `npm run migrate` | Apply pending migrations (same command locally, in CI and in production) |
| `npm run seed` | Skills catalog, 12 fictional jobs, demo user `demo@careerforge.dev` / `demo-password-123`. Refuses to run in production |
| `npm run verify` | Runs every migration on in-memory Postgres and asserts constraints and cascades. No server needed |

## The 10 tables
| Table | Holds |
|---|---|
| `users`, `refresh_tokens` | accounts; hashed, rotating session tokens |
| `resumes` | one validated JSONB `content` document + `ats_score` |
| `ats_analyses` | one row per ATS run, with `model_version` |
| `interview_sessions` | config, questions, answers, scores and feedback as one document per session |
| `applications` | kanban cards: stage, position within the column, which resume was sent |
| `coach_conversations` | one row per user: chat messages + the current learning plan |
| `jobs`, `skills`, `job_skills` | listings, the skill catalog, and the join that answers "which jobs need React?" |
>>>>>>> a0ab41b7913502f09c32e9bc4043d33345a1a29f

```mermaid
erDiagram
  users ||--o{ resumes : owns
<<<<<<< HEAD
  users ||--o{ skills : has
  users ||--o{ applications : tracks
  users ||--o{ interviews : takes
  users ||--o{ coach_conversations : starts
  users ||--o{ notifications : receives
  users ||--o{ ai_usage : consumes
  users ||--o{ refresh_tokens : sessions
  resumes ||--o{ resume_versions : snapshots
  resumes ||--o{ resume_files : files
  resumes ||--o{ ats_analyses : analyzed
  jobs ||--o{ job_matches : scored
=======
  users ||--o{ interview_sessions : takes
  users ||--o{ applications : tracks
  users ||--|| coach_conversations : has
  users ||--o{ refresh_tokens : sessions
  resumes ||--o{ ats_analyses : analyzed_in
  jobs ||--o{ job_skills : requires
  skills ||--o{ job_skills : in
>>>>>>> a0ab41b7913502f09c32e9bc4043d33345a1a29f
  jobs ||--o{ applications : for
  applications ||--o{ application_events : timeline
  interviews ||--o{ interview_questions : asks
  interview_questions ||--|| interview_answers : answered
  coach_conversations ||--o{ coach_messages : contains
```

<<<<<<< HEAD
## Rules the database enforces
- Every user-owned table has `user_id ... ON DELETE CASCADE`: deleting an account is one statement.
- Links that should outlive the other row use SET NULL: applications.resume_id, jobs.created_by_user_id, audit_log.user_id, contact_messages.user_id.
- Emails are unique case-insensitively; skill names are unique per user case-insensitively.
- Scores are 0-100 (ATS, readiness, interview, job match), skill level 1-5, uploads 1 byte to 10 MB.
- job_matches.matched_skills <= required_skills, which powers the "based on X of Y skills" line.
- One match per user+job; one answer per question; unique question order and resume version numbers.
- Secrets (refresh, reset, verification tokens) are stored only as hashes; refresh tokens carry a family_id so token reuse can revoke the whole chain.
- password_hash is nullable so OAuth-only accounts work.
- JSONB only for documents (resume content, ATS breakdown, match reasons); anything filtered or sorted on is a real column.

## Indexes
users lower(email) unique; resumes (user_id, updated_at); ats_analyses (resume_id, created_at); jobs skills GIN and full-text GIN; jobs (source, external_id) unique; applications (user_id, stage, sort_order) for kanban; notifications (user_id, read_at, created_at); refresh/reset/verification (expires_at) for pruning; ai_usage (user_id, created_at) for limits.

## Maintenance
Delete expired refresh, reset and verification tokens daily. Decide retention for coach_messages and ats_analyses.job_description (personal text). Schedule backups and test a restore quarterly. On hosted Postgres use a pooled URL for the API and a direct URL for migrations.

## Not included
Seed data, and payment records beyond `subscriptions` (add invoices when Stripe is wired in).
=======
## Conventions
- uuid primary keys, `timestamptz` everywhere, snake_case in SQL, camelCase in TypeScript.
- **Every user-owned table has `user_id ... ON DELETE CASCADE`** (`owner()`): deleting an account is one statement.
- Links that should outlive the other row use `SET NULL` (`applications.resume_id`, `interview_sessions.resume_id`).
- Check constraints guard 0-100 scores; enums cover small stable sets (stage, interview status, job level). Add enum values with a migration; never reorder or remove.
- Secrets (refresh tokens) are stored only as SHA-256 hashes.
- JSONB for documents, validated by the zod schemas in `validation/` at the API edge; anything filtered or sorted on is a real column. `jobs.salary_*` are annual USD.

## Indexes
`users(email)` unique · `resumes(user_id, updated_at)` · `ats_analyses(resume_id, created_at)` · `jobs` full-text GIN · `jobs(source, external_id)` unique (idempotent imports) · `job_skills(skill_id)` · `skills(lower(name))` unique · `applications(user_id, stage, position)` · `interview_sessions(user_id, started_at)` · `refresh_tokens(expires_at)` for pruning.

## Changing the schema
1. Edit `src/schema/*` (and `src/validation/*` if a JSONB shape changes). 2. `npm run generate`. 3. Read the SQL; commit it with the change. 4. `npm run migrate`, `npm run verify`, `npm run build`.
One concern per migration; never edit an applied migration (write a new one). For risky changes use **expand, then contract**: add the new column, write both, backfill, switch reads, drop the old one in a later release. New table: new file using `pk()`, `createdAt()`, `owner()`; export it from `schema/index.ts`; extend `test/verify.mjs`.

## Not here yet (add when a feature needs it)
Password-reset tokens, per-user saved jobs, readiness-score history for the dashboard trend, an audit log. Schedule deletion of expired `refresh_tokens`. Decide how long to keep `coach_conversations` and `ats_analyses.job_description` (personal text, doc 10). Hosted Postgres such as Neon: pooled URL for the API, direct URL for migrations.
>>>>>>> a0ab41b7913502f09c32e9bc4043d33345a1a29f
