<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Button from '$lib/components/button.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import { Trash2Icon } from '@lucide/svelte';
	import { Pause, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import FilterAction from '../_lib/components/actions/filter-action.svelte';
	import Grid from '../_lib/components/grid.svelte';
	import List from '../_lib/components/list.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import { QUALITY } from '../_lib/constants/media';
	import { generateRandomNumber } from '../_lib/utilities/comment';
	import { toFarsi } from '../_lib/utilities/to-farsi';
	import type { DownloadItemProps } from './_lib/components/download-item.svelte';
	import DownloadItem from './_lib/components/download-item.svelte';

	const PRESERVATION_KEY = 'download-tabs';
	const SELECT_OFFSET = 20;
	const TABS = [
		{
			label: 'صف دانلود',
			value: 'queue'
		},
		{
			label: 'کامل شده',
			value: 'finished'
		}
	] as const satisfies Option[];

	let currentTab = $state<OptionsValue<typeof TABS>>('queue');
	let isPaused = $state(false);
	let downloadItems = $state<DownloadItemProps[]>(
		MEDIA_FA.map<DownloadItemProps>(({ titleFa, poster }) => ({
			mediaTitle: titleFa,
			image: poster,
			progress: generateRandomNumber(100),
			quality: QUALITY[generateRandomNumber(QUALITY.length - 1)],
			isPaused: generateRandomNumber(10) % 2 === 0,
			episode: generateRandomNumber(16)
		}))
	);

	const handlePauseToggle = () => (isPaused = !isPaused);
</script>

<PageWrapper icon={asset('/image/icon/fade/downloads.svg')} hasBottomPadding hasContentPadding>
	{#snippet actions()}
		{#if currentTab === 'queue'}
			<Button isCircle onClick={handlePauseToggle} variant="tertiary" isActive={isPaused}>
				<Toggle isActive={isPaused}>
					{#snippet active()}
						<Icon class="size-5" src={Play} theme="solid" />
					{/snippet}
					{#snippet inactive()}
						<Icon class="size-5 stroke-2" src={Pause} />
					{/snippet}
				</Toggle>
			</Button>
			<Button variant="danger" isCircle isActive={false}>
				<Trash2Icon class="size-5 stroke-[1.5]" />
			</Button>
		{:else}
			<FilterAction />
		{/if}
	{/snippet}
	<Select
		class="mt-6"
		offset={SELECT_OFFSET}
		options={TABS}
		preservationKey={PRESERVATION_KEY}
		bind:value={currentTab}
	/>
	{#if currentTab === 'queue'}
		<List>
			{#each downloadItems as data, index}
				<DownloadItem
					{...data}
					onToggle={() => (downloadItems[index].isPaused = !downloadItems[index].isPaused)}
				/>
			{/each}
		</List>
	{:else}
		<Grid>
			{#each MEDIA_FA as { id, poster, titleFa, score }}
				<PostCard
					class="w-full"
					href={resolve('/fa/downloads/folder/[id]', {
						id: String(id)
					})}
					image={poster}
					subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
					title={titleFa}
					{score}
				/>
			{/each}
		</Grid>
	{/if}
</PageWrapper>
