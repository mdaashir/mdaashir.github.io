import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NavBar = () => {
	const [nav, setNav] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleNav = () => {
		setNav(!nav);
	};

	const scrollToSection = (sectionId) => {
		if (location.pathname !== '/') {
			navigate('/');
			setTimeout(() => {
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
		} else {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
		setNav(false);
	};
	return (
		<div className='bg-black text-gray-400 h-[100px] max-w-[1200px] mx-auto flex justify-between items-center fixed w-full z-50 px-4'>
			<Link to='/' className='text-3xl font-bold primary-color ml-4'>
				MOHAMED AASHIR S
			</Link>

			<ul className='hidden md:flex'>
				<li className='p-5'>
					<Link to='/' className='hover:text-white transition duration-300'>
						Home
					</Link>
				</li>
				<li className='p-5'>
					<Link
						to='/about'
						className='hover:text-white transition duration-300'>
						About
					</Link>
				</li>
				<li className='p-5'>
					<button
						onClick={() => scrollToSection('work')}
						className='hover:text-white transition duration-300 cursor-pointer'>
						Work
					</button>
				</li>
				<li className='p-5'>
					<button
						onClick={() => scrollToSection('contact')}
						className='hover:text-white transition duration-300 cursor-pointer'>
						Contact
					</button>
				</li>
			</ul>

			<div onClick={handleNav} className='block md:hidden mr-4'>
				{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
			</div>

			<div
				className={
					nav
						? 'fixed h-full left-0 top-0 w-[60%] bg-[#202121] ease-in-out duration-500 z-40'
						: 'fixed left-[-100%] z-40'
				}>
				<Link to='/' className='text-3xl primary-color m-4 block'>
					MOHAMED AASHIR S
				</Link>
				<ul className='p-8 text-2xl'>
					<li className='p-2'>
						<Link
							to='/'
							onClick={handleNav}
							className='hover:text-white transition duration-300'>
							Home
						</Link>
					</li>
					<li className='p-2'>
						<Link
							to='/about'
							onClick={handleNav}
							className='hover:text-white transition duration-300'>
							About
						</Link>
					</li>
					<li className='p-2'>
						<button
							onClick={() => scrollToSection('work')}
							className='hover:text-white transition duration-300 cursor-pointer'>
							Work
						</button>
					</li>
					<li className='p-2'>
						<button
							onClick={() => scrollToSection('contact')}
							className='hover:text-white transition duration-300 cursor-pointer'>
							Contact
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
