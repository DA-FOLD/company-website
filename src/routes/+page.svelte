<script lang="ts">
	import LogoMark from '#lib/LogoMark.svelte';
	import Arrow from '#lib/Arrow.svelte';

	let scrolled = $state(false);

	type Status = 'idle' | 'sending' | 'sent' | 'error';
	let status: Status = $state('idle');
	let serverMessage = $state('');

	let form = $state({ name: '', email: '', projectType: '', details: '' });
	let touched = $state({ name: false, email: false, projectType: false, details: false });
	let submitted = $state(false);

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let errors = $derived({
		name: form.name.trim() ? '' : 'Tell us who to reply to.',
		email: !form.email.trim()
			? 'We need an email address to reply.'
			: EMAIL_RE.test(form.email.trim())
				? ''
				: 'That email address looks incomplete. Check it and try again.',
		projectType: form.projectType.trim() ? '' : 'A few words is enough, for example "stock and invoicing".',
		details: form.details.trim() ? '' : 'Describe what is slowing the work down, even roughly.'
	});

	const show = (k: keyof typeof touched) => (touched[k] || submitted) && errors[k];

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;
		if (Object.values(errors).some(Boolean)) {
			const first = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
			document.getElementById(`f-${first}`)?.focus();
			return;
		}
		status = 'sending';
		serverMessage = '';
		try {
			const res = await fetch('/api/send-message', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: form.name.trim(),
					email: form.email.trim(),
					projectType: form.projectType.trim(),
					details: form.details.trim()
				})
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && data.success) {
				status = 'sent';
			} else {
				status = 'error';
				serverMessage = data.message ?? '';
			}
		} catch {
			status = 'error';
		}
	}

	function reset() {
		form = { name: '', email: '', projectType: '', details: '' };
		touched = { name: false, email: false, projectType: false, details: false };
		submitted = false;
		status = 'idle';
	}

	const steps = [
		{
			title: 'Listen',
			text: 'A conversation about where the work gets stuck: the spreadsheet everyone is afraid to touch, the report that takes a day to build, the system that does not talk to the other one.'
		},
		{
			title: 'Map',
			text: 'We trace the process end to end with the people who do it, and write down what we find. You keep the map, whether or not we build anything.'
		},
		{
			title: 'Build',
			text: 'In small, working pieces you can use and react to early, so the software bends to how your business runs, not the other way round.'
		},
		{
			title: 'Hand over',
			text: 'Documented and explained, so your team owns what we make and is never locked in.'
		}
	];
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<a class="skip" href="#main">Skip to content</a>

<header class="bar" class:scrolled>
	<a class="brand" href="#top" aria-label="DA FØLD, back to top">
		<LogoMark id="nav-mark" class="brand-mark" />
		<span class="brand-word">DA FØLD</span>
	</a>
	<nav aria-label="Sections">
		<ul>
			<li><a href="#what-we-do">What we do</a></li>
			<li><a href="#how-we-work">How we work</a></li>
			<li><a href="#who">Who we are</a></li>
		</ul>
	</nav>
	<a class="btn btn-small" href="#contact">Book a conversation</a>
</header>

