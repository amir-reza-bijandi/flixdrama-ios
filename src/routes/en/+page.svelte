<script lang="ts">
	import { resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { COUNTRY_LABEL_MAP_EN, DATA_EN } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import { navigationStore } from './_lib/stores/navigation-store.svelte';

	const SWIPER_OFFSET = 20;

	const options = Object.keys(COUNTRY_LABEL_MAP_EN).map<Option>((country) => ({
		name: COUNTRY_LABEL_MAP_EN[country as Country],
		value: country as Country
	}));
</script>

<div style:--bottom-padding={toRem(navigationStore.requiredSpace)} class="pb-(--bottom-padding)">
	<RecommendationsCarousel data={DATA_EN} />
	<Section heading="TV Releases">
		<Select {options} />
		<Swiper.Root offset={SWIPER_OFFSET}>
			<Swiper.Wrapper>
				{#each DATA_EN as { id, poster, title, score }}
					<Swiper.Slide>
						<PostCard
							href={resolve('/en/media/[id]', {
								id: String(id)
							})}
							image={poster}
							subtitle="Episode {Math.floor(Math.random() * 16)}"
							{title}
							{score}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Section>
	<Section heading="Movie Releases">
		<Select {options} />
		<Swiper.Root offset={SWIPER_OFFSET}>
			<Swiper.Wrapper>
				{#each DATA_EN as { id, poster, title, score }}
					<Swiper.Slide>
						<PostCard
							href={resolve('/en/media/[id]', {
								id: String(id)
							})}
							image={poster}
							{title}
							{score}
						/>
					</Swiper.Slide>
				{/each}
			</Swiper.Wrapper>
		</Swiper.Root>
	</Section>
</div>
