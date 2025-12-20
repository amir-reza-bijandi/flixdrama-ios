<script lang="ts">
	import { asset } from '$app/paths';
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import Separator from '$lib/components/separator.svelte';
	import { Moon, Sun, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { IconBell } from '@tabler/icons-svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { Snippet } from 'svelte';
	import Toggle from './toggle.svelte';

	const TOGGLE_HITBOX_SIZE = 40;

	type Props = {
		children?: Snippet;
		actions?: Snippet;
	};
	const { children, actions }: Props = $props();

	let isNotificationsActive = $state(false);

	const handleToggleDarkMode = () => setMode(mode.current === 'light' ? 'dark' : 'light');
	const handleToggleNotifications = () => (isNotificationsActive = !isNotificationsActive);
</script>

<div class="overflow-hidden">
	<!-- Header -->
	<div
		class="relative z-50 flex items-center justify-between px-app-padding pt-app-padding transition-colors"
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
		<Box.Root class="flex items-center justify-center">
			<Box.Visuals />
			<Pressable.Root class="-ml-0.5 size-10" onClick={handleToggleNotifications}>
				<Pressable.Content class="grid place-items-center">
					<Toggle isActive={isNotificationsActive}>
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
					<Toggle isActive={mode.current === 'dark'}>
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
	</div>
	{@render children?.()}
</div>
