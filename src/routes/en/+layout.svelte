<script lang="ts">
	import Header from './_lib/components/header.svelte';
	import Navigation from './_lib/components/navigation.svelte';

	let { children } = $props();
</script>

<div class="pt-9">
	<Navigation />
	<Header />
</div>
{@render children()}
