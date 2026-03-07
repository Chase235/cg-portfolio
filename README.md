# Portfolio Starter

A single-page portfolio site built with Next.js, Tailwind CSS, and GSAP. Designed for designers, engineers, and creative directors who want a clean, opinionated starting point.

## Features

- **Light / Dark mode** with persistent toggle and no flash on load
- **Human / AI view** — switch between a designed layout and a terminal-style markdown view
- **Fluid typography** — all text scales smoothly across viewport widths and heights using CSS `clamp()` with `vw` and `vh` units
- **No-scroll desktop layout** — everything fits in the viewport at any screen size; mobile scrolls naturally
- **GSAP scatter ticker** — footer inspiration ticker with letters that scatter-animate into place as they enter the viewport
- **CSS titles ticker** — seamless looping ticker with gradient fade
- **Fully tokenized theming** — swap the entire palette by editing a handful of CSS custom properties in `globals.css`

## Structure

```
src/
├── app/
│   ├── globals.css        # Theme tokens, fluid type scale, ticker animation
│   ├── layout.tsx         # Root layout with theme-flash prevention
│   └── page.tsx           # Main page with theme/mode state
├── components/
│   ├── Header.tsx         # Headline, toggles, titles ticker
│   ├── HumanView.tsx      # Two-column designed layout
│   ├── AIView.tsx         # Terminal-style markdown code view
│   ├── Footer.tsx         # Copyright + inspiration ticker
│   ├── SegmentedToggle.tsx# Reusable pill-style toggle
│   ├── TitlesTicker.tsx   # CSS-only looping ticker
│   ├── InspirationTicker.tsx # GSAP scatter + scroll ticker
│   └── VideoPlaceholder.tsx  # Reel placeholder
├── data/
│   └── content.ts         # All site copy in one file
└── hooks/
    └── usePersistedState.ts # localStorage hook with SSR safety
```

## Making It Yours

1. Edit `src/data/content.ts` — all copy lives here (name, titles, about, clients, contact, inspirations, AI markdown)
2. Edit the CSS custom properties in `src/app/globals.css` — colors, type scale, and spacing are all tokenized
3. Swap the fonts in the Google Fonts import at the top of `globals.css`

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- [GSAP](https://gsap.com) for the scatter animation
- TypeScript
