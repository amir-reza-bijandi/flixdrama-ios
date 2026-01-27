<script lang="ts">
	import { MEDIA_FA } from '$lib/constants/data';
	import { SearchIcon } from '@lucide/svelte';
	import { Drawer } from '../../../_lib/components/drawer';
	import Expandable from '../../../_lib/components/expandable.svelte';
	import SearchHistoryItem from '../../../_lib/components/search-history-item.svelte';
	import { HASH } from '../../../_lib/constants/hash';

	const MAX_HISTORY = 4;
	let history = $state<string[]>(
		MEDIA_FA.map(({ titleFa }) => titleFa)
			.slice(0, MAX_HISTORY)
			.reverse()
	);
	let query = $state('');
	const showHistory = $derived(!query);
</script>

<Drawer.Root hash={HASH.SEARCH_DRAWER}>
	<Drawer.Group showDivider={showHistory}>
		<Drawer.Text
			showBoxVisuals={false}
			icon={SearchIcon}
			placeholder="اسم فیلم یا سریال مورد نظرت رو وارد کن..."
			bind:value={query}
		/>
		<Expandable isActive={!query} overshoot>
			{#each history as item}
				<SearchHistoryItem onClick={() => (query = item)}>{item}</SearchHistoryItem>
			{/each}
		</Expandable>
	</Drawer.Group>
</Drawer.Root>
