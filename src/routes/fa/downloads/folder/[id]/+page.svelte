<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import { MEDIA_FA } from '$lib/constants/data';
	import { formatDuration } from '$lib/utilities/format-duration';
	import { ClockIcon, InfoIcon, Trash2Icon } from '@lucide/svelte';
	import Backdrop from '../../../_lib/components/backdrop.svelte';
	import List from '../../../_lib/components/list.svelte';
	import PageHeader from '../../../_lib/components/page-header.svelte';
	import PageWrapper from '../../../_lib/components/page-wrapper.svelte';
	import { QUALITY, QUALITY_LABEL_MAP } from '../../../_lib/constants/media';
	import type { Quality } from '../../../_lib/types/media';
	import { generateRandomNumber } from '../../../_lib/utilities/comment';
	import { formatCount } from '../../../_lib/utilities/format-count';
	import { toFarsi } from '../../../_lib/utilities/to-farsi';

	const ITEM_COUNT = 6;
	type FolderItem = {
		image: string;
		episode: number;
		quality: Quality;
		duration: number;
	};
	const FOLDER_ITEMS: FolderItem[] = Array.from({ length: ITEM_COUNT }, (_, index) => ({
		image: asset(`/image/preview/${index + 1}.png`),
		duration: generateRandomNumber(3600),
		episode: index + 1,
		quality: QUALITY[generateRandomNumber(QUALITY.length - 1)]
	}));

	const { backdrop, titleFa, id } = $derived(
		MEDIA_FA.find(({ id }) => id === Number(page.params.id)) ?? MEDIA_FA[0]
	);
</script>

<PageWrapper hasContentPadding hasBottomPadding>
	{#snippet actions()}
		<Button variant="danger" isCircle isActive={false}>
			<Trash2Icon class="size-5 stroke-[1.5]" />
		</Button>
		<Button
			as="a"
			href={resolve('/fa/media/[id]', {
				id: String(id)
			})}
			variant="tertiary"
			isCircle
			isActive={false}
		>
			<InfoIcon class="size-5 stroke-[1.5]" />
		</Button>
	{/snippet}
	<Backdrop image={backdrop}>
		<PageHeader heading={titleFa} subheading="{formatCount(ITEM_COUNT)} قسمت" />
	</Backdrop>
	<List class="mt-49">
		{#each FOLDER_ITEMS as { image, episode, duration, quality }}
			<Pressable.Root class="block w-full">
				<Pressable.Content>
					<Box.Root class="flex items-center gap-2 p-4">
						<Box.Visuals class="rounded-2xl bg-background-tertiary" />
						<Image class="h-13.5 w-24 rounded-xl" src={image} hasLoadingGlow hasOutline />
						<div>
							<div class="mb-1 font-bold">قسمت {toFarsi(episode)}</div>
							<div class="flex items-center gap-1 text-xs text-foreground-secondary">
								<ClockIcon class="size-3" />
								<span>{formatDuration(duration, 'fa')}</span>
							</div>
						</div>
						<div
							class="absolute top-1/2 left-6 -translate-y-[calc(50%-0.0625rem)] mask-linear-180 mask-linear-from-foreground-primary mask-linear-to-transparent text-center font-bold opacity-25"
						>
							<div class="text-2xl leading-none">{QUALITY_LABEL_MAP[quality]}</div>
							<div>{window.parseInt(quality)}</div>
						</div>
					</Box.Root>
				</Pressable.Content>
			</Pressable.Root>
		{/each}
	</List>
</PageWrapper>
