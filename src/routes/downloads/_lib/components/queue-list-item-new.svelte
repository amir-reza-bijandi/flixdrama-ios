<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { Pause, Play, Trash, QueueList, Clock } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { DownloadInfo } from '$lib/plugins/download-manager';
	import { toRem } from '$lib/utilities/general';
	import type { PointerEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import Progress from './progress.svelte';

	type Props = {
		data: DownloadInfo;
		onDelete: (id: string) => void;
		onPause: (id: string) => void;
		onResume: (id: string) => void;
	};
	const { data, onDelete, onPause, onResume }: Props = $props();

	// Format download speed
	function formatSpeed(bytesPerSecond?: number): string {
		if (!bytesPerSecond) return '';
		const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
		let unitIndex = 0;
		let speed = bytesPerSecond;
		while (speed >= 1024 && unitIndex < units.length - 1) {
			speed /= 1024;
			unitIndex++;
		}
		return `${speed.toFixed(1)} ${units[unitIndex]}`;
	}

	// Derived status
	const isPaused = $derived(data.status === 'paused');
	const isQueued = $derived(data.status === 'queued' || data.status === 'waiting');
	const isDownloading = $derived(data.status === 'downloading');
	const progressPercent = $derived(Math.round((data.progress ?? 0) * 100));
	const progressStatus = $derived<'downloading' | 'paused' | 'queued'>(
		isPaused ? 'paused' : isQueued ? 'queued' : 'downloading'
	);

	// Get status label and icon
	const statusLabel = $derived(
		isPaused ? 'Paused' : isQueued ? 'In Queue' : 'Downloading'
	);
	const statusIcon = $derived(
		isPaused ? Pause : isQueued ? Clock : Play
	);

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

	function handleTogglePauseResume() {
		if (isPaused) {
			onResume(data.id ?? '');
		} else {
			onPause(data.id ?? '');
		}
	}
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
			<!-- Thumbnail -->
			<div class="relative shrink-0 overflow-hidden rounded-lg">
				<Image
					class="aspect-video h-auto w-24 object-cover"
					src={data.episodePoster || data.poster}
					outline
					loadingGlow
				/>
				{#if data.isTrailer}
					<div class="absolute top-1 left-1 rounded bg-accent-primary/90 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
						Trailer
					</div>
				{/if}
			</div>

			<!-- Info -->
			<div class="min-w-0 flex-1">
				<div class="mb-1.5 truncate text-sm font-bold leading-tight">{data.name}</div>
				<div class="mb-2">
					<div class="mb-1 flex items-center gap-2 text-xs leading-none text-foreground-secondary">
						<div class={[
							'flex items-center gap-1',
							isQueued && 'text-amber-400'
						]}>
							<Icon class="size-3" src={statusIcon} theme="micro" />
							<span>{statusLabel}</span>
						</div>
						{#if !isQueued}
							<span>-</span>
							<span>{progressPercent}%</span>
						{/if}
						{#if data.speed && isDownloading}
							<span class="text-accent-primary">({formatSpeed(data.speed)})</span>
						{/if}
					</div>
					{#if !isQueued}
						<Progress value={progressPercent} status={progressStatus} />
					{:else}
						<div class="h-1.5 rounded-full bg-amber-500/20"></div>
					{/if}
				</div>
			</div>

			<!-- Pause/Resume button - only show for non-queued items -->
			{#if !isQueued}
				<button
					class="shrink-0 rounded-full bg-background-primary p-2 transition-colors hover:bg-background-secondary active:bg-accent-primary/20"
					onclick={handleTogglePauseResume}
				>
					<Icon class="size-5" src={isPaused ? Play : Pause} theme="solid" />
				</button>
			{:else}
				<div class="shrink-0 rounded-full bg-amber-500/20 p-2">
					<Icon class="size-5 text-amber-400" src={Clock} theme="solid" />
				</div>
			{/if}
		</div>
	</div>
</div>