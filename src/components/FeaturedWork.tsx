import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function FeaturedWork() {
	const featured = projects.filter((project) => project.featured);
	const list = (featured.length ? featured : projects).slice(0, 3);

	return (
		<section id='work' className='section border-t border-line'>
			<div className='container-page'>
				<div className='flex flex-wrap items-end justify-between gap-4'>
					<div>
						<p className='eyebrow'>Selected work</p>
						<h2 className='mt-3 text-3xl font-bold sm:text-4xl'>
							Things I've built
						</h2>
					</div>
					<a
						href='/work'
						className='text-sm font-semibold text-accent transition-colors hover:text-accent-hover'>
						View all work →
					</a>
				</div>
				<div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{list.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
