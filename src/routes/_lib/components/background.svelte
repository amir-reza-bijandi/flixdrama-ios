<script lang="ts">
	import { fade } from 'svelte/transition';
	import { DATA } from '../constants/data';
	import { recommendationsCarouselStore } from '../stores/recommendations-carousel-store.svelte';
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	{#key recommendationsCarouselStore.currentIndex}
		<img
			class="absolute h-full w-full scale-125 object-cover"
			src={DATA[recommendationsCarouselStore.currentIndex].backdrop}
			alt=""
			transition:fade={{
				duration: 500
			}}
		/>
	{/key}
	<div
		class="absolute inset-0 bg-background-primary/70 bg-[url(/image/noise.png)] backdrop-blur-[128px] transition-colors duration-500"
	></div>
</div>
