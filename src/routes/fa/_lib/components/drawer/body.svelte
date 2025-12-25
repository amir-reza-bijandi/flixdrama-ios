<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import type { DirectionFactor } from '$lib/types/transition';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

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
	class={['relative h-(--height)', hasTransition && 'transition-[height]']}
>
	{#key children}
		<div
			in:fly={{
				x: window.innerWidth * directionFactor,
				duration: TRANSITION.DURATION
			}}
			out:fly={{
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
