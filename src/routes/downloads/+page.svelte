<script lang="ts">
	import type { Option, SelectEventHandler } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { DATA } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { flip } from 'svelte/animate';
	import { backOut, cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import type { FileListItemData } from './_lib/components/file-list-item.svelte';
	import FileListItem from './_lib/components/file-list-item.svelte';
	import type { ListItemDeleteHandler } from './_lib/components/list-item.svelte';
	import type { QueueListItemData } from './_lib/components/queue-list-item.svelte';
	import QueueListItem from './_lib/components/queue-list-item.svelte';

	type Tab = 'queue' | 'files';
	const TABS = [
		{
			name: 'Queue',
			value: 'queue'
		},
		{
			name: 'Files',
			value: 'files'
		}
	] as const satisfies Option<Tab>[];

	const TAB_MESSAGE_MAP: Record<Tab, string> = {
		queue: 'Your queue is currently empty.',
		files: 'No files have been downloaded.'
	};

	let currentTab = $state<Tab>('queue');
	let directionFactor = $state<1 | -1>(1);
	let queueItems = $state<QueueListItemData[]>(
		DATA.map<QueueListItemData>(({ title, backdrop }, index) => ({
			id: index + 1,
			title,
			image: backdrop,
			progress: Math.floor(Math.random() * 100),
			status: Math.floor(Math.random() * 20) % 2 === 0 ? 'downloading' : 'paused'
		}))
	);
	let fileItems = $state<FileListItemData[]>(
		DATA.map<FileListItemData>(({ id, backdrop, title }) => ({
			id,
			title,
			image: backdrop,
			duration: Math.floor(Math.random() * 1800)
		}))
	);
	let listHeight = $state(0);
	let listWidth = $state(0);
	const isListEmpty = $derived(currentTab === 'queue' ? !queueItems.length : !fileItems.length);

	const handleQueueItemDelete: ListItemDeleteHandler = (deletedId) =>
		(queueItems = queueItems.filter(({ id }) => id !== deletedId));
	const handleFileItemDelete: ListItemDeleteHandler = (deletedId) =>
		(fileItems = fileItems.filter(({ id }) => id !== deletedId));
	const handleSelect: SelectEventHandler<typeof TABS> = (tab, index) => {
		currentTab = tab;
		directionFactor = index === 1 ? 1 : -1;
	};
</script>

<div
	style:--padding-bottom={navigationStore.bottomSpacing}
	class={['relative z-10 flex flex-col px-5 pt-6 pb-(--padding-bottom)', isListEmpty && 'flex-1']}
>
	<div class="text-2xl leading-none font-bold">Downloads</div>
	<Select options={TABS} maxOptionWidth={57} onSelect={handleSelect} />
	<div
		style:--height={toRem(listHeight)}
		class={[
			'relative isolate h-(--height) transition-[height,flex] duration-150 ease-out',
			isListEmpty && 'flex-1 duration-300'
		]}
	>
		{#key currentTab}
			{@const TRANSITION_DURATION = 500}
			<div
				class="absolute inset-0 overflow-hidden rounded-2xl"
				in:fly={{
					x: listWidth * directionFactor,
					duration: TRANSITION_DURATION,
					easing: backOut
				}}
				out:fly={{
					x: -listWidth * directionFactor,
					duration: TRANSITION_DURATION,
					easing: backOut
				}}
			>
				<div
					class="absolute inset-0 -z-10 rounded-2xl bg-background-tertiary outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
				></div>
				{#if isListEmpty}
					<div
						class="absolute top-1/2 left-1/2 -translate-1/2 text-center text-xl leading-tight font-bold"
						transition:scale={{
							delay: 300,
							duration: 300,
							start: 0.75
						}}
					>
						{TAB_MESSAGE_MAP[currentTab]}
					</div>
				{/if}
				<div
					class="divide-y divide-stroke-primary"
					bind:clientHeight={listHeight}
					bind:clientWidth={listWidth}
				>
					{#if currentTab === 'queue'}
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
					{:else}
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
					{/if}
				</div>
			</div>
		{/key}
	</div>
</div>
