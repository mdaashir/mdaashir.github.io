import { Window } from './Window';
import { useWindows } from '../lib/window-context';
import { Contact } from '../windows/Contact';
import { Finder } from '../windows/Finder';
import { ImgFile } from '../windows/ImgFile';
import { Photos } from '../windows/Photos';
import { Resume } from '../windows/Resume';
import { Safari } from '../windows/Safari';
import { Terminal } from '../windows/Terminal';
import { TxtFile } from '../windows/TxtFile';

export function WindowManager() {
	const { windows } = useWindows();
	const txt = windows.txtfile.data?.file;
	const img = windows.imgfile.data?.file;

	return (
		<>
			{/* The finder carries a toolbar icon instead of a centred title. */}
			<Window
				id='finder'
				title='Portfolio'
				className='finder'
				showTitle={false}
				headerRight={
					<img src='/icons/search.svg' alt='' class='h-5 w-5 opacity-70 dark:invert' />
				}>
				<Finder />
			</Window>
			<Window id='safari' title='Articles' className='safari'>
				<Safari />
			</Window>
			<Window id='photos' title='Gallery' className='photos'>
				<Photos />
			</Window>
			<Window id='contact' title='Contact Me' className='contact'>
				<Contact />
			</Window>
			<Window id='terminal' title='Tech Stack' className='terminal'>
				<Terminal />
			</Window>
			<Window id='resume' title='Resume.pdf' className='resume'>
				<Resume />
			</Window>
			<Window id='txtfile' title={txt?.name ?? 'Untitled.txt'} className='txtfile'>
				<TxtFile />
			</Window>
			<Window id='imgfile' title={img?.name ?? 'Untitled.png'} className='imgfile'>
				<ImgFile />
			</Window>
		</>
	);
}
