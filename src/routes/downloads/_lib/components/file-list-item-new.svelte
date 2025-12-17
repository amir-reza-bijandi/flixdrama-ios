<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { Clock, PlayCircle, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { formatDuration } from '../utilities/format-duration';
	import type { DownloadedFile } from '$lib/plugins/download-manager';
	import { toRem } from '$lib/utilities/general';
	import type { PointerEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type Props = {
		data: DownloadedFile;
		onDelete: (id: string) => void;
		onPlay: (id: string) => void;
	};
	const { data, onDelete, onPlay }: Props = $props();

	// Format file size
	function formatFileSize(bytes?: number): string {
		if (!bytes) return '';
		const units = ['B', 'KB', 'MB', 'GB'];
		let unitIndex = 0;
		let size = bytes;
		while (size >= 1024 && unitIndex < units.length - 1) {
			size /= 1024;
			unitIndex++;
		}
		return `${size.toFixed(1)} ${units[unitIndex]}`;
	}

	// Swipe to delete functionality
	let itemWidth = $state(0);
	let translateX = $state(0);
	let isPointerDown = $state(false);
	const deleteSwipeThreshold = $derived(itemWidth / 3);

	let initialClientX = 0;
	let initialTranslateX = 0;

	const handlePointerDown: PointerEventHandler<HTMLElement> = ({ clientX }) => {
		isPointerDown = true;
		initialClientX = clientX;
		initialTranslateX = translateX;
		document.body.addEventListener('pointermove', handlePointerMove);
		document.body.addEventListener('pointerup', handlePointerUpOrLeave);
		document.body.addEventListener('pointerleave', handlePointerUpOrLeave);
	};

	const handlePointerMove = ({ clientX: currentClientX }: PointerEvent) => {
		if (isPointerDown) {
			let updatedTranslateX = initialTranslateX + (currentClientX - initialClientX);
			if (updatedTranslateX < 0) updatedTranslateX = 0;
			translateX = updatedTranslateX;
		}
	};

	const handlePointerUpOrLeave = () => {
		isPointerDown = false;
		if (translateX > deleteSwipeThreshold) {
			onDelete(data.id ?? '');
		} else {
			translateX = 0;
		}
		document.body.removeEventListener('pointermove', handlePointerMove);
		document.body.removeEventListener('pointerup', handlePointerUpOrLeave);
		document.body.removeEventListener('pointerleave', handlePointerUpOrLeave);
	};

	// Get image source - prefer local poster for offline support
	// Use capacitor:// protocol for local files which works in WebView
	const imageSrc = $derived(() => {
		// Prefer local paths first for offline support
		if (data.localEpisodePosterPath) {
			return `capacitor://localhost/_capacitor_file_${data.localEpisodePosterPath}`;
		}
		if (data.localPosterPath) {
			return `capacitor://localhost/_capacitor_file_${data.localPosterPath}`;
		}
		// Fallback to remote URLs if local paths not available
		if (data.episodePoster) {
			return data.episodePoster;
		}
		if (data.poster) {
			return data.poster;
		}
		return '';
	});
</script>

<div
	style:--translate-x={toRem(translateX)}
	class="relative overflow-hidden rounded-xl"
	out:fly={{
		x: itemWidth,
		duration: 150
	}}
>
	<!-- Delete background -->
	<div
		class={[
			'absolute top-0 left-0 flex h-full w-(--translate-x) items-center justify-center bg-red-600/25',
			!isPointerDown && 'transition-width duration-150'
		]}
	>
		<div
			style:--width={toRem(itemWidth)}
			class="absolute top-0 -left-(--width) h-full w-(--width) bg-red-600/25"
		></div>
		<div class="absolute inset-0 flex items-center justify-center overflow-hidden">
			<Icon class="size-6 shrink-0 text-red-400" src={Trash} theme="solid" />
		</div>
	</div>

	<!-- Main content -->
	<div
		class={[
			'translate-x-(--translate-x) touch-pan-y bg-background-tertiary/50 p-3 duration-150 active:bg-background-tertiary',
			isPointerDown ? 'transition-colors' : 'transition-[background-color,translate]'
		]}
		onpointerdown={handlePointerDown}
		bind:clientWidth={itemWidth}
	>
		<div class="flex items-center gap-3">
			<!-- Thumbnail with play overlay -->
			<button
				class="relative shrink-0 overflow-hidden rounded-lg"
				onclick={() => onPlay(data.id ?? '')}
			>
				<Image
					class="aspect-video h-auto w-24 object-cover"
					src={imageSrc()}
					outline
					loadingGlow
				/>
				<div class="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/50">
					<Icon class="size-8 text-white drop-shadow-lg" src={PlayCircle} theme="solid" />
				</div>
				{#if data.isTrailer}
					<div class="absolute top-1 left-1 rounded bg-accent-primary/90 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
						Trailer
					</div>
				{/if}
			</button>

			<!-- Info -->
			<div class="min-w-0 flex-1">
				<div class="mb-1 truncate text-sm font-bold leading-tight">{data.name}</div>
				<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-secondary">
					{#if data.duration > 0}
						<div class="flex items-center gap-1">
							<Icon class="size-3" src={Clock} theme="micro" />
							<span>{formatDuration(data.duration)}</span>
						</div>
					{/if}
					{#if data.fileSize}
						<span>{formatFileSize(data.fileSize)}</span>
					{/if}
					{#if data.qualityTag}
						<span class="rounded bg-foreground-secondary/20 px-1.5 py-0.5 text-[10px] font-medium">
							{data.qualityTag}
						</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>