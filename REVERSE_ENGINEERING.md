# Reverse-Engineering Report — jsmfolio.netlify.app (macOS portfolio reference)

Target: `https://jsmfolio.netlify.app/` (the JSM macOS-portfolio demo, "Adrian's Portfolio")
Method: REA (`reverse-engineer-anything`) JavaScript application analyzer, run through its CLI
fallback. The REA MCP server was registered but not connected to the acting session, so the
MCP-only tools (`inspect_analysis_view`, `trace_application_feature`, browser observation)
were unavailable. `analyze_javascript_application` needs no MCP and was used instead.

## Evidence

| Item | Value |
| --- | --- |
| `evidence_id` | `ev_642cf33158d819ef7444dd067f1447cceeebb39047b36e836696d24d5263ad1b` |
| provider | `rea-javascript-application` v1 |
| operation | `analyze_javascript_application` |
| subject digest (dir) | `sha256 378ee7c748a0d49d874ecb7743cf583081cad8d11ecfa321abd67d6f20ca0ccb` |
| `index.js` | 899,987 bytes, `sha256 9c9eb1b13a99e075dd5f3745e315253ff06bcfd6e914b2d76408f8ffd4820857`, `parse_status: partial` |
| `index.html` | 468 bytes, `sha256 8074247faa8a9af1a2315cf788e36b2bae9e47f1fed45de7d0c64c2ac4d92e71` |
| `index-WCy5WX9Q.css` | 75,971 bytes |
| graph | `JavaScriptApplicationGraph`, `coverage.status: partial`, `truncated: false` |

Inputs were retrieved from the live site (`/assets/index-BV2SIJsF.js`, `/assets/index-WCy5WX9Q.css`)
and analyzed as an inert on-disk tree.

## Observed — AST-static-analysis, confidence exact

- **`localStorage` key `theme`** — read via `getItem`, written via `setItem` (×2), cleared via
  `removeItem`. Dark mode is **user-toggled and persisted**, not merely system-driven.
- `index.js` parses only **partially** (expected for a single-line minified bundle).

## Inferred — static-relationship-inference, NOT runtime-proven

- A **module Worker** is constructed: `new Worker(t, { type: "module" })`, alongside an unresolved
  `import(this.workerSrc)` — consistent with the **pdf.js worker** used by react-pdf.
- Node "endpoint" candidates (`Accept-Ranges`, `Content-Encoding`, `Content-Length`,
  `Content-Disposition`, `aria-label`, `color`, `hasAltText`, `hasDescription`, `fillCanvas`,
  `pdfjs-editor-…`) are flagged **candidate / confidence low** with an unproven receiver — they are
  `Headers.get`-style reads and pdf.js internals, **not** an application API surface.
- An `electron-renderer` entrypoint node is a **model artifact**: REA's app model treated
  `index.html` as an Electron renderer entry. It is **not** evidence that the site is Electron.

## Unknowns / gaps

- `index.html` references `/assets/index-BV2SIJsF.js`, which reported `resolution_status: not-found`
  (the asset was supplied as `index.js`). A coverage gap, not evidence of absence.
- REA never executed the bundle, so nothing here establishes runtime behaviour.
- No source maps were present.

## REA limitations (verbatim)

- "JavaScript and HTML were parsed as inert text; bundle bootstrap code was never executed."
- "Webpack/Rspack factories were recovered from AST literals; REA did not invoke push handlers or
  bundle bootstrap code."
- "Static imports, entrypoints, workers, endpoints, and storage relationships do not prove runtime
  execution."
- "Graph coverage is incomplete; unavailable facts remain explicit and must not be read as absence."
- "Cross-function mutation and dynamic property resolution remain unknown."

## Architecture — from static byte/CSS analysis (not REA)

- Vite-built **React SPA**, single page, `#root`, **no router**; one JS + one CSS chunk.
- **GSAP** + **Draggable** (window dragging) + **ScrollTrigger**; `gsap.registerPlugin`.
- **Radix** primitives with **shadcn/ui** tokens (oklch `--radius/--background/--muted-foreground/…`),
  **lucide** icons, tooltips throughout.
- **react-pdf** renders the résumé (its worker is the module Worker REA observed).
- **Tailwind v4**, CSS-first: `@layer theme`, `@property`, `@theme` tokens, custom
  `@utility` (`flex-center`, `col-center`, `abs-center`), `.dark` variants.
- Window manager: `WINDOW_CONFIG` `{isOpen, zIndex, data}` + `INITIAL_Z_INDEX`; window ids
  `finder/safari/photos/contact/terminal/resume/txtfile/imgfile` plus `#dock`, `#welcome`, `#home`.
- The deployed site is **newer than the bundled `src/` snippet**: it adds mobile variants
  (`#mobile-*`) and dark mode.
- Content equals the provided `constants/index.js` (verified: the `ABOUT_LOCATION` prose appears
  verbatim in the bundle), inlined — not fetched.

## Open decisions for the rebuild

1. Preact (current repo) vs React (reference) — GSAP works with both; `@gsap/react` is React-only.
2. Tailwind **v3 → v4** migration vs porting the reference CSS back to v3.
3. Feature scope: menubar, desktop icons, dock, the eight windows, mobile variants, dark mode,
   and which GSAP interactions.
4. Content: the reference is Adrian's data — the rebuild needs the owner's own content.
5. Reset boundary on the `migrate` branch.
6. Figma spec (`MacOS Portfolio`, node `0-1`) is not retrievable from this session; an export is
   required.
