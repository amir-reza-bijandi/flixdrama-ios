<script lang="ts">
	import { HASH } from '../constants/hash';
	import { hashStore } from '../store/hash-store.svelte';
	import type { Hash } from '../types/hash';

	const HASH_WHITELIST: Hash[] = [HASH.SEARCH];

	const isActive = $derived(
		!HASH_WHITELIST.includes(hashStore.current) && Boolean(hashStore.current)
	);
	const isHeaderVisible = $derived(
		hashStore.current === HASH.NOTIFICATIONS || hashStore.current === ('' as Hash)
	);

	const handleClick = () => !isHeaderVisible && window.history.back();
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_invalid_attribute -->
<button
	class={[
		'fixed inset-0 bg-background-primary/75 backdrop-blur-lg transition-opacity duration-250',
		isHeaderVisible ? 'z-40' : 'z-50',
		!isActive && 'pointer-events-none opacity-0'
	]}
	onclick={handleClick}
></button>
