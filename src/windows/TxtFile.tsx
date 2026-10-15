import { useWindows } from '../lib/window-context';

export function TxtFile() {
	const file = useWindows().windows.txtfile.data?.file;

	return (
		<div class='txtfile__body'>
			{file ? (
				<>
					{file.subtitle && <h3>{file.subtitle}</h3>}
					{(file.description ?? [file.name]).map((line) => (
						<p key={line}>{line}</p>
					))}
				</>
			) : (
				<p>No file selected.</p>
			)}
		</div>
	);
}
