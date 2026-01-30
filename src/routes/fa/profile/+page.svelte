<script lang="ts">
	import { asset } from '$app/paths';
	import type { Asset } from '$app/types';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import Image from '$lib/components/image.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import type { LucideIcon } from '$lib/types/icon';
	import {
		ClapperboardIcon,
		ClockIcon,
		CrownIcon,
		HeadsetIcon,
		MoveRightIcon,
		RotateCcwIcon,
		SettingsIcon,
		SparklesIcon,
		TvIcon
	} from '@lucide/svelte';
	import { Camera, ChatBubbleLeftRight, Film, Heart, Play } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import FadingIcon from '../../_lib/components/fading-icon.svelte';
	import Arrow from '../_lib/components/arrow.svelte';
	import type { MenuData } from '../_lib/components/menu.svelte';
	import Menu from '../_lib/components/menu.svelte';
	import PageWrapper from '../_lib/components/page-wrapper.svelte';
	import { generateRandomNumber } from '../_lib/utilities/comment';
	import { formatCount } from '../_lib/utilities/format-count';
	import { toFarsi } from '../_lib/utilities/to-farsi';

	const MENU_DATA: MenuData = [
		{
			label: 'فیلم و سریال‌های من',
			icon: Film,
			href: '/fa/profile/my-lists'
		},
		{
			label: 'علاقه‌مندی‌ها',
			icon: Heart,
			href: '/fa/profile/favorites'
		},
		{
			label: 'لیست‌های پخش',
			icon: Play,
			href: '/fa/profile/playlists'
		},
		{
			label: 'دیدگاه‌ها و نقدها',
			icon: ChatBubbleLeftRight,
			href: '/fa/profile/feedback'
		}
	];
</script>

