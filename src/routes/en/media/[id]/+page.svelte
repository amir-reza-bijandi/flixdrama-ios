<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import PostCard from '$lib/components/post-card.svelte';
	import { Swiper } from '$lib/components/swiper';
	import { COUNTRY_LABEL_MAP_EN, MEDIA_EN, TYPE_LABEL_MAP_EN } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, GlobeIcon, TvIcon } from '@lucide/svelte';
	import Genres from '../../../_lib/components/genres.svelte';
	import PostExpandable from '../../../_lib/components/post-expandable.svelte';
	import type { PostInfoData } from '../../../_lib/components/post-info.svelte';
	import PostInfo from '../../../_lib/components/post-info.svelte';
	import { backgroundStore } from '../../../_lib/store/background-store.svelte';
	import { navigationStore } from '../../_lib/stores/navigation-store.svelte';
	import PostSection from './_lib/components/post-section.svelte';
	import Score from './_lib/components/score.svelte';
	import TrailerBackdrop from './_lib/components/trailer-backdrop.svelte';

	const { backdrop, title, type, country, year, genres, synopsis, score } = $derived(
		MEDIA_EN.find(({ id }) => id === Number(page.params.id)) ?? MEDIA_EN[0]
	);
	const shortInfoData = $derived<PostInfoData>([
		{
			icon: TvIcon,
			label: TYPE_LABEL_MAP_EN[type]
		},
		{
			icon: GlobeIcon,
			label: COUNTRY_LABEL_MAP_EN[country]
		},
		{
			icon: CalendarIcon,
			label: String(year)
		}
	]);

	$effect(() => {
		backgroundStore.current = backdrop;
	});
</script>

<div class="flex flex-1 flex-col">
	<TrailerBackdrop {backdrop} />
	<div
		style:--bottom-padding={toRem(navigationStore.requiredSpace)}
		class="relative mt-49 flex-1 p-6 pb-(--bottom-padding)"
	>
		<div
			class="absolute inset-0 rounded-t-3xl border-t border-stroke-primary bg-background-tertiary backdrop-blur-lg transition-colors"
		></div>
		<div class="relative z-10">
			<div class="text-2xl leading-none font-bold">{title}</div>
			<Score>
				{score}
			</Score>
			<PostInfo data={shortInfoData} />
			<Genres data={genres} />
			<div class="flex flex-col gap-4">
				<PostSection heading="Synopsis">
					<PostExpandable>
						{synopsis}
					</PostExpandable>
				</PostSection>
				<PostSection heading="Recommendations">
					<Swiper.Root>
						<Swiper.Wrapper>
							{#each MEDIA_EN as { id, poster, title, score }}
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
				</PostSection>
			</div>
		</div>
	</div>
</div>
