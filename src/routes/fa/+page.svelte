<script lang="ts">
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP_FA, DATA_FA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import { Lang } from '$lib/types/general';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import PageWrapper from './_lib/components/page-wrapper.svelte';
	import SubscriptionBanner from './_lib/components/subscription-banner.svelte';
	import { sizeStore } from './_lib/store/size-store.svelte';
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
	<div style:--padding-bottom={toRem(sizeStore.navigationHeight)} class="pb-(--padding-bottom)">
		<RecommendationsCarousel data={DATA_FA} lang={Lang.Fa} />
		<SubscriptionBanner />
		<Section heading="فیلم و سریال‌های من">
			<Select options={LIST_OPTIONS} />
			<Swiper gap={8} padding={20}>
				{#each DATA_FA as { id, poster, titleFa, score, country }}
					<Post
						{id}
						lang={Lang.Fa}
						image={poster}
						subtitle={COUNTRY_LABEL_MAP_FA[country]}
						title={titleFa}
						{score}
					/>
				{/each}
			</Swiper>
		</Section>
		<Section heading="جدیدترین سریال‌ها">
			<Select options={countryOptions} />
			<Swiper gap={8} padding={20}>
				{#each DATA_FA as { id, poster, titleFa, score }}
					<Post
						{id}
						lang={Lang.Fa}
						image={poster}
						subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
						title={titleFa}
						{score}
					/>
				{/each}
			</Swiper>
		</Section>
		<Section heading="جدیدترین فیلم‌ها">
			<Select options={countryOptions} />
			<Swiper gap={8} padding={20}>
				{#each DATA_FA as { id, poster, titleFa, score }}
					<Post
						{id}
						lang={Lang.Fa}
						image={poster}
						subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
						title={titleFa}
						{score}
					/>
				{/each}
			</Swiper>
		</Section>
	</div>
</PageWrapper>
