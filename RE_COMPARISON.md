# Reference comparison — jsmfolio vs our build

Side-by-side reverse engineering of the live reference (`https://jsmfolio.netlify.app/`) and our
build, used to align geometry, chrome and motion. Companion to `REVERSE_ENGINEERING.md`
(static analysis) and `RUNTIME_AND_FIGMA_FINDINGS.md` (runtime + Figma).

## Method

- **Driver:** `agent-browser` 0.39.1 — headless Chromium over CDP, two named sessions
  (`ref`, `ours`) so each site keeps its own page.
- **Viewport:** 1264×569. Both sites resolve to `document.documentElement.classList.contains('dark') === true`
  (the reference defaults to dark; ours follows `prefers-color-scheme`, with `localStorage.theme = null`).
- **Geometry:** a probe script (`.screenshots/probe.js`) run through `agent-browser eval -b <base64>`,
  reading `getBoundingClientRect()` + `getComputedStyle()` for the same selectors on both sites.
- **Visuals:** `agent-browser screenshot --full`, read back as images.
- **Interaction:** `agent-browser click "#dock .dock-icon"` to open the finder on both sides.

Reproduce with the preview server running (`npm run build && npm run preview`, port 4173).

## Measured geometry

| Element | Reference | Ours (after fixes) | Verdict |
| --- | --- | --- | --- |
| Menu bar | `[0, 0, 1264, 49]`, 14px | `[0, 0, 1264, 48]`, 14px | ✅ |
| Menu bar backdrop | `blur(64px)` | `blur(64px) saturate(1.8)` | ✅ |
| Clock | `[1115, 15, 129, 20]`, 14px | `[1115, 13, 129, 21]`, 14px | ✅ |
| Dock container | `[443, 475, 378, 74]`, r16, white/0.2, blur12 | `[442, 473, 380, 76]`, r16, white/0.22, blur12 | ✅ |
| Dock icons | `449/511/573/635/697/759`, 56×56 | identical | ✅ |
| Desktop shortcuts | `[20, 77]`, `[28, 163]`, `[28, 237]` | `[20, 76]`, `[28, 162]`, `[28, 236]` | ✅ (±1px) |
| Finder window | `x152 y77 728×390` | `x152 y73 730×390` | ✅ |
| Window header | 13px, `rgb(50,50,50)`, `blur(15px)` | identical | ✅ |
| Hero headline | `[399, 253, 467, 128]` italic | `[385, 243, 494, 128]` italic | ✅ close |
| Menu-bar link | `[206, 15, 49, 20]` | `[182, 11, 65, 26]` | ⚠️ see nits |

## What was wrong, and what changed

1. **Desktop shortcuts were scattered** across the wallpaper. Cause: the shortcut component used the
   finder's in-window `position` field instead of `windowPosition`, which is what the reference uses
   for desktop placement. Now a left-edge column using `top-[5vh]/[20vh]/[33vh]` with `left-5/7/7` —
   within 1px of the reference.
2. **Menu bar was undersized**: 36px tall at 13px with `blur(24px)`. Now 48px at 14px with
   `blur(64px)`, matching the reference's 49px / `blur(64px)`.
3. **Menu bar contents were wrong**: four items (incl. *Articles*) plus a *duplicate* appearance icon.
   Now three items — **Projects · Contact · Resume** — and exactly one appearance toggle, matching the
   reference's icon order (wifi, search, account, appearance, clock).
4. **Clock showed time only** (`11:01 PM`). Now `Thu Oct 15 11:11 PM` — same width as the reference's
   129px box, with no comma.
5. **Finder chrome differed**: a centred `Portfolio` title and an in-flow breadcrumb that overlapped the
   icon grid. Now the finder has **no title**, a toolbar icon on the right, and the "back" control is
   absolutely positioned above the grid (only shown inside a project folder).
6. **Sidebar headings** were uppercase micro-text; now title-case 13px like the reference.
7. **Desktop shortcut labels** were 12px regular, single line; now 13px semibold with a 10rem cap so
   long names wrap as they do in the reference.

## Intentionally not matched

- **Content** — projects, copy and images are still placeholders (see `src/data/`).
- **Drag from the title bar**, not the whole window: the reference makes the entire window draggable,
  which fights scrolling inside window bodies.
- **Three menu-bar items** rather than the Figma file's *Projects / Testimonials / Contact / Resume*:
  Testimonials has no window or content behind it, so it is omitted rather than dangled.
- **Mobile shell** — we ship `MobileShell`; the reference's `#mobile-home` references
  `/images/pages.png`, which is absent from the supplied asset set.

## Remaining nits

- Menu-bar link box is `[182, 11, 65, 26]` vs the reference's `[206, 15, 49, 20]` — our brand block is
  narrower ("Aashir's Portfolio" vs "Adrian's Portfolio") and our items are `<button>`s with padding
  rather than inline `<p>` text. Purely cosmetic; the row still ends at the same place.
- Desktop shortcut width is label-driven in the reference (160/130/122px because names wrap); ours are
  short single words at ~64px.
