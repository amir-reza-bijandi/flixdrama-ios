<script lang="ts">
	import { asset } from '$app/paths';
	import Box from '$lib/components/box.svelte';
	import { Bell, Sun } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		actions?: Snippet;
	};
	const { children, actions }: Props = $props();
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
		<div class="box-container flex items-center justify-center gap-2">
			<Box roundness="full" />
			<div class="p-2.5 pl-0">
				<Icon src={Sun} class="size-5 text-accent-secondary-tint" />
			</div>
			<span class="h-3 w-px rounded-full bg-stroke-primary"></span>
			<div class="p-2.5 pr-0">
				<Icon src={Bell} class="size-5" />
			</div>
		</div>
	</div>
	{@render children?.()}
</div>
