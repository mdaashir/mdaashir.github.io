const SKILLS = [
	{ title: 'Frontend', items: ['React', 'Preact', 'TypeScript', 'Tailwind CSS'] },
	{ title: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Databases'] },
	{ title: 'Mobile', items: ['React Native', 'Flutter'] },
	{ title: 'Tooling', items: ['Git', 'Vite', 'Docker'] },
];

export function About() {
	return (
		<section className='pb-24 pt-32'>
			<div className='container-page'>
				<p className='eyebrow'>About</p>
				<h1 className='mt-4 text-4xl font-bold sm:text-5xl'>About me</h1>
				<div className='mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]'>
					<div>
						<div className='space-y-6 text-lg text-muted'>
							<p>
								I'm a tech enthusiast with a passion for building. With a
								background in full-stack web and native app development, I enjoy
								turning ideas into clean, reliable software.
							</p>
							<p>
								I work across the stack — from polished interfaces to the APIs
								behind them — and I care about the details that make a product
								feel considered: performance, accessibility, and clarity.
							</p>
						</div>
						<div className='mt-10 grid gap-4 sm:grid-cols-2'>
							{SKILLS.map((skill) => (
								<div key={skill.title} className='card'>
									<h3 className='font-semibold text-foreground'>
										{skill.title}
									</h3>
									<p className='mt-2 text-sm text-muted'>
										{skill.items.join(' · ')}
									</p>
								</div>
							))}
						</div>
					</div>
					<aside className='card flex h-fit flex-col items-center text-center'>
						<div className='flex h-28 w-28 items-center justify-center rounded-full border border-line bg-elevated text-3xl font-bold text-accent'>
							MA
						</div>
						<p className='mt-6 font-semibold text-foreground'>Mohamed Aashir S</p>
						<p className='text-sm text-muted'>Full-Stack Developer</p>
						<a href='/#contact' className='btn-primary mt-6 w-full'>
							Get in touch
						</a>
					</aside>
				</div>
			</div>
		</section>
	);
}
