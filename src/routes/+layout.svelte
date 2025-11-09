<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/background.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative isolate min-h-screen">
	<Background />
	{@render children()}
</div>
