import { render, screen } from '@testing-library/preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { beforeEach, describe, expect, it } from 'vitest';

import { NavBar } from '../components/NavBar';
import { Work } from '../pages/Work';
import { NotFound } from '../pages/_404';

function renderApp(path: string) {
	window.history.pushState(null, '', path);
	return render(
		<LocationProvider>
			<NavBar />
			<main>
				<Router>
					<Route path='/work' component={Work} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

describe('routing', () => {
	beforeEach(() => {
		window.history.pushState(null, '', '/');
	});

	it('renders the work page for /work', () => {
		renderApp('/work');
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Work');
	});

	it('falls back to the 404 page for unknown routes', () => {
		renderApp('/does-not-exist');
		expect(screen.getByText('Page not found')).toBeTruthy();
	});

	it('renders the primary navigation with links', () => {
		renderApp('/');
		expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
		expect(screen.getAllByRole('link', { name: 'Work' }).length).toBeGreaterThan(0);
	});
});
