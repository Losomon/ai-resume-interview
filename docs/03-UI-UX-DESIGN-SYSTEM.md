# 03. UI/UX Design System

Live version: run the frontend and open `/design-system`. Source of truth: `tailwind.config.ts`.

## Direction
Dark premium SaaS (Linear/Vercel influence), purple AI accent, data-forward. Product UI replaces stock photography.

## Color
| Token | Hex | Use |
|---|---|---|
| bg | `#070A12` | Page |
| bg2 | `#0B0F19` | Sidebar, inputs |
| card | `#101624` | Cards |
| elevated | `#151C2B` | Raised surfaces |
| line | `#202A3A` | Borders |
| primary | `#7C5CFC` (hover `#6D4FE8`, glow `#A78BFA`) | **AI intelligence**, brand |
| info | `#38BDF8` | Information |
| ok | `#22C55E` | Progress |
| warn | `#F59E0B` | Attention |
| bad | `#EF4444` | Problems |
| ink / soft / mute | `#F8FAFC` / `#CBD5E1` / `#64748B` | Headings / body / captions |

Purple is for AI only. Do not use it as generic decoration.

## Typography (Inter)
| Role | Size / weight |
|---|---|
| Hero | 64 / 700, line-height 1.05, tracking -0.04em (tablet 48, mobile 38) |
| Dashboard heading | 30 / 600 |
| Card heading | 16–18 / 600 |
| Body | 14–16, line-height 1.6 |

## Shape and spacing
Cards: 14px radius, 1px `line` border, hover border `#344054` + 2px lift, 180 ms. Buttons: 44px (48px on mobile), 8px radius; large CTA 52px, 10px radius. Content max width 1280px (landing 1200px); dashboard padding 32×40.

## Components (`components/ui`)
Button, Card, Badge, Progress, Skeleton, Input, Avatar, EmptyState, SparkIcon, AIOrb, CareerSignal. Planned: Select, Modal, Tooltip, Toast.

## Signature elements
- **SparkIcon:** the only AI mark. Variants: static, pulse, spin, glow. Never type the ✦ character.
- **AIOrb:** states `idle` (breathe), `thinking` (spinning ring, particles), `speaking` (expand/contract).
- **CareerSignal:** line drawing Resume → ATS → Interview → Readiness with a traveling pulse.

## Motion rules
- Page entrance: 300 ms, y 12 → 0, ease-out. Cards stagger 50–80 ms.
- Landing sections reveal at 20–30% visibility.
- **Do not:** bounce, spin cards, parallax every section, add a giant robot, or overuse glass effects.
- Reduced motion: `MotionConfig reducedMotion="user"` plus a CSS media query. Nothing essential may depend on animation.

## Loading and empty states
Skeleton shimmer instead of "Loading…". AI work shows the SparkIcon with "AI is analyzing" and animated dots. Empty states explain what to do next and offer one action.

## Mobile
- Sidebar becomes a 64px bottom nav (Home, Resume, ATS, AI, More). **Navigation only.**
- Primary actions are full-width and at least 48px, placed in content or a bottom sheet.
- Resume builder stacks Editor over Preview; AI opens as a bottom sheet from a floating button.

## Accessibility checklist
Visible focus ring (2px, purple 60%), label on every input, ARIA values on progress and rings, decorative icons `aria-hidden`, text contrast at least 4.5:1, never color alone for meaning.

## Copy voice
Sentence case, plain verbs, specific CTAs ("Save changes"), errors say what happened and how to fix it, no apologies.
