import { Dock } from './Dock';
import { Menubar } from './Menubar';
import { MobileShell } from './MobileShell';
import { DesktopIcons } from './DesktopIcons';
import { Welcome } from './Welcome';
import { WindowManager } from './WindowManager';

export function Desktop() {
	return (
		<>
			<Menubar />
			<Welcome />
			<DesktopIcons />
			<WindowManager />
			<Dock />
			<MobileShell />
		</>
	);
}
