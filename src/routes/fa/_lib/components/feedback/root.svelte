<script lang="ts">
	import type { Asset } from '$app/types';
	import { Box } from '$lib/components/box';
	import type { Snippet } from 'svelte';
	import { generateFeedbackId } from '../../utilities/generate-feedback-id';
	import Backdrop from '../backdrop.svelte';

	type Props = {
		id: number;
		children?: Snippet;
		hasVisuals?: boolean;
		image?: Asset | Asset[];
	};

	const { children, id, hasVisuals = true, image }: Props = $props();
</script>

<Box.Root id={generateFeedbackId(id)}>
	{#if hasVisuals}
		<Box.Visuals class="rounded-3xl bg-background-tertiary" hasBlur={false}>
			{#if image}
				<Backdrop
					{...Array.isArray(image) ? { images: image } : { image: image }}
					visibility="low"
				/>
			{/if}
		</Box.Visuals>
	{/if}
	{@render children?.()}
</Box.Root>
