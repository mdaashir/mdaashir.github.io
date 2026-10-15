import { locations, type FolderNode, type TreeNode } from '../data/locations';
import { useWindows } from '../lib/window-context';

/** The project folders shown as desktop shortcuts. */
const desktopNodes = locations.work.children.filter(
	(node): node is FolderNode => node.kind === 'folder'
);

/**
 * `windowPosition` is the desktop-shortcut placement in the reference data
 * (the finder `position` is the in-window icon placement).
 */
const DEFAULT_POSITION = 'top-[5vh] left-5';

export function DesktopIcons() {
	const { open } = useWindows();

	return (
		<section id='desktop-icons' aria-label='Desktop'>
			{desktopNodes.map((folder: TreeNode & Partial<FolderNode>) => (
				<button
					key={folder.id}
					type='button'
					class={`desktop-icon ${folder.windowPosition ?? DEFAULT_POSITION}`}
					onClick={() => open('finder', { location: 'work' })}>
					<img src={folder.icon} alt='' />
					<span>{folder.name}</span>
				</button>
			))}
		</section>
	);
}
