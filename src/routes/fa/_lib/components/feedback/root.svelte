<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { Snippet } from 'svelte';
	import { generateFeedbackId } from '../../utilities/generate-feedback-id';

	type Props = {
		children?: Snippet;
		hasVisuals?: boolean;
		id: number;
	};

	const { children, id, hasVisuals = true }: Props = $props();
</script>

<Box.Root id={generateFeedbackId(id)}>
	{#if hasVisuals}
		<Box.Visuals class="rounded-3xl bg-background-tertiary" hasBlur={false} />
	{/if}
	{@render children?.()}
</Box.Root>
