import { dockApps } from '../data/dock';
import type { WindowId } from '../data/windows';
import { useWindows } from '../lib/window-context';

const DOCK_WINDOW: Record<string, WindowId> = {
	finder: 'finder',
	safari: 'safari',
	photos: 'photos',
	contact: 'contact',
	terminal: 'terminal',
};

export function Dock() {
	const { toggle } = useWindows();

	return (
		<section id='dock' aria-label='Dock'>
			<div class='dock-container'>
				{dockApps.map((app) => (
					<ul key={app.id} class='group relative flex justify-center'>
						<li>
							<button
								type='button'
								class='dock-icon'
								aria-label={app.name}
								disabled={!app.canOpen}
								onClick={() => {
									const target = DOCK_WINDOW[app.id];
									if (target) {
										toggle(target, target === 'finder' ? { location: 'work' } : undefined);
									}
								}}>
								<img src={`/images/${app.icon}`} alt='' loading='lazy' />
							</button>
							<span
								role='tooltip'
								class='pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blue-200 px-3 py-1 text-xs text-blue-900 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100'>
								{app.name}
							</span>
						</li>
					</ul>
				))}
			</div>
		</section>
	);
}
