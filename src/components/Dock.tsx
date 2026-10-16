import { useEffect, useRef } from 'preact/hooks';

import { dockApps } from '../data/dock';
import type { WindowId } from '../data/windows';
import { useContextMenu } from '../lib/context-menu';
import { loadGsap } from '../lib/gsap';
import { useWindows } from '../lib/window-context';

const DOCK_TARGET: Record<string, WindowId> = {
	finder: 'finder',
	safari: 'safari',
	photos: 'photos',
	contact: 'contact',
	terminal: 'terminal',
	trash: 'finder',
};

/** macOS dock magnification: how much the hovered icon grows, and the falloff. */
const MAX_BOOST = 0.25;
const SIGMA = 48;
const MAGNIFY_EASE = { duration: 0.28, ease: 'power2.out', overwrite: 'auto' } as const;

export function Dock() {
	const { open, toggle, close, windows } = useWindows();
	const { openAt } = useContextMenu();
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * The archive shares the finder window, so it navigates instead of toggling —
	 * otherwise clicking it while the finder is open would just close it.
	 */
	const activate = (
		appId: string,
		target: WindowId,
		payload?: { location: 'work' | 'trash' }
	) => {
		if (appId === 'trash') {
			open('finder', { location: 'trash' });
			return;
		}
		toggle(target, payload);
	};

	// Magnify icons by the pointer's distance, gliding via GSAP.
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let cancelled = false;
		let detach: (() => void) | null = null;

		loadGsap()
			.then((gsap) => {
				if (cancelled) return;
				const icons = Array.from(container.querySelectorAll<HTMLElement>('.dock-icon'));
				if (!icons.length) return;

				// Measured at rest: the per-icon <ul>s are positioned, so `offsetLeft`
				// would report every icon at the same coordinate.
				const containerLeft = () => container.getBoundingClientRect().left;
				const centres = icons.map((icon) => {
					const rect = icon.getBoundingClientRect();
					return rect.left - containerLeft() + rect.width / 2;
				});

				const scaleTo = (icon: HTMLElement, scale: number) =>
					gsap.to(icon, { scale, ...MAGNIFY_EASE });

				const onMove = (event: MouseEvent) => {
					const x = event.clientX - containerLeft();
					icons.forEach((icon, index) => {
						const distance = (x - centres[index]) / SIGMA;
						scaleTo(icon, 1 + MAX_BOOST * Math.exp(-distance * distance));
					});
				};
				const onLeave = () => icons.forEach((icon) => scaleTo(icon, 1));

				// `mousemove` rather than `pointermove`: mouse input always emits it,
				// including synthetic CDP moves.
				container.addEventListener('mousemove', onMove);
				container.addEventListener('mouseleave', onLeave);
				detach = () => {
					container.removeEventListener('mousemove', onMove);
					container.removeEventListener('mouseleave', onLeave);
				};
			})
			.catch(() => undefined);

		return () => {
			cancelled = true;
			detach?.();
		};
	}, []);

	return (
		<section id='dock' aria-label='Dock'>
			<div class='dock-container' ref={containerRef}>
				{dockApps.map((app) => {
					const target = DOCK_TARGET[app.id];
					const payload =
						app.id === 'trash'
							? { location: 'trash' as const }
							: target === 'finder'
								? { location: 'work' as const }
								: undefined;
					const isOpen = target ? windows[target].isOpen : false;

					return (
						<ul key={app.id} class='group relative flex justify-center'>
							<li>
								<button
									type='button'
									class='dock-icon'
									aria-label={app.name}
									onClick={() => activate(app.id, target, payload)}
									onContextMenu={(event) =>
										openAt(event, [
											{ label: 'Open', onSelect: () => activate(app.id, target, payload) },
											{ separator: true },
											{ label: 'Show in Finder', disabled: true },
											{
												label: 'Quit',
												disabled: !isOpen,
												onSelect: () => close(target),
											},
										])
									}>
									<img src={`/images/${app.icon}`} alt='' loading='lazy' />
								</button>
								<span
									role='tooltip'
									class='pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blue-200 px-3 py-1 text-xs text-blue-900 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'>
									{app.name}
								</span>
							</li>
						</ul>
					);
				})}
			</div>
		</section>
	);
}
