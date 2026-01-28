<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { COUNTRY_LABEL_MAP_FA, MEDIA_FA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import RecommendationsCarousel from '../_lib/components/recommendations-carousel.svelte';
	import PageWrapper from './_lib/components/page-wrapper.svelte';
	import Profile from './_lib/components/profile.svelte';
	import Search from './_lib/components/search.svelte';
	import SubscriptionBanner from './_lib/components/subscription-banner.svelte';
	import { HASH } from './_lib/constants/hash';
	import { hashStore } from './_lib/store/hash-store.svelte';
	import { toFarsi } from './_lib/utilities/to-farsi';

	const SWIPER_OFFSET = 20;

	const LIST_OPTIONS: Option[] = [
		{
			label: 'در حال تماشا',
			value: 'watching'
		},
		{
			label: 'بعداً می‌بینم',
			value: 'plan-to-watch'
		},
		{
			label: 'خوشم نیومد',
			value: 'dropped'
		},
		{
			label: 'تا آخر دیدم',
			value: 'finished'
		}
	];
	const countryOptions = Object.keys(COUNTRY_LABEL_MAP_FA).map<Option>((country) => ({
		label: COUNTRY_LABEL_MAP_FA[country as Country],
		value: country as Country
	}));

	const isSearchActive = $derived(hashStore.current === HASH.SEARCH);
	let isTransitionReversed = $state(false);

	$effect(() => {
		isTransitionReversed = isSearchActive;
	});
</script>

{#snippet profileButton()}
	<Profile />
{/snippet}

<PageWrapper
	showBackButton={isSearchActive}
	actions={!isSearchActive ? profileButton : undefined}
	bind:isTransitionReversed
	icon={asset('/image/icon/fade/home.svg')}
	hasContentPadding
	hasBottomPadding
>
	<Search isActive={isSearchActive} />
	<div
		class={[
			'transition-[opacity,scale] ease-overshoot-light',
			isSearchActive && 'pointer-events-none scale-98 opacity-0'
		]}
	>
		<RecommendationsCarousel data={MEDIA_FA} />
		<SubscriptionBanner />
		<Section heading="فیلم و سریال‌های من">
			<Select offset={SWIPER_OFFSET} options={LIST_OPTIONS} />
			<Swiper.Root offset={SWIPER_OFFSET}>
				<Swiper.Wrapper>
					{#each MEDIA_FA as { id, poster, titleFa, score, country }}
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
			<Swiper.Root offset={SWIPER_OFFSET}>
				<Swiper.Wrapper>
					{#each MEDIA_FA as { id, poster, titleFa, score }}
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
			<Swiper.Root offset={SWIPER_OFFSET}>
				<Swiper.Wrapper>
					{#each MEDIA_FA as { id, poster, titleFa, score }}
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
