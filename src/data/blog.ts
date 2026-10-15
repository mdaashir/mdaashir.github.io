export interface BlogPost {
	id: number;
	date: string;
	title: string;
	image: string;
	link: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: 1,
		date: 'Sep 2, 2025',
		title: 'How I Built My macOS-Style Dev Portfolio with React + Tailwind',
		image: '/images/blog1.png',
		link: 'https://jsmastery.com/blog',
	},
	{
		id: 2,
		date: 'Aug 28, 2025',
		title: 'How I Organize My Projects for Sanity and Speed',
		image: '/images/blog2.png',
		link: 'https://jsmastery.com/blog',
	},
	{
		id: 3,
		date: 'Aug 15, 2025',
		title: 'Small UX Details That Make a Big Difference (and How I Implemented Them)',
		image: '/images/blog3.png',
		link: 'https://jsmastery.com/blog',
	},
];
