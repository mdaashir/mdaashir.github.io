import type { ComponentChildren } from 'preact';

import { Window } from './Window';
import { doc, getSection, hasDoc, hasSection, icon, locations, sectionData } from '../content';
import { useWindows } from '../lib/window-context';
import { Contact } from '../windows/Contact';
import { Docs } from '../windows/Docs';
import { Finder } from '../windows/Finder';
import { ImgFile } from '../windows/ImgFile';
import { Photos } from '../windows/Photos';
import { Resume } from '../windows/Resume';
import { Safari } from '../windows/Safari';
import { Terminal } from '../windows/Terminal';
import { TxtFile } from '../windows/TxtFile';

/** Small stroked glyphs for window header actions. */
function HeaderIcon({ label, children }: { label: string; children: ComponentChildren }) {
	return (
		<span class='flex h-5 w-5 items-center justify-center text-label-3' role='img' aria-label={label}>
			<svg
				viewBox='0 0 24 24'
				width='16'
				height='16'
				fill='none'
				stroke='currentColor'
				stroke-width='1.7'
				stroke-linecap='round'
				stroke-linejoin='round'>
				{children}
			</svg>
		</span>
	);
}

function DownloadAction({ href }: { href?: string }) {
	if (!href) return null;
	/** Downloading from a button keeps the file out of the prerender crawler. */
	const download = () => {
		const anchor = document.createElement('a');
		anchor.href = href;
		anchor.download = href.split('/').pop() ?? 'download';
		anchor.click();
	};
	return (
		<button
			type='button'
			onClick={download}
			aria-label='Download'
			title='Download'
			class='text-label-3'>
			<HeaderIcon label='Download'>
				<path d='M12 4v10' />
				<path d='M8 10l4 4 4-4' />
				<path d='M5 19h14' />
			</HeaderIcon>
		</button>
	);
}

/** The gallery's two header actions, as in the reference. */
function GalleryActions() {
	return (
		<span class='flex items-center gap-3'>
			<HeaderIcon label='Mail'>
				<rect x='3' y='5' width='18' height='14' rx='2.5' />
				<path d='M3.5 7l8.5 6 8.5-6' />
			</HeaderIcon>
			<HeaderIcon label='Search'>
				<circle cx='11' cy='11' r='7' />
				<path d='M20 20l-3.5-3.5' />
			</HeaderIcon>
		</span>
	);
}

/** Viewer chrome: expand, add, share. */
function ViewerActions() {
	return (
		<span class='flex items-center gap-3'>
			<HeaderIcon label='Expand'>
				<path d='M4 9V5h4M20 15v4h-4M15 4h5v5M9 20H4v-5' />
			</HeaderIcon>
			<HeaderIcon label='Add'>
				<path d='M12 5v14M5 12h14' />
			</HeaderIcon>
			<HeaderIcon label='Share'>
				<path d='M12 15V4M8 8l4-4 4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5' />
			</HeaderIcon>
		</span>
	);
}

export function WindowManager() {
	const { windows } = useWindows();
	const txt = windows.txtfile.data?.file;
	const img = windows.imgfile.data?.file;

	// The finder is worth mounting as soon as any location exists; the file viewers exist to show
	// the files it opens.
	const showFinder = Object.keys(locations).length > 0;

	return (
		<>
			{showFinder && (
				<>
					{/* The finder carries a toolbar icon instead of a centred title. */}
					<Window
						id='finder'
						title={getSection('projects')?.title ?? 'Finder'}
						className='finder'
						showTitle={false}
						headerRight={
							<img src={icon('menubar.search')} alt='' class='h-5 w-5 opacity-70 dark:invert' />
						}>
						<Finder />
					</Window>
					<Window id='txtfile' title={txt?.name ?? 'Untitled.txt'} className='txtfile'>
						<TxtFile />
					</Window>
					<Window id='imgfile' title={img?.name ?? 'Untitled.png'} className='imgfile' showTitle={false} headerRight={<ViewerActions />}>
						<ImgFile />
					</Window>
				</>
			)}

			{hasSection('articles') && (
				<Window
					id='safari'
					title={getSection('articles')?.title ?? 'Articles'}
					className='safari'
					showTitle={false}>
					<Safari />
				</Window>
			)}

			{hasSection('gallery') && (
				<Window
					id='photos'
					title={getSection('gallery')?.title ?? 'Gallery'}
					className='photos'
					headerRight={<GalleryActions />}>
					<Photos />
				</Window>
			)}

			{hasSection('contact') && (
				<Window id='contact' title={getSection('contact')?.title ?? 'Contact'} className='contact'>
					<Contact />
				</Window>
			)}

			{hasSection('skills') && (
				<Window id='terminal' title={getSection('skills')?.title ?? 'Skills'} className='terminal'>
					<Terminal />
				</Window>
			)}

			{hasSection('resume') && (
				<Window
					id='resume'
					title={sectionData.resume?.fileName ?? getSection('resume')?.title ?? 'Resume.pdf'}
					className='resume'
					headerRight={<DownloadAction href={sectionData.resume?.file} />}>
					<Resume />
				</Window>
			)}

			{/* A documentation site is nothing but this reader, so it opens straight away. */}
			{hasDoc && (
				<Window id='docs' title={doc.title} className='docs'>
					<Docs />
				</Window>
			)}
		</>
	);
}
