<script lang="ts">
	import { page } from '$app/state';
	import Post from '$lib/components/post.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { COUNTRY_LABEL_MAP_EN, DATA_EN, TYPE_LABEL_MAP_EN } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { CalendarIcon, GlobeIcon, TvIcon } from '@lucide/svelte';
	import { navigationStore } from '../../_lib/stores/navigation-store.svelte';
	import Genres from './_lib/components/genres.svelte';
	import PostSection from './_lib/components/post-section.svelte';
	import Score from './_lib/components/score.svelte';
	import type { ShortInfoData } from './_lib/components/short-info.svelte';
	import ShortInfo from './_lib/components/short-info.svelte';
	import Synopsis from './_lib/components/synopsis.svelte';
	import TrailerBackdrop from './_lib/components/trailer-backdrop.svelte';

	const { backdrop, title, type, country, year, genres, synopsis, score } = $derived(
		DATA_EN.find(({ id }) => id === Number(page.params.id)) ?? DATA_EN[0]
	);
	const shortInfoData = $derived<ShortInfoData>([
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
			<ShortInfo data={shortInfoData} />
			<Genres data={genres} />
			<div class="flex flex-col gap-4">
				<Synopsis>
					{synopsis}
				</Synopsis>
				<PostSection heading="Recommendations">
					<Swiper gap={8} padding={24}>
						{#each DATA_EN as { id, poster, title, score }}
							<Post lang="en" {id} image={poster} {title} {score} />
						{/each}
					</Swiper>
				</PostSection>
			</div>
		</div>
	</div>
</div>
