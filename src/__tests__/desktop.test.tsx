import { render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';

import { Desktop } from '../components/Desktop';
import { WindowProvider } from '../lib/window-context';

function mount() {
	return render(
		<WindowProvider>
			<Desktop />
		</WindowProvider>
	);
}

describe('desktop shell', () => {
	it('renders the menu bar with the nav links', () => {
		mount();
		expect(screen.getByRole('navigation', { name: 'Menu bar' })).toBeTruthy();
		expect(screen.getAllByRole('button', { name: 'Projects' }).length).toBeGreaterThan(0);
		expect(screen.getAllByRole('button', { name: 'Resume' }).length).toBeGreaterThan(0);
	});

	it('renders the dock with every app, disabling the archive', () => {
		mount();
		const dock = screen.getByRole('region', { name: 'Dock' });
		expect(dock).toBeTruthy();
		const archive = screen.getByRole('button', { name: 'Archive' });
		expect(archive.hasAttribute('disabled')).toBe(true);
	});

	it('renders the hero letters one span per character', () => {
		const { container } = mount();
		const letters = container.querySelectorAll('.hero-letter');
		expect(letters.length).toBeGreaterThan(10);
		expect([...letters].map((node) => node.textContent).join('')).toContain('portfolio');
	});
});
