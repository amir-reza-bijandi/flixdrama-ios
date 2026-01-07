<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import { backOut, cubicOut } from 'svelte/easing';
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { pageIconStore } from '../store/page-icon-store.svelte';
	import FadingIcon from './fading-icon.svelte';

	const SIZE = 160;
	const ROTATION = 360;

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
			duration = TRANSITION.DURATION * 2,
			easing = cubicOut,
			startScale = 0,
			startRotation = ROTATION
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
		style:--size={toRem(SIZE)}
		class="absolute top-content-padding left-content-padding -z-10 size-(--size) mix-blend-overlay"
		in:fly={{
			easing: backOut,
			y: SIZE,
			duration: 750
		}}
		out:fly={{
			y: -SIZE,
			duration: 500
		}}
	>
		<FadingIcon src={pageIconStore.current} size={SIZE} />
	</div>
{/key}
