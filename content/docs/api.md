# API

The relay exposes a small HTTP and WebSocket surface.

## Authentication

Every request carries a session token in the `Authorization` header:

```http
Authorization: Bearer <token>
```

Tokens are issued by `POST /sessions` and expire after 12 hours.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/sessions` | Create a session and receive a token |
| `GET` | `/sessions/:id` | Session state, cameras and scene |
| `POST` | `/sessions/:id/scene` | Switch the active camera |
| `DELETE` | `/sessions/:id` | End the session |

### Switch the scene

```bash
curl -X POST https://relay.example.com/sessions/abc123/scene \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"camera":"phone-2"}'
```

A successful switch returns `204 No Content`; the new angle is live within a second.

## WebSocket events

Connect to `wss://relay.example.com/sessions/:id/live` to receive:

- `camera.joined` — a new camera paired
- `camera.left` — a camera disconnected
- `scene.changed` — the active camera moved
- `session.ended` — the host closed the session
