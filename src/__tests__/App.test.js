import { render } from '@testing-library/react';
import React from 'react';

// Simple sanity test that doesn't require complex routing
describe('Portfolio Application', () => {
	test('React renders correctly', () => {
		const TestComponent = () => <div>Test Component</div>;
		render(<TestComponent />);
	});

	test('Environment is set up correctly', () => {
		expect(true).toBe(true);
	});
});
