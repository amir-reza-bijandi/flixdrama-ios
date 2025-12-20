<script lang="ts">
	import { resolve } from '$app/paths';
	import Post from '$lib/components/post.svelte';
	import Section from '$lib/components/section.svelte';
	import Select, { type Option } from '$lib/components/select.svelte';
	import Swiper from '$lib/components/swiper.svelte';
	import HomeSkeleton from '$lib/components/home-skeleton.svelte';
	import ConnectionLost from '$lib/components/connection-lost.svelte';
	import type { HomeResponse, SeriesSection, CountrySection } from '$lib/types/api';
	import { api } from '$lib/utilities/api';
	import { toRem } from '$lib/utilities/general';
	import RecommendationsCarousel from './_lib/components/recommendations-carousel.svelte';
	import { navigationStore } from './_lib/stores/navigation-store.svelte';
	import { onMount } from 'svelte';
	import { ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { authStore } from '$lib/stores/auth-store.svelte';

	// State for API data
	let homeData = $state<HomeResponse | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	// Selected country index for each section
	let selectedCountryIndexes = $state<Record<string, number>>({});

	// Pull to refresh state
	let pullDistance = $state(0);
	let isRefreshing = $state(false);
	let touchStartY = 0;
	let touchStartX = 0;
	let canPull = false;
	let isPulling = $state(false); // Track if user is actively pulling (to prevent accidental clicks)
	const PULL_THRESHOLD = 80;

	function handleTouchStart(e: TouchEvent) {
		if (isLoading || isRefreshing) return;
		
		// Only allow pull when at top of page
		if (window.scrollY > 5) {
			canPull = false;
			return;
		}
		
		canPull = true;
		touchStartY = e.touches[0].clientY;
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!canPull || isLoading || isRefreshing) return;

		const touchY = e.touches[0].clientY;
		const touchX = e.touches[0].clientX;
		const diffY = touchY - touchStartY;
		const diffX = Math.abs(touchX - touchStartX);

		// If horizontal movement is more than vertical, don't pull (let swiper handle it)
		if (diffX > Math.abs(diffY) && !isPulling) {
			canPull = false;
			return;
		}

		if (diffY > 0) {
			// Mark as pulling to prevent accidental clicks on release
			if (diffY > 10) {
				isPulling = true;
			}
			// Apply resistance to pull
			const resistance = 0.4;
			pullDistance = Math.min(diffY * resistance, PULL_THRESHOLD * 1.5);
		}
	}

	async function handleTouchEnd() {
		const wasPulling = isPulling;
		isPulling = false;
		
		if (!canPull || isLoading) {
			canPull = false;
			return;
		}

		if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
			isRefreshing = true;
			pullDistance = PULL_THRESHOLD * 0.6; // Keep indicator visible during refresh
			await fetchHomeData();
			// Reset refresh state after fetch completes
			isRefreshing = false;
			pullDistance = 0;
		} else {
			pullDistance = 0;
		}
		
		canPull = false;
	}

	// Fetch function for retry capability
	async function fetchHomeData() {
		const isInitialLoad = !homeData;
		if (isInitialLoad) {
			isLoading = true;
		}
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
			if (isInitialLoad) {
				isLoading = false;
			}
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

<div
	style:--bottom-padding={toRem(navigationStore.requiredSpace)}
	style:--pull-distance="{pullDistance}px"
	class="home-container pb-(--bottom-padding)"
	class:pulling={isPulling}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchEnd}
>
	<!-- Pull to refresh indicator -->
	{#if (pullDistance > 0 || isRefreshing) && homeData}
		<div class="pull-indicator" style:opacity={Math.min(pullDistance / PULL_THRESHOLD, 1)}>
			<div class="pull-indicator-content" class:refreshing={isRefreshing}>
				{#if isRefreshing}
					<div class="pull-spinner">
						<svg viewBox="0 0 24 24" fill="none">
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-dasharray="32"
								stroke-dashoffset="32"
							/>
						</svg>
					</div>
					<span class="pull-text">Refreshing...</span>
				{:else}
					<div
						class="pull-arrow"
						style:transform="rotate({pullDistance >= PULL_THRESHOLD ? 180 : 0}deg)"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 19V5M5 12l7-7 7 7" />
						</svg>
					</div>
					<span class="pull-text">
						{pullDistance >= PULL_THRESHOLD ? 'Release to refresh' : 'Pull to refresh'}
					</span>
				{/if}
			</div>
		</div>
	{/if}

	<div class="home-content" style:transform="translateY({pullDistance}px)">
	{#if isLoading && !isRefreshing}
		<HomeSkeleton />
	{:else if error}
		<div class="flex min-h-[60vh] flex-col items-center justify-center px-6">
			<ConnectionLost onRetry={fetchHomeData} />
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
	</div>

<style>
	.home-container {
		position: relative;
		overflow: hidden;
	}

	/* Prevent accidental clicks on links while pulling */
	.home-container.pulling :global(a),
	.home-container.pulling :global(button) {
		pointer-events: none;
	}

	.home-content {
		will-change: transform;
		transition: transform 0.15s ease-out;
	}

	/* Pull to refresh styles */
	.pull-indicator {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		padding-top: 0.5rem;
		z-index: 10;
		pointer-events: none;
	}

	.pull-indicator-content {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(109, 40, 217, 0.95) 100%);
		border-radius: 9999px;
		box-shadow: 0 4px 16px -4px rgba(139, 92, 246, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2);
		color: white;
	}

	.pull-indicator-content.refreshing {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%);
		box-shadow: 0 4px 16px -4px rgba(34, 197, 94, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.pull-arrow {
		width: 1.125rem;
		height: 1.125rem;
		transition: transform 0.2s ease;
	}

	.pull-arrow svg {
		width: 100%;
		height: 100%;
	}

	.pull-spinner {
		width: 1.125rem;
		height: 1.125rem;
		animation: pull-spin 1s linear infinite;
	}

	.pull-spinner svg {
		width: 100%;
		height: 100%;
	}

	.pull-spinner circle {
		animation: pull-dash 1.5s ease-in-out infinite;
	}

	@keyframes pull-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	@keyframes pull-dash {
		0% { stroke-dashoffset: 32; }
		50% { stroke-dashoffset: 0; }
		100% { stroke-dashoffset: -32; }
	}

	.pull-text {
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}
</style>
