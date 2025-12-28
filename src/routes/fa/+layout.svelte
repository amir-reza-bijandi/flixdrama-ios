<script lang="ts">
	import Navigation from './_lib/components/navigation.svelte';
	import Overlay from './_lib/components/overlay.svelte';

	const { children } = $props();
</script>

<Navigation />
<Overlay />
{@render children()}
