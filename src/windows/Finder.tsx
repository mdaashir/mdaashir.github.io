import { useEffect, useState } from 'preact/hooks';

import {
	locations,
	type FolderNode,
	type LocationId,
	type TreeNode,
} from '../data/locations';
import { useWindows } from '../lib/window-context';

const SIDEBAR: LocationId[] = ['work', 'about', 'resume', 'trash'];

function isFolder(node: TreeNode): node is FolderNode {
	return node.kind === 'folder';
}

export function Finder() {
	const { windows, open } = useWindows();
	const payload = windows.finder.data;
	const [locationId, setLocationId] = useState<LocationId>('work');
	const [folder, setFolder] = useState<FolderNode | null>(null);

	useEffect(() => {
		if (!payload?.location) return;
		setLocationId(payload.location);
		setFolder(null);
	}, [payload?.location]);

	const location = locations[locationId];
	const children = folder ? folder.children : location.children;

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

	return (
		<div class='finder__body'>
			<aside class='sidebar'>
				<p class='sidebar__heading'>Favorites</p>
				<ul class='space-y-0.5'>
					{SIDEBAR.map((id) => (
						<li key={id}>
							<button
								type='button'
								class={`sidebar__item ${
									locationId === id && !folder ? 'sidebar__item--active' : ''
								}`}
								onClick={() => {
									setLocationId(id);
									setFolder(null);
								}}>
								<img src={locations[id].icon} alt='' />
								<span class='truncate'>{locations[id].name}</span>
							</button>
						</li>
					))}
				</ul>

				<p class='sidebar__heading'>{folder ? folder.name : location.name}</p>
				<ul class='space-y-0.5'>
					{children
						.filter((node) => node.kind === 'folder')
						.map((node) => (
							<li key={`side-${node.id}-${node.name}`}>
								<button
									type='button'
									class='sidebar__item'
									onClick={() => setFolder(node as FolderNode)}>
									<img src={node.icon} alt='' />
									<span class='truncate'>{node.name}</span>
								</button>
							</li>
						))}
				</ul>
			</aside>

			<div class='finder__content'>
				{folder && (
					<button type='button' class='finder__back' onClick={() => setFolder(null)}>
						‹ {location.name}
					</button>
				)}
				<ul>
					{children.map((node) => (
						<li key={`${node.kind}-${node.id}-${node.name}`}>
							<button
								type='button'
								class={`finder__item ${node.position ?? ''}`}
								onClick={() => activate(node)}>
								<img src={node.icon} alt='' />
								<span>{node.name}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
