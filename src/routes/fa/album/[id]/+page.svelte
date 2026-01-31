<script lang="ts">
	import { asset } from '$app/paths';
	import LikeAction, {
		type LikeActionToggleHandler
	} from '../../_lib/components/actions/like-action.svelte';
	import Backdrop from '../../_lib/components/backdrop.svelte';
	import PageHeader from '../../_lib/components/page-header.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import Soundtracks, { type SoundtracksData } from '../../_lib/components/soundtracks.svelte';

	const SOUNDTRACKS: SoundtracksData = [
		{ id: 1, title: 'Way Back Then', artist: 'Jung Jae-il' },
		{ id: 2, title: 'Round I', artist: 'Jung Jae-il' },
		{ id: 3, title: 'The Rope is Tied', artist: 'Jung Jae-il' },
		{ id: 4, title: 'Pink Soldiers', artist: '23' },
		{ id: 5, title: 'Hostage Crisis', artist: '23' },
		{ id: 6, title: 'I Remember My Name', artist: 'Jung Jae-il' },
		{ id: 7, title: 'Unfolded…', artist: 'Jung Jae-il' },
		{ id: 8, title: 'Needles and Dalgona', artist: 'Park Minju' },
		{ id: 9, title: 'The Fat and the Rats', artist: 'Park Minju' },
		{ id: 10, title: 'It Hurts So Bad', artist: 'Jung Jae-il' },
		{ id: 11, title: 'Delivery', artist: '23' },
		{ id: 12, title: 'Dead End', artist: '23' },
		{ id: 13, title: 'Round VI', artist: 'Jung Jae-il' },
		{ id: 14, title: 'Wife, Husband and 4.56 Billion', artist: 'Jung Jae-il' },
		{ id: 15, title: 'Murder Without Violence', artist: 'Park Minju' },
		{ id: 16, title: 'Slaughterhouse III', artist: 'Jung Jae-il' },
		{ id: 17, title: 'Owe', artist: 'Jung Jae-il' },
		{ id: 18, title: 'Uh…', artist: 'Jung Jae-il' },
		{ id: 19, title: 'Dawn', artist: 'Jung Jae-il' },
		{ id: 20, title: 'Let’s Go Out Tonight', artist: 'Jung Jae-il' }
	];

	const handleToggleLike: LikeActionToggleHandler = (isLiked) => console.log(`Liked: ${isLiked}`);
</script>

<PageWrapper hasContentPadding hasBottomPadding showBackButton>
	{#snippet actions()}
		<LikeAction onToggle={handleToggleLike} isLiked={false} />
	{/snippet}
	<Backdrop image={asset('/image/album/13.png')}>
		<PageHeader heading="بازی مرکب" subheading="۲۰ ترک موسیقی" />
	</Backdrop>
	<Soundtracks class="relative z-20 mt-49" data={SOUNDTRACKS} />
</PageWrapper>
