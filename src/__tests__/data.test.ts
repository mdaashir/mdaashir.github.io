import { describe, expect, it } from 'vitest';

import { INITIAL_Z_INDEX, WINDOW_CONFIG, WINDOW_IDS } from '../data/windows';
import { locations } from '../data/locations';
import { dockApps } from '../data/dock';
import { navLinks } from '../data/nav';

describe('window config', () => {
	it('exposes every window id, all closed initially', () => {
		expect(WINDOW_IDS).toHaveLength(8);
		for (const id of WINDOW_IDS) {
			expect(WINDOW_CONFIG[id].isOpen).toBe(false);
			expect(WINDOW_CONFIG[id].zIndex).toBe(INITIAL_Z_INDEX);
			expect(WINDOW_CONFIG[id].data).toBeNull();
		}
	});
});

describe('locations tree', () => {
	it('lists the four favourites with nested work projects', () => {
		expect(Object.keys(locations)).toEqual(['work', 'about', 'resume', 'trash']);
		expect(locations.work.children.length).toBeGreaterThan(0);
		for (const node of locations.work.children) {
			expect(node.kind).toBe('folder');
		}
	});

	it('gives every file a known file type', () => {
		const files = [locations.about, locations.resume, locations.trash, locations.work].flatMap(
			(location) => location.children
		);
		for (const node of files) {
			if (node.kind === 'file') {
				expect(['txt', 'img', 'url', 'fig', 'pdf']).toContain(node.fileType);
				expect(node.icon).toMatch(/^\//);
			}
		}
	});
});

describe('nav + dock data', () => {
	it('maps every nav link to a real window', () => {
		for (const link of navLinks) {
			expect(WINDOW_IDS).toContain(link.target);
		}
	});

	it('keeps the archive dock app unopenable', () => {
		const trash = dockApps.find((app) => app.id === 'trash');
		expect(trash?.canOpen).toBe(false);
	});
});
