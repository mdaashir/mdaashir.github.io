import { useState } from 'preact/hooks';

import { gallery, photosLinks } from '../data/gallery';

export function Photos() {
	const [active, setActive] = useState(photosLinks[0].title);

	return (
		<div class='photos__body'>
			<aside class='photos__sidebar'>
				<h4 class='sidebar__heading'>Photos</h4>
				<ul class='space-y-0.5'>
					{photosLinks.map((link) => (
						<li key={link.id}>
							<button
								type='button'
								class={link.title === active ? 'sidebar__item--active' : ''}
								onClick={() => setActive(link.title)}>
								<img src={link.icon} alt='' class='h-4 w-4' />
								<span>{link.title}</span>
							</button>
						</li>
					))}
				</ul>
			</aside>

			<div class='photos__grid'>
				{gallery.map((image) => (
					<img key={image.id} src={image.img} alt={image.alt} loading='lazy' />
				))}
			</div>
		</div>
	);
}
