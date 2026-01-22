<script lang="ts">
	import type { DirectionFactor } from '$lib/types/transition';
	import { CheckIcon, PlusIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import {
		Drawer,
		type DrawerFooterData,
		type DrawerFooterDataItem,
		type DrawerMultiSelectOptions,
		type DrawerMultiSelectOptionsValues,
		type DrawerSingleSelectOptions,
		type DrawerSingleSelectOptionsValue
	} from '../../../../_lib/components/drawer';
	import type { TabsData, TabsDataValue } from '../../../../_lib/components/drawer/tabs.svelte';
	import { HASH } from '../../../../_lib/constants/hash';
	import type { WatchingStatus } from '../../../../_lib/types/media';

	const EPISODE_COUNT = 1000;
	type Tab = TabsDataValue<typeof TABS_DATA>;
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
	] as const satisfies DrawerSingleSelectOptions<WatchingStatus>;
	const PLAYLIST_OPTIONS = [
		{
			label: 'بهترین‌های ۲۰۲۴',
			isActive: false,
			value: 'best-of-2024'
		},
		{
			label: 'دورهمی خانوادگی',
			isActive: false,
			value: 'family-gathering'
		}
	] as const satisfies DrawerMultiSelectOptions;
	const TAB_SNIPPET_MAP: Record<Tab, Snippet> = {
		'watching-status': watchingStatus,
		playlists: playlist
	};
	const SUBMIT_BUTTON: DrawerFooterDataItem = {
		id: Symbol(),
		as: 'button',
		icon: CheckIcon,
		label: 'تأیید'
	} as const;
	const WATCHING_STATUS_FOOTER: DrawerFooterData = [
		{
			...SUBMIT_BUTTON,
			onClick: () => window.history.back()
		}
	];
	const PLAYLISTS_FOOTER: DrawerFooterData = [
		{
			id: Symbol(),
			as: 'a',
			href: HASH.NEW_PLAYLIST,
			icon: PlusIcon,
			label: 'لیست پخش جدید',
			variant: 'tertiary',
			replaceState: true
		},
		{
			...SUBMIT_BUTTON,
			onClick: () => window.history.back()
		}
	];

	let currentTab = $state<TabsDataValue<typeof TABS_DATA>>('watching-status');
	let currentWatchingStatus =
		$state<DrawerSingleSelectOptionsValue<typeof WATCHING_STATUS_OPTIONS>>('unwatched');
	let watchedEpisodes = $state(0);
	let directionFactor = $state<DirectionFactor>(1);
	let currentPlaylists = $state<DrawerMultiSelectOptionsValues<typeof PLAYLIST_OPTIONS>>(
		PLAYLIST_OPTIONS.filter(({ isActive }) => isActive).map(({ value }) => value)
	);
	let footerData = $derived<DrawerFooterData>(
		currentTab === 'watching-status' ? WATCHING_STATUS_FOOTER : PLAYLISTS_FOOTER
	);
</script>

<Drawer.Root hash={HASH.ADD_TO_LIST}>
	<Drawer.Tabs data={TABS_DATA} bind:value={currentTab} bind:directionFactor />
	<Drawer.Body children={TAB_SNIPPET_MAP[currentTab]} {directionFactor} />
	<Drawer.Footer data={footerData} />
</Drawer.Root>

{#snippet watchingStatus()}
	<Drawer.SingleSelect options={WATCHING_STATUS_OPTIONS} bind:value={currentWatchingStatus} />
	<Drawer.Number
		bind:value={watchedEpisodes}
		max={EPISODE_COUNT}
		isDisabled={!(currentWatchingStatus === 'watching' || currentWatchingStatus === 'dropped')}
	>
		قسمت‌های تماشا شده
	</Drawer.Number>
{/snippet}
{#snippet playlist()}
	<Drawer.MultiSelect options={PLAYLIST_OPTIONS} bind:values={currentPlaylists} />
{/snippet}
