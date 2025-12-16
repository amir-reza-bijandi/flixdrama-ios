<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import Image from '$lib/components/image.svelte';
	import { DATA_EN } from '$lib/constants/data';
	import { fade } from 'svelte/transition';
	import { recommendationsCarouselStore } from '../store/recommendations-carousel-store.svelte';

	const image = $derived(
		page.url.pathname.includes('/media')
			? (DATA_EN.find(({ id }) => id === Number(page.params.id))?.backdrop ?? '')
			: DATA_EN[recommendationsCarouselStore.currentIndex].backdrop
	);
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	{#key image}
		<div
			class="absolute size-full"
			transition:fade={{
				duration: 1000
			}}
		>
			<Image class="h-full w-full scale-125 blur-[128px]" src={image} />
		</div>
	{/key}
	<div
		style="background-image: url({asset('/image/noise.png')});"
		class="absolute inset-0 bg-background-primary/70 transition-colors"
	></div>
</div>
