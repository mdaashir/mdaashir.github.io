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

**All copy is placeholder.** Everything the site renders comes from `content/`, so the portfolio is
fully customisable without touching component code. See [`content/README.md`](./content/README.md)
for the full guide.

| File                  | Contents                                                      |
| --------------------- | ------------------------------------------------------------- |
| `site.json`           | Name, brand, domain, SEO title/description, theme default      |
| `profile.json`        | Name, hero greeting/headline, avatar, the About me folder      |
| `menu.json`           | Menu-bar links and status icons, plus dock order               |
| `desktop.json`        | Desktop context menus and the Get Info file                    |
| `phone.json`          | Phone home screen: wallpaper, icon grid, dock, tabs            |
| `sections/*.json`     | One file per app: projects, articles, gallery, contact, skills, resume, archive |

Delete a file from `content/sections/` (or set `"enabled": false`) and that app disappears from the
dock, the menu bar, the desktop, the mobile layout, and can no longer be opened. Sections with no
content are skipped automatically, so nothing ever renders empty chrome. Every referenced
`/images/…`, `/icons/…` and `/files/…` path is checked by the test suite.

## Project structure

```
content/            # Everything the site renders — edit this, not the code
├── site.json       # Name, brand, domain, SEO, theme default
├── profile.json    # Hero, avatar, About me
├── menu.json       # Menu bar + dock order
├── desktop.json    # Desktop menus and Get Info
└── sections/       # One file per app; delete one and that app disappears

src/
├── components/     # Desktop shell: Menubar, Welcome, DesktopIcons, Dock, Window*, PhoneShell
├── content/        # Typed loader for content/: types, skip rules, finder derivation
├── lib/            # window store, theme, gsap loader, pdf renderer, seo, menus
├── windows/        # Finder, Safari, Photos, Contact, Terminal, Resume, TxtFile, ImgFile
├── __tests__/      # Vitest suites + setup
├── index.tsx       # App entry, routes, prerender export
└── style.css       # Tailwind v4 theme, utilities and the macOS component layer
```

## Devices and breakpoints

Two layouts, switching at **640px** — the same breakpoint the reference site uses:

| Class | Width | Layout |
| --- | --- | --- |
| Phone | `< 640px` | iOS home screen: status bar, wallpaper with the hero, app-icon grid, translucent bottom bar with a home indicator. Tapping an icon opens it full-screen. |
| Tablet | `640–1919px` | The macOS desktop (touch-aware: long-press opens menus). |
| Desktop / TV | `≥ 1920px` | The macOS desktop, scaled up. |

- **Large-screen scaling is one lever.** `html { font-size: clamp(16px, 0.833vw, 24px) }`. Every shell
  dimension is in `rem`, so the menu bar, windows, dock, hero and icons all grow together: 16px at
  1920, ~21px at 2560, capped at 24px. Below 1920 nothing changes. Don't add px-based shell sizes —
  they will not scale.
- **Landscape phones take the phone layout** via
  `@media (width < 40rem), (height < 30rem) and (pointer: coarse)`. A width-only test would hand an
  844×390 phone the desktop, which neither reference handles well.
- **Windows always clear the dock.** `--window-body-max` (defined in `style.css`) caps every window
  body against the viewport, and dragged windows are clamped, so nothing is ever stranded under the
  dock or off-screen on a short viewport.
- **Touch**: long-press opens the same menus as right-click (see `src/lib/long-press.ts`), and
  hover-only effects (dock magnification, tooltips) are disabled via `@media (hover: none)`.

## Checking it in Polypane

[Polypane](https://polypane.app/) shows the page in several synchronised panes at once, which is the
quickest way to see a responsive bug. It can be driven from a script over its remote-debugging port:

```bash
# 1. Open Polypane with remote debugging and the page on screen
"C:\Program Files\Polypane\Polypane.exe" --remote-debugging-port=5858 https://mdaashir.github.io/

# 2. Read every pane, then run an axe-core pass in a phone and a desktop pane
node tools/polypane-check.mjs
```

`tools/polypane-check.mjs` reports, per pane: viewport, which device mode CSS picked, horizontal
overflow, root font-size, and whether any window sits under the dock. Do not reload panes from a
script — it tears down Polypane's webview; the script opens windows idempotently instead.

Note that axe flags text over the wallpaper (the hero and menu bar) as *needs manual review*, since
it cannot compute contrast against an image. Those need Polypane's own contrast checker or an eye.

## Performance

The heavy dependencies are deliberately deferred — nothing below is in the initial payload:

| Chunk                   | Size (gzip) | When it loads                 |
| ----------------------- | ----------- | ----------------------------- |
| Initial JS + CSS        | ~27 kB      | Immediately                   |
| GSAP core (+ Draggable) | ~40 kB      | After first paint             |
| pdf.js + worker         | ~128 kB     | Only when the CV window opens |

## Deployment

### GitHub Pages (automatically)

Pushing to `main` or `migrate` runs the tests, builds, and deploys `dist/` via GitHub Actions.
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