<PageWrapper hasContentPadding hasBottomPadding>
	{#snippet actions()}
		<Button variant="neutral" isCircle isActive={false}>
			<SettingsIcon class="size-5 stroke-[1.5]" />
		</Button>
		<Button variant="neutral" isCircle isActive={false}>
			<HeadsetIcon class="size-5 stroke-[1.5]" />
		</Button>
	{/snippet}
	<Arrow
		class="absolute -top-32 left-1/2 z-10 -translate-x-[calc(50%-8rem)] text-accent-primary opacity-75 blur-[48px]"
	/>
	<Arrow
		class="absolute -top-32 left-1/2 z-10 -translate-x-[calc(50%+8rem)] -scale-x-100 text-success-tint opacity-75 blur-[48px]"
	/>
	<Arrow
		class="absolute top-32 left-1/2 z-10 -translate-x-[calc(50%-8rem)] -scale-y-100 text-accent-primary opacity-25 blur-[48px]"
	/>
	<Arrow
		class="absolute top-32 left-1/2 z-10 -translate-x-[calc(50%+8rem)] -scale-100 text-success-tint opacity-25 blur-[48px]"
	/>
	<Image
		class="absolute top-0 left-1/2 z-20 h-77 w-100 -translate-x-1/2 mask-radial-from-white/35 mask-radial-to-transparent mask-radial-to-60% mask-radial-at-top"
		src={asset('/image/pattern/stars.svg')}
	/>
	<Image class="absolute -top-109 -left-150 w-352" src="/image/pattern/wave.png" />
	<div class="relative z-30 mt-8 grid place-items-center">
		<div class="relative">
			<Image
				class="size-32 rounded-full"
				src={asset('/image/avatar/8.png')}
				hasLoadingGlow
				hasOutline
			/>
			<Button class="absolute right-0 bottom-0 z-10 size-8" isCircle>
				<Icon class="size-4" src={Camera} theme="solid" />
			</Button>
		</div>
		<div class="mt-3 mb-2 text-base leading-none font-bold">سارا بزرگمهر</div>
		<div class="text-xs leading-none text-foreground-secondary">sarabozorgmehr@</div>
	</div>
	<div class="relative z-20">
		<div class="mt-6 flex gap-2">
			{@render communityButton(
				'دنبال شده',
				generateRandomNumber(1000),
				'/image/icon/fade/heart.svg',
				'primary'
			)}
			{@render communityButton(
				'دنبال کننده',
				generateRandomNumber(1000),
				'/image/icon/fade/user-group.svg',
				'success'
			)}
		</div>
		<Box.Root class="mt-3 p-5">
			<Box.Visuals class="rounded-3xl bg-background-tertiary">
				<div
					class="absolute bottom-0 left-1/2 z-10 size-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-secondary blur-[80px]"
				></div>
			</Box.Visuals>

			<div class="mb-1.5 text-xs text-foreground-secondary">اشتراک ویژه</div>
			<div class="mb-2.5 flex items-center gap-1.5">
				<Image
					class="absolute top-4 left-5 w-20 mask-linear-180 mask-linear-from-black/25 mask-linear-to-transparent"
					src={asset('/image/subscription/2.svg')}
				/>
				<div class="text-base font-bold">سه ماههٔ پاندا</div>
				<div
					class="rounded-full bg-gradient bg-gradient-secondary px-1.5 py-1 text-xs leading-none outline -outline-offset-1 outline-stroke-tertiary"
				>
					۸۴ روز باقی مانده
				</div>
			</div>
			<div class="mb-4 flex items-center gap-1 text-yellow-300">
				<CrownIcon class="size-4" />
				<div class="translate-y-px text-xs leading-none">
					اشتراک شما در تاریخ ۱۴۰۵/۰۲/۱۶ منقضی می‌شه!
				</div>
			</div>
			<div class="flex gap-1.5">
				<Button variant="neutral" icon={SparklesIcon} isActive={false}>سابقهٔ اشتراک‌ها</Button>
				<Button variant="secondary" icon={RotateCcwIcon}>تمدید</Button>
			</div>
		</Box.Root>
		<Box.Root class="mt-3 grid gap-5 p-5">
			<Box.Visuals class="rounded-3xl bg-background-tertiary">
				<div
					class="absolute bottom-0 left-1/2 z-10 size-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-tertiary blur-[80px]"
				></div>
			</Box.Visuals>
			<FadingIcon class="top-4 left-4 opacity-50" size={44} src="/image/icon/fade/chart.svg" />
			<div class="flex items-center gap-3">
				{@render statItem('زمان تماشا آنلاین', 53, 'ساعت', ClockIcon)}
				<Separator size={24} />
				{@render statItem('سریال‌ها', 53, 'عدد', TvIcon)}
				<Separator size={24} />
				{@render statItem('فیلم‌ها', 53, 'عدد', ClapperboardIcon)}
			</div>
			<Button variant="tertiary" icon={MoveRightIcon}>همهٔ آمار</Button>
		</Box.Root>
		<Menu class="mt-5" data={MENU_DATA} />
	</div>
</PageWrapper>

{#snippet communityButton(
	label: string,
	value: number,
	icon: Asset,
	variant: 'primary' | 'success'
)}
	<Pressable.Root class="block flex-1 text-start">
		<Pressable.Content>
			<Box.Root class="relative grid gap-1 px-5 py-4">
				<Box.Visuals class="bg-gradient bg-gradient-neutral/25">
					<div
						class={[
							'absolute top-1/2 left-0 z-10 size-12 -translate-y-1/2 rounded-full blur-[48px]',
							variant === 'primary' ? 'bg-accent-primary-tint' : 'bg-success-tint'
						]}
					></div>
				</Box.Visuals>
				<FadingIcon class="top-1/2 left-3 z-20 -translate-y-1/2 opacity-50" src={icon} />
				<div class="font-bold">{formatCount(value)}</div>
				<div class="text-xs text-foreground-secondary">{label}</div>
			</Box.Root>
		</Pressable.Content>
	</Pressable.Root>
{/snippet}

{#snippet statItem(label: string, value: number, unit: string, icon: LucideIcon)}
	{@const Icon = icon}
	<div>
		<div class="mb-1 flex items-center gap-0.5">
			<div class="text-base leading-none font-bold">{toFarsi(value)}</div>
			<div class="text-2xs leading-none font-medium">/ {unit}</div>
		</div>
		<div class="flex items-center gap-1 text-foreground-secondary">
			<Icon class="size-3.5 " />
			<div class="text-xs leading-none">{label}</div>
		</div>
	</div>
{/snippet}
