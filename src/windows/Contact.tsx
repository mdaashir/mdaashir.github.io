import { socials } from '../data/socials';

export function Contact() {
	return (
		<div class='contact__body'>
			<div class='flex items-center gap-4'>
				<img class='contact__avatar' src='/images/adrian.jpg' alt='' loading='lazy' />
				<div>
					<h3 class='text-lg font-semibold'>Let&rsquo;s connect</h3>
					<p class='text-sm text-label-2 dark:text-dark-100'>
						Got an idea, a bug to squash, or just want to talk tech? I&rsquo;m in.
					</p>
				</div>
			</div>

			<ul class='contact__tiles'>
				{socials.map((social) => (
					<li key={social.id}>
						<a
							class='contact__tile'
							href={social.link}
							target='_blank'
							rel='noopener noreferrer'
							style={{ backgroundColor: social.bg }}>
							<img src={social.icon} alt='' loading='lazy' />
							<span>{social.text}</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
