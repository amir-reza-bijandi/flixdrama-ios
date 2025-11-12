<script lang="ts">
	import { page } from '$app/state';
	import { DATA } from '$lib/constants/data';
	import TrailerBackdrop from './_lib/components/trailer-backdrop.svelte';

	const { backdrop } = $derived(DATA.find(({ id }) => id === Number(page.params.id)) ?? DATA[0]);
</script>

<div class="flex-1">
	<TrailerBackdrop {backdrop} />
</div>
