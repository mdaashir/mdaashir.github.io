import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

const NAV_ITEMS = [
	{ label: 'Home', href: '/' },
	{ label: 'Work', href: '/work' },
	{ label: 'About', href: '/about' },
	{ label: 'Blog', href: '/blogs' },
];

function isActive(path: string, href: string) {
	if (href === '/') return path === '/';
	return path === href || path.startsWith(`${href}/`);
}

export function NavBar() {
	const { path } = useLocation();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [path]);

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open]);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
				scrolled
					? 'border-line bg-base/80 backdrop-blur'
					: 'border-transparent bg-transparent'
			}`}>
			<nav
				className='container-page flex h-16 items-center justify-between'
				aria-label='Primary'>
				<a
					href='/'
					className='text-sm font-bold uppercase tracking-[0.2em] text-foreground'
					onClick={() => setOpen(false)}>
					Mohamed<span className='text-accent'>.</span>
				</a>

				<ul className='hidden items-center gap-1 md:flex'>
					{NAV_ITEMS.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								aria-current={isActive(path, item.href) ? 'page' : undefined}
								className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
									isActive(path, item.href)
										? 'text-accent'
										: 'text-muted hover:text-foreground'
								}`}>
								{item.label}
							</a>
						</li>
					))}
					<li>
						<a href='/#contact' className='btn-primary ml-2 px-4 py-2'>
							Contact
						</a>
					</li>
				</ul>

				<button
					type='button'
					className='inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden'
					aria-label={open ? 'Close menu' : 'Open menu'}
					aria-expanded={open}
					aria-controls='mobile-nav'
					onClick={() => setOpen((value) => !value)}>
					<span aria-hidden='true' className='text-xl'>
						{open ? '✕' : '☰'}
					</span>
				</button>
			</nav>

			<div
				id='mobile-nav'
				hidden={!open}
				className='border-t border-line bg-base md:hidden'>
				<ul className='container-page flex flex-col gap-1 py-4'>
					{NAV_ITEMS.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								aria-current={isActive(path, item.href) ? 'page' : undefined}
								className={`block rounded-md px-3 py-3 text-base font-medium ${
									isActive(path, item.href) ? 'text-accent' : 'text-muted'
								}`}
								onClick={() => setOpen(false)}>
								{item.label}
							</a>
						</li>
					))}
					<li>
						<a
							href='/#contact'
							className='btn-primary mt-2 w-full'
							onClick={() => setOpen(false)}>
							Contact
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
}
