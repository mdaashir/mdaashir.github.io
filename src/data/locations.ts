export type FileType = 'txt' | 'img' | 'url' | 'fig' | 'pdf';

export interface FileNode {
	id: number;
	name: string;
	icon: string;
	kind: 'file';
	fileType: FileType;
	position?: string;
	href?: string;
	imageUrl?: string;
	subtitle?: string;
	description?: string[];
}

export interface FolderNode {
	id: number;
	name: string;
	icon: string;
	kind: 'folder';
	position?: string;
	windowPosition?: string;
	children: TreeNode[];
}

export type TreeNode = FolderNode | FileNode;

export type LocationId = 'work' | 'about' | 'resume' | 'trash';

export interface Location {
	id: number;
	type: LocationId;
	name: string;
	icon: string;
	kind: 'folder';
	children: TreeNode[];
}

const WORK: Location = {
	id: 1,
	type: 'work',
	name: 'Work',
	icon: '/icons/work.svg',
	kind: 'folder',
	children: [
		{
			id: 5,
			name: 'SnapCast',
			icon: '/images/folder.png',
			kind: 'folder',
			position: 'top-10 left-5',
			windowPosition: 'top-[5vh] left-5',
			children: [
				{
					id: 1,
					name: 'SnapCast.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'SnapCast is a real-time screen and audio sharing app with a tiny footprint.',
						'It pairs a WebRTC pipeline with a clean macOS-style interface, so sharing a window feels like using a native app.',
					],
				},
				{
					id: 2,
					name: 'snapcast.app',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://example.com',
					position: 'top-10 right-20',
				},
				{
					id: 3,
					name: 'snapcast.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					imageUrl: '/images/project-1.png',
					position: 'top-52 right-80',
				},
				{
					id: 4,
					name: 'Design.fig',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'fig',
					href: 'https://figma.com',
					position: 'top-60 right-20',
				},
			],
		},
		{
			id: 6,
			name: 'Converso',
			icon: '/images/folder.png',
			kind: 'folder',
			position: 'top-52 right-80',
			windowPosition: 'top-[20vh] left-7',
			children: [
				{
					id: 1,
					name: 'Converso.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 right-10',
					description: [
						'Converso is a language-practice chat app with an AI partner that adapts to your level.',
						'It combines streaming responses with a lightweight design system built in Tailwind.',
					],
				},
				{
					id: 2,
					name: 'converso.app',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://example.com',
					position: 'top-20 left-20',
				},
				{
					id: 3,
					name: 'converso.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					imageUrl: '/images/project-2.png',
					position: 'top-52 left-80',
				},
				{
					id: 4,
					name: 'Design.fig',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'fig',
					href: 'https://figma.com',
					position: 'top-60 left-5',
				},
			],
		},
		{
			id: 7,
			name: 'PrepWise',
			icon: '/images/folder.png',
			kind: 'folder',
			position: 'top-10 left-80',
			windowPosition: 'top-[33vh] left-7',
			children: [
				{
					id: 1,
					name: 'PrepWise.txt',
					icon: '/images/txt.png',
					kind: 'file',
					fileType: 'txt',
					position: 'top-5 left-10',
					description: [
						'PrepWise turns a job description into a focused interview prep plan.',
						'It scores your résumé, highlights gaps, and generates practice questions tailored to the role.',
					],
				},
				{
					id: 2,
					name: 'prepwise.app',
					icon: '/images/safari.png',
					kind: 'file',
					fileType: 'url',
					href: 'https://example.com',
					position: 'top-10 right-20',
				},
				{
					id: 3,
					name: 'prepwise.png',
					icon: '/images/image.png',
					kind: 'file',
					fileType: 'img',
					imageUrl: '/images/project-3.png',
					position: 'top-52 right-80',
				},
				{
					id: 4,
					name: 'Design.fig',
					icon: '/images/plain.png',
					kind: 'file',
					fileType: 'fig',
					href: 'https://figma.com',
					position: 'top-60 right-20',
				},
			],
		},
	],
};

const ABOUT: Location = {
	id: 2,
	type: 'about',
	name: 'About me',
	icon: '/icons/info.svg',
	kind: 'folder',
	children: [
		{
			id: 1,
			name: 'me.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			imageUrl: '/images/adrian.jpg',
			position: 'top-10 left-5',
		},
		{
			id: 2,
			name: 'casual-me.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			imageUrl: '/images/adrian-2.jpg',
			position: 'top-28 right-72',
		},
		{
			id: 3,
			name: 'conference-me.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			imageUrl: '/images/adrian-3.jpeg',
			position: 'top-52 left-80',
		},
		{
			id: 4,
			name: 'about-me.txt',
			icon: '/images/txt.png',
			kind: 'file',
			fileType: 'txt',
			position: 'top-60 left-5',
			subtitle: 'Meet the developer behind the code',
			description: [
				'Hey! I build interfaces that feel fast, obvious and a little bit delightful.',
				'I work across the stack — from the pixels to the API — and I care about the details that make a product feel considered.',
			],
		},
	],
};

const RESUME: Location = {
	id: 3,
	type: 'resume',
	name: 'Resume',
	icon: '/icons/file.svg',
	kind: 'folder',
	children: [
		{
			id: 1,
			name: 'Resume.pdf',
			icon: '/images/pdf.png',
			kind: 'file',
			fileType: 'pdf',
		},
	],
};

const TRASH: Location = {
	id: 4,
	type: 'trash',
	name: 'Trash',
	icon: '/icons/trash.svg',
	kind: 'folder',
	children: [
		{
			id: 1,
			name: 'trash1.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			imageUrl: '/images/trash-1.png',
			position: 'top-10 left-10',
		},
		{
			id: 2,
			name: 'trash2.png',
			icon: '/images/image.png',
			kind: 'file',
			fileType: 'img',
			imageUrl: '/images/trash-2.png',
			position: 'top-40 left-80',
		},
	],
};

export const locations: Record<LocationId, Location> = {
	work: WORK,
	about: ABOUT,
	resume: RESUME,
	trash: TRASH,
};

export const RESUME_FILE = '/files/resume.pdf';
