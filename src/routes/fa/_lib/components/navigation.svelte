<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { navigating, page } from '$app/state';
	import { TRANSITION } from '$lib/constants/transition';
	import type { HeroIcon } from '$lib/types/icon';
	import { toRem } from '$lib/utilities/general';
	import { ArchiveBox, FolderArrowDown, Home, Sparkles, Star, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { backOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import { sizeStore } from '../store/size-store.svelte';

	const LABEL_TRANSITION_DURATION = 300;
	const DEFAULT_CENTER_BUTTON_SIZE = 48;

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

	const currentPathname = $derived(navigating.to ? navigating.to.url.pathname : page.url.pathname);
	const isCenterButtonActive = $derived(currentPathname === '/fa/feed');
	let centerButtonContentWidth = $state(0);
	let centerButtonWidth = $derived(
		isCenterButtonActive ? centerButtonContentWidth : DEFAULT_CENTER_BUTTON_SIZE
	);
	let labelHeight = $state(0);

	const SPARK_INTERVAL = 250;
	const SPARK_ANIMATION_DURATION = 4000;
	const maxSparkCount = SPARK_ANIMATION_DURATION / SPARK_INTERVAL;
	type Spark = {
		id: symbol;
		x: number;
		y: number;
		offset: number;
		size: number;
		opacity: number;
	};
	let sparks = $state<Spark[]>([]);
	let timerId = 0;
	$effect(() => {
		timerId = window.setInterval(() => {
			if (sparks.length < maxSparkCount) {
				const id = Symbol();

				const maxX = centerButtonWidth;
				const maxY = DEFAULT_CENTER_BUTTON_SIZE;
				const minSize = 2;
				const maxSize = 8;
				const maxOffset = centerButtonWidth / 4;
				const maxOpacity = isCenterButtonActive ? 1 : 0.6;

				const x = Math.floor(Math.random() * maxX) - maxX / 2;
				const y = Math.floor(Math.random() * maxY) - maxY;
				const offset =
					Math.floor(Math.random() * maxOffset) *
					(Math.floor(Math.random() * 10) % 2 === 0 ? 1 : -1);
				const size = minSize + Math.floor(Math.random() * (maxSize - minSize));
				const opacity = Math.random() * maxOpacity;
				const newSpark: Spark = {
					id,
					x,
					y,
					offset,
					size,
					opacity
				};
				sparks.push(newSpark);
				window.setTimeout(
					() => (sparks = sparks.filter(({ id }) => newSpark.id !== id)),
					SPARK_ANIMATION_DURATION
				);
			}
		}, SPARK_INTERVAL);
		return () => clearInterval(timerId);
	});
</script>

<div
	class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-background-primary/50 p-3 backdrop-blur-xl transition-[background-color] before:absolute before:top-0 before:left-0 before:block before:h-px before:w-full before:bg-stroke-primary"
	bind:clientHeight={sizeStore.navigationHeight}
>
	{#each ROUTES as { label, pathname, icon }, index}
		{@const isActive = pathname === currentPathname}
		<a
			class={[
				' flex w-12 flex-col items-center gap-1.5 py-2 transition-[filter,color]',
				isActive && 'brightness-75 saturate-200 dark:brightness-100 dark:saturate-100'
			]}
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
			<span
				style:--height={toRem(labelHeight)}
				class={['relative grid h-(--height) place-items-center text-xs', isActive && '']}
			>
				{#if isActive}
					<span
						class="absolute text-accent-primary-tint-extra"
						bind:clientHeight={labelHeight}
						transition:fade={{
							duration: LABEL_TRANSITION_DURATION
						}}
					>
						{label}
					</span>
				{:else}
					<span
						class="absolute"
						bind:clientHeight={labelHeight}
						transition:fade={{
							duration: LABEL_TRANSITION_DURATION
						}}
					>
						{label}
					</span>
				{/if}
			</span>
		</a>
		{#if index === ROUTES.length / 2 - 1}
			<a
				style:--width={toRem(centerButtonWidth)}
				style:--height={toRem(DEFAULT_CENTER_BUTTON_SIZE)}
				class={[
					'gradient-border relative grid h-12 w-(--width) min-w-(--height) place-items-center overflow-hidden rounded-full bg-gradient bg-gradient-primary text-foreground-accent transition-[width] ease-overshoot-heavy',
					!isCenterButtonActive && 'duration-750'
				]}
				href={resolve('/fa/feed')}
				draggable={false}
			>
				<div class="absolute top-full left-1/2 isolate grid place-items-center">
					{#each sparks as { id, x, y, offset, opacity, size } (id)}
						<Icon
							--animation-duration={`${SPARK_ANIMATION_DURATION}ms`}
							--x={toRem(x)}
							--y={toRem(y)}
							--offset={toRem(offset)}
							--size={toRem(size)}
							--opacity={opacity}
							class="animate absolute left-(--offset) -z-10 size-(--size)"
							src={Star}
							theme="solid"
						/>
					{/each}
				</div>
				{#if isCenterButtonActive}
					<span
						class="absolute inline-block translate-y-px p-4.5 text-sm leading-none font-bold wrap-normal whitespace-nowrap"
						bind:clientWidth={centerButtonContentWidth}
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
					<div
						class="absolute"
						transition:scale={{
							duration: TRANSITION.DURATION
						}}
						bind:clientWidth={centerButtonContentWidth}
					>
						<Icon class="size-6" src={Sparkles} theme="solid" />
					</div>
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
	:global(.animate) {
		animation: moving-stars var(--animation-duration) both;
	}
	@keyframes moving-stars {
		0% {
			opacity: 0;
		}
		50% {
			opacity: var(--opacity);
		}
		100% {
			translate: var(--x) var(--y);
			opacity: 0;
		}
	}
</style>
