<script lang="ts">
	import { asset } from '$app/paths';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Background from './_lib/components/background.svelte';

	const MODE_STORAGE_KEY = 'flixdrama-mode';
	const THEME_STORAGE_KEY = 'flixdrama-theme';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.svg')} />
</svelte:head>

<div
	class="relative isolate min-h-screen leading-none font-semibold text-foreground-primary select-none"
>
	<ModeWatcher
		modeStorageKey={MODE_STORAGE_KEY}
		themeStorageKey={THEME_STORAGE_KEY}
		disableTransitions={false}
	/>
	<Background />
	<div
		class="relative mx-auto scrollbar-hidden flex min-h-screen max-w-lg flex-col overflow-x-hidden"
	>
		{@render children()}
	</div>
</div>
