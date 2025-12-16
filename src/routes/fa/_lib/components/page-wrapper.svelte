<script lang="ts">
	import { asset } from '$app/paths';
	import Box from '$lib/components/box.svelte';
	import { Bell, Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import Toggle, { type ToggleStateChangeEventHandler } from './toggle.svelte';

	const TOGGLE_HITBOX_SIZE = 40;

	type Props = {
		children?: Snippet;
		actions?: Snippet;
	};
	const { children, actions }: Props = $props();

	let isNotificationsActive = $state(false);

	const handleToggleDarkMode: ToggleStateChangeEventHandler = (isActive) =>
		setMode(isActive ? 'dark' : 'light');
	const handleToggleNotifications: ToggleStateChangeEventHandler = (isActive) =>
		(isNotificationsActive = isActive);
</script>

<div class="overflow-hidden pb-[calc(var(--spacing-app-padding)+--spacing(22))]">
	<!-- Header -->
	<div class="flex items-center justify-between px-app-padding pt-app-padding">
		{#if actions}
			{@render actions()}
		{:else}
			<div class="relative isolate">
				<img src={asset('/image/brand-name-fa.svg')} alt="" />
				<img
					class="absolute top-1/2 left-1/2 -z-10 -translate-1/2 blur-xl"
					src={asset('/image/brand-name-fa.svg')}
					alt=""
				/>
			</div>
		{/if}
		<!-- Global Actions -->
		<div class="box-container flex items-center justify-center gap-2 p-2.5">
			<Box roundness="full" />
			<Toggle
				isActive={isNotificationsActive}
				onStateChange={handleToggleNotifications}
				hitboxSize={TOGGLE_HITBOX_SIZE}
			>
				{#snippet active()}
					<Icon src={XMark} class="size-5 text-danger-tint" />
				{/snippet}
				{#snippet inactive()}
					<Icon src={Bell} class="size-5" />
				{/snippet}
			</Toggle>
			<span class="h-3 w-px rounded-full bg-stroke-primary"></span>
			<Toggle
				isActive={mode.current === 'dark'}
				onStateChange={handleToggleDarkMode}
				hitboxSize={TOGGLE_HITBOX_SIZE}
			>
				{#snippet active()}
					<Icon src={Sun} class="size-5 text-accent-secondary-tint" theme="mini" />
				{/snippet}
				{#snippet inactive()}
					<Icon src={Moon} class="size-5 text-accent-primary-tint" theme="mini" />
				{/snippet}
			</Toggle>
		</div>
	</div>
	{@render children?.()}
</div>
