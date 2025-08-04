import React from 'react';

const Home = () => {
	return (
		<div className='bg-black text-white py-16' id='work'>
			<div className='max-w-[1200px] mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-5xl font-bold mb-4'>
						My <span className='primary-color'>Work</span>
					</h2>
					<p className='text-xl text-gray-400'>
						Here are some of the projects I've worked on
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='bg-gray-800 rounded-lg p-6 hover:scale-105 transition duration-300'>
						<div className='h-48 bg-gradient-to-r from-orange-400 to-pink-600 rounded-lg mb-4 flex items-center justify-center'>
							<span className='text-2xl font-bold text-black'>Portfolio</span>
						</div>
						<h3 className='text-xl font-bold mb-2'>Personal Portfolio</h3>
						<p className='text-gray-400 mb-4'>
							A responsive portfolio website built with React and Tailwind CSS
						</p>
						<div className='flex gap-2'>
							<span className='bg-orange-500 text-xs px-2 py-1 rounded'>
								React
							</span>
							<span className='bg-blue-500 text-xs px-2 py-1 rounded'>
								Tailwind
							</span>
						</div>
					</div>

					<div className='bg-gray-800 rounded-lg p-6 hover:scale-105 transition duration-300'>
						<div className='h-48 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center'>
							<span className='text-2xl font-bold text-white'>Web App</span>
						</div>
						<h3 className='text-xl font-bold mb-2'>Full-Stack Application</h3>
						<p className='text-gray-400 mb-4'>
							A complete web application with authentication and database
							integration
						</p>
						<div className='flex gap-2'>
							<span className='bg-green-500 text-xs px-2 py-1 rounded'>
								Node.js
							</span>
							<span className='bg-orange-500 text-xs px-2 py-1 rounded'>
								React
							</span>
						</div>
					</div>

					<div className='bg-gray-800 rounded-lg p-6 hover:scale-105 transition duration-300'>
						<div className='h-48 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center'>
							<span className='text-2xl font-bold text-white'>Mobile</span>
						</div>
						<h3 className='text-xl font-bold mb-2'>Mobile Application</h3>
						<p className='text-gray-400 mb-4'>
							Cross-platform mobile app built with React Native
						</p>
						<div className='flex gap-2'>
							<span className='bg-blue-500 text-xs px-2 py-1 rounded'>
								React Native
							</span>
							<span className='bg-purple-500 text-xs px-2 py-1 rounded'>
								Mobile
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
