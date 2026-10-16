import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
	dockSections,
	hasSection,
	locations,
	menu,
	SECTION_IDS,
	sectionData,
	sections,
	shortcuts,
	site,
	unknownSectionFiles,
} from '../content';

const publicDir = resolve(__dirname, '../../public');

/** Every `/images/...`, `/icons/...` and `/files/...` path anywhere in the content. */
function assetPaths(value: unknown, found: Set<string> = new Set()): Set<string> {
	if (typeof value === 'string') {
		if (/^\/(images|icons|files|img)\//.test(value)) found.add(value);
	} else if (Array.isArray(value)) {
		value.forEach((entry) => assetPaths(entry, found));
	} else if (value && typeof value === 'object') {
		Object.values(value).forEach((entry) => assetPaths(entry, found));
	}
	return found;
}

const SECTION_FILES = Object.values(sectionData).filter(Boolean);

describe('content files', () => {
	it('matches every section file to a known section type', () => {
		expect(unknownSectionFiles).toEqual([]);
	});

	it('gives every section a title and an icon', () => {
		for (const [id, section] of Object.entries(sectionData)) {
			if (!section) continue;
			expect(SECTION_IDS, `${id} is not a known section`).toContain(id);
			expect(section.title, `${id}.title`).toBeTruthy();
			expect(section.icon, `${id}.icon`).toMatch(/^\/images\//);
		}
	});

	it('points every referenced asset at a file that exists', () => {
		const missing = [...assetPaths({ ...SECTION_FILES, site, menu })].filter(
			(path) => !existsSync(resolve(publicDir, path.replace(/^\//, '')))
		);
		expect(missing).toEqual([]);
	});

	it('references only known sections from the menu', () => {
		for (const link of menu.links) {
			expect(SECTION_IDS).toContain(link.section);
		}
		expect(menu.dock.every((id) => SECTION_IDS.includes(id))).toBe(true);
	});
});

describe('skip-if-not-available', () => {
	it('only exposes sections that exist, are enabled and have content', () => {
		for (const meta of sections) {
			const section = sectionData[meta.id];
			expect(section, `${meta.id} has no data file`).toBeTruthy();
			expect(section?.enabled, `${meta.id} is disabled`).not.toBe(false);
			expect(hasSection(meta.id)).toBe(true);
		}

		// Anything missing from `sections` must be missing for a reason.
		for (const id of SECTION_IDS) {
			if (hasSection(id)) continue;
			const section = sectionData[id];
			expect(section === undefined || section.enabled === false).toBe(true);
		}
	});

	it('keeps the dock to enabled sections, in the order menu.json asks for', () => {
		expect(dockSections.length).toBe(menu.dock.filter((id) => hasSection(id)).length);
		for (const meta of dockSections) {
			expect(hasSection(meta.id)).toBe(true);
		}
	});

	it('never lists a disabled section in the menu or the dock', () => {
		const enabled = new Set(sections.map((meta) => meta.id));
		expect(menu.dock.filter((id) => enabled.has(id))).toEqual([
			...menu.dock.filter((id) => enabled.has(id)),
		]);
		expect(dockSections.every((meta) => enabled.has(meta.id))).toBe(true);
	});

	it('drops every dock and menu entry that has no section behind it', () => {
		const missingFromDock = menu.dock.filter((id) => !hasSection(id));
		expect(dockSections.some((meta) => missingFromDock.includes(meta.id))).toBe(false);
	});
});

describe('derived finder filesystem', () => {
	it('builds a location only for sections with content', () => {
		expect(locations.work).toBeTruthy();
		expect(Object.keys(locations).length).toBeGreaterThan(0);

		if (!hasSection('gallery')) return;
		// A gallery has photos but no folder, so it must not appear as a location.
		expect(Object.keys(locations)).not.toContain('gallery');
	});

	it('generates a file per present project field and skips the rest', () => {
		const projects = sectionData.projects;
		if (!projects || !locations.work) return;

		const folders = locations.work.children.filter((node) => node.kind === 'folder');
		expect(folders.length).toBe(projects.projects.length);

		for (const folder of folders) {
			if (folder.kind !== 'folder') continue;
			const project = projects.projects.find((entry) => entry.name === folder.name);
			expect(project).toBeTruthy();

			const types = folder.children.map((child) => (child.kind === 'file' ? child.fileType : ''));
			expect(types.includes('txt')).toBe(Boolean(project?.description?.length));
			expect(types.includes('url')).toBe(Boolean(project?.url));
			expect(types.includes('img')).toBe(Boolean(project?.image));
			expect(types.includes('fig')).toBe(Boolean(project?.figma));
		}
	});

	it('gives every generated file node a position', () => {
		for (const location of Object.values(locations)) {
			for (const child of location?.children ?? []) {
				expect(child.position, `${child.name} has no position`).toBeTruthy();
			}
		}
	});
});

describe('desktop shortcuts', () => {
	it('mirrors the projects unless a project opted out', () => {
		const projects = sectionData.projects;
		if (!projects) return;

		const expected = projects.projects.filter((project) => project.desktop?.enabled !== false);
		expect(shortcuts.map((shortcut) => shortcut.name)).toEqual(
			expected.map((project) => project.name)
		);
	});

	it('gives every shortcut a position and an icon that exists', () => {
		for (const shortcut of shortcuts) {
			expect(shortcut.position).toBeTruthy();
			expect(
				existsSync(resolve(publicDir, shortcut.icon.replace(/^\//, ''))),
				`${shortcut.icon} is missing`
			).toBe(true);
		}
	});
});

describe('site config', () => {
	it('carries the values the shell needs', () => {
		expect(site.name).toBeTruthy();
		expect(site.brand).toBeTruthy();
		expect(site.title).toContain('{name}');
		expect(['light', 'dark']).toContain(site.theme.default);
		expect(site.ui.emptyFolder).toBeTruthy();
	});
});
