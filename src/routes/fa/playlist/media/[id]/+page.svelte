<script lang="ts">
	import { resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import { COUNTRY_LABEL_MAP_FA, MEDIA_FA } from '$lib/constants/data';
	import Backdrop from '../../../_lib/components/backdrop.svelte';
	import Grid from '../../../_lib/components/grid.svelte';
	import type { LikeActionToggleHandler } from '../../../_lib/components/like-action.svelte';
	import LikeAction from '../../../_lib/components/like-action.svelte';
	import PageHeader from '../../../_lib/components/page-header.svelte';
	import PageWrapper from '../../../_lib/components/page-wrapper.svelte';

	const handleToggleLike: LikeActionToggleHandler = (isLiked) => console.log(`Liked: ${isLiked}`);
</script>

<PageWrapper showBackButton hasContentPadding hasBottomPadding>
	{#snippet actions()}
		<LikeAction isLiked={false} onToggle={handleToggleLike} />
	{/snippet}
	<Backdrop images={MEDIA_FA.slice(0, 4).map(({ poster }) => poster)}>
		<PageHeader heading="عنوان لیست پخش" subheading="نام کاربری" />
	</Backdrop>
	<Grid class="mt-49">
		{#each MEDIA_FA as { id, titleFa, score, poster, country }}
			<PostCard
				class="w-full"
				href={resolve(`/fa/media/[id]`, {
					id: String(id)
				})}
				title={titleFa}
				subtitle={COUNTRY_LABEL_MAP_FA[country]}
				{score}
				image={poster}
			/>
		{/each}
	</Grid>
</PageWrapper>
