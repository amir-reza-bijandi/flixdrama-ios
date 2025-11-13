<script module>
	export type DownloadItemData = {
		id: number;
		image: string;
		title: string;
		status: ProgressStatus;
		progress: number;
	};
	export type DownloadItemDeleteHandler = (id: number) => void;
</script>

<script lang="ts">
	import type { HeroIcon } from '$lib/types/icon';
	import { toRem } from '$lib/utilities/general';
	import { Pause, Play, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { PointerEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import type { ProgressStatus } from './progress.svelte';
	import Progress from './progress.svelte';

	const STATUS_LABEL_MAP: Record<ProgressStatus, string> = {
		downloading: 'Downloading',
		paused: 'Paused'
	};
	const STATUS_ICON_MAP: Record<ProgressStatus, HeroIcon> = {
		downloading: Play,
		paused: Pause
	};

	type Props = {
		data: DownloadItemData;
		onDelete: DownloadItemDeleteHandler;
	};
	const { data, onDelete }: Props = $props();
	const { id, image, progress, title, status } = data;

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
		if (translateX > deleteSwipeThreshold) onDelete(id);
		else translateX = 0;
		document.body.removeEventListener('pointermove', handlePointerMove);
		document.body.removeEventListener('pointerup', handlePointerUpOrLeave);
		document.body.removeEventListener('pointerleave', handlePointerUpOrLeave);
	};
</script>

<div
	style:--translate-x={toRem(translateX)}
	class="relative"
	out:fly={{
		x: itemWidth,
		duration: 150
	}}
>
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
			<Icon class="size-6 shrink-0" src={Trash} theme="solid" />
		</div>
	</div>
	<div
		class={[
			'flex translate-x-(--translate-x) touch-pan-y items-center gap-2 p-4 duration-150 active:bg-background-tertiary',
			isPointerDown ? 'transition-colors' : 'transition-[background-color,translate]'
		]}
		onpointerdown={handlePointerDown}
		bind:clientWidth={itemWidth}
	>
		<img
			class="aspect-video h-auto w-24 shrink-0 rounded-lg outline -outline-offset-1 outline-stroke-secondary"
			src={image}
			alt=""
			draggable="false"
		/>
		<div class="flex-1">
			<span class="mb-1.5 inline-block text-sm leading-none font-bold">{title}</span>
			<div>
				<div class="mb-1 flex items-center gap-1 text-xs leading-none">
					<div class="flex items-center gap-0.5">
						<Icon class="size-3" src={STATUS_ICON_MAP[status]} theme="micro" />
						<span class="inline-block translate-y-px">
							{STATUS_LABEL_MAP[status]}
						</span>
					</div>
					-
					<span class="inline-block translate-y-px">{progress}%</span>
				</div>
				<Progress value={progress} {status} />
			</div>
		</div>
	</div>
</div>
