import { Dock } from './Dock';
import { Menubar } from './Menubar';
import { MobileShell } from './MobileShell';
import { ContextMenuHost } from './ContextMenuHost';
import { DesktopIcons } from './DesktopIcons';
import { Welcome } from './Welcome';
import { WindowManager } from './WindowManager';
import { desktop, desktopInfoFile } from '../content';
import { contentMenu } from '../lib/content-menu';
import { useContextMenu } from '../lib/context-menu';
import { openSection } from '../lib/open-section';
import { useWindows } from '../lib/window-context';

export function Desktop() {
	const windowsApi = useWindows();
	const { openAt } = useContextMenu();

	const backgroundMenu = contentMenu(desktop.contextMenu, (item) => {
		switch (item.action) {
			case 'open': {
				const section = item.section;
				return section ? { onSelect: () => openSection(windowsApi, section) } : undefined;
			}
			case 'info':
				return { onSelect: () => windowsApi.open('txtfile', { file: desktopInfoFile }) };
			default:
				return undefined;
		}
	});

	return (
		<>
			{/* Sits behind everything, so right-clicking empty wallpaper opens the desktop menu. */}
			<div
				class='desktop-surface'
				aria-hidden='true'
				onContextMenu={(event) => openAt(event, backgroundMenu)}
			/>
			<Menubar />
			<Welcome />
			<DesktopIcons />
			<WindowManager />
			<Dock />
			<MobileShell />
			<ContextMenuHost />
		</>
	);
}
