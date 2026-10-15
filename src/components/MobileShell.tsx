import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

import type { WindowId } from '../data/windows';
import { Contact } from '../windows/Contact';
import { Finder } from '../windows/Finder';
import { Photos } from '../windows/Photos';
import { Safari } from '../windows/Safari';
import { Terminal } from '../windows/Terminal';

interface MobileApp {
	id: WindowId;
	name: string;
	icon: string;
	render: () => ComponentChildren;
}

const APPS: MobileApp[] = [
	{ id: 'finder', name: 'Portfolio', icon: 'finder.png', render: () => <Finder /> },
	{ id: 'safari', name: 'Articles', icon: 'safari.png', render: () => <Safari /> },
	{ id: 'photos', name: 'Gallery', icon: 'photos.png', render: () => <Photos /> },
	{ id: 'contact', name: 'Contact', icon: 'contact.png', render: () => <Contact /> },
	{ id: 'terminal', name: 'Skills', icon: 'terminal.png', render: () => <Terminal /> },
];

export function MobileShell() {
	const [active, setActive] = useState<MobileApp | null>(null);

	return (
		<div class='mobile-shell'>
			<header class='mb-5 flex items-center justify-between text-sm'>
				<span class='font-semibold'>Aashir&rsquo;s Portfolio</span>
				<span class='opacity-80'>iOS</span>
			</header>

			<div class='grid grid-cols-4 gap-4'>
				{APPS.map((app) => (
					<button
						key={app.id}
						type='button'
						class='col-center gap-1'
						onClick={() => setActive(app)}>
						<img src={`/images/${app.icon}`} alt='' class='h-14 w-14' loading='lazy' />
						<span class='text-[0.6875rem]'>{app.name}</span>
					</button>
				))}
			</div>

			{active && (
				<div class='fixed inset-0 z-[10000] flex flex-col bg-black/80 backdrop-blur-md'>
					<header class='flex items-center justify-between px-4 py-3 text-sm'>
						<span class='font-semibold'>{active.name}</span>
						<button type='button' onClick={() => setActive(null)}>
							Close
						</button>
					</header>
					<div class='flex-1 overflow-y-auto rounded-t-2xl bg-panel text-label dark:bg-dark-700 dark:text-white'>
						{active.render()}
					</div>
				</div>
			)}
		</div>
	);
}
