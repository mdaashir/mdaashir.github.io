import { marked } from 'marked';

export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	readingTime: number;
	html: string;
}

const modules = import.meta.glob('/src/content/blog/*.md', {
	query: '?raw',
	import: 'default',
	eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
	data: Record<string, string>;
	body: string;
} {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	if (!match) return { data: {}, body: raw };

	const data: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const separator = line.indexOf(':');
		if (separator === -1) continue;
		const key = line.slice(0, separator).trim();
		const value = line
			.slice(separator + 1)
			.trim()
			.replace(/^["']|["']$/g, '');
		if (key) data[key] = value;
	}
	return { data, body: match[2] };
}

function toPost(path: string, raw: string): Post {
	const { data, body } = parseFrontmatter(raw);
	const slug = data.slug || path.split('/').pop()!.replace(/\.md$/, '');
	const words = body.trim().split(/\s+/).filter(Boolean).length;

	return {
		slug,
		title: data.title || slug,
		date: data.date || '',
		excerpt: data.excerpt || '',
		tags: (data.tags || '')
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean),
		readingTime: Math.max(1, Math.round(words / 200)),
		html: marked.parse(body) as string,
	};
}

export const posts: Post[] = Object.entries(modules)
	.map(([path, raw]) => toPost(path, raw))
	.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return date;
	return parsed.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
