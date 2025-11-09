<script lang="ts">
	import { ASSETS } from '$lib/assets';
	import '../app.css';
	import Background from './_lib/components/background.svelte';
	import Header from './_lib/components/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={ASSETS.FAV_ICON} />
</svelte:head>

<div class="relative isolate min-h-screen leading-none font-semibold text-foreground-primary">
	<Background />
	<div class="mx-auto max-w-lg">
		<Header />
		{@render children()}
	</div>
</div>
