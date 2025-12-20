<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		padding?: number;
		gap?: number;
	};
	const { children, padding = 0, gap = 0 }: Props = $props();

	let swiperElm = $state<HTMLElement | null>(null);
	let isDragging = $state(false);
	let startX = 0;
	let scrollLeft = 0;

	// For desktop drag support (not needed on iOS but good for browser testing)
	function handleMouseDown(e: MouseEvent) {
		if (!swiperElm) return;
		isDragging = true;
		startX = e.pageX - swiperElm.offsetLeft;
		scrollLeft = swiperElm.scrollLeft;
		swiperElm.style.cursor = 'grabbing';
	}

	function handleMouseUp() {
		isDragging = false;
		if (swiperElm) {
			swiperElm.style.cursor = 'grab';
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging || !swiperElm) return;
		e.preventDefault();
		const x = e.pageX - swiperElm.offsetLeft;
		const walk = (x - startX) * 1.5; // Scroll speed multiplier
		swiperElm.scrollLeft = scrollLeft - walk;
	}

	function handleMouseLeave() {
		isDragging = false;
		if (swiperElm) {
			swiperElm.style.cursor = 'grab';
		}
	}
</script>

<div
	style:--padding={toRem(padding)}
	style:--gap={toRem(gap)}
	class="swiper-container scrollbar-hidden"
	class:dragging={isDragging}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	bind:this={swiperElm}
>
	{@render children()}
</div>

<style>
	.swiper-container {
		display: flex;
		gap: var(--gap);
		overflow-x: auto;
		overflow-y: hidden;
		padding: 1rem var(--padding);
		margin: -1rem calc(var(--padding) * -1);
		cursor: grab;
		
		/* Enable smooth native scrolling on iOS */
		-webkit-overflow-scrolling: touch;
		scroll-behavior: smooth;
		
		/* Allow both horizontal scrolling in swiper AND vertical page scroll */
		/* pan-y allows vertical page scrolling, pan-x allows horizontal swiper scrolling */
		touch-action: pan-x pan-y;
		
		/* Hardware acceleration for smooth performance */
		will-change: scroll-position;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
		
		/* Prevent scroll chaining to parent */
		overscroll-behavior-x: contain;
		
		/* Snap scrolling for better UX (optional, can be enabled) */
		/* scroll-snap-type: x proximity; */
	}

	.swiper-container.dragging {
		cursor: grabbing;
		scroll-behavior: auto;
		user-select: none;
	}

	/* Ensure children don't shrink */
	.swiper-container > :global(*) {
		flex-shrink: 0;
		/* scroll-snap-align: start; */
	}
</style>
