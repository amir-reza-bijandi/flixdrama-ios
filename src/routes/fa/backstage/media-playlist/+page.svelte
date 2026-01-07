<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Select, { type Option, type OptionsValue } from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import Playlists, { type PlaylistsData } from '../../_lib/components/playlists.svelte';
	import { generateRandomNumber } from '../../_lib/utilities/comment';

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
			href: resolve(`/fa/playlist/[id]`, {
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

<PageWrapper icon={asset('/image/icon/fade/film.svg')} hasBottomPadding>
	<div class="p-content-padding pt-3">
		<Select options={TABS} bind:value={currentTab} />
		<Playlists {data} />
	</div>
</PageWrapper>
