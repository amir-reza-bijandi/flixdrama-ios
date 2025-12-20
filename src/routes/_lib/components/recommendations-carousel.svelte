<script lang="ts">
	import { resolve } from '$app/paths';
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import type { SliderItem } from '$lib/types/api';
	import { Star } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Swiper } from 'swiper';
	import 'swiper/css';
	import 'swiper/css/effect-coverflow';
	import { Autoplay, EffectCoverflow } from 'swiper/modules';
	import { recommendationsCarouselStore } from '../stores/recommendations-carousel-store.svelte';

	type Props = {
		sliderItems: SliderItem[];
	};

	const { sliderItems }: Props = $props();

	const AUTOPLAY_DELAY = 5000;

	let swiperElm = $state<HTMLElement | null>(null);
	const slideElms = $state<HTMLElement[]>([]);

	// Set initial backdrop immediately when slider items are available
	$effect(() => {
		if (sliderItems.length > 0 && !recommendationsCarouselStore.currentBackdrop) {
			recommendationsCarouselStore.currentBackdrop = sliderItems[0].poster;
		}
	});

	$effect(() => {
		if (swiperElm && slideElms.length) {
			const SCALE = 0.83333;
			const SPEED = 500;
			const ACTIVE_CLASS = 'active';

			const swiper = new Swiper(swiperElm, {
				modules: [EffectCoverflow, Autoplay],
				autoplay: {
					delay: AUTOPLAY_DELAY
				},
				loop: true,
				speed: SPEED,
				effect: 'coverflow',
				slidesPerView: 'auto',
				centeredSlides: true,
				spaceBetween: 8,
				coverflowEffect: {
					scale: SCALE,
					stretch: 30,
					depth: 0,
					rotate: 0,
					slideShadows: false
				},
				on: {
					init: (swiper) => {
						slideElms.forEach(
							(slideElm) =>
								(slideElm.style.transitionProperty = 'transform, box-shadow, outline-color')
						);
						showGlow(swiper);
						recommendationsCarouselStore.currentIndex = swiper.realIndex;
						// Set initial backdrop image from slider data
						if (sliderItems[swiper.realIndex]) {
							recommendationsCarouselStore.currentBackdrop = sliderItems[swiper.realIndex].poster;
						}
					},
					touchEnd: () => {
						enableTransition();
						showGlow(swiper);
					},
					touchMove: () => {
						disableTransition();
						hideGlow();
					},
					transitionStart: () => hideGlow(),
					transitionEnd: (swiper) => {
						disableTransition();
						showGlow(swiper);
					},
					activeIndexChange: (swiper) => {
						recommendationsCarouselStore.currentIndex = swiper.realIndex;
						// Update backdrop image when slide changes
						if (sliderItems[swiper.realIndex]) {
							recommendationsCarouselStore.currentBackdrop = sliderItems[swiper.realIndex].poster;
						}
					}
				}
			});

			function disableTransition() {
				slideElms.forEach(
					(slideElm) => (slideElm.style.transitionDuration = `0ms, ${SPEED}ms, ${SPEED}ms`)
				);
			}
			function enableTransition() {
				slideElms.forEach(
					(slideElm) => (slideElm.style.transitionDuration = `${SPEED}ms, ${SPEED}ms, ${SPEED}ms`)
				);
			}
			function hideGlow() {
				slideElms.forEach((slideElm) => slideElm.classList.remove(ACTIVE_CLASS));
			}
			function showGlow(swiper: Swiper) {
				const activeSlide = slideElms[swiper.realIndex] as HTMLElement;
				activeSlide.classList.add(ACTIVE_CLASS);
			}

			return () => swiper.destroy();
		}
	});
</script>

<div class="swiper relative isolate mt-6.5 mb-8 w-full overflow-visible!" bind:this={swiperElm}>
	<div class="swiper-wrapper overflow-visible!">
		{#each sliderItems as { poster, vote, name, id }, index}
			<div
				class="swiper-slide group aspect-video h-auto! w-90! overflow-hidden rounded-2xl outline -outline-offset-1 outline-stroke-primary transition-colors [&.active]:shadow-[0px_3rem_6rem_-2rem_--alpha(var(--color-foreground-primary)/10%)]"
				bind:this={slideElms[index]}
			>
				<a
					class="relative block"
					href={resolve('/media/[id]', {
						id: String(id)
					})}
				>
					<div class="size-fit duration-5000 ease-linear group-[&.active]:scale-110">
						<Image
							style="mask-image: radial-gradient(100% 110% at center top, hsla(0, 0%, 0%, 1) 0%, hsla(0, 0%, 0%, 0) 100%);"
							class="aspect-video h-auto w-full"
							src={poster}
							loadingGlow
						/>
					</div>
					<div
						style="transform-origin: left bottom;"
						class="absolute right-4 bottom-4 left-4 flex scale-75 items-center gap-2 font-bold opacity-0 transition-[opacity,scale] ease-overshoot-light group-[&.active]:scale-100 group-[&.active]:opacity-100"
					>
						<span class="line-clamp-1">{name}</span>
						<Separator variant="secondary" size={10} />
						<div
							class="flex items-center gap-1 text-accent-secondary dark:text-accent-secondary-tint"
						>
							<Icon src={Star} theme="solid" class="w-4" />
							<span class="translate-y-px text-sm leading-none">{vote}</span>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
