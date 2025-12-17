<script lang="ts">
	import { page } from '$app/state';
	import Image from '$lib/components/image.svelte';
	import { recommendationsCarouselStore } from '../stores/recommendations-carousel-store.svelte';

	// Default fallback image
	const fallbackImage = '/image/backdrop/1.jpg';

	// Track current displayed image (persists to prevent flickering)
	let displayedImage = $state<string>(fallbackImage);

	// Check if we're on the media page (hide blur on media page)
	const isMediaPage = $derived(page.url.pathname.includes('/media'));

	// Only update displayed image when we have a valid new image (only for home page)
	$effect(() => {
		if (!isMediaPage) {
			const newImage = recommendationsCarouselStore.currentBackdrop;
			// Only update if we have a valid non-empty image URL
			if (newImage && newImage.length > 0) {
				displayedImage = newImage;
			}
		}
	});
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-background-primary">
	<!-- Crossfade background images using CSS transitions instead of Svelte transitions -->
	<!-- Using transform-gpu and backface-hidden to force GPU compositing and prevent iOS from dropping blur effect -->
	<!-- Hide blur effect on media page, show only on home -->
	<div
		class={[
			'absolute size-full transform-gpu backface-hidden transition-opacity duration-500',
			isMediaPage && 'opacity-0'
		]}
	>
		<Image class="h-full w-full transform-gpu backface-hidden scale-125 blur-[128px]" src={displayedImage} keepVisibleOnLoad />
	</div>
	<div
		class="absolute inset-0 transform-gpu backface-hidden bg-background-primary/70 bg-[url(/image/noise.png)] transition-colors"
	></div>
</div>

