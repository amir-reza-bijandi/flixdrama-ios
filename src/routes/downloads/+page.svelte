<script lang="ts">
	import type { Option } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { DATA } from '$lib/constants/data';
	import { toRem } from '$lib/utilities/general';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { navigationStore } from '../_lib/stores/navigation-store.svelte';
	import type {
		DownloadItemData,
		DownloadItemDeleteHandler
	} from './_lib/components/download-item.svelte';
	import DownloadItem from './_lib/components/download-item.svelte';

	const OPTIONS = [
		{
			name: 'Queue',
			value: 'queue'
		},
		{
			name: 'Files',
			value: 'files'
		}
	] as const satisfies Option[];

	let downloads = $state<DownloadItemData[]>(
		DATA.map<DownloadItemData>(({ title, backdrop }, index) => ({
			id: index + 1,
			title,
			image: backdrop,
			progress: Math.floor(Math.random() * 100),
			status: Math.floor(Math.random() * 20) % 2 === 0 ? 'downloading' : 'paused'
		}))
	);
	let downloadListHeight = $state(0);
	const isDownloadsEmpty = $derived(!downloads.length);

	const handleDelete: DownloadItemDeleteHandler = (deletedId) =>
		(downloads = downloads.filter(({ id }) => id !== deletedId));
</script>

<div
	style:--padding-bottom={navigationStore.bottomSpacing}
	class={['flex flex-col px-5 pt-6 pb-(--padding-bottom)', isDownloadsEmpty && 'flex-1']}
>
	<div class="text-2xl leading-none font-bold">Downloads</div>
	<Select options={OPTIONS} maxOptionWidth={57} />
	<div
		style:--height={toRem(downloadListHeight)}
		class={[
			'relative isolate h-(--height) overflow-hidden rounded-2xl transition-[height,flex] duration-150 ease-out',
			isDownloadsEmpty && 'flex-1 duration-300'
		]}
	>
		<div
			class="absolute inset-0 -z-10 rounded-2xl bg-background-tertiary outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
		></div>
		{#if isDownloadsEmpty}
			<div
				class="absolute top-1/2 left-1/2 -translate-1/2 text-center text-xl leading-tight font-bold"
				transition:scale={{
					delay: 300,
					duration: 300,
					start: 0.75
				}}
			>
				Your queue is currently empty.
			</div>
		{/if}
		<div class="divide-y divide-stroke-primary" bind:clientHeight={downloadListHeight}>
			{#each downloads as data (data.id)}
				<div
					animate:flip={{
						duration: 150,
						easing: cubicOut
					}}
				>
					<DownloadItem {data} onDelete={handleDelete} />
				</div>
			{/each}
		</div>
	</div>
</div>
