<script lang="ts">
	import { page } from '$app/state';
	import type { HeroIcon } from '$lib/types/icon';
	import { toRem } from '$lib/utilities/general';
	import { FolderArrowDown, Home, Pencil } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fly, scale } from 'svelte/transition';
	import { navigationStore } from '../stores/navigation-store.svelte';

	const MIN_ITEM_WIDTH = 48;

	type Route = {
		icon: HeroIcon;
		label: string;
		pathname: string;
	};
	const ROUTES = [
		{
			icon: Home,
			label: 'Home',
			pathname: '/'
		},
		{
			icon: FolderArrowDown,
			label: 'Downloads',
			pathname: '/downloads'
		}
	] as const satisfies Route[];

	let labelWidth = $state(0);
</script>

<div
	class="fixed bottom-5 left-1/2 z-50 flex h-20.5 -translate-x-1/2 items-center justify-center gap-3 overflow-hidden rounded-full bg-background-primary/50 px-3 outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
	bind:clientHeight={navigationStore.height}
>
	{#each ROUTES as route, index}
		{@render item(route, route.pathname === page.url.pathname)}
		{#if index === ROUTES.length / 2 - 1}
			<button
				class="h-fit rounded-full bg-accent-primary p-3 text-foreground-accent outline -outline-offset-1 outline-stroke-primary"
			>
				<Icon class="size-6" src={Pencil} theme="solid" />
			</button>
		{/if}
	{/each}
</div>

{#snippet item({ label, icon, pathname }: Route, isActive: boolean)}
	<a class="p-2" href={pathname}>
		<span
			style:--width={toRem(labelWidth < MIN_ITEM_WIDTH ? MIN_ITEM_WIDTH : labelWidth)}
			class={[
				'relative flex w-(--width) justify-center transition-[width,height] duration-500 ease-overshoot-heavy',
				isActive ? 'h-10.5' : 'h-6'
			]}
		>
			{#if isActive}
				{@render itemIcon(icon, 'solid')}
			{:else}
				{@render itemIcon(icon, 'outline')}
			{/if}
			{#if isActive}
				{@const LABEL_FLY_Y = 24}
				<span
					class="absolute bottom-0 left-1/2 block -translate-x-1/2 text-xs leading-none"
					in:fly={{
						y: 24,
						duration: 400
					}}
					out:fly={{
						y: LABEL_FLY_Y,
						duration: 150
					}}
					bind:clientWidth={labelWidth}
				>
					{label}
				</span>
			{/if}
		</span>
	</a>
{/snippet}

{#snippet itemIcon(src: HeroIcon, theme: 'solid' | 'outline')}
	<span
		class="absolute left-1/2 block size-6 -translate-x-1/2"
		transition:scale={{
			duration: 500
		}}
	>
		<Icon class="w-full" {src} {theme} />
	</span>
{/snippet}
