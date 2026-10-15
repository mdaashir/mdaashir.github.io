import { blogPosts } from '../data/blog';

export function Safari() {
	return (
		<div>
			<div class='safari__toolbar'>
				<span class='flex items-center gap-2 text-label-3'>
					<span aria-hidden='true'>‹</span>
					<span aria-hidden='true'>›</span>
				</span>
				<div class='safari__search'>
					<span aria-hidden='true'>🔒</span>
					<span>aashir.dev/articles</span>
				</div>
				<span class='text-label-3' aria-hidden='true'>
					+
				</span>
			</div>

			<div class='safari__body'>
				<h3 class='mb-4 text-lg font-bold text-pink-600'>My Developer Blog</h3>
				<div>
					{blogPosts.map((post) => (
						<article key={post.id} class='article'>
							<img src={post.image} alt='' loading='lazy' />
							<div>
								<p>{post.date}</p>
								<h3>{post.title}</h3>
								<a href={post.link} target='_blank' rel='noopener noreferrer'>
									Check out the full post →
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
