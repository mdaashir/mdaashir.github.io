import { formatDate, posts } from '../lib/posts';

export function Blogs() {
	return (
		<section className='pb-24 pt-32'>
			<div className='container-page'>
				<header className='max-w-2xl'>
					<p className='eyebrow'>Writing</p>
					<h1 className='mt-4 text-4xl font-bold sm:text-5xl'>Blog</h1>
					<p className='mt-5 text-lg text-muted'>
						Notes on software, tooling, and building things for the web.
					</p>
				</header>

				{posts.length === 0 ? (
					<p className='mt-12 text-muted'>No posts yet — check back soon.</p>
				) : (
					<ul className='mt-14 space-y-6'>
						{posts.map((post) => (
							<li key={post.slug}>
								<a href={`/blogs/${post.slug}`} className='card block'>
									<div className='flex flex-wrap items-center gap-x-3 text-xs text-muted'>
										<time dateTime={post.date}>{formatDate(post.date)}</time>
										<span aria-hidden='true'>·</span>
										<span>{post.readingTime} min read</span>
									</div>
									<h2 className='mt-3 text-xl font-semibold text-foreground'>
										{post.title}
									</h2>
									<p className='mt-2 text-muted'>{post.excerpt}</p>
									<div className='mt-4 flex flex-wrap gap-2'>
										{post.tags.map((tag) => (
											<span key={tag} className='tag'>
												{tag}
											</span>
										))}
									</div>
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
