<script lang="ts">
	import { CheckIcon } from '@lucide/svelte';
	import Button from '../../../../_lib/components/button.svelte';
	import { Drawer } from '../../../../_lib/components/drawer';
	import type {
		SingleSelectOptions,
		SingleSelectOptionsValue
	} from '../../../../_lib/components/drawer/single-select.svelte';
	import type { TabsData, TabsDataValue } from '../../../../_lib/components/drawer/tabs.svelte';
	import { HASH } from '../../../../_lib/constants/hash';

	const TABS_DATA = [
		{
			label: 'وضعیت تماشا',
			value: 'watching-status'
		},
		{
			label: 'لیست‌های پخش',
			value: 'playlists'
		}
	] as const satisfies TabsData;
	const WATCHING_STATUS_OPTIONS = [
		{
			label: 'تماشا نشده',
			value: 'unwatched'
		},
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
	] as const satisfies SingleSelectOptions;

	let currentTab = $state<TabsDataValue<typeof TABS_DATA>>('watching-status');
	let currentWatchingStatus =
		$state<SingleSelectOptionsValue<typeof WATCHING_STATUS_OPTIONS>>('unwatched');
</script>

<Drawer.Root hash={HASH.ADD_TO_LIST}>
	<Drawer.Tabs data={TABS_DATA} bind:value={currentTab} />
	<Drawer.Body>
		<Drawer.SingleSelect options={WATCHING_STATUS_OPTIONS} bind:value={currentWatchingStatus} />
	</Drawer.Body>
	<Drawer.Footer>
		<Button icon={CheckIcon}>تأیید</Button>
	</Drawer.Footer>
</Drawer.Root>
