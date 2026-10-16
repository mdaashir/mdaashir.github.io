import { useEffect, useRef } from 'preact/hooks';

import { locations, type FileNode, type FolderNode } from '../data/locations';
import { useContextMenu } from '../lib/context-menu';
import { loadDraggable } from '../lib/gsap';
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
	const { openAt } = useContextMenu();
	const rootRef = useRef<HTMLElement>(null);
	const draggedRef = useRef(false);

	// Desktop icons are freely draggable around the desktop.
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		let cancelled = false;
		let instances: { kill: () => void }[] = [];

		loadDraggable()
			.then((Draggable) => {
				if (cancelled || !root) return;
				instances = Array.from(root.querySelectorAll<HTMLElement>('.desktop-icon')).map(
					(element) =>
						Draggable.create(element, {
							type: 'x,y',
							bounds: root,
							onDragStart: () => {
								draggedRef.current = true;
							},
							onDragEnd: () => {
								window.setTimeout(() => {
									draggedRef.current = false;
								}, 120);
							},
						})[0]
				);
			})
			.catch(() => undefined);

		return () => {
			cancelled = true;
			instances.forEach((instance) => instance.kill());
		};
	}, []);

	const showInfo = (folder: FolderNode) => {
		const files = folder.children.filter((child) => child.kind === 'file').length;
		const info: FileNode = {
			id: folder.id,
			name: `${folder.name}.txt`,
			icon: '/images/txt.png',
			kind: 'file',
			fileType: 'txt',
			subtitle: folder.name,
			description: [
				`${files} items in this project folder.`,
				'Open it from the Portfolio window. Icons on the desktop can be dragged anywhere.',
			],
		};
		open('txtfile', { file: info });
	};

	return (
		<section id='desktop-icons' aria-label='Desktop' ref={rootRef}>
			{desktopNodes.map((folder) => (
				<button
					key={folder.id}
					type='button'
					class={`desktop-icon ${folder.windowPosition ?? DEFAULT_POSITION}`}
					onClick={() => {
						if (draggedRef.current) return;
						open('finder', { location: 'work' });
					}}
					onContextMenu={(event) =>
						openAt(event, [
							{ label: 'Open', onSelect: () => open('finder', { location: 'work' }) },
							{ label: 'Open in New Window', disabled: true },
							{ separator: true },
							{ label: 'Get Info', hint: '⌘I', onSelect: () => showInfo(folder) },
							{ label: 'Rename', disabled: true },
							{ separator: true },
							{ label: 'Move to Trash', hint: '⌘⌫', disabled: true },
						])
					}>
					<img src={folder.icon} alt='' />
					<span>{folder.name}</span>
				</button>
			))}
		</section>
	);
}
