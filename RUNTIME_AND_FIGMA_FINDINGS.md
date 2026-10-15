# Runtime Observation + Figma Findings — macOS portfolio

Companion to `REVERSE_ENGINEERING.md` (which covers the static/CLI analysis).
This file records what only became available once the REA and Figma MCP servers connected.

## REA runtime observation (browser provider)

Provider: `rea-playwright-browser-scenario` v1 (`capture_browser_scenario`).

| Attempt | `evidence_id` | Captured |
| --- | --- | --- |
| navigate only | `ev_3eadc16efd883ad7e2aed3840c65cf2b11fab769dfabae2715c4c88df7f01fd5` | URL |
| navigate + settle, DOM | `ev_8e733f98d954bbf3b3dac0104a57a4dae84338b1ea1de431d8a0b4af388b663f` | DOM 67,572 bytes, `sha256 aa157362db36c93b90dae9c0d9b3d2c4c9efde9b27b688d3c28dbca8f0946d7d` |

Environment: Chromium `155.0.8059.41`, provider-owned launch, 1280x720, `en-US`, UTC,
`color_scheme: light`, `reduced_motion: reduce`, service workers blocked, viewport scale 1.
Confidence `observed`, authority `controlled-replay`. Note the environment delivers
**reduced motion**, so GSAP visual states are not exercised by this capture.

### Observed at runtime

- **App shell:** `#root > main` → `nav`, `#mobile-navbar`, `#welcome`, `#dock`, then the
  window sections `#terminal #safari #resume #finder #imgfile #txtfile #contact`, `#home`,
  `#mobile-home`, `#photos`.
- **Menubar** carries the logo, "Adrian's Portfolio", `Projects / Contact / Resume`, right-side
  wifi/search/user icons, a theme button exposed as a **Radix dropdown-menu trigger**
  (`data-slot="dropdown-menu-trigger"`, `data-state`, generated `id="radix-_r_0_"`), and a live
  `<time>` clock.
- **Every window section is `display: none` with `z-index: 1000`** and carries inline GSAP
  residue: `translate: none; rotate: none; scale: none; touch-action: none; cursor: grab;
  user-select: none;`. `cursor: grab` on the section and `touch-action: none` on every child is
  direct evidence that **GSAP Draggable** is attached to each window. `#photos` also shows
  `transform: translate3d(0px, -50%, 0px)`.
- **`#welcome`** renders "Hey, I'm Adrian! welcome to my" and an `<h1>` "portfolio." where
  **every character is its own `<span>`** with `font-variation-settings: "wght"` set per span
  (100 for the sub-line, 400 for the heading) — the per-letter animation animates the *variable
  font weight*, not opacity.
- **Dock** structure: **one `<ul>` per app**, each holding a single `dock-icon` button, with
  `aria-label`, `data-tooltip-id="dock-tooltip"`, `data-tooltip-content`, `data-tooltip-delay-show="150"`.
  Labels: `Portfolio` (finder), `Articles` (safari), `Gallery` (photos), `Contact` (contact),
  `Skills` (terminal), `Archive` (trash — rendered `disabled` with `opacity-60`).
- **`react-tooltip` confirmed**: the document head contains injected
  `<style id="react-tooltip-core-styles">` and `<style id="react-tooltip-base-styles">`.
- **`react-pdf` confirmed**: `#resume` contains `.react-pdf__Document`, a
  `.react-pdf__Page` with `<canvas width="612" height="792">`, a `textLayer`, an
  `annotationLayer` with two link annotations (`linkedin.com/school/jsm-masterclass-experience/`,
  `github.com/adrianhajdin`), plus pdf.js's `<canvas class="hiddenCanvasElement">` (the worker
  target REA saw statically).
- **`lucide` icons confirmed** by `class="lucide lucide-*"` on inline SVGs (wifi, battery,
  chevron-left/right, panel-left, shield-half, search, share, plus, copy, download, mail, check,
  move-right, flag).
