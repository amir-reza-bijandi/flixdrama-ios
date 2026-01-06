<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = Pick<HTMLInputAttributes, 'value' | 'placeholder'>;
	let { value = $bindable(), placeholder }: Props = $props();
</script>

<Box.Root>
	<Box.Visuals class="bg-background-tertiary" />
	<input
		class="h-11.5 w-full px-4 text-sm outline-none placeholder:text-foreground-primary/50"
		type="text"
		bind:value
		{placeholder}
	/>
</Box.Root>
