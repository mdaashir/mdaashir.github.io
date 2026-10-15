import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const SITE_URL = 'https://mdaashir.github.io';

/** Emits the GitHub Pages extras: a root 404.html and sitemap.xml. */
function siteExtras() {
	return {
		name: 'portfolio-site-extras',
		apply: 'build' as const,
		writeBundle() {
			const dist = resolve(rootDir, 'dist');
			const notFoundSource = resolve(dist, '404', 'index.html');
			if (existsSync(notFoundSource)) {
				copyFileSync(notFoundSource, resolve(dist, '404.html'));
			}

			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<url>
\t\t<loc>${SITE_URL}/</loc>
\t</url>
</urlset>
`;
			writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
		},
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		siteExtras(),
	],
	build: {
		outDir: 'dist',
	},
	base: '/',
});
