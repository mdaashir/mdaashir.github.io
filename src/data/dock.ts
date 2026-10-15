export interface DockApp {
	id: 'finder' | 'safari' | 'photos' | 'contact' | 'terminal' | 'trash';
	name: string;
	icon: string;
	canOpen: boolean;
}

export const dockApps: DockApp[] = [
	{ id: 'finder', name: 'Portfolio', icon: 'finder.png', canOpen: true },
	{ id: 'safari', name: 'Articles', icon: 'safari.png', canOpen: true },
	{ id: 'photos', name: 'Gallery', icon: 'photos.png', canOpen: true },
	{ id: 'contact', name: 'Contact', icon: 'contact.png', canOpen: true },
	{ id: 'terminal', name: 'Skills', icon: 'terminal.png', canOpen: true },
	{ id: 'trash', name: 'Archive', icon: 'trash.png', canOpen: false },
];
