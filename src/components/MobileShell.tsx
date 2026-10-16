import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

import { sections, site, type SectionId, type SectionMeta } from '../content';
import { Contact } from '../windows/Contact';
import { Finder } from '../windows/Finder';
import { Photos } from '../windows/Photos';
import { Resume } from '../windows/Resume';
import { Safari } from '../windows/Safari';
import { Terminal } from '../windows/Terminal';

/**
 * Sections that can render full-screen on mobile. The archive lives inside the finder, so it has no
 * entry of its own.
 */
const RENDERERS: Partial<Record<SectionId, () => ComponentChildren>> = {
	projects: () => <Finder />,
	articles: () => <Safari />,
	gallery: () => <Photos />,
	contact: () => <Contact />,
	skills: () => <Terminal />,
	resume: () => <Resume />,
};

/** Only the enabled sections that have a mobile renderer. */
const apps: SectionMeta[] = sections.filter((section) => RENDERERS[section.id]);

export function MobileShell() {
	const [active, setActive] = useState<SectionMeta | null>(null);

	return (
		<div class='mobile-shell'>
			<header class='mb-5 flex items-center justify-between text-sm'>
				<span class='font-semibold'>{site.brand}</span>
				{site.mobile.badge && <span class='opacity-80'>{site.mobile.badge}</span>}
			</header>

			<div class='grid grid-cols-4 gap-4'>
				{apps.map((section) => (
					<button
						key={section.id}
						type='button'
						class='col-center gap-1'
						onClick={() => setActive(section)}>
						<img src={section.icon} alt='' class='h-14 w-14' loading='lazy' />
						<span class='text-[0.6875rem]'>{section.name}</span>
					</button>
				))}
			</div>

			{active && (
				<div class='fixed inset-0 z-[10000] flex flex-col bg-black/80 backdrop-blur-md'>
					<header class='flex items-center justify-between px-4 py-3 text-sm'>
						<span class='font-semibold'>{active.title}</span>
						<button type='button' onClick={() => setActive(null)}>
							Close
						</button>
					</header>
					<div class='flex-1 overflow-y-auto rounded-t-2xl bg-panel text-label dark:bg-dark-700 dark:text-white'>
						{RENDERERS[active.id]?.()}
					</div>
				</div>
			)}
		</div>
	);
}
