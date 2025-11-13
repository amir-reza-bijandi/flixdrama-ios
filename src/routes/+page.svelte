<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';
	import SectionSelect, { type Option } from '$lib/components/section-select.svelte';
	import Section from '$lib/components/section.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP, DATA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';

	const optionList = Object.keys(COUNTRY_LABEL_MAP).map<Option<Country>>((country) => ({
		name: COUNTRY_LABEL_MAP[country as Country],
		value: country as Country
	}));
</script>

<div class="pb-5">
	<RecommendationsCarousel />
	<Section>
		<SectionHeading>TV Releases</SectionHeading>
		<SectionSelect {optionList} />
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
	<Section>
		<SectionHeading>Movie Releases</SectionHeading>
		<SectionSelect {optionList} />
		<Swiper gap={8} padding={20}>
			{#each DATA as { id, poster, title, score }}
				<Post {id} image={poster} {title} {score} />
			{/each}
		</Swiper>
	</Section>
</div>
