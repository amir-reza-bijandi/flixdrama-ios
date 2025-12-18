<script lang="ts">
	import { ASSETS } from '$lib/assets';
	import OfflineIndicator from '$lib/components/offline-indicator.svelte';
	import { networkStore } from '$lib/stores/network-store.svelte';
	import { authStore } from '$lib/stores/auth-store.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';
	import Background from './_lib/components/background.svelte';
	import Header from './_lib/components/header.svelte';
	import Navigation from './_lib/components/navigation.svelte';

	const MODE_STORAGE_KEY = 'flixdrama-mode';
	const THEME_STORAGE_KEY = 'flixdrama-theme';

	let { children } = $props();

	onMount(() => {
		// Initialize stores
		networkStore.init();
		authStore.init();
	});
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
	<OfflineIndicator />
	<Navigation />
	<div
		style:--safe-area-top="env(safe-area-inset-top, 0px)"
		class="relative mx-auto scrollbar-hidden flex min-h-screen max-w-lg flex-col overflow-x-hidden pt-[calc(8px+var(--safe-area-top))] pb-(--padding-bottom)"
	>
		<Header />
		{@render children()}
	</div>
</div>
