<script lang="ts">
	import { goto } from '$app/navigation';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Box } from '$lib/components/box';
	import Button from '$lib/components/button.svelte';
	import { Pressable } from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import Toggle from '$lib/components/toggle.svelte';
	import { TRANSITION } from '$lib/constants/transition';
	import { ChevronLeft, Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBell } from '@tabler/icons-svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { historyStore } from '../store/history-store.svelte';
	import { sizeStore } from '../store/size-store.svelte';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		actions?: Snippet;
		isTransitionReversed?: boolean;
		showBackButton?: boolean;
	};
	const {
		children,
		class: extraClass,
		actions,
		isTransitionReversed,
		showBackButton = false
	}: Props = $props();

	let isNotificationsActive = $state(false);
	let actionWidth = $state(0);

	const handleToggleDarkMode = () => setMode(mode.current === 'light' ? 'dark' : 'light');
	const handleToggleNotifications = () => (isNotificationsActive = !isNotificationsActive);
	const handleBack = () => {
		if (page.url.hash) goto(page.url.toString().split('#')[0]);
		else goto(historyStore.current.at(-2) ?? resolve('/fa/'));
	};
</script>

<div class={cn('overflow-hidden', extraClass)}>
	<div class="pt-content-padding" bind:clientHeight={sizeStore.headerHeight}>
		<div class="relative z-40 mx-content-padding h-10 items-center transition-colors">
			{#key actions}
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
					{#if actions}
						<div class="flex items-center gap-1.5">
							{@render actions()}
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
				<Pressable.Root class="-ml-0.5 size-10" onClick={handleToggleNotifications}>
					<Pressable.Content class="grid place-items-center">
						<Toggle isActive={isNotificationsActive} speed="slow" mustRotate>
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
	{@render children?.()}
</div>
