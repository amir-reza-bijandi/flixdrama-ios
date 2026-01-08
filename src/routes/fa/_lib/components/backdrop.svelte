<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { Snippet } from 'svelte';

	type SingleImageProps = {
		image: string;
	};
	type MultiImageProps = {
		images: string[];
	};
	type Props = (SingleImageProps | MultiImageProps) & {
		children?: Snippet;
	};
	const { children, ...restOfProps }: Props = $props();
</script>

<div class="absolute top-0 left-1/2 z-10 -translate-x-1/2">
	<div
		class="aspect-video h-auto w-lg mask-linear-180 mask-linear-from-black/50 mask-linear-to-transparent"
	>
		{#if 'image' in restOfProps}
			<Image class="size-full" src={restOfProps.image} hasLoadingGlow />
		{:else}
			<div class="flex size-full">
				{#each restOfProps.images as image}
					<Image class="aspect-video h-auto w-lg flex-1" src={image} hasLoadingGlow />
				{/each}
			</div>
		{/if}
	</div>
	<div class="absolute inset-0 flex items-center justify-center">
		{@render children?.()}
	</div>
</div>
