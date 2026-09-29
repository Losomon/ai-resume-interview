# 03. UI/UX Design System

Live version: run the frontend and open `/design-system`. Tokens: CSS variables in `src/index.css`, exposed by `tailwind.config.ts`.

## Direction (revised)
A real product, not AI concept art. Reference: Linear's precision, Notion's usability, Stripe's information design, a modern recruiting platform. **Light by default; dark is an optional theme** (toggle in the topbar, saved as `cf_theme`, follows the OS on first visit).

**Avoid:** glowing orbs, neon purple, glassmorphism, floating cards, decorative gradients or blobs, huge hero metrics, generic AI illustrations, large corner radii, "AI-powered" clichés.
**Use:** strong typography, 1px borders, compact navigation, dense but breathable layouts, real tables and charts, small radii, hairline shadows, motion only where it communicates.

## Color tokens (values differ per theme; see `index.css`)
| Token | Role |
|---|---|
| bg, bg2 | Page, sidebar and inputs |
| card, elevated | Panels; table headers and insets |
| line | 1px borders |
| primary (+hover) | Actions and the small AI marker. One restrained indigo, not a brand wash |
| ok / warn / bad / info | Positive change / needs attention / problem / information |
| ink, soft, mute | Headings, body, captions |

Never hardcode hex in components; use tokens so both themes work.

## Typography (Inter)
Hero 60/600 (tablet 48, mobile 38), tracking -0.035em. Page title 28/600. Panel title 16–18/500–600. Body 14–16, line-height 1.6. Numbers use `tabular-nums`.

## Shape
Radius 10px on cards, 8px on buttons and inputs. 1px borders. Shadow: `0 1px 2px` at 4% only. Buttons 44px (48px mobile), large 52px. Content width 1280px, landing 1100–1200px.

## Components
`ui`: Button (pass `to` for links), Card (`flush` for tables), Badge, Progress (thin, token tones), Skeleton, Input, Avatar, EmptyState, SparkIcon, AIOrb (flat interviewer status marker), CareerProfile. Planned: Select, Modal, Tooltip, Toast, Table, Chart.

## Information design
Dashboards show real, specific content: a readiness figure with change and one sentence, resume and ATS panels with an action each, an activity table (date, event, result), and one concrete recommendation with its reason. No decorative metrics.

## Signature: Career Profile
One profile built from Resume → Skills → Experience → Jobs → Interviews → Applications. On the landing page it appears as a six-cell editorial grid; in the app, each feature states what it added to the profile.

## Landing hero
The product is the image: a resume beside its ATS analysis (score, *missing evidence*, *skill gap*) with realistic content. No stock photos, no illustration.

## Motion
Fade and 8px rise, 350–450 ms, once. Progress bars fill once. Status marker animates only while the interviewer is thinking or speaking. Reduced motion is honored globally.

## AI marker
`SparkIcon` is a small mark beside AI-originated content, never a hero graphic. Never type the ✦ character.

## Mobile
Bottom nav (Home, Resume, ATS, AI, More) is navigation only; primary actions are full-width, at least 48px; resume builder stacks editor over preview; AI suggestions open in a bottom sheet.

## Accessibility
Visible 2px focus ring, labeled inputs, ARIA on progress, tables with headers, contrast at least 4.5:1 in both themes, never color alone for meaning (missing evidence vs skill gap also differ by label).

## Copy voice
Sentence case, plain and specific: "Improve your Spring Boot experience section", with the reason beside it.
