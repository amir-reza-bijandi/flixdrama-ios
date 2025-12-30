<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<Box.Root class="divide-y divide-stroke-primary">
	<Box.Visuals class="rounded-3xl bg-background-tertiary" hasBlur={false} />
	{@render children()}
</Box.Root>
