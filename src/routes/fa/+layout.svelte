<script lang="ts">
	import Navigation from './_lib/components/navigation.svelte';

	const { children } = $props();
</script>

<div style="direction: rtl;">
	<Navigation />
	{@render children()}
</div>
