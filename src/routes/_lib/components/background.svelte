<script lang="ts">
	import { page } from '$app/state';
	import { DATA } from '$lib/constants/data';
	import { fade } from 'svelte/transition';
	import { recommendationsCarouselStore } from '../stores/recommendations-carousel-store.svelte';

	const image = $derived(
		page.url.pathname.includes('/media')
			? DATA[Number(page.params.id)].backdrop
			: DATA[recommendationsCarouselStore.currentIndex].backdrop
	);
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	{#key image}
		<img
			class="absolute h-full w-full scale-125 object-cover blur-[128px]"
			src={image}
			alt=""
			transition:fade={{
				duration: 500
			}}
		/>
	{/key}
	<div
		class="absolute inset-0 bg-background-primary/70 bg-[url(/image/noise.png)] transition-colors duration-500"
	></div>
</div>
