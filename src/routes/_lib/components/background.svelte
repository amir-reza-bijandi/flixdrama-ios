<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/components/image.svelte';
	import { DATA } from '$lib/constants/data';
	import { fade } from 'svelte/transition';
	import { recommendationsCarouselStore } from '../../en/_lib/stores/recommendations-carousel-store.svelte';

	const image = $derived(
		page.url.pathname.includes('/media')
			? (DATA.find(({ id }) => id === Number(page.params.id))?.backdrop ?? '')
			: DATA[recommendationsCarouselStore.currentIndex].backdrop
	);
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	{#key image}
		<div
			class="absolute size-full"
			transition:fade={{
				duration: 500
			}}
		>
			<Image class="h-full w-full scale-125 blur-[128px]" src={image} />
		</div>
	{/key}
	<div
		class="absolute inset-0 bg-background-primary/70 bg-[url(/image/noise.png)] transition-colors"
	></div>
</div>
