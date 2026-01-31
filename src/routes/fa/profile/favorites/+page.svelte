<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import PostCard from '$lib/components/post-card.svelte';
	import type { Option, OptionsValue } from '$lib/components/select.svelte';
	import Select from '$lib/components/select.svelte';
	import { MEDIA_FA, ROLE_LABEL_MAP, TYPE_LABEL_MAP_FA } from '$lib/constants/data';
	import type { Snippet } from 'svelte';
	import FilterAction from '../../_lib/components/actions/filter-action.svelte';
	import Grid from '../../_lib/components/grid.svelte';
	import List from '../../_lib/components/list.svelte';
	import PageWrapper from '../../_lib/components/page-wrapper.svelte';
	import PlaylistCategories from '../../_lib/components/playlist-categories.svelte';

	const PRESERVATION_KEY = 'favorites-tab';
	const TABS = [
		{
			label: 'فیلم و سریال',
			value: 'media'
		},
		{
			label: 'عوامل',
			value: 'personnel'
		},
		{
			label: 'موسیقی متن',
			value: 'soundtrack'
		},
		{
			label: 'لیست‌های پخش',
			value: 'playlist'
		}
	] as const satisfies Option[];
	type Tab = OptionsValue<typeof TABS>;
	const MAP_SNIPPET_TAB: Record<Tab, Snippet> = {
		media: mediaTab,
		personnel: personnelTab,
		playlist: playlistTab,
		soundtrack: soundtrackTab
	};
	const personnel = MEDIA_FA[0].personnel;

	let currentTab = $state<Tab>('media');
	const Container = $derived(currentTab === 'playlist' ? List : Grid);
</script>

<PageWrapper
	actions={currentTab === 'media' ? actions : undefined}
	icon="/image/icon/fade/heart.svg"
	hasBottomPadding
	hasContentPadding
	showBackButton
>
	<Select
		class="mt-6"
		offset={20}
		options={TABS}
		preservationKey={PRESERVATION_KEY}
		bind:value={currentTab}
	/>
	<Container class={[currentTab !== 'playlist' && 'grid-cols-3']}>
		{@render MAP_SNIPPET_TAB[currentTab]()}
	</Container>
</PageWrapper>

{#snippet actions()}
	<FilterAction />
{/snippet}

{#snippet mediaTab()}
	{#each MEDIA_FA as { id, poster, titleFa, type }}
		<PostCard
			class="w-full"
			href={resolve('/fa/media/[id]', {
				id: String(id)
			})}
			image={poster}
			subtitle={TYPE_LABEL_MAP_FA[type]}
			title={titleFa}
		/>
	{/each}
{/snippet}
{#snippet personnelTab()}
	{#each personnel as { id, name, image, role }}
		<PostCard
			class="w-full"
			href={resolve(`/fa/personnel/[id]`, {
				id: String(id)
			})}
			{image}
			subtitle={role.map((role) => ROLE_LABEL_MAP[role]).join(' / ')}
			title={name}
			aspectRatio="square"
			isFullyRounded
		/>
	{/each}
{/snippet}
{#snippet soundtrackTab()}
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
		/>
	{/each}
{/snippet}
{#snippet playlistTab()}
	<PlaylistCategories
		mediaHref="/fa/profile/favorites/media-playlist"
		soundtrackHref="/fa/profile/favorites/soundtrack-playlist"
	/>
{/snippet}
