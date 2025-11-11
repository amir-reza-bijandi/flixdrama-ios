<script lang="ts">
	import { ASSETS } from '$lib/assets';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Background from './_lib/components/background.svelte';
	import Header from './_lib/components/header.svelte';

	const MODE_STORAGE_KEY = 'flixdrama-mode';
	const THEME_STORAGE_KEY = 'flixdrama-theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={ASSETS.FAV_ICON} />
</svelte:head>

<div
	class="relative isolate min-h-screen leading-none font-semibold text-foreground-primary transition-colors duration-500"
>
	<ModeWatcher
		modeStorageKey={MODE_STORAGE_KEY}
		themeStorageKey={THEME_STORAGE_KEY}
		disableTransitions={false}
	/>
	<Background />
	<div class="mx-auto max-w-lg overflow-hidden pt-9">
		<Header />
		{@render children()}
	</div>
</div>
