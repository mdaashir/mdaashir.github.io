export interface Social {
	id: number;
	text: string;
	icon: string;
	bg: string;
	link: string;
}

export const socials: Social[] = [
	{
		id: 1,
		text: 'GitHub',
		icon: '/icons/github.svg',
		bg: '#f4656b',
		link: 'https://github.com/mdaashir',
	},
	{
		id: 2,
		text: 'Twitter/X',
		icon: '/icons/twitter.svg',
		bg: '#ff866b',
		link: 'https://x.com/',
	},
	{
		id: 3,
		text: 'LinkedIn',
		icon: '/icons/linkedin.svg',
		bg: '#05b6f6',
		link: 'https://www.linkedin.com/',
	},
	{
		id: 4,
		text: 'Email',
		icon: '/icons/atom.svg',
		bg: '#4bcb63',
		link: 'mailto:s.mohamedaashir@gmail.com',
	},
];
