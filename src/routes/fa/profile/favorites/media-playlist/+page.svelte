<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import PageWrapper from '../../../_lib/components/page-wrapper.svelte';
	import type { PlaylistsData } from '../../../_lib/components/playlists.svelte';
	import Playlists from '../../../_lib/components/playlists.svelte';
	import { generateRandomNumber } from '../../../_lib/utilities/comment';

	const PRESERVATION_KEY = 'favorites-media-playlist-tab';
	const TABS = [
		{
			label: 'کاربرها',
			value: 'users'
		},
		{
			label: 'فلیکس‌دراما',
			value: 'flixdrama'
		}
	] as const satisfies Option[];
	type Tab = OptionsValue<typeof TABS>;
	let currentTab = $state<Tab>('users');
	let data = $derived<PlaylistsData>(
		Array.from({ length: 8 }).map((_, index) => ({
			href: resolve(`/fa/playlist/media/[id]`, {
				id: String(index + 1)
			}),
			images: Array.from({ length: 4 }).map(
				() => MEDIA_FA[generateRandomNumber(MEDIA_FA.length)].poster
			),
			title: 'عنوان لیست پخش',
			subtitle: currentTab === 'users' ? 'نام کاربری' : undefined
		}))
	);
</script>

<PageWrapper
	icon={asset('/image/icon/fade/heart.svg')}
	hasBottomPadding
	showBackButton
	hasContentPadding
>
	<Select class="mt-6" options={TABS} bind:value={currentTab} preservationKey={PRESERVATION_KEY} />
	<Playlists {data} />
</PageWrapper>
