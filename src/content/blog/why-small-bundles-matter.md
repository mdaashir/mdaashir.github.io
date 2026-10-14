---
title: Why small bundles still matter
slug: why-small-bundles-matter
date: 2026-09-03
excerpt: Framework choices are a budget, not a preference. A look at where the bytes actually go and why the smallest sensible runtime usually wins.
tags: Performance, Web
---

There is a temptation to treat bundle size as a vanity metric — something you optimise
once and then stop thinking about. I think that is backwards. Bundle size is the most
honest measure of how much your users pay before they see anything at all.

## The cost is paid up front

Every kilobyte of JavaScript has to be downloaded, parsed, and executed before your
first render is interactive. On a fast laptop that is noise. On a mid-range phone on a
slow connection it is the difference between a page that feels instant and one that
feels broken.

The rough rule of thumb:

| Connection | 100 kB gzipped | 400 kB gzipped |
| ---------- | -------------- | -------------- |
| Fast 4G    | under a second | a few seconds  |
| Slow 3G    | a few seconds  | ten seconds+   |

## Prefer the boring answer

When someone asks me which framework to use, my honest answer is usually "the smallest
one that does the job." If you are building a content site, you probably do not need a
full component runtime at all. If you are building an app, you probably want the one
with the smallest reconciler.

That is not a dig at any particular tool. It is just recognising that every dependency
is a permanent tax on every visitor, forever, and you rarely get to remove it later.

## Measure it

You cannot improve what you do not measure. Before you optimise anything, build the
site and look at what actually shipped.

```bash
npm run build
npx vite-bundle-visualizer
```

More often than not the biggest item is something you added months ago and forgot
about — a date library, an icon set, a utility that you use in exactly one place.
