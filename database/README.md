# Database

CareerForge will use PostgreSQL.

Recommended ORM:

```text
Prisma
```

Planned core entities:

```text
users
profiles
resumes
resume_versions
experiences
educations
projects
skills
certifications
jobs
job_requirements
applications
interviews
interview_questions
interview_answers
interview_feedback
career_goals
coach_conversations
coach_messages
```

Do not build the complete schema on day one.

Start with:

```text
users
profiles
resumes
```

Then add entities as each feature is implemented.
