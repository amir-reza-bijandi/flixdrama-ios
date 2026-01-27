<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import Button from '$lib/components/button.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	import type { Option } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { COUNTRY_LABEL_MAP_FA, MEDIA_FA } from '$lib/constants/data';
	import type { Country } from '$lib/types/data';
	import { SearchIcon, SlidersHorizontalIcon } from '@lucide/svelte';
	import Grid from '../_lib/components/grid.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import { HASH } from '../_lib/constants/hash';
	import { toFarsi } from '../_lib/utilities/to-farsi';
	import FilterDrawer from './_lib/component/filter-drawer.svelte';
	import SearchDrawer from './_lib/component/search-drawer.svelte';

	const PRESERVATION_KEY = 'archive-tabs';
	const SELECT_OFFSET = 20;
	const countryOptions = Object.keys(COUNTRY_LABEL_MAP_FA).map<Option>((country) => ({
		label: COUNTRY_LABEL_MAP_FA[country as Country],
		value: country as Country
	}));
</script>

<PageWrapper icon={asset('/image/icon/fade/archive.svg')} hasBottomPadding hasContentPadding>
	{#snippet actions()}
		<Button as="a" href={HASH.FILTER} variant="neutral" isActive={false} isCircle>
			<SlidersHorizontalIcon class="size-5 stroke-[1.5]" />
		</Button>
		<Button as="a" href={HASH.SEARCH_DRAWER} variant="neutral" isActive={false} isCircle>
			<SearchIcon class="size-5 stroke-[1.5]" />
		</Button>
	{/snippet}
	<Select
		class="mt-6"
		offset={SELECT_OFFSET}
		options={countryOptions}
		preservationKey={PRESERVATION_KEY}
	/>
	<Grid>
		{#each MEDIA_FA as { id, poster, titleFa, score }}
			<PostCard
				class="w-full"
				href={resolve('/fa/media/[id]', {
					id: String(id)
				})}
				image={poster}
				subtitle="قسمت {toFarsi(Math.floor(Math.random() * 16) + 1)}"
				title={titleFa}
				{score}
			/>
		{/each}
	</Grid>
</PageWrapper>
<SearchDrawer />
<FilterDrawer />