<main id="main" class="sheet">
	<!-- Panel 1: cover -->
	<section id="top" class="panel cover" aria-labelledby="cover-title">
		<div class="cover-copy">
			<h1 id="cover-title">Your operations, <em>unfolded.</em></h1>
			<p class="lede">
				Most mid-sized companies run on a tangle of spreadsheets, disconnected systems and steps done by
				hand. DA FØLD is a software engineering and consulting studio. We find the folds where time and
				data get lost, and build software that lays the work out flat.
			</p>
			<div class="actions">
				<a class="btn" href="#contact">Book a conversation <Arrow /></a>
				<a class="text-link" href="#how-we-work">See how we work</a>
			</div>
		</div>
		<div class="cover-mark" aria-hidden="true">
			<LogoMark id="cover-mark" />
		</div>
	</section>

	<!-- Panel 2 -->
	<section id="what-we-do" class="panel fold" aria-labelledby="what-title">
		<div class="grid">
			<h2 id="what-title" class="panel-title">Two ways we help.</h2>
			<div class="offers">
				<div class="offer">
					<h3>Custom software engineering</h3>
					<p>
						We design and build software around how your business actually runs: internal tools,
						connections between the systems you already pay for, and automation for the steps people
						repeat by hand every day.
					</p>
				</div>
				<div class="offer">
					<h3>Consulting</h3>
					<p>
						Before anything is built, we look at where time and information get lost and tell you
						plainly what is worth fixing first. Sometimes the answer is not new software, and we will
						say so.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Panel 3 -->
	<section id="how-we-work" class="panel fold" aria-labelledby="how-title">
		<div class="grid">
			<h2 id="how-title" class="panel-title">How a project unfolds.</h2>
			<ol class="steps">
				{#each steps as step, i (step.title)}
					<li>
						<span class="step-n" aria-hidden="true">{i + 1}</span>
						<div>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Panel 4 -->
	<section id="who" class="panel fold" aria-labelledby="who-title">
		<div class="grid">
			<h2 id="who-title" class="panel-title">Small, on purpose.</h2>
			<div class="who-copy">
				<p class="statement">
					You work directly with the engineers who write the code. There are no account managers in
					between.
				</p>
				<p>
					DA FØLD was founded by software engineers with formal training in software engineering
					(BSc). We are a young studio and take on a small number of projects at a time, so each one
					has the founders' full attention.
				</p>
			</div>
		</div>
	</section>

	<!-- Panel 5: the back of the sheet -->
	<section id="contact" class="panel fold back" aria-labelledby="contact-title">
		<div class="grid">
			<div class="contact-intro">
				<h2 id="contact-title" class="panel-title">Tell us where it's tangled.</h2>
				<p>
					A first conversation costs nothing and commits you to nothing. Describe the problem in your
					own words, and one of the founders will reply personally.
				</p>
			</div>

			<div class="contact-form" aria-live="polite">
				{#if status === 'sent'}
					<div class="sent">
						<h3>Thank you. Your message is with us.</h3>
						<p>We will reply to {form.email.trim()} as soon as we have read it properly.</p>
						<button type="button" class="text-link on-ink" onclick={reset}>Send another message</button>
					</div>
				{:else}
					<form onsubmit={submit} novalidate>
						<div class="row">
							<div class="field" class:invalid={show('name')}>
								<label for="f-name">Your name</label>
								<input
									id="f-name"
									name="name"
									autocomplete="name"
									bind:value={form.name}
									onblur={() => (touched.name = true)}
									aria-invalid={show('name') ? 'true' : undefined}
									aria-describedby={show('name') ? 'e-name' : undefined}
								/>
								{#if show('name')}<p class="err" id="e-name">{errors.name}</p>{/if}
							</div>
							<div class="field" class:invalid={show('email')}>
								<label for="f-email">Work email</label>
								<input
									id="f-email"
									name="email"
									type="email"
									autocomplete="email"
									bind:value={form.email}
									onblur={() => (touched.email = true)}
									aria-invalid={show('email') ? 'true' : undefined}
									aria-describedby={show('email') ? 'e-email' : undefined}
								/>
								{#if show('email')}<p class="err" id="e-email">{errors.email}</p>{/if}
							</div>
						</div>
						<div class="field" class:invalid={show('projectType')}>
							<label for="f-projectType">What needs untangling?</label>
							<input
								id="f-projectType"
								name="projectType"
								placeholder="e.g. stock, invoicing, reporting"
								bind:value={form.projectType}
								onblur={() => (touched.projectType = true)}
								aria-invalid={show('projectType') ? 'true' : undefined}
								aria-describedby={show('projectType') ? 'e-projectType' : undefined}
							/>
							{#if show('projectType')}<p class="err" id="e-projectType">{errors.projectType}</p>{/if}
						</div>
						<div class="field" class:invalid={show('details')}>
							<label for="f-details">Tell us more</label>
							<textarea
								id="f-details"
								name="details"
								rows="4"
								bind:value={form.details}
								onblur={() => (touched.details = true)}
								aria-invalid={show('details') ? 'true' : undefined}
								aria-describedby={show('details') ? 'e-details' : undefined}
							></textarea>
							{#if show('details')}<p class="err" id="e-details">{errors.details}</p>{/if}
						</div>

						{#if status === 'error'}
							<p class="form-error" role="alert">
								{serverMessage || 'The message could not be sent.'} Please try again in a moment. Nothing
								you typed has been lost.
							</p>
						{/if}

						<button class="btn btn-on-ink" type="submit" disabled={status === 'sending'}>
							{status === 'sending' ? 'Sending…' : 'Send message'}
							{#if status !== 'sending'}<Arrow />{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>

<footer class="foot">
	<LogoMark id="foot-mark" class="foot-mark" />
	<p>DA FØLD · Software engineering &amp; consulting</p>
	<p>© {new Date().getFullYear()} DA FØLD</p>
</footer>

<style>
	/* ---------- bar ---------- */
	.skip {
		position: absolute;
		left: 16px;
		top: -100px;
		z-index: 100;
		background: var(--fold-ink);
		color: var(--paper);
		padding: 10px 14px;
	}
	.skip:focus {
		top: 12px;
	}

	.bar {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		height: 72px;
		padding: 0 clamp(16px, 4vw, 48px);
		background: var(--paper);
		border-bottom: 1px solid transparent;
		transition: border-color 0.3s ease;
	}
	.bar.scrolled {
		border-bottom-color: var(--crease);
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
	}
	.brand :global(.brand-mark) {
		width: 22px;
		height: auto;
	}
	.brand-word {
		font-weight: 600;
		letter-spacing: 0.14em;
		font-size: 0.95rem;
	}
	.bar nav {
		margin-left: auto;
	}
	.bar ul {
		display: flex;
		gap: var(--space-lg);
		list-style: none;
	}
	.bar nav a {
		text-decoration: none;
		font-size: 0.95rem;
		color: var(--ink-muted);
	}
	.bar nav a:hover {
		color: var(--fold-ink);
		text-decoration: underline;
	}

	/* ---------- buttons & links ---------- */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		background: var(--fold-teal);
		color: var(--paper);
		border: 0;
		border-radius: 0;
		padding: 17px 26px;
		font: 500 0.9375rem/1 var(--font-body);
		letter-spacing: 0.02em;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.btn :global(.arrow) {
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.btn:hover {
		background: var(--fold-ink);
	}
	.btn:hover :global(.arrow) {
		transform: translateX(4px);
	}
	.btn-small {
		padding: 12px 18px;
		font-size: 0.875rem;
		white-space: nowrap;
	}
	.btn-on-ink {
		background: var(--fold-teal-light);
		color: var(--fold-ink);
	}
	.btn-on-ink:hover {
		background: var(--paper);
	}
	.btn:disabled {
		cursor: progress;
		opacity: 0.75;
	}
	.btn-on-ink:focus-visible {
		outline-color: var(--fold-teal-light);
	}
	.text-link {
		color: var(--fold-teal);
		font: inherit;
		font-weight: 500;
		background: none;
		border: 0;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	.text-link:hover {
		color: var(--fold-ink);
	}
	.text-link.on-ink {
		color: var(--fold-teal-light);
	}
	.text-link.on-ink:hover {
		color: var(--paper);
	}

	/* ---------- the sheet ---------- */
	.panel {
		position: relative;
		padding: var(--space-panel) clamp(16px, 6vw, 96px);
		background: var(--paper);
		border-top: 1px solid var(--crease);
		overflow: clip;
	}
	/* printer's fold marks at both ends of every crease */
	.panel::after {
		content: '';
		position: absolute;
		top: -1px;
		left: 0;
		right: 0;
		height: 14px;
		background:
			linear-gradient(var(--ink-muted), var(--ink-muted)) left 0 top 0 / 1px 14px no-repeat,
			linear-gradient(var(--ink-muted), var(--ink-muted)) right 0 top 0 / 1px 14px no-repeat;
		opacity: 0.5;
		pointer-events: none;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(16px, 2.5vw, 40px);
		row-gap: var(--space-xl);
		max-width: 1280px;
		margin: 0 auto;
	}
	.panel-title {
		grid-column: 1 / span 4;
		font-size: clamp(2.25rem, 2.5vw + 1.25rem, 3.5rem);
		line-height: 1.04;
		letter-spacing: -0.01em;
	}

	/* ---------- cover ---------- */
	.cover::after {
		display: none;
	}
	.cover {
		border-top: 0;
		min-height: calc(88svh - 72px);
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(16px, 2.5vw, 40px);
		align-items: end;
		padding-top: clamp(48px, 8vw, 120px);
	}
	.cover-copy {
		grid-column: 1 / span 8;
		position: relative;
		z-index: 1;
	}
	h1 {
		font-size: clamp(3rem, 6vw + 1rem, 6rem);
		line-height: 0.98;
		letter-spacing: -0.02em;
		max-width: 11ch;
	}
	h1 em {
		font-style: italic;
		color: var(--fold-teal);
	}
	.lede {
		margin-top: var(--space-lg);
		max-width: 58ch;
		font-size: clamp(1.0625rem, 0.3vw + 1rem, 1.25rem);
		color: var(--ink-muted);
	}
	.actions {
		margin-top: var(--space-lg);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md) var(--space-lg);
	}
	.cover-mark {
		position: absolute;
		right: clamp(-120px, -6vw, -40px);
		bottom: -18%;
		width: clamp(280px, 38vw, 620px);
		opacity: 0.95;
		pointer-events: none;
	}

	/* ---------- what we do ---------- */
	.offers {
		grid-column: 6 / span 7;
		display: grid;
		gap: var(--space-xl);
	}
	.offer + .offer {
		padding-top: var(--space-xl);
		border-top: 1px solid var(--crease);
	}
	.offer h3,
	.steps h3 {
		font-size: clamp(1.625rem, 1vw + 1.25rem, 2.125rem);
		line-height: 1.15;
		margin-bottom: var(--space-sm);
	}
	.offer p,
	.steps p,
	.who-copy p,
	.contact-intro p {
		max-width: 62ch;
		color: var(--ink-muted);
	}

	/* ---------- how we work ---------- */
	.steps {
		grid-column: 6 / span 7;
		list-style: none;
		display: grid;
		gap: var(--space-lg);
	}
	.steps li {
		display: grid;
		grid-template-columns: 4.5rem 1fr;
		gap: var(--space-md);
		padding-top: var(--space-lg);
		border-top: 1px solid var(--crease);
	}
	.steps li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.step-n {
		font-family: var(--font-display);
		font-size: 3.5rem;
		line-height: 0.9;
		color: var(--fold-teal);
		font-variant-numeric: lining-nums;
	}

	/* ---------- who ---------- */
	.who-copy {
		grid-column: 6 / span 7;
		display: grid;
		gap: var(--space-lg);
	}
	.who-copy .statement {
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 1.5vw + 1.25rem, 2.5rem);
		line-height: 1.15;
		color: var(--fold-ink);
		max-width: 26ch;
	}

	/* ---------- back of the sheet ---------- */
	.back {
		background: var(--fold-ink);
		color: var(--paper);
		border-top-color: var(--fold-ink);
	}
	.back::after {
		background:
			linear-gradient(var(--fold-teal-light), var(--fold-teal-light)) left 0 top 0 / 1px 14px no-repeat,
			linear-gradient(var(--fold-teal-light), var(--fold-teal-light)) right 0 top 0 / 1px 14px no-repeat;
	}
	.contact-intro {
		grid-column: 1 / span 5;
	}
	.contact-intro p {
		margin-top: var(--space-md);
		color: var(--ink-text-muted);
	}
	.contact-form {
		grid-column: 7 / span 6;
	}
	form {
		display: grid;
		gap: var(--space-lg);
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-lg);
	}
	.field label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--ink-text-muted);
		margin-bottom: 6px;
	}
	.field input,
	.field textarea {
		width: 100%;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--ink-line);
		border-radius: 0;
		padding: 10px 0;
		color: var(--paper);
		font: inherit;
		caret-color: var(--fold-teal-light);
		resize: vertical;
		transition: border-color 0.2s ease;
	}
	.field input::placeholder {
		color: var(--ink-placeholder);
	}
	.field input:hover,
	.field textarea:hover {
		border-bottom-color: var(--ink-line-hover);
	}
	.field input:focus,
	.field textarea:focus {
		outline: none;
		border-bottom: 2px solid var(--fold-teal-light);
		padding-bottom: 9px;
	}
	.field.invalid input,
	.field.invalid textarea {
		border-bottom-color: var(--ink-error);
	}
	.err,
	.form-error {
		margin-top: 8px;
		font-size: 0.9rem;
		color: var(--ink-error);
	}
	form .btn {
		justify-self: start;
	}
	.sent h3 {
		font-size: clamp(1.75rem, 1.5vw + 1.25rem, 2.5rem);
		line-height: 1.15;
		margin-bottom: var(--space-md);
	}
	.sent p {
		color: var(--ink-text-muted);
		margin-bottom: var(--space-lg);
	}
	.back ::selection {
		background: var(--fold-teal-light);
		color: var(--fold-ink);
	}

	/* ---------- footer ---------- */
	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md) var(--space-lg);
		padding: var(--space-lg) clamp(16px, 6vw, 96px);
		background: var(--fold-ink);
		color: var(--ink-foot-text);
		font-size: 0.875rem;
		border-top: 1px solid var(--ink-foot-line);
	}
	.foot :global(.foot-mark) {
		width: 18px;
		height: auto;
	}
	.foot p:last-child {
		margin-left: auto;
	}

	/* ---------- the unfold (desktop, motion allowed, supporting browsers) ---------- */
	.fold::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(to bottom, rgb(6 36 47 / 0.16), rgb(6 36 47 / 0) 50%);
		mix-blend-mode: multiply;
		opacity: 0;
		z-index: 2;
	}
	@media (min-width: 960px) and (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			.fold {
				transform-origin: 50% 0;
				animation: unfold linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 85%;
			}
			.fold::before {
				animation: crease-shade linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 85%;
			}
		}
	}
	@keyframes unfold {
		from {
			transform: perspective(1800px) rotateX(-58deg);
		}
		to {
			transform: perspective(1800px) rotateX(0deg);
		}
	}
	@keyframes crease-shade {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	/* ---------- responsive ---------- */
	@media (max-width: 960px) {
		.panel-title,
		.offers,
		.steps,
		.who-copy,
		.contact-intro,
		.contact-form,
		.cover-copy {
			grid-column: 1 / -1;
		}
		.grid {
			row-gap: var(--space-lg);
		}
		.cover-mark {
			width: clamp(200px, 48vw, 360px);
			right: -60px;
			bottom: -12%;
			opacity: 0.18;
		}
	}
	@media (max-width: 760px) {
		.bar nav {
			display: none;
		}
		.bar .btn-small {
			margin-left: auto;
		}
		.row {
			grid-template-columns: 1fr;
		}
		.steps li {
			grid-template-columns: 3rem 1fr;
		}
		.step-n {
			font-size: 2.5rem;
		}
		.foot p:last-child {
			margin-left: 0;
		}
	}
	@media (max-width: 400px) {
		.brand-word {
			display: none;
		}
	}
</style>
