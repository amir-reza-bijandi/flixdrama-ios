<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP_FA, DATA_FA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import PageWrapper from './_lib/components/page-wrapper.svelte';
	import SubscriptionBanner from './_lib/components/subscription-banner.svelte';
	import { toFarsi } from './_lib/utilities/to-farsi';

	const LIST_OPTIONS: Option[] = [
		{
			name: 'در حال تماشا',
			value: 'watching'
		},
		{
			name: 'بعداً می‌بینم',
			value: 'plan-to-watch'
		},
		{
			name: 'خوشم نیومد',
			value: 'dropped'
		},
		{
			name: 'تا آخر دیدم',
			value: 'finished'
		}
	];
	const countryOptions = Object.keys(COUNTRY_LABEL_MAP_FA).map<Option<Country>>((country) => ({
		name: COUNTRY_LABEL_MAP_FA[country as Country],
		value: country as Country
	}));
</script>

<PageWrapper>
	<RecommendationsCarousel data={DATA_FA} lang="fa" />
	<SubscriptionBanner />
	<Section heading="فیلم و سریال‌های من">
		<Select options={LIST_OPTIONS} />
		<Swiper gap={8} padding={20}>
			{#each DATA_FA as { id, poster, title, score, country }}
				<Post
					{id}
					lang="fa"
					image={poster}
					subtitle={COUNTRY_LABEL_MAP_FA[country]}
					{title}
					{score}
				/>
			{/each}
		</Swiper>
	</Section>
	<Section heading="جدیدترین سریال‌ها">
		<Select options={countryOptions} />
		<Swiper gap={8} padding={20}>
			{#each DATA_FA as { id, poster, title, score }}
				<Post
					{id}
					lang="fa"
					image={poster}
					subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
					{title}
					{score}
				/>
			{/each}
		</Swiper>
	</Section>
	<Section heading="جدیدترین فیلم‌ها">
		<Select options={countryOptions} />
		<Swiper gap={8} padding={20}>
			{#each DATA_FA as { id, poster, title, score }}
				<Post
					{id}
					lang="fa"
					image={poster}
					subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
					{title}
					{score}
				/>
			{/each}
		</Swiper>
	</Section>
</PageWrapper>
