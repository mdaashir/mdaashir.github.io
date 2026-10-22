import { useEffect, useRef } from 'preact/hooks';

import { profile } from '../content';
import { loadGsap } from '../lib/gsap';

/** Optional hero settings, so the typeface and the second phrase come from JSON. */
const hero = profile as typeof profile & {
	welcome?: string;
	headlineFont?: string;
	headlineItalic?: boolean;
};

function Letters({ text, className }: { text: string; className: string }) {
	return (
		<>
			{[...text].map((char, index) => (
				<span key={`${char}-${index}`} class={`hero-letter ${className}`} data-letter>
					{char === ' ' ? '\u00a0' : char}
				</span>
			))}
		</>
	);
}

export function Welcome() {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		let tween: { kill: () => void } | null = null;
		let cancelled = false;

		loadGsap()
			.then((gsap) => {
				if (cancelled) return;
				const letters = root.querySelectorAll<HTMLElement>('[data-letter]');
				if (!letters.length) return;
				tween = gsap.fromTo(
					letters,
					{ fontVariationSettings: '"wght" 120', y: 6, autoAlpha: 0.5 },
					{
						fontVariationSettings: '"wght" 420',
						y: 0,
						autoAlpha: 1,
						duration: 1.1,
						ease: 'power2.out',
						stagger: { each: 0.03, from: 'start' },
						repeat: -1,
						repeatDelay: 2.4,
						yoyo: true,
					}
				);
			})
			.catch(() => undefined);

		return () => {
			cancelled = true;
			tween?.kill();
		};
	}, []);

	/*
	 * A lens: letters close to the pointer swell, and the effect falls off with distance, so the
	 * magnified patch follows the cursor across either line.
	 */
	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		const letters = () => Array.from(root.querySelectorAll<HTMLElement>('[data-letter]'));
		const SIGMA = 70;
		const PEAK = 0.26;

		const magnify = (event: MouseEvent) => {
			for (const letter of letters()) {
				const box = letter.getBoundingClientRect();
				const dx = event.clientX - (box.left + box.width / 2);
				const dy = event.clientY - (box.top + box.height / 2);
				const distance = Math.hypot(dx, dy);
				const scale = 1 + PEAK * Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
				letter.style.transform = `scale(${scale.toFixed(3)})`;
			}
		};

		const reset = () => {
			for (const letter of letters()) letter.style.transform = '';
		};

		root.addEventListener('mousemove', magnify);
		root.addEventListener('mouseleave', reset);
		return () => {
			root.removeEventListener('mousemove', magnify);
			root.removeEventListener('mouseleave', reset);
		};
	}, []);

	return (
		<section id='welcome' ref={ref} class='abs-center col-center px-6 text-center'>
			<p class='whitespace-nowrap text-3xl max-sm:text-2xl'>
				<Letters text={profile.greeting} className='font-sf' />
				{hero.welcome && <span class='hero-welcome'> {hero.welcome}</span>}
			</p>
			{/* Figma: the hero word is 100px, in a display face chosen in content/profile.json. */}
			<h1
				class='mt-2 whitespace-nowrap text-[6.25rem] leading-[1.1] max-sm:text-7xl'
				style={{
					fontFamily: hero.headlineFont || undefined,
					fontStyle: hero.headlineItalic ? 'italic' : undefined,
					fontWeight: hero.headlineItalic ? 800 : undefined,
				}}>
				<Letters text={profile.headline} className='font-playwrite' />
			</h1>
		</section>
	);
}
