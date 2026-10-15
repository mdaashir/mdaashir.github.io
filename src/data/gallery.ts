export interface PhotoLink {
	id: number;
	icon: string;
	title: string;
}

export interface GalleryImage {
	id: number;
	img: string;
	alt: string;
}

export const photosLinks: PhotoLink[] = [
	{ id: 1, icon: '/icons/gicon1.svg', title: 'Library' },
	{ id: 2, icon: '/icons/gicon2.svg', title: 'Memories' },
	{ id: 3, icon: '/icons/file.svg', title: 'Places' },
	{ id: 4, icon: '/icons/gicon4.svg', title: 'People' },
	{ id: 5, icon: '/icons/gicon5.svg', title: 'Favorites' },
];

export const gallery: GalleryImage[] = [
	{ id: 1, img: '/images/gal1.png', alt: 'Gallery image 1' },
	{ id: 2, img: '/images/gal2.png', alt: 'Gallery image 2' },
	{ id: 3, img: '/images/gal3.png', alt: 'Gallery image 3' },
	{ id: 4, img: '/images/gal4.png', alt: 'Gallery image 4' },
];
