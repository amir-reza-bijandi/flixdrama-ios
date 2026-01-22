<script lang="ts">
	import { HASH } from '../constants/hash';
	import { hashStore } from '../store/hash-store.svelte';

	const isActive = $derived(hashStore.current !== HASH.SEARCH && Boolean(hashStore.current));

	const handleClick = () => window.history.back();
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_invalid_attribute -->
<button
	class={[
		'fixed inset-0 z-50 bg-background-primary/75 backdrop-blur-lg transition-opacity duration-250',
		!isActive && 'pointer-events-none opacity-0'
	]}
	onclick={handleClick}
></button>
