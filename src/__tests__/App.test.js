import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock the components to avoid testing library issues
jest.mock('../components/Hero', () => {
	return function Hero() {
		return <div data-testid='hero'>Hero Component</div>;
	};
});

jest.mock('../pages/index', () => {
	return function Home() {
		return <div data-testid='home'>Home Component</div>;
	};
});

jest.mock('../pages/contact', () => {
	return function Contact() {
		return <div data-testid='contact'>Contact Component</div>;
	};
});

jest.mock('../pages/about', () => {
	return function About() {
		return <div data-testid='about'>About Component</div>;
	};
});

const renderWithRouter = (component) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('App Component', () => {
	test('renders without crashing', () => {
		renderWithRouter(<App />);
	});

	test('renders navigation bar', () => {
		renderWithRouter(<App />);
		expect(screen.getByText('MOHAMED AASHIR S')).toBeInTheDocument();
	});

	test('renders main sections on home page', () => {
		renderWithRouter(<App />);
		expect(screen.getByTestId('hero')).toBeInTheDocument();
		expect(screen.getByTestId('home')).toBeInTheDocument();
		expect(screen.getByTestId('contact')).toBeInTheDocument();
	});
});
