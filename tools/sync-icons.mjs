/**
 * Writes the brand marks from the `simple-icons` package into `public/icons/social/`, so the
 * artwork is a real package asset rather than a hand-drawn approximation.
 *
 * Run with `node tools/sync-icons.mjs` after updating simple-icons.
 */
import { mkdirSync, writeFileSync } from 'node:fs';

import * as simpleIcons from 'simple-icons';

const WANTED = { github: 'siGithub', x: 'siX', gmail: 'siGmail' };

mkdirSync('public/icons/social', { recursive: true });

for (const [name, exportName] of Object.entries(WANTED)) {
	const brand = simpleIcons[exportName];
	if (!brand) {
		console.log(`skip ${name}: ${exportName} is not in this simple-icons version`);
		continue;
	}
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><title>${brand.title}</title><path d="${brand.path}"/></svg>\n`;
	writeFileSync(`public/icons/social/${name}.svg`, svg);
	console.log(`${name}.svg  <- simple-icons ${brand.title}  ${svg.length} bytes`);
}
