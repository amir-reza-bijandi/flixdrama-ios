<script lang="ts">
	import PageIcon from '../_lib/components/page-icon.svelte';
	import Navigation from './_lib/components/navigation.svelte';
	import Overlay from './_lib/components/overlay.svelte';

	const { children } = $props();
</script>

<PageIcon />
<Navigation />
<Overlay />
{@render children()}
