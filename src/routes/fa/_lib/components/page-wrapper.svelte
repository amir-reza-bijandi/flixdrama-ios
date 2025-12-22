<script lang="ts">
	import { asset } from '$app/paths';
	import * as Box from '$lib/components/box';
	import IconButton from '$lib/components/icon-button.svelte';
	import * as Pressable from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import { ChevronLeft, Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBell } from '@tabler/icons-svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import { sizeStore } from '../store/size-store.svelte';
	import Toggle from './toggle.svelte';

	type Props = {
		children?: Snippet;
		actions?: Snippet;
		showBackButton?: boolean;
	};
	const { children, actions, showBackButton = false }: Props = $props();

	let isNotificationsActive = $state(false);

	const handleToggleDarkMode = () => setMode(mode.current === 'light' ? 'dark' : 'light');
	const handleToggleNotifications = () => (isNotificationsActive = !isNotificationsActive);
	const handleBack = () => window.history.back();
</script>

<div class="overflow-hidden">
	<!-- Header -->
	<div
		class="relative z-50 flex items-center justify-between px-content-padding pt-content-padding transition-colors"
		bind:clientHeight={sizeStore.headerHeight}
	>
		{#if actions}
			<div class="flex items-center gap-1.5">
				{@render actions()}
			</div>
		{:else}
			<div class="relative isolate">
				<img class="brightness-125 saturate-150" src={asset('/image/brand-name-fa.svg')} alt="" />
				<img
					class="absolute top-1/2 left-1/2 -z-10 -translate-1/2 blur-xl"
					src={asset('/image/brand-name-fa.svg')}
					alt=""
				/>
			</div>
		{/if}
		<!-- Global Actions -->
		<Box.Root
			class={[
				'absolute left-content-padding flex items-center justify-center transition-transform',
				showBackButton ? 'translate-x-11.5 ease-overshoot-light' : 'duration-300'
			]}
		>
			<Box.Visuals />
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
					<Toggle isActive={mode.current === 'dark'} speed="slow" mustRotate>
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
		<IconButton
			class={[
				'absolute left-content-padding transition-transform ease-overshoot-light',
				showBackButton
					? 'ease-overshoot-light'
					: '-translate-x-[calc(100%+var(--spacing-content-padding))]'
			]}
			onClick={handleBack}
		>
			<Icon class="size-6" src={ChevronLeft} theme="mini" />
		</IconButton>
	</div>
	{@render children?.()}
</div>
