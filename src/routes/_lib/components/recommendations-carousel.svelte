<script lang="ts">
	import { resolve } from '$app/paths';
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import { COUNTRY_LABEL_MAP_EN, COUNTRY_LABEL_MAP_FA } from '$lib/constants/data';
	import { langStore } from '$lib/store/lang-store.svelte';
	import type { MediaEn, MediaFa } from '$lib/types/data';
	import { Lang } from '$lib/types/general';
	import { toRem } from '$lib/utilities/general';
	import { Swiper } from 'swiper';
	import { Autoplay, EffectCoverflow } from 'swiper/modules';
	import { sizeStore } from '../../fa/_lib/store/size-store.svelte';
	import { recommendationsCarouselStore } from '../store/recommendations-carousel-store.svelte';
	import Score from './score.svelte';

	type enProps = {
		data: MediaEn[];
	};
	type faProps = {
		data: MediaFa[];
	};
	type Props = enProps | faProps;
	const { data }: Props = $props();

	const AUTOPLAY_DELAY = 5000;

	let swiperElm = $state<HTMLElement | null>(null);
	const slideElms = $state<HTMLElement[]>([]);

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
					activeIndexChange: (swiper) =>
						(recommendationsCarouselStore.currentIndex = swiper.realIndex)
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

<div
	style:--search-input-height={toRem(sizeStore.SEARCH_INPUT_HEIGHT)}
	class={[
		'swiper relative isolate mb-6 w-full overflow-visible! transition-colors',
		langStore.current === Lang.En ? 'mt-6.5' : 'mt-[calc(var(--search-input-height)+--spacing(10))]'
	]}
	bind:this={swiperElm}
>
	<div class="swiper-wrapper overflow-visible!">
		{#each data as { backdrop, score, id, country, ...restOfMedia }, index}
			<div
				class={[
					'swiper-slide group aspect-video h-auto! overflow-hidden rounded-2xl outline -outline-offset-1 outline-stroke-primary transition-colors [&.active]:shadow-[0px_0px_6rem_--alpha(var(--color-foreground-primary)/10%)]',
					langStore.current === 'en'
						? 'w-[calc(100%-var(--spacing-content-padding)*2)]!'
						: 'w-full!'
				]}
				bind:this={slideElms[index]}
			>
				<a
					class="relative block"
					href={resolve(`/${langStore.current}/media/[id]`, {
						id: String(id)
					})}
				>
					<div class="size-fit duration-5000 ease-linear group-[&.active]:scale-110">
						<Image
							style="mask-image: radial-gradient(100% 110% at center top, hsla(0, 0%, 0%, 1) 0%, hsla(0, 0%, 0%, 0) 100%);"
							class="aspect-video h-auto w-full"
							src={backdrop}
							hasLoadingGlow
						/>
					</div>
					<div
						style="transform-origin: {langStore.current === 'en' ? 'right' : 'left'} top;"
						class="absolute end-3 top-3 scale-75 rounded-full bg-gradient bg-gradient-primary p-1.5 text-xs leading-none text-foreground-accent opacity-0 outline -outline-offset-1 outline-stroke-tertiary transition-[opacity,scale] ease-overshoot-light group-[&.active]:scale-100 group-[&.active]:opacity-100"
					>
						{(langStore.current === 'en' ? COUNTRY_LABEL_MAP_EN : COUNTRY_LABEL_MAP_FA)[country]}
					</div>
					<div
						style="transform-origin: {langStore.current === 'en' ? 'left' : 'right'} bottom;"
						class={[
							'absolute start-4 bottom-4 flex scale-75 items-center gap-2 font-bold opacity-0 transition-[opacity,scale] ease-overshoot-light group-[&.active]:scale-100 group-[&.active]:opacity-100'
						]}
					>
						<span class="line-clamp-1"
							>{'title' in restOfMedia ? restOfMedia.title : restOfMedia.titleFa}</span
						>
						<Separator variant="secondary" size={10} />
						<Score value={score} />
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
