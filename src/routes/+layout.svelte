<script lang="ts">
	import { ASSETS } from '$lib/assets';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Background from './_lib/components/background.svelte';
	import Header from './_lib/components/header.svelte';
	import Navigation from './_lib/components/navigation.svelte';

	const MODE_STORAGE_KEY = 'flixdrama-mode';
	const THEME_STORAGE_KEY = 'flixdrama-theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={ASSETS.FAV_ICON} />
</svelte:head>

<div
	class="relative isolate min-h-screen leading-none font-semibold text-foreground-primary transition-colors select-none"
>
	<ModeWatcher
		modeStorageKey={MODE_STORAGE_KEY}
		themeStorageKey={THEME_STORAGE_KEY}
		disableTransitions={false}
	/>
	<Background />
	<Navigation />
	<div
		class="relative mx-auto flex min-h-screen max-w-lg flex-col overflow-hidden pt-9 pb-(--padding-bottom)"
	>
		<Header />
		{@render children()}
	</div>
</div>
