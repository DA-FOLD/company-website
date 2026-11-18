<script lang="ts">
	import '@fontsource/instrument-serif/400.css';
	import '@fontsource/instrument-serif/400-italic.css';
	import '@fontsource/instrument-sans/400.css';
	import '@fontsource/instrument-sans/500.css';
	import '@fontsource/instrument-sans/600.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>DA FØLD | Software engineering & consulting</title>
	<meta
		name="description"
		content="DA FØLD is a software engineering and consulting studio for mid-sized companies. We find where your operations get tangled and build software that lays the work out flat."
	/>
	<meta property="og:title" content="DA FØLD | Software engineering & consulting" />
	<meta
		property="og:description"
		content="Custom software and honest consulting for mid-sized companies."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://dafold.com/" />
	<link rel="canonical" href="https://dafold.com/" />
</svelte:head>

{@render children()}
