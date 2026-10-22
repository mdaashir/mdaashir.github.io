import type { ComponentChildren } from 'preact';

import { sectionData } from '../content';

/** A 16px stroked glyph, matching the browser chrome in the reference. */
function Glyph({ children, label }: { children: ComponentChildren; label?: string }) {
	return (
		<span class='safari__tool' role={label ? 'img' : undefined} aria-label={label} aria-hidden={!label}>
			<svg
				viewBox='0 0 24 24'
				width='17'
				height='17'
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

export function Safari() {
	const section = sectionData.articles;
	if (!section) return null;

	return (
		<div>
			<div class='safari__toolbar'>
				<Glyph label='Toggle sidebar'>
					<rect x='3' y='4' width='18' height='16' rx='3' />
					<path d='M9 4v16' />
				</Glyph>
				<Glyph label='Back'>
					<path d='M15 5l-7 7 7 7' />
				</Glyph>
				<Glyph label='Forward'>
					<path d='M9 5l7 7-7 7' />
				</Glyph>
				<Glyph label='Security'>
					<path d='M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z' />
				</Glyph>

				<div class='safari__url'>
					<svg
						viewBox='0 0 24 24'
						width='14'
						height='14'
						fill='none'
						stroke='currentColor'
						stroke-width='2'
						stroke-linecap='round'
						aria-hidden='true'>
						<circle cx='11' cy='11' r='7' />
						<path d='M20 20l-3.5-3.5' />
					</svg>
					<span class='truncate'>{section.url || 'Search or enter website name'}</span>
				</div>

				<Glyph label='Share'>
					<path d='M12 15V4' />
					<path d='M8 8l4-4 4 4' />
					<path d='M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5' />
				</Glyph>
				<Glyph label='New tab'>
					<path d='M12 5v14M5 12h14' />
				</Glyph>
				<Glyph label='Copy link'>
					<rect x='9' y='9' width='11' height='11' rx='2.5' />
					<path d='M15 9V6.5A2.5 2.5 0 0012.5 4H6.5A2.5 2.5 0 004 6.5v6A2.5 2.5 0 006.5 15H9' />
				</Glyph>
			</div>

			<div class='safari__body'>
				{section.heading && (
					<h3
						class='mb-4 text-lg font-bold'
						style={section.headingColor ? { color: section.headingColor } : undefined}>
						{section.heading}
					</h3>
				)}
				<div>
					{section.posts.map((post) => (
						<article key={`${post.title}-${post.link}`} class='article'>
							{post.image && <img src={post.image} alt='' loading='lazy' />}
							<div>
								<p>{post.date}</p>
								<h3>{post.title}</h3>
								{section.cta && (
									<a href={post.link} target='_blank' rel='noopener noreferrer'>
										{section.cta} <span aria-hidden='true'>→</span>
									</a>
								)}
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
