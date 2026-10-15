import { useEffect, useState } from 'preact/hooks';

import { navIcons, navLinks } from '../data/nav';
import { applyTheme, readTheme, toggleTheme, type Theme } from '../lib/theme';
import { useWindows } from '../lib/window-context';

/** "Thu Oct 15 11:07 PM" — the reference's menu-bar clock format. */
function formatClock(date: Date): string {
	return date
		.toLocaleString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
		})
		.replace(/,/g, '');
}

export function Menubar() {
	const { toggle } = useWindows();
	const [theme, setTheme] = useState<Theme>('light');
	const [clock, setClock] = useState('');

	useEffect(() => {
		const initial = readTheme();
		setTheme(initial);
		applyTheme(initial);

		const tick = () => setClock(formatClock(new Date()));
		tick();
		const timer = window.setInterval(tick, 30_000);
		return () => window.clearInterval(timer);
	}, []);

	const onToggleTheme = () => setTheme(toggleTheme(theme));

	return (
		<nav class='menubar' aria-label='Menu bar'>
			<div class='flex items-center gap-2'>
				<img src='/images/logo.svg' alt='' class='h-4 w-4 dark:invert' />
				<span class='text-[0.9375rem] font-bold'>Aashir&rsquo;s Portfolio</span>
				<ul class='ml-2 flex items-center gap-1'>
					{navLinks.map((link) => (
						<li key={link.id}>
							<button
								type='button'
								class='menubar__item'
								onClick={() =>
									toggle(
										link.target,
										link.target === 'finder' ? { location: 'work' } : undefined
									)
								}>
								{link.name}
							</button>
						</li>
					))}
				</ul>
			</div>

			<div class='flex items-center gap-3'>
				<ul class='flex items-center gap-2'>
					{navIcons.map((icon) => (
						<li key={icon.id}>
							<img class='menubar__icon' src={icon.img} alt={icon.label} title={icon.label} />
						</li>
					))}
				</ul>
				<button
					type='button'
					class='menubar__item'
					aria-label='Toggle appearance'
					aria-pressed={theme === 'dark'}
					onClick={onToggleTheme}>
					<img class='menubar__icon' src='/icons/mode.svg' alt='' />
				</button>
				<time class='tabular-nums'>{clock}</time>
			</div>
		</nav>
	);
}
