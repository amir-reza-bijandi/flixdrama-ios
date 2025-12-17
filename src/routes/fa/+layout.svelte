<script lang="ts">
	import Navigation from './_lib/components/navigation.svelte';

	const { children } = $props();
</script>

<Navigation />
{@render children()}
