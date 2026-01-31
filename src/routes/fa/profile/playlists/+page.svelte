<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import type { PlaylistsData } from '../../_lib/components/playlists.svelte';
	import Playlists from '../../_lib/components/playlists.svelte';
	import { generateRandomNumber } from '../../_lib/utilities/comment';

	const PRESERVATION_KEY = 'playlist-tab';
	const TABS = [
		{
			label: 'فیلم و سریال',
			value: 'media'
		},
		{
			label: 'موسیقی متن',
			value: 'soundtrack'
		}
	] as const satisfies Option[];
	type Tab = OptionsValue<typeof TABS>;
	const SOUNDTRACK_PLAYLISTS_DATA: PlaylistsData = Array.from({ length: 8 }).map((_, index) => ({
		href: resolve(`/fa/playlist/soundtrack/[id]`, {
			id: String(index + 1)
		}),
		images: Array.from({ length: 4 }).map(() =>
			asset(`/image/album/${generateRandomNumber(15)}.png`)
		),
		title: 'عنوان لیست پخش'
	}));
	const MEDIA_PLAYLISTS_DATA: PlaylistsData = Array.from({ length: 8 }).map((_, index) => ({
		href: resolve(`/fa/playlist/media/[id]`, {
			id: String(index + 1)
		}),
		images: Array.from({ length: 4 }).map(
			() => MEDIA_FA[generateRandomNumber(MEDIA_FA.length)].poster
		),
		title: 'عنوان لیست پخش'
	}));

	let currentTab = $state<Tab>('media');
</script>

<PageWrapper
	icon={asset('/image/icon/fade/play.svg')}
	hasBottomPadding
	showBackButton
	hasContentPadding
>
	<Select class="mt-6" options={TABS} bind:value={currentTab} preservationKey={PRESERVATION_KEY} />
	<Playlists
		data={currentTab === 'media' ? MEDIA_PLAYLISTS_DATA : SOUNDTRACK_PLAYLISTS_DATA}
		imageAspectRatio={currentTab === 'media' ? 'photo' : 'square'}
	/>
</PageWrapper>
