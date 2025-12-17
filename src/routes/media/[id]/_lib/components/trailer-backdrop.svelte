<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import type { TrailerInfo, MediaDetails } from '$lib/types/api';
	import { ArrowDownTray, Play, Check, QueueList, ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import VideoPlayer from '$lib/plugins/video-player';
	import { downloadStore } from '$lib/stores/download-store.svelte';
	import { prepareTrailerDownload } from '$lib/plugins/download-manager';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	type Props = {
		backdrop: string;
		trailer?: TrailerInfo;
		details?: MediaDetails;
	};
	const { backdrop, trailer, details }: Props = $props();

	let showToast = $state(false);
	let isAddingToQueue = $state(false);
	let downloadStatus = $derived(
		details
			? downloadStore.getDownloadStatus(details.id, details.id, true)
			: 'none'
	);

	/**
	 * Opens the trailer in the native KSPlayer for streaming
	 */
	async function handleStreamTrailer() {
		if (trailer?.link) {
			try {
				await VideoPlayer.playVideo({
					url: trailer.link,
					subtitleUrl: trailer.subtitle,
					title: 'Trailer'
				});
			} catch (error) {
				console.error('Failed to play video:', error);
			}
		}
	}

	/**
	 * Downloads the trailer using the native download manager
	 */
	async function handleDownloadTrailer() {
		if (!trailer?.link || !details) {
			return;
		}

		// Check if already downloading or downloaded
		if (downloadStatus !== 'none' || isAddingToQueue) {
			return;
		}

		try {
			// Show loading state immediately
			isAddingToQueue = true;
			
			// Prepare download options
			const downloadOptions = await prepareTrailerDownload({
				id: details.id,
				name: details.name,
				banner: details.banner,
				trailerLink: trailer.link,
				trailerSubtitle: trailer.subtitle || undefined
			});

			// Start the download
			await downloadStore.startDownload(downloadOptions);
			
			// Hide loading state
			isAddingToQueue = false;
			
			// Show toast notification
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 3000);
		} catch (error) {
			console.error('Failed to start trailer download:', error);
			isAddingToQueue = false;
		}
	}

	/**
	 * Navigate to downloads page
	 */
	function goToDownloads() {
		showToast = false;
		goto('/downloads');
	}

	/**
	 * Get the appropriate icon based on download status
	 */
	const downloadIcon = $derived(() => {
		if (isAddingToQueue) return ArrowPath;
		if (downloadStatus === 'downloading' || downloadStatus === 'paused') return QueueList;
		if (downloadStatus === 'completed') return Check;
		return ArrowDownTray;
	});

	const isDownloadDisabled = $derived(
		!trailer?.link || isAddingToQueue || downloadStatus === 'downloading' || downloadStatus === 'paused' || downloadStatus === 'completed'
	);
	
	const downloadButtonTitle = $derived(() => {
		if (isAddingToQueue) return 'Adding to queue...';
		if (downloadStatus === 'downloading') return 'Downloading...';
		if (downloadStatus === 'paused') return 'Download paused';
		if (downloadStatus === 'completed') return 'Downloaded';
		return 'Download trailer';
	});
</script>

<div class="absolute top-0 left-1/2 w-132 -translate-x-1/2">
	<Image
		style="mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))"
		class="aspect-video h-auto w-full"
		src={backdrop}
		loadingGlow
	/>
	<div class="absolute top-29.5 left-1/2 -translate-x-1/2">
		<div
			class="flex items-center gap-2 rounded-full bg-background-secondary p-3 outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg transition-colors"
		>
			<button onclick={handleStreamTrailer} disabled={!trailer?.link}>
				<Icon class="size-5" src={Play} theme="solid" />
			</button>
			<Separator variant="primary" size={12} />
			<button
				onclick={handleDownloadTrailer}
				disabled={isDownloadDisabled}
				title={downloadButtonTitle()}
				class:text-green-500={downloadStatus === 'completed'}
				class:text-accent-primary={downloadStatus === 'downloading' || downloadStatus === 'paused' || isAddingToQueue}
			>
				<Icon class={['size-5', isAddingToQueue && 'animate-spin']} src={downloadIcon()} theme="micro" />
			</button>
		</div>
		<div class="mt-2 text-center text-sm leading-none font-bold">Trailer</div>
	</div>
</div>

<!-- Toast Notification -->
{#if showToast}
	<div
		class="fixed bottom-24 left-1/2 z-50 -translate-x-1/2"
		transition:fly={{ y: 20, duration: 200 }}
	>
		<button
			onclick={goToDownloads}
			class="flex items-center gap-2 whitespace-nowrap rounded-full bg-background-primary px-5 py-3.5 shadow-2xl ring-1 ring-stroke-primary"
		>
			<span class="text-sm font-medium text-foreground-primary">Download added to</span>
			<span class="text-sm font-bold text-accent-primary underline underline-offset-2">Downloads</span>
		</button>
	</div>
{/if}
