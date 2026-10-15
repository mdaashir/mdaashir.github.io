import { useEffect, useRef, useState } from 'preact/hooks';

import { RESUME_FILE } from '../data/locations';
import { renderFirstPage } from '../lib/pdf';

type Status = 'loading' | 'ready' | 'error';

export function Resume() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [status, setStatus] = useState<Status>('loading');

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let cancelled = false;
		renderFirstPage(RESUME_FILE, canvas)
			.then(() => {
				if (!cancelled) setStatus('ready');
			})
			.catch(() => {
				if (!cancelled) setStatus('error');
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<div class='resume__body'>
			{status === 'error' ? (
				<div class='p-8 text-center text-sm text-white/80'>
					<p>Couldn&rsquo;t render the PDF inline.</p>
					<a
						class='mt-3 inline-block underline'
						href={RESUME_FILE}
						target='_blank'
						rel='noopener noreferrer'>
						Open the résumé
					</a>
				</div>
			) : (
				<>
					{status === 'loading' && (
						<p class='p-6 text-center text-sm text-white/70'>Loading résumé…</p>
					)}
					<canvas ref={canvasRef} class='resume__canvas' />
				</>
			)}
		</div>
	);
}
