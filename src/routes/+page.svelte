<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import SectionHeading from '$lib/components/section-heading.svelte';
	import SectionSelect, { type Option } from '$lib/components/section-select.svelte';
	import Section from '$lib/components/section.svelte';
	import SwiperPostWrapper from '$lib/components/swiper-post-wrapper.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { DATA } from '$lib/constants/data';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';
	import type { Country } from './_lib/types/data';

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
		<Swiper>
			<SwiperPostWrapper>
				{#each DATA as { poster, title, score }}
					<Post
						image={poster}
						subtitle="Episode {Math.floor(Math.random() * 16)}"
						{title}
						{score}
					/>
				{/each}
			</SwiperPostWrapper>
		</Swiper>
	</Section>
	<Section>
		<SectionHeading>Movie Releases</SectionHeading>
		<SectionSelect optionList={OPTION_LIST} />
		<Swiper>
			<SwiperPostWrapper>
				{#each DATA as { poster, title, score }}
					<Post image={poster} {title} {score} />
				{/each}
			</SwiperPostWrapper>
		</Swiper>
	</Section>
</div>
