import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { icon, iconRoles, icons } from '../content/icons';

function walk(dir: string, out: string[] = []): string[] {
	for (const name of readdirSync(dir)) {
		const full = join(dir, name);
		if (statSync(full).isDirectory()) walk(full, out);
		else out.push(full);
	}
	return out;
}

describe('icon registry', () => {
	it('gives every role a path', () => {
		for (const role of iconRoles) {
			expect(icons[role], role).toMatch(/^\/(images|icons)\//);
		}
	});

	it('points every role at a file that exists', () => {
		const missing = iconRoles.filter((role) => !existsSync(`public${icons[role]}`));
		expect(missing).toEqual([]);
	});

	it('resolves a role and leaves an unknown value alone', () => {
		expect(icon('apps.finder')).toBe('/images/finder.png');
		expect(icon('not-a-role')).toBe('not-a-role');
	});

	// The guarantee the whole registry exists for: swapping an icon is a JSON edit.
	it('keeps icon paths out of component and content code', () => {
		const offenders = walk('src')
			.filter((file) => /\.(ts|tsx)$/.test(file))
			.filter((file) => !file.replace(/\\/g, '/').includes('__tests__'))
			.filter((file) => !file.replace(/\\/g, '/').endsWith('content/icons.ts'))
			.filter((file) => /["']\/(images|icons)\//.test(readFileSync(file, 'utf8')));

		expect(offenders).toEqual([]);
	});
});
