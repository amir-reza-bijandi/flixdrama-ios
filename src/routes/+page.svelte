<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP, DATA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';
	import { navigationStore } from './_lib/stores/navigation-store.svelte';

	const optionList = Object.keys(COUNTRY_LABEL_MAP).map<Option<Country>>((country) => ({
		name: COUNTRY_LABEL_MAP[country as Country],
		value: country as Country
	}));
</script>

<div style:--bottom-padding={navigationStore.bottomSpacing} class="pb-(--bottom-padding)">
	<RecommendationsCarousel />
	<Section heading="TV Releases">
		<Select {optionList} />
		<Swiper gap={8} padding={20}>
			{#each DATA as { id, poster, title, score }}
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
		<Select {optionList} />
		<Swiper gap={8} padding={20}>
			{#each DATA as { id, poster, title, score }}
				<Post {id} image={poster} {title} {score} />
			{/each}
		</Swiper>
	</Section>
</div>
