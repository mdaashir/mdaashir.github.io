import type { FileNode, LocationId } from './locations';

export type WindowId =
	| 'finder'
	| 'safari'
	| 'photos'
	| 'contact'
	| 'terminal'
	| 'resume'
	| 'txtfile'
	| 'imgfile';

export interface WindowPayload {
	location?: LocationId;
	file?: FileNode;
}

export interface WindowState {
	isOpen: boolean;
	zIndex: number;
	data: WindowPayload | null;
}

export const INITIAL_Z_INDEX = 1000;

function closed(): WindowState {
	return { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null };
}

export const WINDOW_CONFIG: Record<WindowId, WindowState> = {
	finder: closed(),
	contact: closed(),
	resume: closed(),
	safari: closed(),
	photos: closed(),
	terminal: closed(),
	txtfile: closed(),
	imgfile: closed(),
};

export const WINDOW_IDS = Object.keys(WINDOW_CONFIG) as WindowId[];
