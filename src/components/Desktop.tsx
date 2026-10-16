import { Dock } from './Dock';
import { Menubar } from './Menubar';
import { MobileShell } from './MobileShell';
import { ContextMenuHost } from './ContextMenuHost';
import { DesktopIcons } from './DesktopIcons';
import { Welcome } from './Welcome';
import { WindowManager } from './WindowManager';
import { useContextMenu } from '../lib/context-menu';
import { useWindows } from '../lib/window-context';

export function Desktop() {
	const { open } = useWindows();
	const { openAt } = useContextMenu();

	return (
		<>
			{/* Sits behind everything, so right-clicking empty wallpaper opens the desktop menu. */}
			<div
				class='desktop-surface'
				aria-hidden='true'
				onContextMenu={(event) =>
					openAt(event, [
						{ label: 'New Folder', disabled: true },
						{ separator: true },
						{ label: 'Open Projects', onSelect: () => open('finder', { location: 'work' }) },
						{ label: 'Show Skills', onSelect: () => open('terminal') },
						{
							label: 'Get Info',
							onSelect: () =>
								open('txtfile', {
									file: {
										id: 0,
										name: 'Desktop.txt',
										icon: '/images/txt.png',
										kind: 'file',
										fileType: 'txt',
										subtitle: 'macOS Portfolio',
										description: [
											'Double-click a desktop icon to open it — icons can be dragged anywhere.',
											'Right-click for options, and use the dock along the bottom.',
										],
									},
								}),
						},
						{ separator: true },
						{ label: 'Change Wallpaper', hint: '⌘W', disabled: true },
					])
				}
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
