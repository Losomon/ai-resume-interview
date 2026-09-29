# 04. Frontend Architecture

## Principles
**Pages compose, components render.** Pages fetch data and arrange components; components take props. Tokens live only in `tailwind.config.ts`.

## Layout of `src/`
```text
components/  ui · layout · dashboard · resume · ats · jobs · interview · landing
pages/       one file per route
routes/      AppRoutes.tsx
hooks/       useAuth, useResume, useInterview, useATS, useDebounce
services/    api.ts + one *.api.ts per domain
store/       authStore, resumeStore, interviewStore (Zustand)
types/       user, resume, job, interview, api
utils/       formatters, validators, constants
```

## Routes
| Path | Page | Shell |
|---|---|---|
| `/` | Landing | none |
| `/login` `/register` `/forgot-password` | Auth | none |
| `/design-system` | Style guide | none |
| `/interview/room` | InterviewRoom (focused) | none |
| `/dashboard` | Dashboard | dashboard |
| `/resumes`, `/resumes/:id` | Resumes, ResumeBuilder | dashboard |
| `/ats` `/jobs` `/interview` `/interview/results` `/coach` `/applications` `/settings` | matching pages | dashboard |

Planned: an auth guard around the dashboard shell (Phase 3).

## Data flow
`page → hook → service (api.ts) → backend`. Server data is fetched in hooks; client-only UI state lives in Zustand. Endpoints are defined only in `services/*.api.ts` so backend changes touch one place.

## API client
`api<T>(path, init)` prefixes `VITE_API_URL` (default `/api`), attaches `Authorization: Bearer <cf_token>`, and throws `{status, message}`. If the backend moves to httpOnly cookies, switch to `credentials: "include"` and remove token handling (doc 10).

## State
| Store | Holds |
|---|---|
| authStore | user, setAuth, logout |
| resumeStore | active resume id |
| interviewStore | question index, answers, orb state |

## Environment variables
`VITE_API_URL`. Never put secrets in the frontend.

## Adding a feature
1. Add types in `types/`. 2. Add service functions. 3. Build components with props only. 4. Compose in the page. 5. Add loading, empty and error states. 6. Add the component to `/design-system`. 7. Add tests (doc 11).

## Build phases
1 Design system · 2 App shell · 3 Auth · 4 Dashboard · 5 Resume management · 6 Resume builder · 7 AI resume assist · 8 ATS · 9 AI interview · 10 Feedback · 11 Jobs · 12 Coach · 13 Applications. Find remaining work with `grep -r "TODO(Phase" src`.

## Performance
Route-level code splitting with `React.lazy` (planned), memoized resume preview, debounced editor input (`useDebounce`), AI responses streamed.
