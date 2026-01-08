<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import type { PlaylistsData } from '../../_lib/components/playlists.svelte';
	import Playlists from '../../_lib/components/playlists.svelte';
	import { generateRandomNumber } from '../../_lib/utilities/comment';

	const PLAYLISTS_DATA: PlaylistsData = Array.from({ length: 8 }).map((_, index) => ({
		href: resolve(`/fa/playlist/[id]`, {
			id: String(index + 1)
		}),
		images: Array.from({ length: 4 }).map(() =>
			asset(`/image/album/${generateRandomNumber(15)}.png`)
		),
		title: 'عنوان لیست پخش',
		subtitle: 'نام کاربری'
	}));
</script>

<PageWrapper
	icon={asset('/image/icon/fade/music.svg')}
	hasBottomPadding
	hasContentPadding
	showBackButton
>
	<Playlists class="mt-6" data={PLAYLISTS_DATA} imageAspectRatio="square" />
</PageWrapper>
