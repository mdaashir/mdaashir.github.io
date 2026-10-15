import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import type { WindowId } from '../data/windows';
import { loadDraggable, loadGsap } from '../lib/gsap';
import { useWindows } from '../lib/window-context';

interface WindowProps {
	id: WindowId;
	title: string;
	className: string;
	/** The reference finder window shows no title, only a toolbar icon. */
	showTitle?: boolean;
	headerRight?: ComponentChildren;
	children: ComponentChildren;
}

export function Window({
	id,
	title,
	className,
	showTitle = true,
	headerRight,
	children,
}: WindowProps) {
	const { windows, close, focus } = useWindows();
	const state = windows[id];
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!state.isOpen || !el) return;

		let instance: { kill: () => void } | null = null;
		let cancelled = false;

		loadGsap()
			.then((gsap) => {
				if (cancelled || !ref.current) return;
				gsap.fromTo(
					ref.current,
					{ scale: 0.94, autoAlpha: 0 },
					{ scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power3.out' }
				);
				return loadDraggable();
			})
			.then((Draggable) => {
				if (cancelled || !Draggable || !ref.current) return;
				instance = Draggable.create(ref.current, {
					type: 'x,y',
					trigger: ref.current.querySelector('.window-header'),
					onPress: () => focus(id),
					cursor: 'grabbing',
				})[0];
			})
			.catch(() => undefined);

		return () => {
			cancelled = true;
			instance?.kill();
		};
	}, [state.isOpen, id, focus]);

	const handleClose = () => {
		const el = ref.current;
		if (!el) {
			close(id);
			return;
		}
		loadGsap()
			.then((gsap) =>
				gsap.to(el, {
					scale: 0.94,
					autoAlpha: 0,
					duration: 0.18,
					ease: 'power2.in',
					onComplete: () => close(id),
				})
			)
			.catch(() => close(id));
	};

	return (
		<section
			ref={ref}
			class={`window ${className}`}
			style={{ zIndex: state.zIndex, display: state.isOpen ? 'block' : 'none' }}
			aria-hidden={!state.isOpen}
			onPointerDown={() => focus(id)}>
			<header class='window-header'>
				<div class='window-controls'>
					<button
						type='button'
						class='close'
						aria-label={`Close ${title}`}
						onClick={handleClose}
					/>
					<span class='minimize' aria-hidden='true' />
					<span class='maximize' aria-hidden='true' />
				</div>
				{showTitle && <h2 class='window-title'>{title}</h2>}
				<div class='flex h-6 w-9 items-center justify-end'>{headerRight}</div>
			</header>
			<div class='window-body'>{children}</div>
		</section>
	);
}
