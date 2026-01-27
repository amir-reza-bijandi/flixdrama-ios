<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { LucideIcon } from '$lib/types/icon';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Pick<HTMLInputAttributes, 'value' | 'placeholder'> & {
		showBoxVisuals?: boolean;
		icon?: LucideIcon;
	};
	let { value = $bindable(), placeholder, showBoxVisuals = true, icon: Icon }: Props = $props();
</script>

<Box.Root>
	<input
		class={[
			'peer h-11.5 w-full px-4 outline-none placeholder:text-foreground-primary/50',
			Icon && 'ps-9.5'
		]}
		type="text"
		bind:value
		{placeholder}
	/>
	<Icon
		class="absolute start-3 top-1/2 size-5 -translate-y-1/2 transition-colors peer-placeholder-shown:text-foreground-primary/50"
	/>
	{#if showBoxVisuals}
		<Box.Visuals
			class="bg-background-tertiary transition-colors peer-focus-visible:bg-background-secondary"
		/>
	{/if}
</Box.Root>
