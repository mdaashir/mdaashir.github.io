import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<div className='bg-black text-white text-center h-screen flex flex-col justify-center items-center'>
			<div className='max-w-[800px] mt-[-96px] w-full mx-auto text-center flex flex-col justify-center'>
				<h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
					<span className='primary-color'>MOHAMED AASHIR S</span>
				</h1>
				<div className='flex justify-center items-center'>
					<p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
						I am a{' '}
					</p>
					<TypeAnimation
						sequence={[
							'Full-Stack Developer',
							1000,
							'Tech Enthusiast',
							1000,
							'Problem Solver',
							1000,
							'Code Craftsman',
							1000,
						]}
						wrapper='span'
						speed={50}
						style={{
							fontSize: '1em',
							display: 'inline-block',
							paddingLeft: '5px',
						}}
						className='md:text-5xl sm:text-4xl text-xl font-bold primary-color'
						repeat={Infinity}
					/>
				</div>
				<p className='md:text-2xl text-xl font-bold text-gray-500 py-4'>
					A Tech Enthusiast with a passion for coding. With a background in
					full-stack web development and native app development, I excel at
					crafting elegant solutions.
				</p>
				<div className='flex justify-center items-center gap-4 mt-8'>
					<button
						onClick={() => scrollToSection('work')}
						className='bg-primary-color text-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:scale-105 duration-300'>
						View My Work
					</button>
					<button
						onClick={() => scrollToSection('contact')}
						className='border border-gray-500 text-white w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:bg-gray-800 duration-300'>
						Contact Me
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
