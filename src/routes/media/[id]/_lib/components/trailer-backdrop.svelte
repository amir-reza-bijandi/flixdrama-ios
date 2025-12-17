<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import Separator from '$lib/components/separator.svelte';
	import type { TrailerInfo, MediaDetails } from '$lib/types/api';
	import { ArrowDownTray, Play, Check, ArrowPath } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import VideoPlayer from '$lib/plugins/video-player';
	import { downloadStore } from '$lib/stores/download-store.svelte';
	import { prepareTrailerDownload } from '$lib/plugins/download-manager';

	type Props = {
		backdrop: string;
		trailer?: TrailerInfo;
		details?: MediaDetails;
	};
	const { backdrop, trailer, details }: Props = $props();

	let isDownloading = $state(false);
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
		if (downloadStatus !== 'none') {
			return;
		}

		try {
			isDownloading = true;

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
		} catch (error) {
			console.error('Failed to start trailer download:', error);
		} finally {
			isDownloading = false;
		}
	}

	/**
	 * Get the appropriate icon based on download status
	 */
	const downloadIcon = $derived(() => {
		if (isDownloading || downloadStatus === 'downloading') return ArrowPath;
		if (downloadStatus === 'completed') return Check;
		return ArrowDownTray;
	});

	const isDownloadDisabled = $derived(
		!trailer?.link || isDownloading || downloadStatus === 'downloading' || downloadStatus === 'completed'
	);
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
				class:animate-spin={isDownloading || downloadStatus === 'downloading'}
				class:text-green-500={downloadStatus === 'completed'}
			>
				<Icon class="size-5" src={downloadIcon()} theme="micro" />
			</button>
		</div>
		<div class="mt-2 text-center text-sm leading-none font-bold">Trailer</div>
	</div>
</div>
