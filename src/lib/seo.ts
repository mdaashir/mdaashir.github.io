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
const THEME_COLOR = '#000000';

const DESCRIPTION =
	'An interactive macOS-style portfolio for Mohamed Aashir S — browse projects, articles, gallery and skills through a draggable desktop interface.';

export function getHead(url = '/'): Head {
	const path = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
	const isHome = path === '/';
	const title = isHome ? `${SITE_NAME} — macOS Portfolio` : `Page not found — ${SITE_NAME}`;
	const description = isHome
		? DESCRIPTION
		: 'The page you were looking for could not be found.';

	return {
		title,
		elements: [
			{ type: 'meta', props: { name: 'description', content: description } },
			{ type: 'meta', props: { name: 'theme-color', content: THEME_COLOR } },
			{ type: 'meta', props: { property: 'og:type', content: 'website' } },
			{ type: 'meta', props: { property: 'og:title', content: title } },
			{ type: 'meta', props: { property: 'og:description', content: description } },
			{ type: 'meta', props: { property: 'og:url', content: `${SITE_URL}${path}` } },
			{ type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
			{ type: 'link', props: { rel: 'canonical', href: `${SITE_URL}${path}` } },
		],
	};
}
