---
title: Prerendering with preact-iso
slug: prerendering-with-preact-iso
date: 2026-09-28
excerpt: A single-page app can still ship real HTML for every route. Here is how prerendering works with preact-iso and Vite, and where the sharp edges are.
tags: Preact, SSR, SEO
---

A client-rendered single-page app is a strange bargain. The server sends an almost
empty document, and the browser pays to build the page from scratch. Prerendering
closes that gap: you keep the SPA, but every route ships as finished HTML.

## How it works

With `preact-iso` and the Preact Vite preset, you export a `prerender` function from
your entry module. At build time Vite renders each route to a string and writes it out
as a real HTML file.

```tsx
export async function prerender(data: unknown) {
	const { html, links } = await ssr(<App />);
	return { html, links };
}
```

The crawler then walks any links it finds in the output and prerenders those too, so a
linked blog post is picked up automatically.

## List your routes

Discovered links are convenient but not sufficient. You want to be explicit about the
routes that matter, including ones that are not reachable from the home page.

```ts
prerender: {
	enabled: true,
	renderTarget: '#app',
	additionalPrerenderRoutes: ['/404', '/about', '/work', '/blogs'],
}
```

## The sharp edges

Prerendering runs in Node, so there is no DOM, no `window`, and no `localStorage`.
Anything that assumes those exist will throw during the build.

- Guard browser-only code with a `typeof window !== 'undefined'` check.
- Keep route-level data loading synchronous, or resolve it before you render.
- Remember that a fixed header needs `scroll-margin` so anchors do not hide under it.

The payoff is worth it. You get the developer experience of an SPA and the first paint
of a static site, which is a rare combination.
