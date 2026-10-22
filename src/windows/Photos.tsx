import { useState } from 'preact/hooks';

import { sectionData } from '../content';
import { useWindows } from '../lib/window-context';

export function Photos() {
	const section = sectionData.gallery;
	const [active, setActive] = useState(section?.albums[0]?.title ?? '');
	const { open } = useWindows();

	if (!section) return null;

	/** A photo opens in the same viewer window the Finder uses. */
	const openPhoto = (photo: { src: string; alt?: string }) => {
		const name = photo.src.split('/').pop() ?? photo.alt ?? 'image';
		open('imgfile', {
			file: {
				id: photo.src,
				name,
				icon: photo.src,
				kind: 'file',
				fileType: 'img',
				imageUrl: photo.src,
			},
		});
	};

	return (
		<div class='photos__body'>
			{section.albums.length > 0 && (
				<aside class='photos__sidebar'>
					{section.sidebarHeading && (
						<h4 class='sidebar__heading'>{section.sidebarHeading}</h4>
					)}
					<ul class='space-y-0.5'>
						{section.albums.map((album) => (
							<li key={album.title}>
								<button
									type='button'
									class={album.title === active ? 'sidebar__item--active' : ''}
									onClick={() => setActive(album.title)}>
									<img src={album.icon} alt='' class='h-4 w-4' />
									<span>{album.title}</span>
								</button>
							</li>
						))}
					</ul>
				</aside>
			)}

			<div class='photos__grid'>
				{section.photos.map((photo) => (
					<img
						key={photo.src}
						src={photo.src}
						alt={photo.alt ?? ''}
						loading='lazy'
						role='button'
						tabIndex={0}
						onClick={() => openPhoto(photo)}
						onKeyDown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') openPhoto(photo);
						}}
					/>
				))}
			</div>
		</div>
	);
}
