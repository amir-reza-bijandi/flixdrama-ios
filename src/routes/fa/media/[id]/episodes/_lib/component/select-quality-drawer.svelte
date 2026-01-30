<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { DirectionFactor } from '$lib/types/transition';
	import { ClipboardCopyIcon, DownloadIcon, PlayIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { Drawer, type DrawerSingleSelectOption } from '../../../../../_lib/components/drawer';
	import type { TabsData, TabsDataValue } from '../../../../../_lib/components/drawer/tabs.svelte';
	import { HASH } from '../../../../../_lib/constants/hash';
	import type { Quality } from '../../../../../_lib/types/media';
	import { generateRandomNumber } from '../../../../../_lib/utilities/comment';
	import { toFarsi } from '../../../../../_lib/utilities/to-farsi';

	type Tab = TabsDataValue<typeof TABS_DATA>;
	const TABS_DATA = [
		{
			label: 'سافت‌ساب',
			value: 'softsub'
		},
		{
			label: 'هاردساب',
			value: 'hardsub'
		}
	] as const satisfies TabsData;
	const TAB_SNIPPET_MAP: Record<Tab, Snippet> = {
		softsub,
		hardsub
	};

	const QUALITY = [
		'360p',
		'480p',
		'540p',
		'720p',
		'1080p',
		'720p x265 10bit',
		'1080p x265 10bit'
	] as const;
	const QUALITY_LABEL_MAP: Record<Quality, string> = {
		'360p': 'qSD',
		'480p': 'SD',
		'540p': 'qHD',
		'720p': 'HD',
		'1080p': 'FHD',
		'720p x265 10bit': 'HD+',
		'1080p x265 10bit': 'FHD+'
	};
	const QUALITY_OPTIONS = QUALITY.map<DrawerSingleSelectOption>((quality, index) => ({
		label: `کیفیت ${quality}`,
		description: `${toFarsi(generateRandomNumber(999))} مگابایت`,
		value: quality,
		short: QUALITY_LABEL_MAP[quality],
		badge: QUALITY.length - 3 < index ? 'کم‌حجم' : ''
	}));

	let currentTab = $state<TabsDataValue<typeof TABS_DATA>>('softsub');
	let directionFactor = $state<DirectionFactor>(1);
	let currentQuality = $state<Quality>('360p');
</script>

<Drawer.Root hash={HASH.SELECT_QUALITY}>
	<Drawer.Tabs data={TABS_DATA} bind:value={currentTab} bind:directionFactor />
	<Drawer.Body children={TAB_SNIPPET_MAP[currentTab]} {directionFactor} />
	<Drawer.Footer>
		<Button icon={DownloadIcon}>دانلود</Button>
		<Button icon={ClipboardCopyIcon} variant="secondary" isCircle />
		<Button icon={PlayIcon} variant="tertiary">پخش آنلاین</Button>
	</Drawer.Footer>
</Drawer.Root>

{#snippet softsub()}
	<Drawer.SingleSelect options={QUALITY_OPTIONS} bind:value={currentQuality} />
{/snippet}
{#snippet hardsub()}
	<Drawer.SingleSelect options={QUALITY_OPTIONS.slice(0, 4)} bind:value={currentQuality} />
{/snippet}
