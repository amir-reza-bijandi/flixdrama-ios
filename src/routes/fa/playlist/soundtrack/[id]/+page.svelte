<script lang="ts">
	import { asset } from '$app/paths';
	import Backdrop from '../../../_lib/components/backdrop.svelte';
	import LikeAction, {
		type LikeActionToggleHandler
	} from '../../../_lib/components/like-action.svelte';
	import PageHeader from '../../../_lib/components/page-header.svelte';
	import PageWrapper from '../../../_lib/components/page-wrapper.svelte';
	import type { SoundtracksData } from '../../../_lib/components/soundtracks.svelte';
	import Soundtracks from '../../../_lib/components/soundtracks.svelte';
	import { generateRandomNumber } from '../../../_lib/utilities/comment';

	const SOUNDTRACKS: SoundtracksData = [
		{
			id: 1,
			title: 'Way Back Then',
			artist: 'Jung Jae-il',
			image: asset('/image/album/1.png')
		},
		{
			id: 2,
			title: 'Round I',
			artist: 'Jung Jae-il',
			image: asset('/image/album/2.png')
		},
		{
			id: 3,
			title: 'The Rope is Tied',
			artist: 'Jung Jae-il',
			image: asset('/image/album/3.png')
		},
		{
			id: 4,
			title: 'Pink Soldiers',
			artist: '23',
			image: asset('/image/album/4.png')
		},
		{
			id: 5,
			title: 'Hostage Crisis',
			artist: '23',
			image: asset('/image/album/5.png')
		},
		{
			id: 6,
			title: 'I Remember My Name',
			artist: 'Jung Jae-il',
			image: asset('/image/album/6.png')
		},
		{
			id: 7,
			title: 'Needles and Dalgona',
			artist: 'Park Minju',
			image: asset('/image/album/7.png')
		},
		{
			id: 8,
			title: 'It Hurts So Bad',
			artist: 'Jung Jae-il',
			image: asset('/image/album/8.png')
		},
		{
			id: 9,
			title: 'Delivery',
			artist: '23',
			image: asset('/image/album/9.png')
		},
		{
			id: 10,
			title: 'Dead End',
			artist: '23',
			image: asset('/image/album/10.png')
		},
		{
			id: 11,
			title: 'Round VI',
			artist: 'Jung Jae-il',
			image: asset('/image/album/11.png')
		},
		{
			id: 12,
			title: 'Wife, Husband and 4.56 Billion',
			artist: 'Jung Jae-il',
			image: asset('/image/album/12.png')
		},
		{
			id: 13,
			title: 'Slaughterhouse III',
			artist: 'Jung Jae-il',
			image: asset('/image/album/13.png')
		},
		{
			id: 14,
			title: 'Dawn',
			artist: 'Jung Jae-il',
			image: asset('/image/album/14.png')
		},
		{
			id: 15,
			title: 'Let’s Go Out Tonight',
			artist: 'Jung Jae-il',
			image: asset('/image/album/15.png')
		}
	];

	const handleToggleLike: LikeActionToggleHandler = (isLiked) => console.log(`Liked: ${isLiked}`);
</script>

<PageWrapper hasBottomPadding hasContentPadding showBackButton>
	{#snippet actions()}
		<LikeAction isLiked={false} onToggle={handleToggleLike} />
	{/snippet}
	<Backdrop
		images={Array.from({ length: 4 }, () => asset(`/image/album/${generateRandomNumber(15)}.png`))}
	>
		<PageHeader heading="عنوان لیست پخش" subheading="نام کاربری" />
	</Backdrop>
	<Soundtracks class="relative z-20 mt-49" data={SOUNDTRACKS} />
</PageWrapper>
