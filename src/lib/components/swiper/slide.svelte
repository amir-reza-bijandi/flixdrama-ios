<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};
	const { children, class: extraClass }: Props = $props();
</script>

<div class={cn('swiper-slide w-fit!', extraClass)}>
	{@render children()}
</div>
