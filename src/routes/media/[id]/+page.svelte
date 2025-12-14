<script lang="ts">
	import { page } from '$app/state';
	import Post from '$lib/components/post.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import { toRem } from '$lib/utilities/general';
	import { api } from '$lib/utilities/api';
	import type { MediaResponse } from '$lib/types/api';
	import { CalendarIcon, GlobeIcon, TvIcon } from '@lucide/svelte';
	import { navigationStore } from '../../_lib/stores/navigation-store.svelte';
	import Genres from './_lib/components/genres.svelte';
	import PostSection from './_lib/components/post-section.svelte';
	import Score from './_lib/components/score.svelte';
	import type { ShortInfoData } from './_lib/components/short-info.svelte';
	import ShortInfo from './_lib/components/short-info.svelte';
	import Synopsis from './_lib/components/synopsis.svelte';
	import TrailerBackdrop from './_lib/components/trailer-backdrop.svelte';
	import MediaSkeleton from './_lib/components/media-skeleton.svelte';

	// State for API data
	let mediaData = $state<MediaResponse | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Fetch media data function
	async function fetchMediaData(id: number) {
		isLoading = true;
		error = null;
		mediaData = null;

		try {
			mediaData = await api.media.getMedia(id);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load media data';
			console.error('Failed to fetch media data:', err);
		} finally {
			isLoading = false;
		}
	}

	// Watch for changes in page.params.id and refetch data
	$effect(() => {
		const id = Number(page.params.id);
		fetchMediaData(id);
	});

	// Derived data from API response
	const shortInfoData = $derived<ShortInfoData>(
		mediaData
			? [
					{
						icon: TvIcon,
						label: mediaData.details.type
					},
					{
						icon: GlobeIcon,
						label: mediaData.details.country_name
					},
					{
						icon: CalendarIcon,
						label: String(mediaData.details.year)
					}
				]
			: []
	);
</script>

{#if isLoading}
	<MediaSkeleton />
{:else if error}
	<div class="flex flex-1 items-center justify-center p-10">
		<div class="text-center">
			<p class="mb-4 text-foreground-secondary">{error}</p>
			<button
				class="rounded-full bg-accent-primary px-4 py-2 text-foreground-accent"
				onclick={() => window.location.reload()}
			>
				Retry
			</button>
		</div>
	</div>
{:else if mediaData}
	<div class="flex flex-1 flex-col">
		<TrailerBackdrop backdrop={mediaData.details.banner} />
		<div
			style:--bottom-padding={toRem(navigationStore.requiredSpace)}
			class="relative mt-49 flex-1 p-6 pb-(--bottom-padding)"
		>
			<div
				class="absolute inset-0 rounded-t-3xl border-t border-stroke-primary bg-background-tertiary backdrop-blur-lg transition-colors"
			></div>
			<div class="relative z-10">
				<div class="text-2xl leading-none font-bold">{mediaData.details.name}</div>
				<Score>
					{mediaData.details.vote_mdl}
				</Score>
				<ShortInfo data={shortInfoData} />
				<Genres data={mediaData.details.genres} />
				<div class="flex flex-col gap-4">
					<Synopsis>
						{mediaData.details.overview_en}
					</Synopsis>
					<PostSection heading="Recommendations">
						<Swiper gap={8} padding={24}>
							{#each mediaData.similars as similar (similar.id)}
								<Post
									id={similar.id}
									image={similar.poster}
									title={similar.name}
									subtitle={similar.last_episode ? `${similar.last_episode} episodes` : undefined}
									score={similar.vote}
								/>
							{/each}
						</Swiper>
					</PostSection>
				</div>
			</div>
		</div>
	</div>
{/if}
