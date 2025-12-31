<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		isActive: boolean;
	};
	const { children, class: extraClass, isActive }: Props = $props();

	let contentHeight = $state(0);
	let isTransitioning = $state(false);

	let timeoutId: number;
	$effect(() => {
		void isActive;

		const startScroll = window.scrollY;
		isTransitioning = true;

		const frame = () => {
			if (!isTransitioning) return;
			window.scrollTo(0, startScroll);
			requestAnimationFrame(frame);
		};
		requestAnimationFrame(frame);

		timeoutId = window.setTimeout(() => {
			isTransitioning = false;
		}, TRANSITION.DURATION);

		return () => {
			clearTimeout(timeoutId);
			isTransitioning = false;
		};
	});
</script>

<div
	style:--height={toRem(isActive ? contentHeight : 0)}
	style:--duration={`${TRANSITION.DURATION}ms`}
	class={cn(
		'relative h-(--height) overflow-hidden rounded-b-3xl bg-background-tertiary transition-[height,border-color] duration-(--duration) before:absolute before:top-0 before:h-px before:w-full before:transition-colors',
		!isActive && 'before:bg-stroke-primary',
		extraClass
	)}
>
	<div class="divide-y divide-stroke-primary" bind:clientHeight={contentHeight}>
		{@render children?.()}
	</div>
</div>
