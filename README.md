# IMPACT FRAME — Rajesh R Portfolio

A cinematic portfolio for Rajesh R with mint glow, interactive canvas particles, orbiting technology icons, and different animations for About, Experience, Projects, Stack, Education, Quotes, and Contact. It includes dark/light themes, reduced-motion support, and a persistent animation pause control.

The site also includes a keyboard- and swipe-accessible “Words that hit” gallery, a nine-category technology explorer, and locally served technology and company logos. See [design notes](./DESIGN_NOTES.md) for reference analysis and motion details, and [asset sources](./public/ASSET_SOURCES.md) for logo attribution.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with custom design tokens
- CSS animations and native browser APIs only
- `next/font` for Sora, JetBrains Mono, and Manrope

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

The featured projects appear in this order: Resume Studio, Rajify, Rajesh OS, Job Apply Pilot, StockScope, Browser Lab, and ZoroShop. The hero project count follows this list automatically. Project entries support optional live demos, source links, and installer downloads; Rajify includes direct Windows EXE and Android APK links.

Most structured portfolio content lives in [`lib/content.ts`](./lib/content.ts), and gallery content lives in [`lib/quotes.ts`](./lib/quotes.ts). The availability and experience strings are centralized in `siteConfig` so they can be updated without searching through components. The complete content inventory remains in [`PORTFOLIO_CONTENT.md`](./PORTFOLIO_CONTENT.md).

The contact form intentionally uses a prefilled `mailto:` link and needs no backend. Vercel deployment is configured in [`vercel.json`](./vercel.json).
