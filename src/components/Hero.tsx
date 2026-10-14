import { TypeAnimation } from 'react-type-animation';

export function Hero() {
	return (
		<section className='relative flex min-h-[90vh] items-center overflow-hidden pt-16'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]'
			/>
			<div className='container-page relative'>
				<div className='max-w-3xl animate-fade-up'>
					<p className='eyebrow'>Full-Stack Developer</p>
					<h1 className='mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl'>
						Hi, I'm <span className='text-accent'>Mohamed Aashir S</span>
					</h1>
					<div className='mt-6 flex flex-wrap items-baseline text-2xl font-semibold sm:text-3xl'>
						<span className='text-muted'>I build&nbsp;</span>
						<TypeAnimation
							sequence={[
								'web applications',
								1600,
								'developer tools',
								1600,
								'mobile experiences',
								1600,
								'clean interfaces',
								1600,
							]}
							wrapper='span'
							speed={50}
							repeat={Infinity}
							className='text-accent'
							style={{ display: 'inline-block', minWidth: '11ch' }}
						/>
					</div>
					<p className='mt-6 max-w-2xl text-lg text-muted'>
						A tech enthusiast with a passion for building. With a background in
						full-stack web and native app development, I craft clean, reliable
						software that solves real problems.
					</p>
					<div className='mt-10 flex flex-col gap-4 sm:flex-row'>
						<a href='/work' className='btn-primary'>
							View my work
						</a>
						<a href='/#contact' className='btn-secondary'>
							Get in touch
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
