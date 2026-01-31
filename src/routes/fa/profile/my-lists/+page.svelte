<script lang="ts">
	import { resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import type { Option } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { MEDIA_FA } from '$lib/constants/data';
	import FilterAction from '../../_lib/components/actions/filter-action.svelte';
	import Grid from '../../_lib/components/grid.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';

	const PRESERVATION_KEY = 'my-lists-tab';
	const TABS: Option[] = [
		{
			label: 'در حال تماشا',
			value: 'watching'
		},
		{
			label: 'بعداً می‌بینم',
			value: 'plan-to-watch'
		},
		{
			label: 'خوشم نیومد',
			value: 'dropped'
		},
		{
			label: 'تا آخر دیدم',
			value: 'finished'
		}
	];
</script>

<PageWrapper icon="/image/icon/fade/film.svg" hasBottomPadding hasContentPadding showBackButton>
	{#snippet actions()}
		<FilterAction />
	{/snippet}
	<Select class="mt-6" offset={20} options={TABS} preservationKey={PRESERVATION_KEY} />

	<Grid>
		{#each MEDIA_FA as { id, poster, titleFa, score }}
			<PostCard
				class="w-full"
				href={resolve('/fa/media/[id]', {
					id: String(id)
				})}
				image={poster}
				title={titleFa}
				{score}
			/>
		{/each}
	</Grid>
</PageWrapper>
