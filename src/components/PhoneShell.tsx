import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { menu, profile, sections, type SectionId, type SectionMeta } from '../content';
import { useContextMenu, type MenuEntry } from '../lib/context-menu';
import { useLongPress } from '../lib/long-press';
import { Contact } from '../windows/Contact';
import { Finder } from '../windows/Finder';
import { Photos } from '../windows/Photos';
import { Resume } from '../windows/Resume';
import { Safari } from '../windows/Safari';
import { Terminal } from '../windows/Terminal';

/**
 * The sections that can render full-screen on a phone. The archive lives inside the finder, so it
 * has no tile of its own.
 */
const RENDERERS: Partial<Record<SectionId, () => ComponentChildren>> = {
	projects: () => <Finder />,
	articles: () => <Safari />,
	gallery: () => <Photos />,
	contact: () => <Contact />,
	skills: () => <Terminal />,
	resume: () => <Resume />,
};

/** Only the enabled sections that have a phone view, so disabled apps vanish here too. */
const apps: SectionMeta[] = sections.filter((section) => RENDERERS[section.id]);

/** "12:08 AM", as the iOS status bar shows it. */
function PhoneClock() {
	const [clock, setClock] = useState('');

	useEffect(() => {
		const tick = () =>
			setClock(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
		tick();
		const timer = window.setInterval(tick, 30_000);
		return () => window.clearInterval(timer);
	}, []);

	return <span>{clock}</span>;
}

function BatteryIcon() {
	return (
		<svg viewBox='0 0 28 14' class='h-3.5 w-7 shrink-0' aria-hidden='true'>
			<rect
				x='0.75'
				y='0.75'
				width='23'
				height='12.5'
				rx='4'
				fill='none'
				stroke='#fff'
				stroke-opacity='0.55'
				stroke-width='1.5'
			/>
			<rect x='2.5' y='2.5' width='14' height='9' rx='2.5' fill='#fff' />
			<path d='M25.5 5.2v3.6a2 2 0 0 0 0-3.6z' fill='#fff' fill-opacity='0.55' />
		</svg>
	);
}

export function PhoneShell() {
	const { openAt } = useContextMenu();
	const [active, setActive] = useState<SectionMeta | null>(null);

	// Long-pressing the home screen offers the apps, which is the phone's equivalent of the
	// desktop background menu.
	const homeMenu: MenuEntry[] = apps.map((section) => ({
		label: section.name,
		onSelect: () => setActive(section),
	}));
	const longPress = useLongPress((_, point) => openAt(point, homeMenu));

	return (
		<div class='phone-shell'>
			<header class='phone__status'>
				<PhoneClock />
				<span class='phone__notch' aria-hidden='true' />
				<span class='phone__status-icons'>
					{menu.statusIcons.slice(0, 1).map((icon) => (
						<img key={icon.icon} src={icon.icon} alt='' />
					))}
					<BatteryIcon />
				</span>
			</header>

			<div class='phone__home' {...longPress}>
				<div class='phone__grid'>
					{apps.map((section) => (
						<button
							key={section.id}
							type='button'
							class='phone__app'
							onClick={() => setActive(section)}>
							<img src={section.icon} alt='' loading='lazy' />
							<span>{section.name}</span>
						</button>
					))}
				</div>

				<div class='phone__hero'>
					<p class='font-sf'>{profile.greeting}</p>
					<h1 class='font-playwrite'>{profile.headline}</h1>
				</div>
			</div>

			<nav class='phone__bar' aria-label='Dock'>
				<div class='phone__tabs'>
					{apps.map((section) => (
						<button
							key={section.id}
							type='button'
							class='phone__tab'
							aria-label={section.name}
							onClick={() => setActive(section)}>
							<img src={section.icon} alt='' loading='lazy' />
							<span>{section.name}</span>
						</button>
					))}
				</div>
				<div class='phone__home-indicator' aria-hidden='true' />
			</nav>

			{active && (
				<div class='phone__app-view' role='dialog' aria-label={active.title}>
					<header class='phone__app-header'>
						<span>{active.title}</span>
						<button
							type='button'
							class='phone__app-close'
							onClick={() => setActive(null)}>
							Done
						</button>
					</header>
					<div class='phone__app-body'>{RENDERERS[active.id]?.()}</div>
				</div>
			)}
		</div>
	);
}
