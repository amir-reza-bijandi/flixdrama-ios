<script lang="ts">
	import { asset } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import { CheckCheckIcon, TrashIcon } from '@lucide/svelte';
	import { ChevronLeft, Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBell } from '@tabler/icons-svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { backgroundStore } from '../../../_lib/store/background-store.svelte';
	import { pageIconStore } from '../../../_lib/store/page-icon-store.svelte';
	import { HASH } from '../constants/hash';
	import { hashStore } from '../store/hash-store.svelte';
	import { sizeStore } from '../store/size-store.svelte';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		actions?: Snippet;
		isTransitionReversed?: boolean;
		showBackButton?: boolean;
		icon?: string;
		background?: string;
		hasBottomPadding?: boolean;
		hasContentPadding?: boolean;
	};
	let {
		children,
		class: extraClass,
		actions,
		isTransitionReversed = $bindable(false),
		showBackButton = false,
		icon,
		background,
		hasBottomPadding,
		hasContentPadding
	}: Props = $props();

	let isNotificationsActive = $derived(hashStore.current === HASH.NOTIFICATIONS);
	let isSearchActive = $derived(hashStore.current === HASH.SEARCH);
	let actionWidth = $state(0);

	$effect(() => {
		pageIconStore.current = icon ?? '';
	});
	$effect(() => {
		if (background) backgroundStore.current = background;
	});
	$effect(() => {
		isTransitionReversed = isNotificationsActive;
	});

	const handleToggleDarkMode = () => setMode(mode.current === 'light' ? 'dark' : 'light');
	const handleBack = () => window.history.back();
	const handleCloseNotification = () => {
		if (isNotificationsActive) window.history.back();
	};
</script>

<div
	style:--padding-bottom={toRem(sizeStore.navigationHeight)}
	style:--height={toRem(
		isSearchActive
			? sizeStore.searchHeight
			: isNotificationsActive
				? sizeStore.notificationsHeight
				: 0
	)}
	style:--min-height={toRem(
		window.innerHeight - sizeStore.headerHeight - sizeStore.navigationHeight
	)}
	class={cn(
		'overflow-hidden',
		hasBottomPadding && 'pb-[calc(var(--padding-bottom)+var(--spacing-content-padding))]',
		(isSearchActive || isNotificationsActive) && 'h-(--height) min-h-(--min-height)',
		extraClass
	)}
>
	<div class="pt-content-padding" bind:clientHeight={sizeStore.headerHeight}>
		<div class="relative z-40 mx-content-padding h-10 items-center transition-colors">
			{#key actions && isNotificationsActive}
				<div
					class="absolute top-1/2 right-0 -translate-y-1/2"
					in:fly={{
						x: isTransitionReversed ? actionWidth : 0,
						y: !isTransitionReversed ? -sizeStore.headerHeight : 0,
						duration: TRANSITION.DURATION,
						easing: backOut
					}}
					out:fly={{
						x: !isTransitionReversed ? actionWidth : 0,
						y: isTransitionReversed ? -sizeStore.headerHeight : 0,
						duration: TRANSITION.DURATION,
						easing: backOut
					}}
					bind:clientWidth={actionWidth}
				>
					{#if isNotificationsActive || actions}
						<div class="flex items-center gap-1.5">
							{#if isNotificationsActive}
								<Button variant="danger" isCircle isActive={false} hasBlur={false}>
									<TrashIcon class="size-5 stroke-[1.5]" />
								</Button>
								<Button variant="success" isCircle isActive={false} hasBlur={false}>
									<CheckCheckIcon class="size-5 stroke-[1.5]" />
								</Button>
							{:else}
								{@render actions!()}
							{/if}
						</div>
					{:else}
						<div class="relative isolate">
							<img
								class="brightness-125 saturate-150"
								src={asset('/image/brand-name-fa.svg')}
								alt=""
							/>
							<img
								class="absolute top-1/2 left-1/2 -z-10 -translate-1/2 blur-xl"
								src={asset('/image/brand-name-fa.svg')}
								alt=""
							/>
						</div>
					{/if}
				</div>
			{/key}
			<!-- Global Actions -->
			<Box.Root
				class={[
					'absolute left-0 flex items-center justify-center transition-transform',
					showBackButton ? 'translate-x-11.5 ease-overshoot-light' : 'duration-300'
				]}
			>
				<Box.Visuals class="bg-transparent bg-gradient bg-gradient-neutral/25" />
				<Pressable.Root
					as="a"
					onClick={handleCloseNotification}
					href={HASH.NOTIFICATIONS}
					class="-ml-0.5 size-10"
				>
					<Pressable.Content class="grid size-full place-items-center">
						<Toggle isActive={isNotificationsActive} mustRotate speed="slow">
							{#snippet active()}
								<Icon src={XMark} class="size-5 text-danger-tint" />
							{/snippet}
							{#snippet inactive()}
								<IconBell class="size-5 stroke-[1.5]" />
							{/snippet}
						</Toggle>
					</Pressable.Content>
				</Pressable.Root>
				<Separator size={12} />
				<Pressable.Root class="-mr-0.5 size-10" onClick={handleToggleDarkMode}>
					<Pressable.Content class="grid place-items-center">
						<Toggle isActive={mode.current === 'dark'} mustRotate speed="slow">
							{#snippet active()}
								<Icon src={Sun} class="size-5 text-accent-secondary-tint" theme="mini" />
							{/snippet}
							{#snippet inactive()}
								<Icon src={Moon} class="size-5 text-accent-primary-tint" theme="mini" />
							{/snippet}
						</Toggle>
					</Pressable.Content>
				</Pressable.Root>
			</Box.Root>
			<Button
				isCircle
				variant="neutral"
				isActive={false}
				class={[
					'absolute left-0 transition-transform ease-overshoot-light',
					showBackButton
						? 'ease-overshoot-light'
						: '-translate-x-[calc(100%+var(--spacing-content-padding))]'
				]}
				onClick={handleBack}
			>
				<Icon class="size-6" src={ChevronLeft} theme="mini" />
			</Button>
		</div>
	</div>
	<div class={[hasContentPadding && 'px-content-padding']}>
		{@render children?.()}
	</div>
</div>
