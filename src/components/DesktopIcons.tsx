import { locations, type TreeNode } from '../data/locations';
import { useWindows } from '../lib/window-context';

/** The three project folders shown as desktop shortcuts. */
const desktopNodes = locations.work.children.filter(
	(node): node is Extract<TreeNode, { kind: 'folder' }> => node.kind === 'folder'
);

function toPositionClass(position?: string) {
	return position ?? 'top-10 left-5';
}

export function DesktopIcons() {
	const { open } = useWindows();

	return (
		<section id='desktop-icons' aria-label='Desktop'>
			{desktopNodes.map((folder) => (
				<button
					key={folder.id}
					type='button'
					class={`desktop-icon ${toPositionClass(folder.position)}`}
					onDblClick={() => open('finder', { location: 'work' })}
					onClick={() => open('finder', { location: 'work' })}>
					<img src={folder.icon} alt='' />
					<span>{folder.name}</span>
				</button>
			))}
		</section>
	);
}
