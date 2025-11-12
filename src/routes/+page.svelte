<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';
	import SectionSelect, { type Option } from '$lib/components/section-select.svelte';
	import Section from '$lib/components/section.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { DATA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';

	const OPTION_LIST = [
		{
			name: 'South Korea',
			value: 'korea'
		},
		{
			name: 'China',
			value: 'china'
		},
		{
			name: 'Japan',
			value: 'japan'
		},
		{
			name: 'Thai',
			value: 'thai'
		}
	] as const satisfies Option<Country>[];

	const post = DATA[4];
</script>

<div class="pb-5">
	<RecommendationsCarousel />
	<Section>
		<SectionHeading>TV Releases</SectionHeading>
		<SectionSelect optionList={OPTION_LIST} />
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
		<SectionSelect optionList={OPTION_LIST} />
		<Swiper>
			{#each DATA as { id, poster, title, score }}
				<Post {id} image={poster} {title} {score} />
			{/each}
		</Swiper>
	</Section>
</div>
