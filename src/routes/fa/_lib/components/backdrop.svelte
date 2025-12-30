<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		image: string;
		children?: Snippet;
	};
	const { image, children }: Props = $props();
</script>

<div class="absolute top-0 left-1/2 z-10 -translate-x-1/2">
	<Image
		style="mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"
		class="aspect-video h-auto w-lg"
		src={image}
		hasLoadingGlow
	/>
	<div class="absolute inset-0 flex items-center justify-center">
		{@render children?.()}
	</div>
</div>
