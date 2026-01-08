<script lang="ts">
	import { asset } from '$app/paths';
	import { langStore } from '$lib/store/lang-store.svelte';
	import { Lang } from '$lib/types/general';
	import { ModeWatcher } from 'mode-watcher';
	import 'swiper/css';
	import 'swiper/css/effect-coverflow';
	import 'swiper/css/free-mode';
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
	class={[
		'relative isolate min-h-screen leading-none font-semibold text-foreground-primary select-none',
		langStore.current === Lang.En ? 'ltr' : 'rtl'
	]}
>
	<ModeWatcher
		modeStorageKey={MODE_STORAGE_KEY}
		themeStorageKey={THEME_STORAGE_KEY}
		disableTransitions={false}
	/>
	<Background />
	<div class="relative mx-auto flex min-h-screen max-w-lg flex-col overflow-hidden">
		{@render children()}
	</div>
</div>
