<script lang="ts">
	import { resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import * as Swiper from '$lib/components/swiper';
	import { COUNTRY_LABEL_MAP_FA, DATA_FA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import PageWrapper from './_lib/components/page-wrapper.svelte';
	import SubscriptionBanner from './_lib/components/subscription-banner.svelte';
	import { sizeStore } from './_lib/store/size-store.svelte';
	import { toFarsi } from './_lib/utilities/to-farsi';

	const SWIPER_OFFSET = 20;
	const SWIPER_SPACE_BETWEEN = 8;

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
	<div
		style:--padding-bottom={toRem(sizeStore.navigationHeight)}
		class="pb-[calc(var(--padding-bottom)+var(--spacing-content-padding))]"
	>
		<RecommendationsCarousel data={DATA_FA} />
		<SubscriptionBanner />
		<Section heading="فیلم و سریال‌های من">
			<Select offset={SWIPER_OFFSET} options={LIST_OPTIONS} />
			<Swiper.Root offset={SWIPER_OFFSET} spaceBetween={SWIPER_SPACE_BETWEEN}>
				<Swiper.Wrapper>
					{#each DATA_FA as { id, poster, titleFa, score, country }}
						<Swiper.Slide>
							<PostCard
								href={resolve('/fa/media/[id]', {
									id: String(id)
								})}
								image={poster}
								subtitle={COUNTRY_LABEL_MAP_FA[country]}
								title={titleFa}
								{score}
							/>
						</Swiper.Slide>
					{/each}
				</Swiper.Wrapper>
			</Swiper.Root>
		</Section>
		<Section heading="جدیدترین سریال‌ها">
			<Select offset={SWIPER_OFFSET} options={countryOptions} />
			<Swiper.Root offset={SWIPER_OFFSET} spaceBetween={SWIPER_SPACE_BETWEEN}>
				<Swiper.Wrapper>
					{#each DATA_FA as { id, poster, titleFa, score }}
						<Swiper.Slide>
							<PostCard
								href={resolve('/fa/media/[id]', {
									id: String(id)
								})}
								image={poster}
								subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
								title={titleFa}
								{score}
							/>
						</Swiper.Slide>
					{/each}
				</Swiper.Wrapper>
			</Swiper.Root>
		</Section>
		<Section heading="جدیدترین فیلم‌ها">
			<Select offset={SWIPER_OFFSET} options={countryOptions} />
			<Swiper.Root offset={SWIPER_OFFSET} spaceBetween={SWIPER_SPACE_BETWEEN}>
				<Swiper.Wrapper>
					{#each DATA_FA as { id, poster, titleFa, score }}
						<Swiper.Slide>
							<PostCard
								href={resolve('/fa/media/[id]', {
									id: String(id)
								})}
								image={poster}
								subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
								title={titleFa}
								{score}
							/>
						</Swiper.Slide>
					{/each}
				</Swiper.Wrapper>
			</Swiper.Root>
		</Section>
	</div>
</PageWrapper>
