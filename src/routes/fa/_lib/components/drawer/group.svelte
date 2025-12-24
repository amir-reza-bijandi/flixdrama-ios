<script lang="ts">
	import * as Box from '$lib/components/box';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<Box.Root class="divide-y divide-stroke-primary">
	<Box.Visuals class="rounded-3xl bg-background-tertiary" />
	{@render children()}
</Box.Root>
