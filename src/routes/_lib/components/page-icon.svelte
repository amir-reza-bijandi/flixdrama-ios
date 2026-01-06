<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import { mode } from 'mode-watcher';
	import { backOut } from 'svelte/easing';
	import { fade, type TransitionConfig } from 'svelte/transition';
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

	let width = $state(0);
	let height = $state(0);
</script>

{#key pageIconStore.current}
	<div
		style:--width={toRem(width)}
		style:--height={toRem(height)}
		class="fixed top-content-padding left-content-padding -z-10 h-(--height) w-(--width) mix-blend-overlay"
		transition:spinScale
	>
		{#key mode.current === 'dark'}
			<div
				class="absolute top-0 left-0"
				transition:fade={{ duration: TRANSITION.DURATION }}
				bind:clientWidth={width}
				bind:clientHeight={height}
			>
				{@render image(mode.current === 'dark')}
			</div>
		{/key}
	</div>
{/key}

{#snippet image(isInverted: boolean)}
	<Image
		class={[
			'size-40 mask-linear-180 mask-linear-from-foreground-primary/25 mask-linear-to-transparent',
			isInverted && 'invert-100'
		]}
		src={pageIconStore.current}
	/>
{/snippet}
