import { useEffect, useRef, useState } from 'preact/hooks';

import {
	LOCATION_ORDER,
	locations,
	sectionData,
	site,
	type FolderNode,
	type LocationId,
	type TreeNode,
} from '../content';
import { useContextMenu } from '../lib/context-menu';
import { loadDraggable } from '../lib/gsap';
import { useWindows } from '../lib/window-context';

const FAVORITES_HEADING = sectionData.projects?.sidebarHeading ?? 'Favorites';

/** Locations that actually exist, in sidebar order. */
const available: LocationId[] = LOCATION_ORDER.filter((id) => locations[id]);
const fallback: LocationId = available[0] ?? 'work';

function isFolder(node: TreeNode): node is FolderNode {
	return node.kind === 'folder';
}

export function Finder() {
	const { windows, open } = useWindows();
	const { openAt } = useContextMenu();
	const payload = windows.finder.data;
	const [selected, setSelected] = useState<LocationId>(fallback);
	const [folder, setFolder] = useState<FolderNode | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const draggedRef = useRef(false);

	useEffect(() => {
		const requested = payload?.location;
		if (!requested) return;
		setSelected(available.includes(requested) ? requested : fallback);
		setFolder(null);
	}, [payload?.location]);

	const locationId = available.includes(selected) ? selected : fallback;
	const location = locations[locationId];
	const children = folder ? folder.children : (location?.children ?? []);
	const viewKey = `${locationId}:${folder?.id ?? 'root'}`;

	// Icons inside the finder can be repositioned within the content area.
	useEffect(() => {
		const content = contentRef.current;
		if (!content) return;

		let cancelled = false;
		let instances: { kill: () => void }[] = [];

		loadDraggable()
			.then((Draggable) => {
				if (cancelled || !content) return;
				instances = Array.from(content.querySelectorAll<HTMLElement>('.finder__item')).map(
					(element) =>
						Draggable.create(element, {
							type: 'x,y',
							bounds: content,
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
	}, [viewKey]);

	if (!location) return null;

	const activate = (node: TreeNode) => {
		if (isFolder(node)) {
			setFolder(node);
			return;
		}
		switch (node.fileType) {
			case 'txt':
				open('txtfile', { file: node });
				break;
			case 'img':
				open('imgfile', { file: node });
				break;
			case 'pdf':
				open('resume');
				break;
			default:
				if (node.href) window.open(node.href, '_blank', 'noopener,noreferrer');
		}
	};

	const menuFor = (node: TreeNode) => {
		if (isFolder(node)) {
			return [
				{ label: 'Open', onSelect: () => setFolder(node) },
				{ label: 'Open in New Window', disabled: true },
				{ separator: true as const },
				{ label: 'Rename', disabled: true },
				{ separator: true as const },
				{ label: 'Move to Trash', disabled: true },
			];
		}
		return [
			{ label: 'Open', onSelect: () => activate(node) },
			{ label: 'Open in New Window', disabled: true },
			{ separator: true as const },
			{ label: 'Get Info', hint: '⌘I', onSelect: () => open('txtfile', { file: node }) },
			{ separator: true as const },
			{ label: 'Move to Trash', hint: '⌘⌫', disabled: true },
		];
	};

	return (
		<div class='finder__body'>
			<aside class='sidebar'>
				<p class='sidebar__heading'>{FAVORITES_HEADING}</p>
				<ul class='space-y-0.5'>
					{available.map((id) => (
						<li key={id}>
							<button
								type='button'
								class={`sidebar__item ${locationId === id && !folder ? 'sidebar__item--active' : ''}`}
								onClick={() => {
									setSelected(id);
									setFolder(null);
								}}>
								<img src={locations[id]?.icon} alt='' />
								<span class='truncate'>{locations[id]?.name}</span>
							</button>
						</li>
					))}
				</ul>

				{children.some(isFolder) && (
					<>
						<p class='sidebar__heading'>{folder ? folder.name : location.name}</p>
						<ul class='space-y-0.5'>
							{children.filter(isFolder).map((node) => (
								<li key={`side-${node.id}`}>
									<button type='button' class='sidebar__item' onClick={() => setFolder(node)}>
										<img src={node.icon} alt='' />
										<span class='truncate'>{node.name}</span>
									</button>
								</li>
							))}
						</ul>
					</>
				)}
			</aside>

			<div class='finder__content' ref={contentRef}>
				{folder && (
					<button type='button' class='finder__back' onClick={() => setFolder(null)}>
						‹ {location.name}
					</button>
				)}
				{children.length > 0 ? (
					<ul>
						{children.map((node) => (
							<li key={`${node.kind}-${node.id}`}>
								<button
									type='button'
									class={`finder__item ${node.position ?? ''}`}
									onClick={() => {
										if (draggedRef.current) return;
										activate(node);
									}}
									onContextMenu={(event) => openAt(event, menuFor(node))}>
									<img src={node.icon} alt='' />
									<span>{node.name}</span>
								</button>
							</li>
						))}
					</ul>
				) : (
					folder && <p class='finder__empty'>{site.ui.emptyFolder}</p>
				)}
			</div>
		</div>
	);
}
