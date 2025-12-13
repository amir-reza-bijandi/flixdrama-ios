<script lang="ts">
	import { ASSETS } from '$lib/assets';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Background from './_lib/components/background.svelte';

	const MODE_STORAGE_KEY = 'flixdrama-mode';
	const THEME_STORAGE_KEY = 'flixdrama-theme';

	const { children } = $props();
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
	<div
		class="relative mx-auto scrollbar-hidden flex min-h-screen max-w-lg flex-col overflow-x-hidden pt-9"
	>
		{@render children()}
	</div>
</div>
