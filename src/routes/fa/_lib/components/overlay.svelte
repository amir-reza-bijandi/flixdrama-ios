<script lang="ts">
	import { page } from '$app/state';
	import { HASH } from '../constants/hash';
	import { hashStore } from '../store/hash-store.svelte';

	const isActive = $derived(hashStore.current !== HASH.SEARCH && Boolean(hashStore.current));
	const href = $derived(page.url.toString().split('#')[0]);
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_invalid_attribute -->
<a
	class={[
		'fixed inset-0 z-50 bg-background-primary/75 backdrop-blur-lg transition-opacity duration-250',
		!isActive && 'pointer-events-none opacity-0'
	]}
	{href}
></a>
