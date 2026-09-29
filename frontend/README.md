# CareerForge frontend

`npm install && npm run dev`. Set `VITE_API_URL` to your backend (default `/api`). Open `/design-system` for every token and component.

## Conventions
- **Pages compose, components render.** Pages fetch and arrange; components take props.
- **Tokens live in `tailwind.config.ts`** (mirrored in `utils/constants.ts` for the style guide). Never hardcode hex in components.
- **AI mark is `SparkIcon`.** Never type the sparkle character.
- **Motion:** one orchestrated moment per screen, plus responses to user actions. Everything honors reduced motion.
- **Mobile:** bottom nav is navigation only. Primary actions are full-width, at least 48px.
- **New component?** Add it to `pages/DesignSystem.tsx` in the same change.

## Status
| Phase | Area | State |
|---|---|---|
| 1 | Design system (`ui/`) | Button, Card, Badge, Progress, Skeleton, Input, Avatar, EmptyState, SparkIcon, AIOrb, CareerSignal done. Select, Modal, Tooltip, Toast are stubs |
| 2 | App shell (`layout/`) | Done |
| 3 | Auth pages | Stub |
| 4 | Dashboard | Done with placeholder numbers. RecentActivity, CareerProgress stubs |
| 5-13 | Resumes, builder, AI assist, ATS, interview, feedback, jobs, coach, applications | Stubs marked `TODO(Phase n)` |
| Landing | Navbar, Hero, One Platform, Footer done. Other sections stubs |

`grep -r "TODO(Phase" src` lists everything left. Endpoints in `services/*.api.ts` are placeholders: match them to the backend.
