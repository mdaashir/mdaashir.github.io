import { techStack } from '../data/techstack';

export function Terminal() {
	return (
		<div class='terminal__body'>
			<p>
				<span class='font-bold'>@aashir %</span> show tech stack
			</p>

			<div class='terminal__row mt-5 opacity-70'>
				<span class='font-semibold'>Category</span>
				<span>Technologies</span>
			</div>

			<ul class='terminal__list'>
				{techStack.map((group) => (
					<li key={group.category} class='flex items-start gap-3'>
						<span aria-hidden='true'>✓</span>
						<span class='w-24 flex-none font-semibold'>{group.category}</span>
						<span class='opacity-90'>{group.items.join(', ')}</span>
					</li>
				))}
			</ul>

			<div class='terminal__footnote'>
				<p>
					<span aria-hidden='true'>✓</span>{' '}
					{techStack.length} of {techStack.length} stacks loaded successfully (100%)
				</p>
				<p>
					<span aria-hidden='true'>⚑</span> Render time: 6ms
				</p>
			</div>
		</div>
	);
}
