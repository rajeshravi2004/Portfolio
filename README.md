# IMPACT FRAME — Rajesh R Portfolio

A cinematic portfolio for Rajesh R with a stable, readable interface layered over an animated fight background. Section changes trigger abstract fighter clashes, slash trails, speed lines, shockwaves, and debris behind the content without moving or flashing the UI itself.

The site also includes a 120-entry, keyboard- and swipe-accessible “Words that hit” gallery using original paraphrases and typographic emblems instead of copyrighted artwork.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with custom design tokens
- CSS animations and native browser APIs only
- `next/font` for Bebas Neue, JetBrains Mono, and Manrope

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev    # development server
npm run lint   # ESLint
npm run build  # optimized production build
npm run start  # run the production build
```

## Content updates

Most structured portfolio content lives in [`lib/content.ts`](./lib/content.ts), and gallery content lives in [`lib/quotes.ts`](./lib/quotes.ts). The availability and experience strings are centralized in `siteConfig` so they can be updated without searching through components. The complete content inventory remains in [`PORTFOLIO_CONTENT.md`](./PORTFOLIO_CONTENT.md).

The contact form intentionally uses a prefilled `mailto:` link and needs no backend. Vercel deployment is configured in [`vercel.json`](./vercel.json).
