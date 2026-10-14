import type { Project } from '../data/projects';

export function ProjectCard({ project }: { project: Project }) {
	return (
		<article className='card flex flex-col'>
			<div className='mb-5 flex h-40 items-center justify-center rounded-lg border border-line bg-elevated'>
				<span className='text-5xl font-bold text-accent/25'>
					{project.title.charAt(0)}
				</span>
			</div>
			<h3 className='text-lg font-semibold text-foreground'>{project.title}</h3>
			<p className='mt-2 flex-1 text-sm text-muted'>{project.description}</p>
			<div className='mt-5 flex flex-wrap gap-2'>
				{project.tags.map((tag) => (
					<span key={tag} className='tag'>
						{tag}
					</span>
				))}
			</div>
			{(project.link || project.repo) && (
				<div className='mt-6 flex gap-5 text-sm font-semibold'>
					{project.link && (
						<a
							href={project.link}
							target='_blank'
							rel='noreferrer'
							className='text-accent transition-colors hover:text-accent-hover'>
							Live site ↗
						</a>
					)}
					{project.repo && (
						<a
							href={project.repo}
							target='_blank'
							rel='noreferrer'
							className='text-muted transition-colors hover:text-foreground'>
							Source ↗
						</a>
					)}
				</div>
			)}
		</article>
	);
}
