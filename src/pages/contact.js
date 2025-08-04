import React, { useState } from 'react';

const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission (replace with actual API call)
		setTimeout(() => {
			setSubmitMessage(
				"Thank you for your message! I'll get back to you soon."
			);
			setFormData({ name: '', email: '', message: '' });
			setIsSubmitting(false);
			setTimeout(() => setSubmitMessage(''), 5000);
		}, 1000);
	};
	return (
		<div className='bg-black text-white py-16' id='contact'>
			<div className='max-w-[1200px] mx-auto px-4'>
				<div className='text-center mb-12'>
					<h2 className='text-5xl font-bold mb-4'>
						Get In <span className='primary-color'>Touch</span>
					</h2>
					<p className='text-xl text-gray-400'>
						Let's discuss your next project
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-12'>
					<div>
						<h3 className='text-2xl font-bold mb-6'>Contact Information</h3>
						<div className='space-y-4'>
							<div className='flex items-center'>
								<div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center mr-4'>
									<span className='text-black font-bold'>@</span>
								</div>
								<div>
									<p className='font-semibold'>Email</p>
									<a
										href='mailto:s.mohamedaashir@gmail.com'
										className='text-gray-400 hover:text-orange-400 transition duration-300'>
										s.mohamedaashir@gmail.com
									</a>
								</div>
							</div>
							<div className='flex items-center'>
								<div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center mr-4'>
									<span className='text-black font-bold'>📍</span>
								</div>
								<div>
									<p className='font-semibold'>Location</p>
									<p className='text-gray-400'>Available for Remote Work</p>
								</div>
							</div>
							<div className='flex items-center'>
								<div className='w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center mr-4'>
									<span className='text-black font-bold'>🌐</span>
								</div>
								<div>
									<p className='font-semibold'>Response Time</p>
									<p className='text-gray-400'>Within 24 hours</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						{submitMessage && (
							<div className='mb-4 p-3 bg-green-800 text-green-200 rounded-lg'>
								{submitMessage}
							</div>
						)}
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									placeholder='Your Name'
									required
									className='w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-400 focus:outline-none transition duration-300'
								/>
							</div>
							<div>
								<input
									type='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									placeholder='Your Email'
									required
									className='w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-400 focus:outline-none transition duration-300'
								/>
							</div>
							<div>
								<textarea
									name='message'
									value={formData.message}
									onChange={handleChange}
									placeholder='Your Message'
									rows={4}
									required
									className='w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-orange-400 focus:outline-none resize-none transition duration-300'></textarea>
							</div>
							<button
								type='submit'
								disabled={isSubmitting}
								className={`w-full font-bold py-3 rounded-lg transition duration-300 ${
									isSubmitting
										? 'bg-gray-600 text-gray-400 cursor-not-allowed'
										: 'bg-gradient-to-r from-orange-400 to-pink-600 text-black hover:scale-105'
								}`}>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
