<script lang="ts">
	import type { Option, OptionsValue } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { MEDIA_EN } from '$lib/constants/data';
	import type { DirectionFactor } from '$lib/types/transition';
	import { toRem } from '$lib/utilities/general';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import type { FileListItemData } from './_lib/components/file-list-item.svelte';
	import FileListItem from './_lib/components/file-list-item.svelte';
	import type { ListItemDeleteHandler } from './_lib/components/list-item.svelte';
	import List from './_lib/components/list.svelte';
	import type { QueueListItemData } from './_lib/components/queue-list-item.svelte';
	import QueueListItem from './_lib/components/queue-list-item.svelte';

	const TABS = [
		{
			name: 'Queue',
			value: 'queue'
		},
		{
			name: 'Files',
			value: 'files'
		}
	] as const satisfies Option[];

	type Tab = OptionsValue<typeof TABS>;

	const TAB_MESSAGE_MAP: Record<Tab, string> = {
		queue: 'Your queue is currently empty.',
		files: 'No files have been downloaded.'
	};

	let currentTab = $state<Tab>('queue');
	const directionFactor = $derived.by<DirectionFactor>(() => {
		const currentIndex = TABS.findIndex(({ value }) => currentTab === value);
		return currentIndex === 1 ? 1 : -1;
	});
	let queueItems = $state<QueueListItemData[]>(
		MEDIA_EN.map<QueueListItemData>(({ title, backdrop }, index) => ({
			id: index + 1,
			title,
			image: backdrop,
			progress: Math.floor(Math.random() * 100),
			status: Math.floor(Math.random() * 20) % 2 === 0 ? 'downloading' : 'paused'
		}))
	);
	let fileItems = $state<FileListItemData[]>(
		MEDIA_EN.map<FileListItemData>(({ id, backdrop, title }) => ({
			id,
			title,
			image: backdrop,
			duration: Math.floor(Math.random() * 1800)
		}))
	);
	let listContentHeight = $state(0);
	let listContainerHeight = $state(0);
	const listHeight = $derived(
		listContentHeight + navigationStore.requiredSpace > listContainerHeight
			? listContentHeight
			: listContainerHeight - navigationStore.requiredSpace
	);
	const isListEmpty = $derived(currentTab === 'queue' ? !queueItems.length : !fileItems.length);

	const handleQueueItemDelete: ListItemDeleteHandler = (deletedId) =>
		(queueItems = queueItems.filter(({ id }) => id !== deletedId));
	const handleFileItemDelete: ListItemDeleteHandler = (deletedId) =>
		(fileItems = fileItems.filter(({ id }) => id !== deletedId));
</script>

<div class="relative z-10 flex flex-1 flex-col px-5 pt-6">
	<div class="text-2xl leading-none font-bold">Downloads</div>
	<Select options={TABS} />
	<div class="relative flex-1" bind:clientHeight={listContainerHeight}>
		<div
			style:--height={toRem(
				listContentHeight + navigationStore.requiredSpace > listContainerHeight
					? listContentHeight + navigationStore.requiredSpace
					: listContainerHeight
			)}
			class="transition-height absolute h-(--height) w-full duration-150"
		>
			{#if currentTab === 'queue'}
				<List
					{message}
					{directionFactor}
					height={listHeight}
					bind:contentHeight={listContentHeight}
				>
					{#each queueItems as data (data.id)}
						<div
							animate:flip={{
								duration: 150,
								easing: cubicOut
							}}
						>
							<QueueListItem {data} onDelete={handleQueueItemDelete} />
						</div>
					{/each}
				</List>
			{:else}
				<List
					{message}
					{directionFactor}
					height={listHeight}
					bind:contentHeight={listContentHeight}
				>
					{#each fileItems as data (data.id)}
						<div
							animate:flip={{
								duration: 150,
								easing: cubicOut
							}}
						>
							<FileListItem {data} onDelete={handleFileItemDelete} />
						</div>
					{/each}
				</List>
			{/if}
		</div>
	</div>
</div>

{#snippet message()}
	{#if isListEmpty}
		<div
			class="absolute top-1/2 left-1/2 -translate-1/2 text-center text-xl leading-tight font-bold"
			in:scale|global={{
				delay: 300,
				duration: 300,
				start: 0.75
			}}
		>
			{TAB_MESSAGE_MAP[currentTab]}
		</div>
	{/if}
{/snippet}
