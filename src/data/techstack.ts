export interface TechGroup {
	category: string;
	items: string[];
}

export const techStack: TechGroup[] = [
	{ category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript'] },
	{ category: 'Mobile', items: ['React Native', 'Expo'] },
	{ category: 'Styling', items: ['Tailwind CSS', 'Sass', 'CSS'] },
	{ category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Hono'] },
	{ category: 'Database', items: ['MongoDB', 'PostgreSQL'] },
	{ category: 'Dev Tools', items: ['Git', 'GitHub', 'Docker'] },
];
