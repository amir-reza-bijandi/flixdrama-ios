<script lang="ts">
	import { resolve } from '$app/paths';
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import HomeSkeleton from '$lib/components/home-skeleton.svelte';
	import type { HomeResponse, SeriesSection, CountrySection } from '$lib/types/api';
	import { api } from '$lib/utilities/api';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';
	import { navigationStore } from './_lib/stores/navigation-store.svelte';
	import { onMount } from 'svelte';
	import { ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// State for API data
	let homeData = $state<HomeResponse | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Selected country index for each section
	let selectedCountryIndexes = $state<Record<string, number>>({});

	// Fetch home data on mount
	onMount(async () => {
		try {
			homeData = await api.home.getHome();
			// Initialize selected country indexes
			homeData.series.forEach((section) => {
				selectedCountryIndexes[section.title] = 0;
			});
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load data';
			console.error('Failed to fetch home data:', err);
		} finally {
			isLoading = false;
		}
	});

	// Filter countries that have posts
	function getCountriesWithPosts(section: SeriesSection): CountrySection[] {
		return section.countries.filter((country) => country.posts.length > 0);
	}

	// Check if a section has any content
	function sectionHasContent(section: SeriesSection): boolean {
		return getCountriesWithPosts(section).length > 0;
	}

	// Helper to get country options for a section (only countries with posts)
	function getCountryOptions(section: SeriesSection): Option<number>[] {
		return getCountriesWithPosts(section).map((country, index) => ({
			name: country.name,
			value: index
		}));
	}

	// Helper to get the selected country for a section
	function getSelectedCountry(section: SeriesSection): CountrySection | undefined {
		const countriesWithPosts = getCountriesWithPosts(section);
		const index = selectedCountryIndexes[section.title] ?? 0;
		return countriesWithPosts[index];
	}

	// Handler for country selection change
	function handleCountrySelect(sectionTitle: string, index: number) {
		selectedCountryIndexes[sectionTitle] = index;
	}
</script>

<div style:--bottom-padding={toRem(navigationStore.requiredSpace)} class="pb-(--bottom-padding)">
	{#if isLoading}
		<HomeSkeleton />
	{:else if error}
		<div class="flex items-center justify-center p-10">
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
	{:else if homeData}
		<RecommendationsCarousel sliderItems={homeData.slider} />

		{#each homeData.series.filter(sectionHasContent) as section (section.title)}
			{@const selectedCountry = getSelectedCountry(section)}
			{@const mediaType = section.title.toLowerCase().includes('movie') ? 'movie' : 'tv'}
			<div class="mt-6 px-5">
				<div class="mb-3 flex items-center justify-between">
					<h2 class="text-2xl leading-none font-bold">{section.title}</h2>
					{#if selectedCountry?.have_more}
						<a
							href={resolve('/archive') +
								`?type_id=${selectedCountry.type_id}&media_type=${mediaType}&title=${encodeURIComponent(section.title + ' - ' + selectedCountry.name)}`}
							class="flex items-center gap-0.5 rounded-full bg-accent-secondary px-3 py-1.5 text-sm text-foreground-accent transition-opacity hover:opacity-80"
						>
							<span>See More</span>
							<Icon class="size-4" src={ChevronRight} />
						</a>
					{/if}
				</div>
				<Select
					options={getCountryOptions(section)}
					onSelect={(_, index) => handleCountrySelect(section.title, index)}
				/>
				<Swiper gap={8} padding={20}>
					{#if selectedCountry}
						{#each selectedCountry.posts as post (post.id)}
							<Post
								id={post.id}
								image={post.poster}
								title={post.name}
								subtitle={post.last_episode ? `${post.last_episode} episodes` : undefined}
								score={post.vote}
							/>
						{/each}
					{/if}
				</Swiper>
			</div>
		{/each}
	{/if}
</div>
