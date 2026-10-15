export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

export function readTheme(): Theme {
	if (typeof window === 'undefined') return 'light';
	try {
		const stored = window.localStorage.getItem(THEME_KEY);
		if (stored === 'dark' || stored === 'light') return stored;
	} catch {
		/* storage unavailable */
	}
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
	if (typeof document === 'undefined') return;
	document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function saveTheme(theme: Theme): void {
	try {
		window.localStorage.setItem(THEME_KEY, theme);
	} catch {
		/* storage unavailable */
	}
	applyTheme(theme);
}

export function toggleTheme(theme: Theme): Theme {
	const next: Theme = theme === 'dark' ? 'light' : 'dark';
	saveTheme(next);
	return next;
}
