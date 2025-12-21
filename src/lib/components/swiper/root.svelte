<script module>
	type Props = {
		children: Snippet;
		spaceBetween?: number;
		offset?: number;
		class?: ClassValue;
		onTouchMove?: () => void;
		onTouchEnd?: () => void;
	};
	export type { Props as SwiperRootProps };
</script>

<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { Swiper } from 'swiper';
	import { FreeMode } from 'swiper/modules';
	import { cn, type ClassValue } from 'tailwind-variants';

	const {
		children,
		spaceBetween = 0,
		offset = 0,
		class: extraClass,
		onTouchMove,
		onTouchEnd
	}: Props = $props();

	let swiperElm = $state<HTMLElement | null>(null);

	$effect(() => {
		if (swiperElm) {
			const swiper = new Swiper(swiperElm, {
				slidesPerView: 'auto',
				freeMode: {
					enabled: true
				},
				spaceBetween,
				modules: [FreeMode],
				on: {
					touchMove: () => onTouchMove?.(),
					touchEnd: () => onTouchEnd?.()
				}
			});
			return () => swiper.destroy();
		}
	});
</script>

<div
	style:--margin-inline={toRem(offset)}
	class={cn('swiper -mx-(--margin-inline)! overflow-visible! px-(--margin-inline)!', extraClass)}
	bind:this={swiperElm}
>
	{@render children()}
</div>
