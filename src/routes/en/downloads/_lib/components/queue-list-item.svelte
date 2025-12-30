<script module>
	export type QueueListItemData = {
		id: number;
		image: string;
		title: string;
		status: ProgressStatus;
		progress: number;
	};
</script>

<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { HeroIcon } from '$lib/types/icon';
	import { Pause, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import ListItem, { type ListItemDeleteHandler } from './list-item.svelte';
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
		data: QueueListItemData;
		onDelete: ListItemDeleteHandler;
	};
	const { data, onDelete }: Props = $props();
	const { id, image, progress, title, status } = data;
</script>

<ListItem {id} {onDelete}>
	<div class="flex items-center gap-2">
		<Image
			class="aspect-video h-auto w-24 shrink-0 rounded-lg"
			src={image}
			hasOutline
			hasLoadingGlow
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
</ListItem>
