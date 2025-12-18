<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import IconButton from '$lib/components/icon-button.svelte';
	import { ChevronLeft, Heart } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { scale } from 'svelte/transition';
	import Branding from './branding.svelte';
	import ModeToggle from './mode-toggle.svelte';
	import { mediaStore } from '../stores/media-store.svelte';
	import { api } from '$lib/utilities/api';

	const isMediaRoute = $derived(page.url.pathname.includes(resolve('/media')));
	const isArchiveRoute = $derived(page.url.pathname.includes(resolve('/archive')));
	const showBackButton = $derived(isMediaRoute || isArchiveRoute);
	const handleBack = () => window.history.back();

	async function handleToggleLike() {
		if (!mediaStore.mediaId || mediaStore.isLoading) return;

		mediaStore.setLoading(true);
		try {
			if (mediaStore.isLiked) {
				await api.likes.removeLike(mediaStore.mediaId);
				mediaStore.setLiked(false);
			} else {
				await api.likes.addLike(mediaStore.mediaId);
				mediaStore.setLiked(true);
			}
		} catch (error) {
			console.error('Failed to toggle like:', error);
		} finally {
			mediaStore.setLoading(false);
		}
	}
</script>

<div class="relative z-10 flex items-center justify-between px-7">
	{#if !showBackButton}
		<Branding />
	{:else}
		<IconButton onclick={handleBack}>
			<Icon class="size-6" src={ChevronLeft} theme="mini" />
		</IconButton>
	{/if}
	<div class="flex items-center gap-2">
		{#if mediaStore.isActive}
			<IconButton
				onclick={handleToggleLike}
				class="relative"
			>
				{#key mediaStore.isLiked}
					<span
						class="block"
						in:scale={{ duration: 300, start: 0.5 }}
					>
						{#if mediaStore.isLiked}
							<Icon class="size-5 text-red-500" src={Heart} theme="solid" />
						{:else}
							<Icon class={['size-5', mediaStore.isLoading && 'animate-pulse']} src={Heart} theme="outline" />
						{/if}
					</span>
				{/key}
			</IconButton>
		{/if}
		<ModeToggle />
	</div>
</div>
