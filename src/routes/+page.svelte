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
	import { ChevronRight, ExclamationTriangle, ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { networkStore } from '$lib/stores/network-store.svelte';
	import { authStore } from '$lib/stores/auth-store.svelte';

	// State for API data
	let homeData = $state<HomeResponse | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Selected country index for each section
	let selectedCountryIndexes = $state<Record<string, number>>({});

	// Fetch function for retry capability
	async function fetchHomeData() {
		isLoading = true;
		error = null;
		try {
			homeData = await api.home.getHome();
			// Initialize selected country indexes
			homeData.series.forEach((section) => {
				selectedCountryIndexes[section.title] = 0;
			});
			
			// Save auth token if need_refresh is true
			if (homeData.auth?.need_refresh && homeData.auth.token) {
				await authStore.setToken(homeData.auth.token);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load data';
			console.error('Failed to fetch home data:', err);
		} finally {
			isLoading = false;
		}
	}

	// Fetch home data on mount
	onMount(() => {
		fetchHomeData();
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
		<div class="flex min-h-[60vh] flex-col items-center justify-center px-6">
			<div class="error-container">
				<div class="error-icon-container">
					{#if !networkStore.isOnline}
						<!-- Offline icon -->
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="error-icon">
							<path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
							<path
								d="M16.72 11.06C18.24 11.18 19.67 11.65 20.92 12.4M5 12.55C6.88 11.19 9.35 10.5 12 10.5C12.34 10.5 12.68 10.52 13.02 10.54"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8.53 16.11C9.56 15.4 10.74 15 12 15C13.26 15 14.44 15.4 15.47 16.11"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path d="M12 20H12.01" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
							<path
								d="M2.34 6.61C4.68 4.95 8.09 4 12 4C15.91 4 19.32 4.95 21.66 6.61"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{:else}
						<!-- Server error icon -->
						<Icon src={ExclamationTriangle} class="error-icon" />
					{/if}
				</div>
				<div class="error-pulse"></div>
			</div>

			<h2 class="mt-6 text-xl font-bold text-foreground-primary">
				{#if !networkStore.isOnline}
					You're Offline
				{:else}
					Unable to Connect
				{/if}
			</h2>
			<p class="mt-2 text-center text-sm text-foreground-secondary">
				{#if !networkStore.isOnline}
					Please check your internet connection and try again
				{:else}
					We couldn't reach our servers. Please try again later.
				{/if}
			</p>

			<button
				class="retry-button mt-8"
				onclick={fetchHomeData}
			>
				<Icon src={ArrowPath} class="size-5" />
				<span>Try Again</span>
			</button>
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
								fixedWidth
							/>
						{/each}
					{/if}
				</Swiper>
			</div>
		{/each}
	{/if}
</div>

<style>
	.error-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.error-icon-container {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5rem;
		height: 5rem;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%);
		border-radius: 50%;
		box-shadow:
			0 0 0 1px rgba(239, 68, 68, 0.2),
			0 8px 32px -8px rgba(239, 68, 68, 0.3);
	}

	:global(.error-icon) {
		width: 2.5rem;
		height: 2.5rem;
		color: rgb(239, 68, 68);
	}

	.error-pulse {
		position: absolute;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		background: rgba(239, 68, 68, 0.2);
		animation: error-pulse 2s ease-out infinite;
	}

	@keyframes error-pulse {
		0% {
			transform: scale(1);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}

	.retry-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-primary) 100%);
		color: var(--color-foreground-accent);
		border: none;
		border-radius: 9999px;
		font-weight: 600;
		font-size: 0.9375rem;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow:
			0 4px 16px -4px rgba(var(--color-accent-primary-rgb, 139, 92, 246), 0.4),
			0 2px 8px -2px rgba(0, 0, 0, 0.2);
	}

	.retry-button:hover {
		transform: translateY(-1px);
		box-shadow:
			0 6px 20px -4px rgba(var(--color-accent-primary-rgb, 139, 92, 246), 0.5),
			0 4px 12px -2px rgba(0, 0, 0, 0.25);
	}

	.retry-button:active {
		transform: translateY(0);
	}
</style>
