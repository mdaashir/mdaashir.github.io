/**
 * PLACEHOLDER CONTENT — every string in `src/data/` is a stand-in.
 * Swap this file (and its siblings) for real content; nothing else needs to change.
 */

export interface NavLink {
	id: number;
	name: string;
	target: 'finder' | 'safari' | 'photos' | 'terminal' | 'contact' | 'resume';
}

export interface NavIcon {
	id: number;
	img: string;
	label: string;
}

/** Menu-bar items, matching the reference's three entries. */
export const navLinks: NavLink[] = [
	{ id: 1, name: 'Projects', target: 'finder' },
	{ id: 2, name: 'Contact', target: 'contact' },
	{ id: 3, name: 'Resume', target: 'resume' },
];

/** Status icons; the appearance toggle is rendered separately by the menu bar. */
export const navIcons: NavIcon[] = [
	{ id: 1, img: '/icons/wifi.svg', label: 'Wi-Fi' },
	{ id: 2, img: '/icons/search.svg', label: 'Search' },
	{ id: 3, img: '/icons/user.svg', label: 'Account' },
];
