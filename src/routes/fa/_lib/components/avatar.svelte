<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		image: string;
		class?: ClassValue;
	};
	const { image, class: extraClass }: Props = $props();
</script>

<Image
	class={cn('aspect-square size-10 rounded-full', extraClass)}
	src={image}
	hasLoadingGlow
	hasOutline
/>
