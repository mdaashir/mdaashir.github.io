import { fireEvent, render, screen } from '@testing-library/preact';
import { describe, expect, it } from 'vitest';

import { Desktop } from '../components/Desktop';
import { ContextMenuProvider } from '../lib/context-menu';
import { WindowProvider } from '../lib/window-context';

function mount() {
	return render(
		<ContextMenuProvider>
			<WindowProvider>
				<Desktop />
			</WindowProvider>
		</ContextMenuProvider>
	);
}

describe('desktop shell', () => {
	it('renders the menu bar with the nav links', () => {
		mount();
		expect(screen.getByRole('navigation', { name: 'Menu bar' })).toBeTruthy();
		expect(screen.getAllByRole('button', { name: 'Projects' }).length).toBeGreaterThan(0);
		expect(screen.getAllByRole('button', { name: 'Resume' }).length).toBeGreaterThan(0);
	});

	it('renders the dock with every app, archive included', () => {
		mount();
		expect(screen.getByRole('region', { name: 'Dock' })).toBeTruthy();
		const archive = screen.getByRole('button', { name: 'Archive' });
		expect(archive.hasAttribute('disabled')).toBe(false);
	});

	it('renders the hero letters one span per character', () => {
		const { container } = mount();
		const letters = container.querySelectorAll('.hero-letter');
		expect(letters.length).toBeGreaterThan(10);
		expect([...letters].map((node) => node.textContent).join('')).toContain('portfolio');
	});

	it('opens the desktop context menu on right-click', () => {
		const { container } = mount();
		const surface = container.querySelector('.desktop-surface');
		expect(surface).toBeTruthy();

		fireEvent.contextMenu(surface as Element);

		expect(screen.getByRole('menu')).toBeTruthy();
		expect(screen.getByRole('menuitem', { name: 'Open Projects' })).toBeTruthy();
	});

	it('opens the calendar when the clock is clicked', () => {
		mount();
		fireEvent.click(screen.getByRole('button', { name: /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/ }));
		expect(screen.getByRole('dialog', { name: 'Date and time' })).toBeTruthy();
	});
});
