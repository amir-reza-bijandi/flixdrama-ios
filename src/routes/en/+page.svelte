<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP_EN, DATA_EN } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import { navigationStore } from './_lib/stores/navigation-store.svelte';

	const options = Object.keys(COUNTRY_LABEL_MAP_EN).map<Option<Country>>((country) => ({
		name: COUNTRY_LABEL_MAP_EN[country as Country],
		value: country as Country
	}));
</script>

<div style:--bottom-padding={toRem(navigationStore.requiredSpace)} class="pb-(--bottom-padding)">
	<RecommendationsCarousel data={DATA_EN} lang="en" />
	<Section heading="TV Releases">
		<Select {options} />
		<Swiper gap={8} padding={20}>
			{#each DATA_EN as { id, poster, title, score }}
				<Post
					{id}
					image={poster}
					subtitle="Episode {Math.floor(Math.random() * 16)}"
					{title}
					{score}
				/>
			{/each}
		</Swiper>
	</Section>
	<Section heading="Movie Releases">
		<Select {options} />
		<Swiper gap={8} padding={20}>
			{#each DATA_EN as { id, poster, title, score }}
				<Post {id} image={poster} {title} {score} />
			{/each}
		</Swiper>
	</Section>
</div>
