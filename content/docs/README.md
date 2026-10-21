# SnapCast

SnapCast turns a phone into a second camera for your streams: pair once, then switch angles
without leaving the broadcast.

This page is the **overview**. It is Markdown, stored at `content/docs/README.md` — edit it
directly in this repository and the deployed page updates on the next push.

## Why SnapCast

- **Zero-install guest camera** — a browser link is enough.
- **Sub-second switching** — the scene cuts before the conversation notices.
- **Local-first** — recordings stay on your machine unless you export them.

## How it fits together

| Piece | What it does |
| --- | --- |
| `studio` | Runs the scene compositor and the control surface |
| `relay` | Pairs phones over WebRTC and keeps the streams in sync |
| `cli` | Starts, stops and inspects a session from a terminal |

## Next steps

Start with **Getting started** in the sidebar, then read the **API** page if you are building
against the relay yourself.
