import { marked } from 'marked';
import { getPostMeta, type PostMeta } from './posts';

export type { PostMeta } from './posts';
export { formatDate, posts } from './posts';

export interface Post extends PostMeta {
	html: string;
}

export function getPost(slug: string): Post | undefined {
	const meta = getPostMeta(slug);
	if (!meta) return undefined;
	return { ...meta, html: marked.parse(meta.body) as string };
}
