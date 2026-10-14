import { describe, expect, it } from 'vitest';

import { formatDate, getPost, posts } from '../lib/blog';

describe('blog loader', () => {
	it('loads posts from markdown files', () => {
		expect(posts.length).toBeGreaterThan(0);
		for (const post of posts) {
			expect(post.slug).toBeTruthy();
			expect(post.title).toBeTruthy();
			expect(post.readingTime).toBeGreaterThan(0);
			expect(post.html).toContain('<');
		}
	});

	it('sorts posts newest first', () => {
		const dates = posts.map((post) => post.date);
		const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
		expect(dates).toEqual(sorted);
	});

	it('finds a post by slug', () => {
		const first = posts[0];
		expect(getPost(first.slug)?.title).toBe(first.title);
		expect(getPost('does-not-exist')).toBeUndefined();
	});

	it('formats valid dates and passes through invalid ones', () => {
		expect(formatDate('2026-09-28')).toContain('2026');
		expect(formatDate('not-a-date')).toBe('not-a-date');
	});
});