- **Content, live:** tech-stack groups (Frontend/Mobile/Styling/Backend/Database/Dev Tools) with
  the `@adrian %` prompt, "5 of 5 stacks loaded successfully (100%)", "Render time: 6ms";
  "My Developer Blog" with the three jsmastery posts; the Finder sidebar
  (Favorites: Work/About me/Resume/Trash; Work: Nike Ecommerce Website Application, AI Resume
  Analyzer, Food Delivery App) with per-item `position` classes (`top-10 left-5`,
  `top-52 right-80`, `top-10 left-80`); contact socials with their literal colours
  (`#f4656b`, `#4bcb63`, `#ff866b`, `#05b6f6`); desktop `#home` icons at
  `top-[5vh] left-5`, `top-[20vh] left-7`, `top-[33vh] left-7`.
- **The bundled résumé is a template**, not a real CV: "I'm Mark, a front-end developer…",
  "City, Country", "email@gmail.com", "linkedin.com/in/your_link", "github.com/your_profile",
  employers "TripGuide" and "CarRent", education "B.Sc. Computer Science, NYU, New York".

### Discrepancy found

`#mobile-home` references `/images/pages.png`, which is **not** in the supplied
`macos-portfolio/public/` set (that folder has `photos.png`). Either the asset was renamed or the
mobile build expects a file we do not have.

## Figma — "MacOS Portfolio"

`get_figma_data` on file `QNUvSyhE4qOsLBWJuIephM`, node `0-1`. Output exceeded the 25k-token tool
limit and was truncated; the complete response is saved at
`…\toolout\2026-10-15T15-55-36-542Z-mcp__figma__get_figma_data-6vysln.log`.
Re-fetch with a narrower `nodeId` (or `depth`) to page through it.

**This is a separate, newer design from the live `jsmfolio` site** — an iOS/macOS-native
language (SF Pro, Apple system colours, real material blur) rather than the Georama/Tailwind look
on the deployed demo. Frames: an **iPhone 402x874** and a **desktop 1440x900**.

- **Type:** `SF Pro` / `SF Pro Display` / `SF Pro Text` throughout; `Playwrite US Trad` for the
  hero word "portfolio".
- **Colour:** Apple system palette — `#007AFF`, `#FF3B30`, `#FFCC00`, `#34C759`, `#8E8E93`,
  `rgba(60,60,67,0.6)`; dark variants (`#FF453A`, `#FFD60A`, `#30D158`, `rgba(255,255,255,0.55)`).
- **Materials:** `backdropFilter: blur(25px / 40px / 50px / 48px / 75px)` with layered
  `boxShadow`/`inset` treatments ("Materials - Controls/Sidebar", "Title Bar").
- **Menubar/menu:** app name "Adrian's Portfolio"; menu items **Projects, Testimonials, Contact,
  Resume** (the live site has no Testimonials).
- **Hero copy:** "Hey, welcome to my" + "portfolio" (Playwrite US Trad, 100 px).
- **Projects are named** SnapCast, Converso, PrepWise (Project 1/2/3) — the live site uses Nike /
  AI Resume Analyzer / Food Delivery.
- **Blog titles differ:** "How I Built My macOS-Style Dev Portfolio with React + Tailwind",
  "How I Organize My Projects for Sanity and Speed", "Small UX Details That Make a Big Difference
  (and How I Implemented Them)".
- **Contact shortcuts** are five macOS-styled buttons: Schedule a call, Email me, Twitter/X,
  LinkedIn, plus a fourth gradient tile — built from gradient tokens
  (`Light/Shortcuts/Red|Green|Peach|Light Blue Gradient`).
- **Résumé window** is a macOS Preview-style chrome with page counter `1 / 2`, zoom `100%`, and a
  toolbar glyph set.

## Limitations (carried forward)

- Static: "JavaScript and HTML were parsed as inert text; bundle bootstrap code was never
  executed" — nothing proves runtime execution.
- Runtime: the reported environment applies `reduced_motion: reduce`, so animated states were
  never observed; the capture is one viewport, one theme, one page state. Only the URL step
  requested artifacts on the first attempt, hence the second run.
- Figma: the response was truncated mid-tree; treat the component inventory above as partial.
