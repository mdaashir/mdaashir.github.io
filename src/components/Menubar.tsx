import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';

import { Calendar } from './Calendar';
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
	const { toggle, closeAll } = useWindows();
	const { path, route } = useLocation();
	const [theme, setTheme] = useState<Theme>('light');
	const [clock, setClock] = useState('');
	const [showCalendar, setShowCalendar] = useState(false);

	/** The Apple logo and the brand name both clear the desktop. */
	const closeAllWindows = () => {
		closeAll();
		if (path !== '/') route('/');
	};

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
		<>
			<nav class='menubar' aria-label='Menu bar'>
				<div class='flex items-center gap-1'>
					<button
						type='button'
						class='menubar__item'
						aria-label='Close all windows'
						title='Close all windows'
						onClick={closeAllWindows}>
						<img src='/images/logo.svg' alt='' class='h-4 w-4 dark:invert' />
					</button>
					<button
						type='button'
						class='menubar__item text-[0.9375rem] font-bold'
						title='Close all windows'
						onClick={closeAllWindows}>
						Aashir&rsquo;s Portfolio
					</button>
					<ul class='ml-3 flex items-center gap-5'>
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
								<img
									class='menubar__icon'
									src={icon.img}
									alt={icon.label}
									title={icon.label}
								/>
							</li>
						))}
					</ul>
					<button
						type='button'
						class='menubar__item menubar__item--icon'
						aria-label='Toggle appearance'
						aria-pressed={theme === 'dark'}
						onClick={onToggleTheme}>
						<img class='menubar__icon' src='/icons/mode.svg' alt='' />
					</button>
					<button
						type='button'
						class='menubar__item clock'
						aria-haspopup='dialog'
						aria-expanded={showCalendar}
						onClick={() => setShowCalendar(true)}>
						{clock}
					</button>
				</div>
			</nav>
			{showCalendar && <Calendar onClose={() => setShowCalendar(false)} />}
		</>
	);
}
