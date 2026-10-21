# Docs template — project documentation in the portfolio theme

This branch is a **complete copy of the portfolio app**, stripped to a documentation site. Copy it
into a project repository's `docs` branch, edit the content, push — GitHub Actions builds it and
publishes it at `https://mdaashir.github.io/<repo>/` in the same macOS window theme as the portfolio.

## What you get

- The same desktop shell, menu bar, dock, window chrome, wallpapers and cursors as the portfolio.
- A documentation reader: sidebar of sections on the left, Markdown on the right.
- Light and dark themes, deep links (`#/setup`), prerendered HTML.
- A deploy workflow that needs no configuration.

## Publish a project

1. Create a `docs` branch in the project repository.
2. Copy this branch's files into it:

   ```bash
   git clone -b template https://github.com/mdaashir/mdaashir.github.io.git /tmp/docs-template
   rsync -a --exclude .git /tmp/docs-template/ <project-repo>/docs-branch/
   ```

3. Edit `content/` (see below), commit and push.
4. In the project repository: **Settings → Pages → Source: GitHub Actions**.
5. The workflow runs; the site appears at `https://mdaashir.github.io/<repo>/`.

## Editing content

Everything is in `content/` — no code changes needed.

| File | What it controls |
| --- | --- |
| `content/site.json` | Project name, browser title, description, default theme |
| `content/doc.json` | Window title, sidebar heading, repo link, and the **sections** list |
| `content/docs/*.md` | The documentation itself — one file per section |
| `content/menu.json` | Menu-bar status icons and the dock (empty by default) |
| `content/icons.json` | Icon roles (app, file, menu-bar, social) |

Add a page by dropping a Markdown file in `content/docs/` and adding a section to `doc.json`:

```json
{ "id": "deploy", "title": "Deploying", "file": "deploy.md", "icon": "sidebar.file" }
```

The `id` is what appears in the URL: `https://mdaashir.github.io/<repo>/#/deploy`.

## Code

This is the real application — Vite + Preact + Tailwind. Modify anything:

```bash
npm install --include=dev
npm run dev     # http://localhost:5173
npm test
npm run build
```

When the portfolio's theme changes, re-copy the branch (or cherry-pick the commit) to pick it up.

## Notes

- `vite.config.ts` takes its base path from `PAGES_BASE`; the workflow sets it to `/<repo>/`.
- The docs window opens immediately and is the only window the template renders.
- `content/sections/` is intentionally empty — there are no portfolio sections in a docs site.
