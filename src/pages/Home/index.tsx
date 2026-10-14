import { Hero } from '../../components/Hero';
import { FeaturedWork } from '../../components/FeaturedWork';
import { Contact } from '../Contact';

export function Home() {
	return (
		<>
			<Hero />
			<FeaturedWork />
			<Contact />
		</>
	);
}
