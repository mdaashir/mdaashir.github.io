/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: {
					DEFAULT: '#00df9a',
					hover: '#00c788',
				},
				base: '#08090a',
				surface: '#101217',
				elevated: '#171a21',
				line: '#262a33',
				foreground: '#f4f5f7',
				muted: '#9aa3af',
			},
			fontFamily: {
				sans: [
					'Inter',
					'system-ui',
					'-apple-system',
					'Segoe UI',
					'Roboto',
					'Helvetica',
					'Arial',
					'sans-serif',
				],
			},
			maxWidth: {
				content: '72rem',
			},
			animation: {
				'fade-up': 'fade-up 0.6s ease-out both',
			},
			keyframes: {
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(12px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [],
};
