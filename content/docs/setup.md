# Getting started

## Requirements

- Node.js 22 or newer
- A modern browser with WebRTC support
- macOS, Linux or Windows

## Install

```bash
git clone https://github.com/mdaashir/SnapCast.git
cd SnapCast
npm install
```

## Run locally

```bash
npm run dev
```

The studio opens at <http://localhost:5173>. Scan the QR code with a phone on the same network
to pair it as a camera.

## Configuration

Settings live in `content/settings.json`:

```json
{
  "port": 5173,
  "relay": "wss://relay.example.com",
  "maxCameras": 4
}
```

> Change the relay only if you self-host it — the default is fine for local sessions.

## Troubleshooting

1. **Phone cannot pair** — check both devices are on the same network.
2. **Black preview** — grant camera permission in the browser's site settings.
3. **Audio drift** — restart the session; the relay re-syncs clocks on connect.
