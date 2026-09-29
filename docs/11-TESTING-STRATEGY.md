# 11. Testing Strategy

## Pyramid
| Level | Tools | What it covers |
|---|---|---|
| Unit | Vitest | `utils/`, `hooks/`, store logic, validators, formatters |
| Component | Vitest + React Testing Library | `ui/` and feature components: props, states, keyboard |
| Accessibility | axe (jest-axe, Playwright axe) | Every page and every `/design-system` section |
| End to end | Playwright | Critical journeys (below) |
| API contract | Schema tests (OpenAPI or Pact) | Frontend `services/` vs backend responses |
| AI evaluation | Golden-set harness | Guardrails and scoring stability (doc 09) |
| Visual | Playwright screenshots on `/design-system` | Token and component regressions |

## Critical journeys (E2E)
1. Register → create resume → edit → autosave persists after reload.
2. Select text → AI suggestion → accept → preview updates.
3. Run ATS analysis → results show separate *missing evidence* and *skill gaps*.
4. Complete a 10-question interview → results page shows all scores.
5. Session expiry → redirected to login → returned to the original route.
6. Mobile (390×844): bottom nav works, AI bottom sheet opens, primary actions are ≥ 48px.

## Component rules
Every component test checks: renders with required props; loading, empty and error states; keyboard operation and visible focus; accessible name; and behavior with `prefers-reduced-motion`.

## Motion and accessibility checks
- With reduced motion emulated, no animation runs and all content is still visible.
- Timer and progress updates do not spam screen readers.
- Contrast at least 4.5:1 for text; verified on all color tokens.

## AI testing (deterministic where possible)
- Mock the provider in unit and E2E tests, so UI tests never call a real model.
- Golden set: resumes plus job descriptions with expected gap classification.
- **Hallucination gate:** any output containing a fact absent from the source fails the build.
- Prompt-injection cases (resume text saying "ignore your instructions") must not change behavior.
- Same input twice → score within an agreed tolerance.

## Backend tests to request from the backend design
Cross-user access on every endpoint, rate limits, validation errors matching the error format, migration up/down, upload rejection cases.

## Performance
Lighthouse CI on landing and dashboard (targets: LCP under 2.5 s, CLS under 0.1, accessibility ≥ 95). Bundle size budget enforced in CI.

## CI gates (every PR)
Typecheck, lint, unit and component tests, axe, build. Nightly: full E2E, visual regression, AI golden set. Release: security scan and a manual pass on mobile.

## Coverage targets
Utilities and stores 90%, components 80%, and 100% of critical journeys automated. Coverage is a signal, not the goal: prefer meaningful assertions.
