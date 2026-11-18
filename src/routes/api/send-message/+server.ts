import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

// EmailJS settings carried over from the previous site's worker.
// TODO: move ACCESS_TOKEN to a Cloudflare secret (EMAILJS_ACCESS_TOKEN) and remove it from source.
const EMAILJS = {
	service_id: 'service_i5avnv7',
	template_id: 'template_k9y7qlb',
	user_id: 'GHmP4gvH45Zg_4jJU',
	accessToken: 'SSXPsgHYYeurZUXxCqmGA'
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json({ success: false, message: 'The request could not be read.' }, { status: 400 });
	}

	const field = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
	const name = field('name');
	const email = field('email');
	const projectType = field('projectType');
	const details = field('details');

	if (!name || !email || !projectType || !details) {
		return json({ success: false, message: 'All fields are required.' }, { status: 400 });
	}
	if (!EMAIL_RE.test(email) || name.length > 200 || projectType.length > 300 || details.length > 5000) {
		return json({ success: false, message: 'Please check the details and try again.' }, { status: 400 });
	}

	try {
		const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...EMAILJS,
				accessToken: platform?.env?.EMAILJS_ACCESS_TOKEN ?? EMAILJS.accessToken,
				template_params: { name, email, projectType, details }
			})
		});

		if (!res.ok) {
			console.error('EmailJS error:', await res.text());
			return json({ success: false, message: 'The message could not be sent.' }, { status: 502 });
		}
		return json({ success: true, message: 'Message sent.' });
	} catch (err) {
		console.error('Server error:', err);
		return json({ success: false, message: 'The message could not be sent.' }, { status: 500 });
	}
};
