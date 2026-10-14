import {
	LocationProvider,
	Router,
	Route,
	hydrate,
	prerender as ssr,
	useLocation,
} from 'preact-iso';
import { useEffect } from 'preact/hooks';

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { Blogs } from './pages/Blogs';
import { BlogPost } from './pages/BlogPost';
import { NotFound } from './pages/_404';
import { getHead } from './lib/seo';
import './style.css';

function ScrollManager() {
	const { url } = useLocation();

	useEffect(() => {
		const hashIndex = url.indexOf('#');
		if (hashIndex !== -1) {
			const target = document.getElementById(url.slice(hashIndex + 1));
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
				return;
			}
		}
		window.scrollTo(0, 0);
	}, [url]);

	return null;
}

export function App() {
	return (
		<LocationProvider>
			<NavBar />
			<main id='main'>
				<Router>
					<Route path='/' component={Home} />
					<Route path='/work' component={Work} />
					<Route path='/about' component={About} />
					<Route path='/blogs' component={Blogs} />
					<Route path='/blogs/:slug' component={BlogPost} />
					<Route default component={NotFound} />
				</Router>
			</main>
			<Footer />
			<ScrollManager />
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
