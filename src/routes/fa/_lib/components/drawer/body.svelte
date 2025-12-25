<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import type { DirectionFactor } from '$lib/types/transition';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { backOut } from 'svelte/easing';

	import { cubicOut } from 'svelte/easing';
	import type { EasingFunction, TransitionConfig } from 'svelte/transition';

	type FlyCustomParams = {
		delay?: number;
		duration?: number;
		easing?: EasingFunction;
		x?: number;
	};
	export function flyCustom(
		node: HTMLElement,
		{ delay = 0, duration = 400, easing = cubicOut, x = 0 }: FlyCustomParams = {}
	): TransitionConfig {
		const style = getComputedStyle(node);
		const targetLeft = parseFloat(style.left) || 0;

		return {
			delay,
			duration,
			easing,
			css: (t, u) => `left: ${targetLeft - u * x}px;`
		};
	}

	type Props = {
		children: Snippet;
		directionFactor?: DirectionFactor;
	};
	const { children, directionFactor = 1 }: Props = $props();

	let contentHeight = $state(0);
	let hasTransition = $state(false);

	$effect(() => {
		requestAnimationFrame(() => {
			hasTransition = true;
		});
	});
</script>

<div
	style:--height={toRem(contentHeight)}
	class={['relative h-(--height)', hasTransition && 'transition-[height] duration-250']}
>
	{#key children}
		<div
			in:flyCustom={{
				x: window.innerWidth * directionFactor,
				duration: TRANSITION.DURATION,
				easing: backOut
			}}
			out:flyCustom={{
				x: -window.innerWidth * directionFactor,
				duration: TRANSITION.DURATION
			}}
			class="absolute top-0 left-0 flex w-full flex-col gap-3"
			bind:clientHeight={contentHeight}
		>
			{@render children()}
		</div>
	{/key}
</div>
