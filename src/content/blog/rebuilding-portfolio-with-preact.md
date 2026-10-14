---
title: Rebuilding my portfolio with Preact and Vite
slug: rebuilding-portfolio-with-preact
date: 2026-08-12
excerpt: Moving from React and Create React App to Preact and Vite cut the bundle by roughly 75% and made builds almost instant. Here is what that migration actually involved.
tags: Preact, Vite, Performance
---

I had been running my portfolio on React with Create React App for a while, and the
weight of it had started to bother me. A personal site that mostly renders text and a
few cards was shipping almost 80 kB of gzipped JavaScript. So I rewrote it.

## Why bother

The site is simple. There is no authentication, no real-time data, and no complex
state. That is exactly the kind of project where a lighter runtime pays off the most,
because almost all of the framework code is overhead you never use.

- Preact is about 3 kB instead of 40 kB for React
- Vite builds in a couple of seconds instead of fifteen
- TypeScript gives the whole thing real types

## The migration itself

Most components moved over with small changes. Preact's API is close enough to React
that the interesting work was in the tooling, not the components.

```tsx
import { LocationProvider, Router, Route } from 'preact-iso';

export function App() {
	return (
		<LocationProvider>
			<Router>
				<Route path='/' component={Home} />
				<Route path='/about' component={About} />
				<Route default component={NotFound} />
			</Router>
		</LocationProvider>
	);
}
```

> The router intercepts normal anchor clicks, so plain `<a href>` links do the right
> thing without any extra wiring.

## What I would watch out for

A few things bit me along the way, and they are worth knowing before you start:

1. Any dependency that imports from `react` needs the compat alias configured.
2. Client-side routing only works if you navigate through anchors or the router — not
   by setting `window.location`.
3. Prerendering runs your components in Node, so anything that touches `window` has to
   be guarded.

None of that is hard, but all of it is easy to forget until something breaks in
production.
