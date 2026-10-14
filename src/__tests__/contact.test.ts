import { describe, expect, it, vi } from 'vitest';

import { isContactConfigured, submitContact, validateContact } from '../lib/contact';

describe('contact validation', () => {
	it('requires every field', () => {
		const errors = validateContact({ name: '', email: '', message: '' });
		expect(errors.name).toBeTruthy();
		expect(errors.email).toBeTruthy();
		expect(errors.message).toBeTruthy();
	});

	it('rejects a malformed email', () => {
		const errors = validateContact({
			name: 'Aashir',
			email: 'not-an-email',
			message: 'Hello there, this is a message.',
		});
		expect(errors.email).toBeTruthy();
	});

	it('accepts a valid payload', () => {
		const errors = validateContact({
			name: 'Aashir',
			email: 'aashir@example.com',
			message: 'Hello there, this is a message.',
		});
		expect(errors).toEqual({});
	});
});

describe('submitContact', () => {
	it('rejects invalid input before touching the network', async () => {
		const result = await submitContact({ name: '', email: '', message: '' });
		expect(result.ok).toBe(false);
		expect(result.error).toMatch(/highlighted fields/i);
	});

	it.skipIf(isContactConfigured())(
		'reports the form as unconfigured when no endpoint or key is set',
		async () => {
			const result = await submitContact({
				name: 'Aashir',
				email: 'aashir@example.com',
				message: 'Hello there, this is a message.',
			});
			expect(result.ok).toBe(false);
			expect(result.error).toMatch(/not configured/i);
		}
	);

	it('posts to the configured endpoint and reports success', async () => {
		vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://example.test/submit');
		vi.stubEnv('VITE_CONTACT_ACCESS_KEY', 'test-access-key');
		vi.resetModules();

		const fetchMock = vi
			.fn()
			.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
		vi.stubGlobal('fetch', fetchMock);

		try {
			const module = await import('../lib/contact');
			const result = await module.submitContact({
				name: 'Aashir',
				email: 'aashir@example.com',
				message: 'Hello there, this is a message.',
			});

			expect(result.ok).toBe(true);
			expect(fetchMock).toHaveBeenCalledTimes(1);

			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe('https://example.test/submit');
			const body = JSON.parse(options.body);
			expect(body.access_key).toBe('test-access-key');
			expect(body.email).toBe('aashir@example.com');
		} finally {
			vi.unstubAllEnvs();
			vi.unstubAllGlobals();
		}
	});
});
