# Mohamed Aashir S - Portfolio

A fast, accessible portfolio built with **Preact**, **Vite**, **TypeScript**, and **Tailwind CSS**. Every route is prerendered to static HTML for SEO, and the blog is authored in Markdown.

![Preact](https://img.shields.io/badge/Preact-10-purple.svg)
![Vite](https://img.shields.io/badge/Vite-7-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## Features

- **Prerendered SPA** — real HTML for every route (`/`, `/about`, `/work`, `/blogs`, each post, `404`) with client-side routing on top via `preact-iso`.
- **Markdown blog** — posts live in `src/content/blog/*.md` and are compiled at build time into individual prerendered pages.
- **Working contact form** — validated client-side and delivered through a hosted form endpoint (Web3Forms by default); no backend to run.
- **Accessible navigation** — keyboard-friendly mobile menu, focus states, skip-friendly anchors, and reduced-motion support.
- **Professional dark theme** — a single `#00df9a` accent with a defined surface/border/text token system.
- **Generated SEO extras** — per-route `<title>`/`description`/Open Graph/canonical tags, `sitemap.xml`, and a `404.html` for GitHub Pages.

## Tech stack

- **Preact** + **preact-iso** — 3 kB runtime with an isomorphic router and prerendering
- **Vite 7** — build tooling and dev server
- **TypeScript** — type safety across the app
- **Tailwind CSS** — utility-first styling
- **marked** — Markdown rendering for the blog
- **Vitest** + **@testing-library/preact** — tests

## Requirements

- **Node.js 20.19+ or 22.12+** (required by Vite 7)
- npm

## Getting started

```bash
npm install
cp .env.example .env   # then add your contact form key (see below)
npm run dev            # http://localhost:5173
```

### Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start the Vite dev server          |
| `npm run build`      | Production build with prerendering |
| `npm run preview`    | Preview the production build       |
| `npm run test`       | Run the test suite once            |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run typecheck`  | Run `tsc --noEmit`                 |
| `npm run deploy`     | Build and publish to GitHub Pages  |

## Contact form

The form posts to a hosted endpoint, so there is no server to maintain. It defaults to
[Web3Forms](https://web3forms.com):

1. Create a free access key at https://web3forms.com
2. Copy `.env.example` to `.env` and set the values:

   ```env
   VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit
   VITE_CONTACT_ACCESS_KEY=your-access-key-here
   ```

If the key is missing, the form still validates but shows a message pointing visitors to
email instead of pretending to succeed. To use another provider, change
`VITE_CONTACT_ENDPOINT` to their submit URL and adapt `src/lib/contact.ts`.

For the GitHub Pages build, set `VITE_CONTACT_ENDPOINT` and `VITE_CONTACT_ACCESS_KEY` as
repository **Variables** (Settings → Secrets and variables → Actions → Variables).

## Blog

Add a post by creating a Markdown file in `src/content/blog/`:

```markdown
---
title: My post title
slug: my-post-title
date: 2026-10-01
excerpt: A short summary shown in the listing.
tags: Preact, Performance
---

Body content in Markdown.
```

The slug defaults to the filename if omitted. Posts are picked up automatically, sorted by
date, and prerendered to `/blogs/<slug>` — the Vite config reads the same files to add them
to `additionalPrerenderRoutes` and the sitemap.

## Project structure

```
portfolio/
├── public/                    # Static assets (icons, manifest, robots.txt)
├── src/
│   ├── components/            # NavBar, Hero, Footer, ProjectCard, FeaturedWork
│   ├── content/blog/          # Markdown blog posts
│   ├── data/projects.ts       # Typed project list for /work
│   ├── lib/                   # blog loader, contact submit, SEO head helpers
│   ├── pages/                 # Home, About, Work, Blogs, BlogPost, _404
│   ├── __tests__/             # Vitest tests + setup
│   ├── index.tsx              # App shell, routes, prerender entry
│   └── style.css              # Tailwind layers + design tokens
├── vite.config.ts             # Prerender routes, sitemap + 404.html generation
├── vitest.config.ts           # Test configuration
├── tailwind.config.js         # Design tokens
├── Dockerfile / Dockerfile.dev
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

## Routes

| Route          | Page                                |
| -------------- | ----------------------------------- |
| `/`            | Home — hero, featured work, contact |
| `/work`        | Full project list                   |
| `/about`       | About and skills                    |
| `/blogs`       | Blog listing                        |
| `/blogs/:slug` | Individual post                     |
| `*`            | 404                                 |

## Deployment

### GitHub Pages (automatic)

Pushing to `main` or `Migrate` runs tests, builds, and deploys `dist/` via GitHub Actions.
Enable Pages with the "GitHub Actions" source in repository settings.

### Manual

```bash
npm run deploy   # build + gh-pages -d dist
```

### Docker

```bash
docker compose up dev     # dev server on :5173
docker compose up prod    # production on :80
```

## License

MIT — see [LICENSE](LICENSE).

---

**Mohamed Aashir S** · [mdaashir.github.io](https://mdaashir.github.io) · s.mohamedaashir@gmail.com
