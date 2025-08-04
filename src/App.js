import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Home from './pages/index';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
	return (
		<Router>
			<div className='bg-black min-h-screen'>
				<NavBar />
				<Routes>
					<Route
						path='/'
						element={
							<>
								<Hero />
								<Home />
								<Contact />
							</>
						}
					/>
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
