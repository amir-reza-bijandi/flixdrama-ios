<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import type { Snippet } from 'svelte';
	import Grid from '../_lib/components/grid.svelte';
	import List from '../_lib/components/list.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import PlaylistCategories from '../_lib/components/playlist-categories.svelte';
	import { generateRandomNumber } from '../_lib/utilities/comment';

	const PRESERVATION_KEY = 'backstage-tabs';
	const SELECT_OFFSET = 20;
	const TABS = [
		{
			label: 'اخبار',
			value: 'news'
		},
		{
			label: 'موسیقی متن',
			value: 'soundtrack'
		},
		{
			label: 'پیش‌نمایش',
			value: 'preview'
		},
		{
			label: 'لیست پخش',
			value: 'playlist'
		}
	] as const satisfies Option[];
	type Tab = OptionsValue<typeof TABS>;
	const TAB_SNIPPET_MAP: Record<Tab, Snippet> = {
		news,
		soundtrack,
		playlist,
		preview
	};

	let currentTab = $state<Tab>('news');
	const Container = $derived(currentTab === 'preview' || currentTab === 'soundtrack' ? Grid : List);
</script>

<PageWrapper icon={asset('/image/icon/fade/sparkle.svg')} hasBottomPadding hasContentPadding>
	<Select
		class="mt-6"
		offset={SELECT_OFFSET}
		options={TABS}
		bind:value={currentTab}
		preservationKey={PRESERVATION_KEY}
	/>
	<Container>
		{@render TAB_SNIPPET_MAP[currentTab]()}
	</Container>
</PageWrapper>

{#snippet news()}
	{#each { length: 4 }, index}
		<PostCard
			class="w-full"
			title="لورم ایپسوم متن ساختگی با تولید سادگی از صنعت چاپ، و با استفاده از"
			href={resolve(`/fa/news/[id]`, {
				id: String(index + 1)
			})}
			image={asset(`/image/news/${index + 1}.png`)}
			aspectRatio="video"
			textAlignment="right"
			date={new Date()}
		/>
	{/each}
{/snippet}

{#snippet soundtrack()}
	{#each { length: 15 }, index}
		<PostCard
			class="w-full"
			title="عنوان سریال"
			subtitle="عنوان آلبوم"
			href={resolve(`/fa/album/[id]`, {
				id: String(index + 1)
			})}
			image={asset(`/image/album/${index + 1}.png`)}
			aspectRatio="square"
			likes={generateRandomNumber(100)}
		/>
	{/each}
{/snippet}
{#snippet preview()}
	{#each MEDIA_FA as { backdrop, titleFa }, index}
		<PostCard
			class="w-full"
			title={titleFa}
			subtitle="عنوان پیش‌نمایش"
			href={resolve(`/fa/preview/[id]`, {
				id: String(index + 1)
			})}
			image={backdrop}
			aspectRatio="video"
			comments={generateRandomNumber(100)}
		/>
	{/each}
{/snippet}
{#snippet playlist()}
	<PlaylistCategories
		mediaHref="/fa/backstage/media-playlist"
		soundtrackHref="/fa/backstage/soundtrack-playlist"
	/>
{/snippet}
