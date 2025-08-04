import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig( {
	build: {
		outDir: 'docs',
		write: false
	},
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
	],
});
