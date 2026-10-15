# Mohamed Aashir S — macOS Portfolio

An interactive portfolio that presents itself as a **macOS desktop**: a menu bar, desktop
shortcuts and a dock, where each dock app opens a **draggable window** over the wallpaper.

![Preact](https://img.shields.io/badge/Preact-10-purple.svg)
![Vite](https://img.shields.io/badge/Vite-7-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## How it works

- **Desktop shell** — menu bar (nav links, status icons, live clock, appearance toggle),
  desktop shortcuts and a dock with hover tooltips.
- **Eight draggable windows** — `finder` (projects), `safari` (articles), `photos` (gallery),
  `contact`, `terminal` (skills), `resume` (PDF), plus `txtfile` and `imgfile` viewers opened
  from the finder.
- **Window manager** — one shared open/close/z-index model (`WindowProvider`); clicking a
  window raises it, the red control animates it closed.
- **Appearance** — light/dark persisted in `localStorage` under `theme`, applied before first
  paint by an inline script so there is no flash.
- **Motion** — GSAP drives the hero's per-letter variable-font-weight loop, window open/close
  and window dragging (`Draggable`).
- **Mobile** — below 40rem the desktop is replaced by a `MobileShell` with app tiles that open
  full-screen panels.
- **SEO** — `/` and `/404` are prerendered to static HTML, with per-route title, description,
  Open Graph and canonical tags plus a generated `sitemap.xml` and `404.html`.

## Tech stack

- **Preact 10** + **preact-iso** — small runtime, isomorphic router, prerendering
- **Vite 7** + **TypeScript 5**
- **Tailwind CSS 4** — CSS-first `@theme` / `@utility`, no JS config
- **GSAP** (+ `Draggable`) — loaded lazily, after first paint
- **pdfjs-dist** — renders the résumé, loaded only when that window opens
- **Vitest** + **@testing-library/preact** — tests

## Requirements

- **Node.js 20.19+ or 22.12+** (Vite 7)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
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

## Personalising the content

**All copy is placeholder.** Everything that renders as content lives in `src/data/`:

| File             | Contents                                     |
| ---------------- | -------------------------------------------- |
| `nav.ts`         | Menu-bar links and status icons              |
| `dock.ts`        | Dock apps and their labels                   |
| `locations.ts`   | The finder filesystem (projects, about, CV)  |
| `blog.ts`        | Article cards for the safari window          |
| `techstack.ts`   | Terminal skill groups                        |
| `socials.ts`     | Contact tiles                                |
| `gallery.ts`     | Photos sidebar + gallery                     |
| `windows.ts`     | Window ids and the initial z-index           |

Swap those files for real content and nothing else needs to change. Images live in
`public/images/`, `public/icons/` and the CV at `public/files/resume.pdf`.

## Project structure

```
src/
├── components/     # Desktop shell: Menubar, Welcome, DesktopIcons, Dock, Window*, MobileShell
├── data/           # All content (see above)
├── lib/            # window-context, theme, gsap loader, pdf renderer, seo
├── windows/        # Finder, Safari, Photos, Contact, Terminal, Resume, TxtFile, ImgFile
├── __tests__/      # Vitest suites + setup
├── index.tsx       # App entry, routes, prerender export
└── style.css       # Tailwind v4 theme, utilities and the macOS component layer
```

## Performance

The heavy dependencies are deliberately deferred — nothing below is in the initial payload:

| Chunk                   | Size (gzip) | When it loads              |
| ----------------------- | ----------- | -------------------------- |
| Initial JS + CSS        | ~22 kB      | Immediately                |
| GSAP core (+ Draggable) | ~41 kB      | After first paint          |
| pdf.js + worker         | ~131 kB     | Only when the CV window opens |

## Deployment

### GitHub Pages (automatically)

Pushing to `main` or `Migrate` runs the tests, builds, and deploys `dist/` via GitHub Actions.
Enable Pages with the **GitHub Actions** source in the repository settings.

### Manual

```bash
npm run deploy   # build + gh-pages -d dist
```

### Docker

```bash
docker compose up dev     # dev server on :5173
docker compose up prod    # production on :80
```

## Research notes

The interaction model was reverse-engineered from a live reference site and the supplied
design references. The evidence is recorded in [`REVERSE_ENGINEERING.md`](./REVERSE_ENGINEERING.md)
(static analysis) and [`RUNTIME_AND_FIGMA_FINDINGS.md`](./RUNTIME_AND_FIGMA_FINDINGS.md)
(runtime observation + the Figma design inventory).

## License

MIT — see [LICENSE](LICENSE).

---

**Mohamed Aashir S** · [mdaashir.github.io](https://mdaashir.github.io) · s.mohamedaashir@gmail.com
