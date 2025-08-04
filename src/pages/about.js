import React from 'react';

const About = () => {
	return (
		<div className='bg-black text-white min-h-screen pt-24'>
			<div className='max-w-[1200px] mx-auto px-4'>
				<div className='text-center mb-12'>
					<h1 className='text-6xl font-bold mb-4'>
						About <span className='primary-color'>Me</span>
					</h1>
				</div>

				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<h2 className='text-4xl font-bold mb-6 primary-color'>
							Mohamed Aashir S
						</h2>
						<p className='text-lg text-gray-300 mb-6'>
							A Tech Enthusiast with a passion for coding. With a background in
							full-stack web development and native app development, I excel at
							crafting elegant solutions.
						</p>
						<p className='text-lg text-gray-300 mb-6'>
							I specialize in modern web technologies including React,
							JavaScript, Node.js, and various other frameworks. My goal is to
							create user-friendly applications that solve real-world problems.
						</p>
						<div className='grid grid-cols-2 gap-4 mt-8'>
							<div className='bg-gray-800 p-4 rounded-lg'>
								<h3 className='font-semibold text-orange-400'>Frontend</h3>
								<p className='text-sm text-gray-300'>
									React, JavaScript, HTML, CSS, Tailwind
								</p>
							</div>
							<div className='bg-gray-800 p-4 rounded-lg'>
								<h3 className='font-semibold text-pink-400'>Backend</h3>
								<p className='text-sm text-gray-300'>
									Node.js, Express, Databases
								</p>
							</div>
							<div className='bg-gray-800 p-4 rounded-lg'>
								<h3 className='font-semibold text-orange-400'>Mobile</h3>
								<p className='text-sm text-gray-300'>React Native, Flutter</p>
							</div>
							<div className='bg-gray-800 p-4 rounded-lg'>
								<h3 className='font-semibold text-pink-400'>Tools</h3>
								<p className='text-sm text-gray-300'>Git, VS Code, Docker</p>
							</div>
						</div>
					</div>

					<div className='flex justify-center'>
						<div className='w-80 h-80 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center'>
							<div className='w-72 h-72 bg-black rounded-full flex items-center justify-center'>
								<span className='text-6xl font-bold primary-color'>MA</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
