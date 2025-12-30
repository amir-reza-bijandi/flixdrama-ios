<script module>
	export type FileListItemData = {
		id: number;
		image: string;
		title: string;
		duration: number;
	};
</script>

<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import Image from '$lib/components/image.svelte';
	import { Clock } from '@steeze-ui/heroicons';
	import { formatDuration } from '../utilities/format-duration';
	import type { ListItemDeleteHandler } from './list-item.svelte';
	import ListItem from './list-item.svelte';

	type Props = {
		data: FileListItemData;
		onDelete: ListItemDeleteHandler;
	};
	const { data, onDelete }: Props = $props();
	const { id, title, image, duration } = data;
</script>

<ListItem {id} {onDelete}>
	<div class="flex items-center gap-2">
		<Image
			class="aspect-video h-auto w-24 shrink-0 rounded-lg"
			src={image}
			hasOutline
			hasLoadingGlow
		/>
		<div>
			<span class="mb-1 inline-block text-sm leading-none font-bold">{title}</span>
			<div class="flex items-center gap-1 text-xs leading-none">
				<Icon class="size-3" src={Clock} theme="micro" />
				<span class="inline-block translate-y-px">
					{formatDuration(duration)}
				</span>
			</div>
		</div>
	</div>
</ListItem>
