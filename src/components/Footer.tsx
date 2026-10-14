export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className='border-t border-line'>
			<div className='container-page flex flex-col items-center justify-between gap-4 py-10 sm:flex-row'>
				<p className='text-sm text-muted'>© {year} Mohamed Aashir S</p>
				<div className='flex gap-6 text-sm'>
					<a
						href='mailto:s.mohamedaashir@gmail.com'
						className='text-muted transition-colors hover:text-foreground'>
						Email
					</a>
					<a
						href='https://github.com/mdaashir'
						target='_blank'
						rel='noreferrer'
						className='text-muted transition-colors hover:text-foreground'>
						GitHub
					</a>
					<a
						href='https://mdaashir.tech/'
						target='_blank'
						rel='noreferrer'
						className='text-muted transition-colors hover:text-foreground'>
						Website
					</a>
				</div>
			</div>
		</footer>
	);
}
