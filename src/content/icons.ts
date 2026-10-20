/**
 * The icon registry.
 *
 * Every icon path in the project is declared in `content/icons.json`, addressed by role
 * (`apps.finder`, `files.pdf`, `menubar.wifi`, …). Components and content never hardcode a path:
 * they ask for a role, and the loader resolves it. Swapping an icon is a one-line JSON edit.
 */
import iconFile from '../../content/icons.json';

type IconGroups = Record<string, Record<string, string>>;

const groups = iconFile as IconGroups;

/** Flat role → path map, e.g. `{ 'files.pdf': '/images/pdf.png' }`. */
export const icons: Record<string, string> = Object.fromEntries(
	Object.entries(groups).flatMap(([group, entries]) =>
		Object.entries(entries).map(([name, path]) => [`${group}.${name}`, path])
	)
);

/** Every role in the registry, sorted — used by the content tests. */
export const iconRoles: string[] = Object.keys(icons).sort();

/**
 * Resolves an icon role to its path. Anything that is not a known role (already a path, or empty)
 * is returned unchanged, so both forms work and a missing role never produces a broken image.
 */
export function icon(roleOrPath: string): string {
	return icons[roleOrPath] ?? roleOrPath;
}

/**
 * Walks loaded content and replaces any string that names a role with its path. Runs once at load
 * time so components keep rendering plain paths and never need to know about the registry.
 */
export function resolveIcons<T>(value: T): T {
	if (typeof value === 'string') return (icons[value] ?? value) as T;
	if (Array.isArray(value)) return value.map((entry) => resolveIcons(entry)) as T;
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
				key,
				resolveIcons(entry),
			])
		) as T;
	}
	return value;
}
