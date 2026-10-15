import { LocationProvider, Route, Router, hydrate, prerender as ssr } from 'preact-iso';

import { Desktop } from './components/Desktop';
import { WindowProvider } from './lib/window-context';
import { getHead } from './lib/seo';
import './style.css';

function NotFound() {
	return (
		<>
			<Desktop />
			<div class='abs-center col-center gap-2 rounded-xl bg-label/80 px-8 py-6 text-center text-white shadow-2xl backdrop-blur'>
				<h1 class='text-xl font-semibold'>Page not found</h1>
				<p class='text-sm opacity-80'>That route doesn&rsquo;t exist on this desktop.</p>
				<a class='mt-1 text-sm text-system-blue underline' href='/'>
					Back to the desktop
				</a>
			</div>
		</>
	);
}

export function App() {
	return (
		<LocationProvider>
			<WindowProvider>
				<main>
					<Router>
						<Route path='/' component={Desktop} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</WindowProvider>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app')!);
}

export async function prerender(data: { url?: string }) {
	const result = await ssr(<App />);
	return { ...result, head: getHead(data?.url ?? '/') };
}
