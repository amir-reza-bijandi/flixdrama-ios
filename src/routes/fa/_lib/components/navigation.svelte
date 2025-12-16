<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { navigating, page } from '$app/state';
	import { TRANSITION } from '$lib/constants/transition';
	import type { HeroIcon } from '$lib/types/icon';
	import { toRem } from '$lib/utilities/general';
	import { ArchiveBox, FolderArrowDown, Home, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { backOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	type Route = {
		label: string;
		pathname: string;
		icon: {
			outline: HeroIcon;
			solid: string;
		};
	};
	const ROUTES = [
		{
			label: 'خانه',
			pathname: '/fa',
			icon: {
				outline: Home,
				solid: '/image/icon/navigation/home.svg'
			}
		},
		{
			label: 'آرشیو',
			pathname: '/fa/archive',
			icon: {
				outline: ArchiveBox,
				solid: '/image/icon/navigation/archive.svg'
			}
		},
		{
			label: 'دانلود‌ها',
			pathname: '/fa/downloads',
			icon: {
				outline: FolderArrowDown,
				solid: '/image/icon/navigation/downloads.svg'
			}
		},
		{
			label: 'پروفایل',
			pathname: '/fa/profile',
			icon: {
				outline: User,
				solid: '/image/icon/navigation/user.svg'
			}
		}
	] as const satisfies Route[];
	const DEFAULT_CENTER_BUTTON_SIZE = 48;

	const currentPathname = $derived(navigating.to ? navigating.to.url.pathname : page.url.pathname);
	const isCenterButtonActive = $derived(currentPathname === '/fa/feed');
	let centerButtonWidthContent = $state(0);
	let centerButtonWidth = $derived(
		isCenterButtonActive ? centerButtonWidthContent : DEFAULT_CENTER_BUTTON_SIZE
	);
</script>

<div
	class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-stroke-primary bg-background-primary/50 p-3 backdrop-blur-xl"
>
	<!-- Border -->
	<div class="absolute top-0 left-0 h-px w-full bg-stroke-primary"></div>

	{#each ROUTES as { label, pathname, icon }, index}
		{@const isActive = pathname === currentPathname}
		<a
			class="flex w-12 flex-col items-center gap-1.5 py-2"
			href={resolve(pathname)}
			draggable={false}
		>
			<div class="relative size-6">
				{#if isActive}
					<img
						class="absolute top-1/2 left-1/2 -translate-1/2"
						src={asset(icon.solid)}
						alt=""
						out:scale={{
							duration: TRANSITION.DURATION
						}}
						in:scale={{
							duration: TRANSITION.DURATION,
							easing: backOut
						}}
					/>
				{:else}
					<div
						class="absolute size-full"
						transition:scale={{
							duration: TRANSITION.DURATION
						}}
					>
						<Icon class="size-full" src={icon.outline} theme="outline" />
					</div>
				{/if}
			</div>
			<span class={['text-xs transition-colors', isActive && 'text-accent-primary-tint-extra']}
				>{label}</span
			>
		</a>
		{#if index === ROUTES.length / 2 - 1}
			<a
				style:--width={toRem(centerButtonWidth)}
				style:--height={toRem(DEFAULT_CENTER_BUTTON_SIZE)}
				class={[
					'gradient-border grid h-12 w-(--width) min-w-(--height) place-items-center rounded-full bg-linear-to-b from-accent-primary-tint to-accent-primary-shade transition-[width] ease-overshoot-heavy',
					!isCenterButtonActive && 'duration-750'
				]}
				href={resolve('/fa/feed')}
				draggable={false}
			>
				{#if isCenterButtonActive}
					<span
						class="absolute inline-block translate-y-px p-4.5 text-sm leading-none font-bold"
						bind:clientWidth={centerButtonWidthContent}
						in:scale={{
							duration: TRANSITION.DURATION,
							easing: backOut
						}}
						out:scale={{
							duration: TRANSITION.DURATION
						}}
					>
						پشت صحنه
					</span>
				{:else}
					<img
						class="absolute"
						src={asset('/image/icon/navigation/clapperboard.svg')}
						alt=""
						transition:scale={{
							duration: TRANSITION.DURATION
						}}
						bind:clientWidth={centerButtonWidthContent}
					/>
					<!-- <div class="absolute" bind:clientWidth={centerButtonWidthContent}>
						<ApertureIcon class="size-6" />
					</div> -->
				{/if}
			</a>
		{/if}
	{/each}
</div>

<style>
	.gradient-border {
		border-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='none'%3e%3crect width='98' height='98' x='1' y='1' stroke='url(%23a)' stroke-width='2' rx='49'/%3e%3cdefs%3e%3clinearGradient id='a' x1='0' x2='100' y1='0' y2='100' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='white' stop-opacity='.25'/%3e%3cstop offset='1' stop-opacity='.25'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")
			48 / 1.5rem stretch;
	}
</style>
