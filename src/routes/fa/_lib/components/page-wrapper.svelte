<script lang="ts">
	import { asset } from '$app/paths';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { toRem } from '$lib/utilities/general';
	import { CheckCheckIcon, TrashIcon } from '@lucide/svelte';
	import { ChevronLeft, Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBell } from '@tabler/icons-svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
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
		showBackButton = false,
		icon,
		background,
		hasBottomPadding,
		hasContentPadding
	}: Props = $props();

	let isNotificationsActive = $derived(hashStore.current === HASH.NOTIFICATIONS);
	let isSearchActive = $derived(hashStore.current === HASH.SEARCH);
	let actionWidth = $state(0);
	let brandingWidth = $state(0);

	$effect(() => {
		pageIconStore.current = icon ?? '';
	});
	$effect(() => {
		if (background) backgroundStore.current = background;
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
		<div
			style:--header-height={toRem(sizeStore.headerHeight)}
			class="relative z-40 mx-content-padding h-10 items-center transition-colors"
		>
			<div
				style:--branding-width={toRem(brandingWidth)}
				class={[
					'absolute top-1/2 right-0 transition-[translate,opacity] ease-overshoot-light',
					isSearchActive || (!isNotificationsActive && !actions)
						? 'translate-x-0 -translate-y-1/2'
						: isNotificationsActive
							? 'translate-x-[calc(var(--branding-width)+var(--spacing-content-padding))] -translate-y-1/2'
							: '-translate-y-[calc(var(--header-height)+var(--spacing-content-padding))]',
					(isNotificationsActive || !isSearchActive) && 'opacity-0'
				]}
				bind:clientWidth={brandingWidth}
			>
				<div class="relative isolate">
					<img class="brightness-125 saturate-150" src={asset('/image/brand-name-fa.svg')} alt="" />
					<img
						class="absolute top-1/2 left-1/2 -z-10 blur-xl"
						src={asset('/image/brand-name-fa.svg')}
						alt=""
					/>
				</div>
			</div>
			<div
				class={[
					'absolute top-1/2 right-0 flex items-center gap-1.5 transition-transform ease-overshoot-light',
					isNotificationsActive
						? '-translate-y-1/2'
						: '-translate-y-[calc(var(--header-height)+var(--spacing-content-padding))]'
				]}
			>
				<Button variant="danger" isCircle isActive={false} hasBlur={false}>
					<TrashIcon class="size-5 stroke-[1.5]" />
				</Button>
				<Button variant="success" isCircle isActive={false} hasBlur={false}>
					<CheckCheckIcon class="size-5 stroke-[1.5]" />
				</Button>
			</div>
			<div
				style:--action-width={toRem(actionWidth)}
				class={[
					'absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1.5 transition-transform ease-overshoot-light',
					!isNotificationsActive && !isSearchActive
						? 'translate-x-0'
						: 'translate-x-[calc(var(--action-width)+var(--spacing-content-padding))]'
				]}
				bind:clientWidth={actionWidth}
			>
				{@render actions?.()}
			</div>
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
