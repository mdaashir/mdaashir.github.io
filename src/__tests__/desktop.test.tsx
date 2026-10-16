import { LocationProvider } from 'preact-iso';
import { fireEvent, render, screen, within } from '@testing-library/preact';
import { act } from 'preact/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { Desktop } from '../components/Desktop';
import { sections } from '../content';
import { ContextMenuProvider } from '../lib/context-menu';
import { WindowProvider } from '../lib/window-context';

/** Dispatches a touch event with a `touches` list, which jsdom does not provide. */
function touch(type: string, x: number, y: number): Event {
	const event = new Event(type, { bubbles: true });
	Object.defineProperty(event, 'touches', { value: [{ clientX: x, clientY: y }] });
	return event;
}

function mount() {
	return render(
		<LocationProvider>
			<ContextMenuProvider>
				<WindowProvider>
					<Desktop />
				</WindowProvider>
			</ContextMenuProvider>
		</LocationProvider>
	);
}

/** Counts the windows that are not `display: none`. */
function visibleWindows(container: Element): number {
	return [...container.querySelectorAll<HTMLElement>('.window')].filter(
		(node) => node.style.display !== 'none'
	).length;
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

	it('clears the desktop from the Apple logo and the brand name', () => {
		const { container } = mount();
		// Scoped to the menu bar: the finder sidebar has a "Resume" item too.
		const menu = within(screen.getByRole('navigation', { name: 'Menu bar' }));

		fireEvent.click(menu.getByRole('button', { name: 'Projects' }));
		fireEvent.click(menu.getByRole('button', { name: 'Resume' }));
		expect(visibleWindows(container)).toBe(2);

		fireEvent.click(menu.getByRole('button', { name: 'Close all windows' }));
		expect(visibleWindows(container)).toBe(0);

		fireEvent.click(menu.getByRole('button', { name: 'Projects' }));
		expect(visibleWindows(container)).toBe(1);

		fireEvent.click(menu.getByRole('button', { name: /Aashir/ }));
		expect(visibleWindows(container)).toBe(0);
	});

	it('renders both device modes, so CSS can switch between them', () => {
		const { container } = mount();
		expect(container.querySelector('.desktop-shell')).toBeTruthy();
		expect(container.querySelector('.phone-shell')).toBeTruthy();
	});

	it('mirrors the enabled sections as phone tiles, skipping the archive', () => {
		const { container } = mount();

		const tiles = [...container.querySelectorAll('.phone__app')].map((node) =>
			node.textContent?.trim()
		);
		// The archive lives inside the finder, so it has no tile of its own.
		const expected = sections.filter((section) => section.id !== 'archive').map((s) => s.name);

		expect(tiles).toEqual(expected);
		expect(container.querySelector('.phone__home-indicator')).toBeTruthy();
	});

	it('opens the app menu when a dock icon is long-pressed', () => {
		vi.useFakeTimers();
		try {
			const { container } = mount();
			const icon = container.querySelector('.dock-icon[data-long-press]');
			expect(icon).toBeTruthy();

			act(() => {
				icon?.dispatchEvent(touch('touchstart', 120, 600));
				vi.advanceTimersByTime(600);
			});

			expect(screen.getByRole('menu')).toBeTruthy();
			expect(screen.getByRole('menuitem', { name: 'Open' })).toBeTruthy();
		} finally {
			vi.useRealTimers();
		}
	});

	it('abandons the long press when the finger moves, so scrolling still works', () => {
		vi.useFakeTimers();
		try {
			const { container } = mount();
			const icon = container.querySelector('.dock-icon[data-long-press]');

			act(() => {
				icon?.dispatchEvent(touch('touchstart', 120, 600));
				icon?.dispatchEvent(touch('touchmove', 120, 560));
				vi.advanceTimersByTime(600);
			});

			expect(screen.queryByRole('menu')).toBeNull();
		} finally {
			vi.useRealTimers();
		}
	});
});
