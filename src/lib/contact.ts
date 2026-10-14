export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

export interface ContactResult {
	ok: boolean;
	error?: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';
const ACCESS_KEY = import.meta.env.VITE_CONTACT_ACCESS_KEY || '';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isContactConfigured(): boolean {
	return Boolean(ENDPOINT && ACCESS_KEY);
}

export function validateContact(payload: ContactPayload): ContactErrors {
	const errors: ContactErrors = {};
	const name = payload.name.trim();
	const email = payload.email.trim();
	const message = payload.message.trim();

	if (!name) errors.name = 'Please enter your name.';
	else if (name.length > 100) errors.name = 'Name is too long.';

	if (!email) errors.email = 'Please enter your email.';
	else if (!EMAIL_PATTERN.test(email))
		errors.email = 'Please enter a valid email address.';

	if (!message) errors.message = 'Please enter a message.';
	else if (message.length < 10)
		errors.message = 'Message must be at least 10 characters.';

	return errors;
}

export async function submitContact(
	payload: ContactPayload
): Promise<ContactResult> {
	if (Object.keys(validateContact(payload)).length > 0) {
		return { ok: false, error: 'Please fix the highlighted fields.' };
	}

	if (!isContactConfigured()) {
		return {
			ok: false,
			error: 'The contact form is not configured yet. Please email s.mohamedaashir@gmail.com instead.',
		};
	}

	try {
		const response = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				access_key: ACCESS_KEY,
				subject: `Portfolio enquiry from ${payload.name.trim()}`,
				from_name: payload.name.trim(),
				replyto: payload.email.trim(),
				name: payload.name.trim(),
				email: payload.email.trim(),
				message: payload.message.trim(),
			}),
		});

		const data: { success?: boolean; message?: string } = await response
			.json()
			.catch(() => ({}));

		if (response.ok && data.success !== false) return { ok: true };
		return {
			ok: false,
			error: data.message || 'Something went wrong. Please try again.',
		};
	} catch {
		return {
			ok: false,
			error: 'Network error. Please try again or email me directly.',
		};
	}
}
