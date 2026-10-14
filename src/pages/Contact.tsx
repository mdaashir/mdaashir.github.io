import { useState } from 'preact/hooks';
import {
	submitContact,
	validateContact,
	type ContactErrors,
	type ContactPayload,
} from '../lib/contact';

const EMPTY: ContactPayload = { name: '', email: '', message: '' };

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INPUT_CLASS =
	'w-full rounded-lg border border-line bg-surface px-4 py-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

const CONTACT_DETAILS = [
	{ label: 'Email', value: 's.mohamedaashir@gmail.com', href: 'mailto:s.mohamedaashir@gmail.com' },
	{ label: 'Location', value: 'Available for remote work' },
	{ label: 'Response time', value: 'Within 24 hours' },
];

export function Contact() {
	const [form, setForm] = useState<ContactPayload>(EMPTY);
	const [errors, setErrors] = useState<ContactErrors>({});
	const [status, setStatus] = useState<Status>('idle');
	const [feedback, setFeedback] = useState('');

	const update =
		(field: keyof ContactPayload) => (event: Event) => {
			const target = event.target as HTMLInputElement | HTMLTextAreaElement;
			setForm((previous) => ({ ...previous, [field]: target.value }));
			if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
		};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		const validation = validateContact(form);
		setErrors(validation);
		if (Object.keys(validation).length > 0) {
			setStatus('error');
			setFeedback('Please fix the highlighted fields.');
			return;
		}

		setStatus('submitting');
		setFeedback('');
		const result = await submitContact(form);

		if (result.ok) {
			setStatus('success');
			setFeedback("Thanks for reaching out — I'll get back to you soon.");
			setForm(EMPTY);
		} else {
			setStatus('error');
			setFeedback(result.error || 'Something went wrong. Please try again.');
		}
	};

	const submitting = status === 'submitting';

	return (
		<section id='contact' className='section border-t border-line'>
			<div className='container-page'>
				<header className='max-w-2xl'>
					<p className='eyebrow'>Contact</p>
					<h2 className='mt-4 text-3xl font-bold sm:text-4xl'>Get in touch</h2>
					<p className='mt-5 text-lg text-muted'>
						Have a project in mind or just want to say hello? Send me a message
						and I'll get back to you.
					</p>
				</header>

				<div className='mt-12 grid gap-12 lg:grid-cols-2'>
					<dl className='space-y-6'>
						{CONTACT_DETAILS.map((detail) => (
							<div key={detail.label}>
								<dt className='text-sm font-semibold uppercase tracking-wide text-muted'>
									{detail.label}
								</dt>
								<dd className='mt-1 text-foreground'>
									{detail.href ? (
										<a
											href={detail.href}
											className='transition-colors hover:text-accent'>
											{detail.value}
										</a>
									) : (
										detail.value
									)}
								</dd>
							</div>
						))}
					</dl>

					<form onSubmit={handleSubmit} noValidate className='space-y-5'>
						<div>
							<label
								htmlFor='name'
								className='mb-2 block text-sm font-medium text-foreground'>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								value={form.name}
								onInput={update('name')}
								aria-invalid={Boolean(errors.name)}
								aria-describedby={errors.name ? 'name-error' : undefined}
								placeholder='Your name'
								className={`${INPUT_CLASS} ${errors.name ? 'border-red-500/70' : ''}`}
							/>
							{errors.name && (
								<p id='name-error' className='mt-2 text-sm text-red-400'>
									{errors.name}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='email'
								className='mb-2 block text-sm font-medium text-foreground'>
								Email
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								value={form.email}
								onInput={update('email')}
								aria-invalid={Boolean(errors.email)}
								aria-describedby={errors.email ? 'email-error' : undefined}
								placeholder='you@example.com'
								className={`${INPUT_CLASS} ${errors.email ? 'border-red-500/70' : ''}`}
							/>
							{errors.email && (
								<p id='email-error' className='mt-2 text-sm text-red-400'>
									{errors.email}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='message'
								className='mb-2 block text-sm font-medium text-foreground'>
								Message
							</label>
							<textarea
								id='message'
								name='message'
								rows={5}
								value={form.message}
								onInput={update('message')}
								aria-invalid={Boolean(errors.message)}
								aria-describedby={errors.message ? 'message-error' : undefined}
								placeholder='Tell me about your project...'
								className={`${INPUT_CLASS} resize-none ${
									errors.message ? 'border-red-500/70' : ''
								}`}
							/>
							{errors.message && (
								<p id='message-error' className='mt-2 text-sm text-red-400'>
									{errors.message}
								</p>
							)}
						</div>

						{feedback && (
							<p
								role='status'
								aria-live='polite'
								className={`text-sm ${
									status === 'success' ? 'text-accent' : 'text-red-400'
								}`}>
								{feedback}
							</p>
						)}

						<button type='submit' disabled={submitting} className='btn-primary w-full sm:w-auto'>
							{submitting ? 'Sending…' : 'Send message'}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
