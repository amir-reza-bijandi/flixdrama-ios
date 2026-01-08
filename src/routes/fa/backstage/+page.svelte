<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import type { Snippet } from 'svelte';
	import { pageIconStore } from '../../_lib/store/page-icon-store.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import type { PlaylistsData } from '../_lib/components/playlists.svelte';
	import { generateRandomNumber } from '../_lib/utilities/comment';
	import PlaylistCategory from './_lib/components/playlist-category.svelte';

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
	const PLAYLISTS_DATA: PlaylistsData = Array.from({ length: 8 }).map((_, index) => ({
		href: resolve(`/fa/playlist/[id]`, {
			id: String(index + 1)
		}),
		images: Array.from({ length: 4 }).map(
			() => MEDIA_FA[generateRandomNumber(MEDIA_FA.length)].poster
		),
		title: 'عنوان لیست پخش',
		subtitle: 'نام کاربری'
	}));

	let currentTab = $state<Tab>('news');
	const isDoubleColumn = $derived(currentTab === 'preview' || currentTab === 'soundtrack');

	$effect(() => {
		pageIconStore.current = asset('/image/icon/fade/sparkle.svg');
	});
</script>

<PageWrapper icon={asset('/image/icon/fade/sparkle.svg')} hasBottomPadding>
	<div class="px-content-padding pt-3 pb-content-padding">
		<Select
			offset={SELECT_OFFSET}
			options={TABS}
			bind:value={currentTab}
			preservationKey="backstage-tabs"
		/>
		<div class={['grid gap-3', isDoubleColumn ? 'grid-cols-2' : 'grid-cols-1']}>
			{@render TAB_SNIPPET_MAP[currentTab]()}
		</div>
	</div>
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
	<PlaylistCategory
		href={resolve('/fa/backstage/media-playlist')}
		image={{
			small: asset('/image/collage/media@1x.png'),
			medium: asset('/image/collage/media@1.5x.png'),
			large: asset('/image/collage/media@2x.png')
		}}
		title="فیلم و سریال"
		body="مجموعه‌هایی که باید دید: بهترین فیلم‌ها و سریال‌های آسیایی، دسته‌بندی شده و آماده تماشا."
		icon={asset('/image/icon/fade/film.svg')}
	/>
	<PlaylistCategory
		href={resolve('/fa/backstage/soundtrack-playlist')}
		image={{
			small: asset('/image/collage/soundtrack@1x.png'),
			medium: asset('/image/collage/soundtrack@1.5x.png'),
			large: asset('/image/collage/soundtrack@2x.png')
		}}
		title="موسیقی متن"
		body="آهنگ‌هایی که خاطره شدن: غرق در ملودی‌هایی شو که روح درام‌های مورد علاقه‌ت رو داخل‌شون دارن."
		icon={asset('/image/icon/fade/music.svg')}
	/>
{/snippet}
