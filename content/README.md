# Content

Everything the site displays comes from this folder. No component code needs to change to
customise the portfolio — edit these JSON files, run `npm run build`, and the site updates.

## Files

| File | What it controls |
| --- | --- |
| `site.json` | Site name, brand, domain, SEO title/description, theme colour, default light/dark theme, mobile badge |
| `profile.json` | Your name, the hero greeting and headline, avatar, and the **About me** folder in the Finder |
| `menu.json` | The **menu bar** (top): links and status icons — and the **dock** (bottom): which apps appear and in what order |
| `desktop.json` | Desktop context-menu items, and the file shown by **Get Info** |
| `icons.json` | Every system icon, by role — `apps.finder`, `files.pdf`, `menubar.wifi`, `sidebar.work`, `social.github`. Swap an icon by editing this one file |
| `phone.json` | The phone home screen: wallpaper, the 4-column icon grid, the four-icon dock, and the in-app tabs |
| `sections/*.json` | One file per app/window. Filename is the section name — `projects.json` drives the Finder, `gallery.json` drives Gallery, and so on |

Phone icons: `resume`, `mail`, `clock`, `messages`, `music` and `facetime` are iOS 18 assets from the
open [iOSIconPack](https://github.com/SysAdminDoc/iOSIconPack) project; `calendar` and `settings` are
hand-authored SVGs (`public/images/phone/*.svg`) because that pack's versions of those two are
mislabelled. Any icon can be swapped by changing its path here.

Icon artwork is downloaded into `public/` by `node tools/download-icons.mjs` — nothing is imported
at build time, so the site always serves local files. Brand marks (GitHub, X, Gmail) come from the
Simple Icons set; the figures above are the phone icons.

### `site.json` tokens

`{name}` is replaced with `site.name` wherever it appears, e.g. the title template
`"{name} — macOS Portfolio"`.

## Adding, removing and reordering apps

- **Remove an app:** delete its file from `sections/`, or set `"enabled": false`. It disappears from the
  dock, the menu bar, the desktop, the mobile layout, and can no longer be opened.
- **Keep the file but hide the app:** set `"enabled": false` — handy for stashing content you are not
  ready to publish.
- **Reorder the dock:** edit the `dock` array in `menu.json`. Names must match the filenames in
  `sections/`.
- **Change a menu-bar link:** edit `links` in `menu.json`. Each link points at a section.
- **Empty a section:** an empty list (`"projects": []`, `"photos": []`) disables that section too, so it
  never renders empty chrome.

Anything optional is skipped automatically: a project with no `figma` URL simply has no `Design.fig`
file, a project with no `image` has no screenshot, and a gallery album with no photos is not shown.

## Notes

- Image and icon paths point into `public/`, for example `/images/project-1.png` and
  `/icons/github.svg`. To change a picture, either drop a file into `public/images/` under the same
  name or point the JSON at a new path.
- Every referenced path is checked when the test suite runs, so a typo fails the build instead of
  silently showing a broken image.
