<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Pick<HTMLInputAttributes, 'value' | 'placeholder'>;
	let { value = $bindable(), placeholder }: Props = $props();
</script>

<Box.Root>
	<input
		class="peer h-11.5 w-full px-4 outline-none placeholder:text-foreground-primary/50"
		type="text"
		bind:value
		{placeholder}
	/>
	<Box.Visuals
		class="bg-background-tertiary transition-colors peer-focus-visible:bg-background-secondary"
	/>
</Box.Root>
