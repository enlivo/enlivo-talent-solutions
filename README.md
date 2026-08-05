# Enlivo Talent Solutions — Marketing Site

Multi-page marketing website for **Enlivo Talent Solutions**, a product of
**Enlivo Global Tech Solutions Private Limited**.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a fully custom design-token
  theme (`tailwind.config.ts`) — no default Tailwind palette or font stack
- [Framer Motion](https://www.framer.com/motion/) for all component-level
  animation
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll,
  wired through `components/layout/LenisProvider.tsx`
- [Lucide React](https://lucide.dev/) for the handful of utility icons
- Fonts loaded via `next/font/google`: Bricolage Grotesque (display), IBM
  Plex Sans (body), IBM Plex Mono (labels/eyebrows/utility text)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To produce a production build:

```bash
npm run build
npm run start
```

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, trust strip, services, process teaser, why Enlivo, testimonial, CTA band |
| `/industries` | Full 8-tile industry grid |
| `/process` | Full 5-step breakdown with paragraphs and SLAs |
| `/careers` | Enlivo's own open internal roles, filterable by department |
| `/contact` | Lead-capture form |

## Project structure

```
app/                    # Route files: layout.tsx, page.tsx, industries/, process/, careers/, contact/
components/layout/      # Nav, Footer, Loader, LenisProvider, MobileMenu, GrainOverlay — the shared shell
components/motion/      # Reusable motion primitives (see below) — built once, imported everywhere
components/ui/          # Button, Card, Eyebrow, MatchGlyph, StatCell
components/sections/    # Page/section-specific components (Hero, Services, ApplyForm, ...)
lib/                    # usePrefersReducedMotion, useIsNarrowViewport, and content data (processSteps, industries, careers)
```

### Motion primitives (`components/motion/`)

- **`TextReveal`** — clip-mask word-by-word reveal. Defaults to gating itself
  on scroll visibility; the Hero passes an explicit `start` prop tied to the
  loader's `ready` state instead.
- **`StackedLines`** — same clip-mask mechanic, but per whole line rather
  than per word.
- **`InView` / `InViewGroup` / `InViewItem`** — spring-based scroll-triggered
  rise-in, with named spring constants per use (cards, stat cells,
  testimonial) in `motionConstants.ts`.
- **`Magnetic`** — cursor-tracking hover spring for primary buttons and the
  process-row arrow. Disabled under `prefers-reduced-motion` and below a
  768px viewport.
- **`ParallaxLayer`** — scroll-linked transform via `useScroll`/`useTransform`,
  scoped to its own container. Drives the hero visual's vertical drift; the
  Nav's scroll-linked background/text-color crossfade uses the same
  `useScroll`/`useTransform` technique directly.

All named durations, stagger intervals, and spring constants (`stiffness`/
`damping`) live in `components/motion/motionConstants.ts` — treat that file
as the single source of truth rather than tuning values inline.

### The loader

Plays once per browser session (gated via `sessionStorage`, in
`components/layout/Loader.tsx`), not on every client-side navigation. It
locks scroll via `lenis.stop()`, holds for `MIN_VISIBLE_MS`–`MAX_VISIBLE_MS`,
then flips a `ready` flag (consumed via `useLoaderReady()`) that gates the
Home hero's headline reveal, Match visual, and stat bar, and slides away.

## Content that MUST be replaced before launch

Everything below is real, usable draft copy — but the following items are
placeholders and are marked in code with `TODO` comments:

| Item | Location | Notes |
|---|---|---|
| Stat bar figures (`500+ Placements`, `18 Days Avg. Time-to-Fill`, `92% 12-Month Retention`) | `components/sections/Hero.tsx` | Replace with real, current performance numbers. |
| "Avg. Fit Score — 94%" caption in the hero Match visual | `components/sections/MatchVisual.tsx` | Replace with a real figure or remove if not measurable. |
| Client testimonial quote and attribution | `components/sections/Testimonial.tsx` | Entirely fictional placeholder copy — swap for a real, permissioned quote from an actual client before launch. Do not publish as-is. |
| Process page SLAs/figures (kickoff time, shortlist turnaround, etc.) | `lib/processSteps.ts` | Illustrative only — replace with honest, current figures. |
| Open roles on the Careers page (all 5 listings) | `lib/careers.ts` | Entirely placeholder internal job postings — replace with Enlivo's real, current openings. |
| Careers "Apply" backend | `components/sections/ApplyForm.tsx` (`handleSubmit`) | Stub only: validates client-side, logs the payload to the console, shows a success state. See the `TODO: wire to a real ATS` comment. |
| Contact form backend | `components/sections/ContactForm.tsx` (`handleSubmit`) | Same stub pattern. See the `TODO: POST to /api/leads` comment. |
| Contact page office address / phone | `app/contact/page.tsx` | Placeholder Bengaluru address and dummy phone number. |
| Footer contact email and phone number | `components/layout/Footer.tsx` | Currently `hello@enlivotalent.com` / a dummy phone number. |
| LinkedIn URL | `components/layout/Footer.tsx` | Currently points to the generic `linkedin.com` homepage — swap for the real company page. |
| Team/office photography | Not included | The design is intentionally type-, color-, and motion-led with no hero photography. If added later, use licensed stock only as a placeholder and swap for real photography before launch. |
| Industry logos in the "Trusted Across" strip | `components/sections/TrustStrip.tsx` | Currently text-only industry names (no logos), since no licensed client marks exist yet. |

## Design system

- Palette: `ink`, `ink-soft`, `paper`, `paper-dim`, `card`, `navy`,
  `navy-soft`, `brand`, `brand-light`, `on-navy`, `line`, `line-on-navy`,
  `ghost` — defined in `tailwind.config.ts`.
- Type: Bricolage Grotesque (display), IBM Plex Sans (body), IBM Plex Mono
  (mono/utility voice).
- Signature motif: the two-circle "Match" mark (`components/ui/MatchGlyph.tsx`)
  used as the logomark (nav, footer, loader), the hero's centerpiece visual
  (`components/sections/MatchVisual.tsx`), and a recurring divider glyph on
  the Why Enlivo and Process sections.
- `prefers-reduced-motion` is respected globally via Framer Motion's
  `<MotionConfig reducedMotion="user">` (in `app/layout.tsx`), plus explicit
  per-component handling (shortened/instant transitions, Lenis skipped
  entirely, magnetic hover disabled) throughout `components/motion/`.
