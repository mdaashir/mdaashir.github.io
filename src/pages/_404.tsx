export function NotFound() {
	return (
		<section className='flex min-h-[70vh] items-center pt-16'>
			<div className='container-page text-center'>
				<p className='text-6xl font-bold text-accent'>404</p>
				<h1 className='mt-4 text-2xl font-semibold'>Page not found</h1>
				<p className='mt-3 text-muted'>
					The page you were looking for doesn't exist or has moved.
				</p>
				<a href='/' className='btn-primary mt-8'>
					Back to home
				</a>
			</div>
		</section>
	);
}
