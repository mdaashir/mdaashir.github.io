import { getPostMeta } from './posts';

export interface HeadElement {
	type: string;
	props: Record<string, string>;
}

export interface Head {
	title: string;
	elements: HeadElement[];
}

const SITE_NAME = 'Mohamed Aashir S';
const SITE_URL = 'https://mdaashir.github.io';
const THEME_COLOR = '#00df9a';

const PAGES: Record<string, { title: string; description: string }> = {
	'/': {
		title: `${SITE_NAME} — Full-Stack Developer`,
		description:
			'Portfolio of Mohamed Aashir S, a full-stack developer building clean, reliable web and mobile applications.',
	},
	'/about': {
		title: `About — ${SITE_NAME}`,
		description:
			'Background, skills, and the tools I use to build web and mobile products.',
	},
	'/work': {
		title: `Work — ${SITE_NAME}`,
		description: 'Selected projects and products I have designed and built.',
	},
	'/blogs': {
		title: `Blog — ${SITE_NAME}`,
		description:
			'Thoughts and notes on software, tooling, and building things for the web.',
	},
};

function normalize(url: string): string {
	const path = url.split('?')[0].split('#')[0].replace(/\/+$/, '');
	return path || '/';
}

export function getHead(url = '/'): Head {
	const path = normalize(url);
	let title = PAGES[path]?.title;
	let description = PAGES[path]?.description;
	let type = 'website';

	if (!title && path.startsWith('/blogs/')) {
		const post = getPostMeta(path.slice('/blogs/'.length));
		if (post) {
			title = `${post.title} — ${SITE_NAME}`;
			description = post.excerpt;
			type = 'article';
		}
	}

	if (!title) {
		title = `Page not found — ${SITE_NAME}`;
		description = 'The page you were looking for could not be found.';
	}

	const canonical = `${SITE_URL}${path}`;

	return {
		title,
		elements: [
			{ type: 'meta', props: { name: 'description', content: description ?? '' } },
			{ type: 'meta', props: { name: 'theme-color', content: THEME_COLOR } },
			{ type: 'meta', props: { property: 'og:type', content: type } },
			{ type: 'meta', props: { property: 'og:title', content: title } },
			{
				type: 'meta',
				props: { property: 'og:description', content: description ?? '' },
			},
			{ type: 'meta', props: { property: 'og:url', content: canonical } },
			{ type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
			{ type: 'link', props: { rel: 'canonical', href: canonical } },
		],
	};
}
