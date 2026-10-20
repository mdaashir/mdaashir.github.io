/**
 * Downloads icon artwork into `public/`, so the project serves local files and never imports a
 * package at build or runtime. Icons are then referenced purely by the paths in
 * `content/icons.json` — swap a path there and the icon changes.
 *
 *   node tools/download-icons.mjs
 *
 * Existing files are overwritten, so this is safe to re-run.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

/** Local file → source URL. Add a line here to pull in another icon. */
const ICONS = {
	// Brand marks, from the Simple Icons set served by Iconify (CC0 artwork, white fill).
	'public/icons/social/github.svg': 'https://api.iconify.design/simple-icons/github.svg?color=%23fff',
	'public/icons/social/x.svg': 'https://api.iconify.design/simple-icons/x.svg?color=%23fff',
	'public/icons/social/gmail.svg': 'https://api.iconify.design/simple-icons/gmail.svg?color=%23fff',

	// Phone home-screen icons, iOS 18 artwork from the open iOSIconPack project.
	'public/images/phone/resume.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_notes.png',
	'public/images/phone/mail.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_mail.png',
	'public/images/phone/clock.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_clock.png',
	'public/images/phone/messages.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_messages.png',
	'public/images/phone/music.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_music.png',
	'public/images/phone/facetime.png':
		'https://raw.githubusercontent.com/SysAdminDoc/iOSIconPack/master/app/src/main/res/drawable-xxxhdpi/ios18_facetime.png',
};

for (const [file, url] of Object.entries(ICONS)) {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		let body = Buffer.from(await response.arrayBuffer());

		// Iconify ships `width="1em" height="1em"`, which resolves to nothing inside an <img>;
		// drop them so the viewBox drives the size and CSS can scale the icon.
		if (file.endsWith('.svg')) {
			body = Buffer.from(
				body.toString('utf8').replace(/\s(?:width|height)="1em"/g, ''),
				'utf8'
			);
		}

		mkdirSync(dirname(file), { recursive: true });
		writeFileSync(file, body);
		console.log(`ok    ${file}  ${body.length} bytes`);
	} catch (error) {
		console.log(`FAIL  ${file}  ${error.message}`);
	}
}
