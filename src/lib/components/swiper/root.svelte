<script module>
	type Props = {
		children: Snippet;
		spaceBetween?: number;
		offset?: number;
		class?: ClassValue;
	};
	export type { Props as SwiperRootProps };
</script>

<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { Swiper } from 'swiper';
	import { FreeMode } from 'swiper/modules';
	import { cn, type ClassValue } from 'tailwind-variants';

	const DEFAULT_SWIPER_OFFSET = 24;
	const DEFAULT_SWIPER_SPACE_BETWEEN = 8;

	const {
		children,
		spaceBetween = DEFAULT_SWIPER_SPACE_BETWEEN,
		offset = DEFAULT_SWIPER_OFFSET,
		class: extraClass
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
				modules: [FreeMode]
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
