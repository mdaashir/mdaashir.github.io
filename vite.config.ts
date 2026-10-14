import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import {
	copyFileSync,
	existsSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const BLOG_DIR = resolve(rootDir, 'src/content/blog');
const SITE_URL = 'https://mdaashir.github.io';

function readPostSlugs(): string[] {
	try {
		return readdirSync(BLOG_DIR)
			.filter((file) => file.endsWith('.md'))
			.map((file) => {
				const raw = readFileSync(resolve(BLOG_DIR, file), 'utf-8');
				const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? '';
				const slugLine = frontmatter
					.split(/\r?\n/)
					.find((line) => line.trim().startsWith('slug:'));
				const slug = slugLine
					?.slice(slugLine.indexOf(':') + 1)
					.trim()
					.replace(/^["']|["']$/g, '');
				return slug || file.replace(/\.md$/, '');
			});
	} catch {
		return [];
	}
}

const staticRoutes = ['/404', '/about', '/work', '/blogs'];
const postRoutes = readPostSlugs().map((slug) => `/blogs/${slug}`);

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

			const urls = ['/', ...staticRoutes.filter((route) => route !== '/404'), ...postRoutes];
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `\t<url>\n\t\t<loc>${SITE_URL}${url}</loc>\n\t</url>`).join('\n')}
</urlset>
`;
			writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
		},
	};
}

export default defineConfig({
	build: {
		outDir: 'dist',
	},
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: [...staticRoutes, ...postRoutes],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		siteExtras(),
	],
	css: {
		postcss: './postcss.config.js',
	},
	base: '/',
});
