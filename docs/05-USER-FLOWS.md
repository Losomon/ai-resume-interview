# 05. User Flows

## Onboarding
```mermaid
flowchart TD
  L[Landing] --> R[Register] --> D[Dashboard, empty state]
  D --> U{Has a resume?}
  U -- No --> C[Create or upload resume] --> B[Resume builder]
  U -- Yes --> D2[Dashboard with scores]
```

## Resume improvement
```mermaid
flowchart TD
  B[Open resume] --> E[Edit section] --> S[Select text] --> AI[AI suggestion panel]
  AI --> A{Choice}
  A -- Accept --> E
  A -- Edit --> E
  A -- Dismiss --> E
  E --> P[Live preview updates] --> SV[Autosave]
```
Desktop: panel slides in from the right (200–250 ms). Mobile: bottom sheet.

## ATS analysis
```mermaid
flowchart TD
  S[Pick resume] --> J[Paste job description] --> A[Analyze: AI is analyzing...]
  A --> R[Score + breakdown]
  R --> M[Missing evidence: add proof to resume]
  R --> G[Skill gaps: learn or acknowledge]
  M --> B[Back to builder]
```

## AI interview
```mermaid
flowchart TD
  S[Setup: role, level] --> Room[Interview room, no sidebar]
  Room --> Q[Question n of 10 + timer] --> Ans[Type answer] --> Sub[Submit] --> Q
  Sub --> Done[Question 10 done] --> Res[Results: scores, strengths, improvements]
  Res --> Again[Practice again] --> S
```
Orb states: idle while waiting, thinking while evaluating, speaking while the question is presented.

## Job matching
Search or paste job → match score per job → view required skills against user skills → save to Applications or improve resume for this job.

## Application tracking
Add application (from a job or manually) → status: saved, applied, interviewing, offer, rejected → notes and dates.

## Error and edge flows
| Case | Behavior |
|---|---|
| Session expires | Redirect to login, return to the same route after |
| AI request fails | Inline error with Retry; user's text is never lost |
| Leaving mid-interview | Confirm dialog; progress saved as draft |
| Offline | Toast explaining the action will retry; editor keeps local draft |
