<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { backOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import { pageIconStore } from '../store/page-icon-store.svelte';

	interface SpinScaleOptions {
		delay?: number;
		duration?: number;
		easing?: (t: number) => number;
		startScale?: number;
		startRotation?: number;
	}
	export function spinScale(
		node: HTMLElement,
		{
			delay = 0,
			duration = TRANSITION.DURATION,
			easing = backOut,
			startScale = 0.75,
			startRotation = 360
		}: SpinScaleOptions = {}
	): TransitionConfig {
		const opacity = +getComputedStyle(node).opacity;
		return {
			delay,
			duration,
			easing,
			css: (t) => {
				const scale = startScale + (1 - startScale) * t;
				const rotate = startRotation + (0 - startRotation) * t;

				return `
				opacity: ${t * opacity};
				transform: scale(${scale}) rotate(${rotate}deg);
			`;
			}
		};
	}
</script>

{#key pageIconStore.current}
	<div
		class="fixed top-content-padding left-content-padding -z-10 mix-blend-overlay"
		transition:spinScale
	>
		<Image
			class="size-40 mask-linear-180 mask-linear-from-foreground-primary/25 mask-linear-to-transparent"
			src={pageIconStore.current}
		/>
	</div>
{/key}
