import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

export function Work() {
	return (
		<section className='pb-24 pt-32'>
			<div className='container-page'>
				<header className='max-w-2xl'>
					<p className='eyebrow'>Portfolio</p>
					<h1 className='mt-4 text-4xl font-bold sm:text-5xl'>Work</h1>
					<p className='mt-5 text-lg text-muted'>
						A selection of projects I've designed and built, from web applications
						to mobile experiences.
					</p>
				</header>
				<div className='mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{projects.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
