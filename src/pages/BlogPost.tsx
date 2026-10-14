import { useRoute } from 'preact-iso';
import { getPost } from '../lib/blog';
import { formatDate, posts } from '../lib/posts';
import { NotFound } from './_404';

export function BlogPost() {
	const { params } = useRoute();
	const slug = (params as Record<string, string> | undefined)?.slug ?? '';
	const post = getPost(slug);

	if (!post) return <NotFound />;

	const index = posts.findIndex((entry) => entry.slug === slug);
	const newer = index > 0 ? posts[index - 1] : undefined;
	const older = index < posts.length - 1 ? posts[index + 1] : undefined;

	return (
		<article className='pb-24 pt-32'>
			<div className='container-page max-w-3xl'>
				<a
					href='/blogs'
					className='text-sm font-semibold text-accent transition-colors hover:text-accent-hover'>
					← All posts
				</a>

				<header className='mt-8'>
					<div className='flex flex-wrap items-center gap-x-3 text-sm text-muted'>
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						<span aria-hidden='true'>·</span>
						<span>{post.readingTime} min read</span>
					</div>
					<h1 className='mt-4 text-3xl font-bold leading-tight sm:text-4xl'>
						{post.title}
					</h1>
					<div className='mt-5 flex flex-wrap gap-2'>
						{post.tags.map((tag) => (
							<span key={tag} className='tag'>
								{tag}
							</span>
						))}
					</div>
				</header>

				<div
					className='article-body mt-10'
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>

				{(older || newer) && (
					<nav
						aria-label='More posts'
						className='mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between'>
						{older && (
							<a href={`/blogs/${older.slug}`} className='group'>
								<span className='text-xs uppercase tracking-wide text-muted'>
									Previous
								</span>
								<span className='mt-1 block font-medium text-foreground group-hover:text-accent'>
									← {older.title}
								</span>
							</a>
						)}
						{newer && (
							<a href={`/blogs/${newer.slug}`} className='group sm:text-right'>
								<span className='text-xs uppercase tracking-wide text-muted'>
									Next
								</span>
								<span className='mt-1 block font-medium text-foreground group-hover:text-accent'>
									{newer.title} →
								</span>
							</a>
						)}
					</nav>
				)}
			</div>
		</article>
	);
}
