<script lang="ts">
	import { page } from '$app/stores';
	import Post from '$lib/components/post.svelte';
	import PostSkeleton from '$lib/components/post-skeleton.svelte';
	import type { PostItem } from '$lib/types/api';
	import { api } from '$lib/utilities/api';
	import { toRem } from '$lib/utilities/general';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import { onMount } from 'svelte';

	// Get URL parameters
	const typeId = Number($page.url.searchParams.get('type_id')) || 1;
	const mediaType = $page.url.searchParams.get('media_type') || 'tv';
	const title = $page.url.searchParams.get('title') || 'Archive';

	// State
	let posts = $state<PostItem[]>([]);
	let currentPage = $state(1);
	let lastPage = $state(1);
	let isLoading = $state(false);
	let isInitialLoading = $state(true);
	let error = $state<string | null>(null);
	let loadMoreTrigger = $state<HTMLDivElement | null>(null);

	const ITEMS_PER_PAGE = 12;

	// Fetch archive data
	async function fetchArchive(pageNum: number) {
		if (isLoading || (pageNum > lastPage && lastPage > 0)) return;

		isLoading = true;
		error = null;

		try {
			const response = await api.archive.getArchive(pageNum, mediaType, ITEMS_PER_PAGE, typeId);

			console.log('API Response:', response);

			if (pageNum === 1) {
				posts = response.posts;
			} else {
				posts = [...posts, ...response.posts];
			}

			// Calculate pagination from total_posts
			currentPage = pageNum;
			lastPage = Math.ceil(response.total_posts / ITEMS_PER_PAGE);

			console.log(
				'Updated state - currentPage:',
				currentPage,
				'lastPage:',
				lastPage,
				'total:',
				response.total_posts
			);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load data';
			console.error('Failed to fetch archive data:', err);
		} finally {
			isLoading = false;
			isInitialLoading = false;
		}
	}

	// Initial load
	onMount(async () => {
		console.log('Archive page mounted');
		await fetchArchive(1);
	});

	// Setup infinite scroll after data loads and trigger element exists
	$effect(() => {
		// Only run if we have the trigger element, initial loading is done, and there are more pages
		if (!loadMoreTrigger || isInitialLoading || currentPage >= lastPage) {
			console.log(
				'Effect skipped - trigger:',
				!!loadMoreTrigger,
				'page:',
				currentPage,
				'/',
				lastPage,
				'initialLoading:',
				isInitialLoading
			);
			return;
		}

		console.log('Setting up infinite scroll...');
		console.log('Current page:', currentPage, 'Last page:', lastPage);

		// Setup Intersection Observer for the trigger element
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					console.log(
						'Intersection:',
						entry.isIntersecting,
						'Loading:',
						isLoading,
						'Page:',
						currentPage,
						'/',
						lastPage
					);
					if (entry.isIntersecting && !isLoading && currentPage < lastPage) {
						console.log('Intersection triggered! Loading page:', currentPage + 1);
						fetchArchive(currentPage + 1);
					}
				});
			},
			{
				root: null, // Use viewport as root
				rootMargin: '200px',
				threshold: 0
			}
		);

		observer.observe(loadMoreTrigger);
		console.log('Observer attached to trigger');

		return () => {
			console.log('Cleaning up observer');
			observer.disconnect();
		};
	});
</script>

<div style:--bottom-padding={toRem(navigationStore.requiredSpace)} class="pb-(--bottom-padding)">
	<!-- Header -->
	<div class="mt-6 px-5">
		<h1 class="text-2xl leading-none font-bold">{title}</h1>
	</div>

	{#if isInitialLoading}
		<!-- Initial loading skeleton -->
		<div class="mt-4 px-5">
			<div class="grid grid-cols-3 gap-4">
				{#each Array(12) as _}
					<PostSkeleton />
				{/each}
			</div>
		</div>
	{:else if error && posts.length === 0}
		<!-- Error state -->
		<div class="flex items-center justify-center p-10">
			<div class="text-center">
				<p class="mb-4 text-foreground-secondary">{error}</p>
				<button
					class="rounded-full bg-accent-primary px-4 py-2 text-foreground-accent"
					onclick={() => fetchArchive(1)}
				>
					Retry
				</button>
			</div>
		</div>
	{:else if posts.length > 0}
		<!-- Posts grid -->
		<div class="mt-4 px-5">
			<div class="grid grid-cols-3 gap-4">
				{#each posts as post (post.id)}
					<Post
						id={post.id}
						image={post.poster}
						title={post.name}
						subtitle={post.last_episode ? `${post.last_episode} episodes` : undefined}
						score={post.vote}
					/>
				{/each}
			</div>

			<!-- Load more trigger -->
			{#if currentPage < lastPage}
				<div class="mt-8">
					{#if isLoading}
						<div class="grid grid-cols-3 gap-4">
							{#each Array(3) as _}
								<PostSkeleton />
							{/each}
						</div>
					{/if}
					<!-- Invisible trigger element for Intersection Observer -->
					<div bind:this={loadMoreTrigger} class="h-px"></div>
				</div>
			{:else if currentPage === lastPage && lastPage > 1}
				<div class="mt-8 text-center text-sm text-foreground-secondary">No more items to load</div>
			{/if}
		</div>
	{:else}
		<!-- Empty state -->
		<div class="flex items-center justify-center p-10">
			<p class="text-foreground-secondary">No items found</p>
		</div>
	{/if}
</div>
