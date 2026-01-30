<script module>
	import { Box } from '$lib/components/box';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';

	type ToggleEventHandler = (isPaused: boolean) => void;
	type Props = {
		episode?: number;
		quality: Quality;
		mediaTitle: string;
		image: string;
		progress: number;
		isPaused: boolean;
		onToggle?: ToggleEventHandler;
	};
	export type { Props as DownloadItemProps, ToggleEventHandler as DownloadItemToggleEventHandler };
</script>

<script lang="ts">
	import { asset } from '$app/paths';
	import Toggle from '$lib/components/toggle.svelte';
	import { fly } from 'svelte/transition';
	import FadingIcon from '../../../../_lib/components/fading-icon.svelte';
	import { QUALITY_LABEL_MAP } from '../../../_lib/constants/media';
	import type { Quality } from '../../../_lib/types/media';
	import { toFarsi } from '../../../_lib/utilities/to-farsi';

	const { episode, quality, mediaTitle, image, progress, isPaused, onToggle }: Props = $props();

	let statusWidth = $state(0);
	let statusHeight = $state(0);
	let hasTransition = $state(false);

	$effect(() => {
		requestAnimationFrame(() => {
			hasTransition = true;
		});
	});

	const handleClick = () => onToggle?.(isPaused);
</script>

<Pressable.Root class="block" onClick={handleClick}>
	<Pressable.Content class="h-full text-start">
		<Box.Root class="flex h-full items-center gap-2 p-4">
			<Box.Visuals class="rounded-2xl bg-background-tertiary" />
			<Image src={image} class="relative z-10 h-24 w-16 rounded-xl" hasLoadingGlow hasOutline />
			<div class="relative flex h-full flex-1 flex-col justify-between py-2">
				<div class="absolute top-0 left-0 opacity-50">
					<Toggle isActive={isPaused}>
						{#snippet inactive()}
							<FadingIcon class="static" src={asset('/image/icon/fade/play.svg')} />
						{/snippet}
						{#snippet active()}
							<FadingIcon class="static" src={asset('/image/icon/fade/pause.svg')} />
						{/snippet}
					</Toggle>
				</div>
				<div class="grid gap-1">
					<div class="flex items-center gap-1.5">
						<div class="text-base leading-none font-bold">
							{episode ? `قسمت ${toFarsi(episode)}` : 'فیلم سینمایی'}
						</div>
						<div
							class="rounded-full bg-gradient bg-gradient-success px-1.5 py-1 text-xs leading-none outline -outline-offset-1 outline-stroke-tertiary"
						>
							<div class="flex translate-y-px items-center gap-1">
								{QUALITY_LABEL_MAP[quality]}
								<Separator size={8} variant="tertiary" />
								{window.parseInt(quality)}
							</div>
						</div>
					</div>
					<div class="text-xs text-foreground-secondary">{mediaTitle}</div>
				</div>
				<div class="grid gap-2">
					<div class="flex gap-1.5 text-xs leading-none">
						<div
							style:--width={toRem(statusWidth)}
							style:--height={toRem(statusHeight)}
							class={[
								'h-(--height) w-(--width)',
								hasTransition && 'transition-[width] duration-250'
							]}
						>
							{#key isPaused}
								<div
									class="absolute"
									bind:clientWidth={statusWidth}
									bind:clientHeight={statusHeight}
									in:fly={{
										duration: TRANSITION.DURATION / 2,
										y: -statusHeight
									}}
									out:fly={{
										duration: TRANSITION.DURATION / 2,
										y: statusHeight
									}}
								>
									{#if isPaused}
										متوقف شده
									{:else}
										در حال دانلود
									{/if}
								</div>
							{/key}
						</div>
						-
						<div class="flex items-center gap-px">
							&#1642;
							<span>
								{toFarsi(progress)}
							</span>
						</div>
					</div>
					<div class="relative z-10 overflow-hidden rounded-full bg-background-secondary">
						<div
							style:--width="{progress}%"
							class="relative h-1.5 w-(--width) overflow-hidden rounded-full"
						>
							<div class="absolute inset-0 bg-gradient bg-gradient-primary"></div>
							<div
								class={[
									'absolute inset-0 bg-gradient bg-gradient-secondary transition-opacity duration-250',
									!isPaused && 'opacity-0'
								]}
							></div>
						</div>
					</div>
				</div>
			</div>
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>
