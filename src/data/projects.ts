export interface Project {
	title: string;
	description: string;
	tags: string[];
	link?: string;
	repo?: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		title: 'Personal Portfolio',
		description:
			'A fast, accessible portfolio built with Preact, Vite, and Tailwind CSS, with prerendered pages for SEO.',
		tags: ['Preact', 'Vite', 'TypeScript', 'Tailwind'],
		link: 'https://mdaashir.github.io',
		repo: 'https://github.com/mdaashir/mdaashir.github.io',
		featured: true,
	},
	{
		title: 'Full-Stack Application',
		description:
			'A complete web application with authentication, REST APIs, and database integration.',
		tags: ['Node.js', 'React', 'Express', 'Databases'],
		featured: true,
	},
	{
		title: 'Mobile Application',
		description:
			'A cross-platform mobile app with native performance and a shared component system.',
		tags: ['React Native', 'Mobile', 'TypeScript'],
		featured: true,
	},
];
