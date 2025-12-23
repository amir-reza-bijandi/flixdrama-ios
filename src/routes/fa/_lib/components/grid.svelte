<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};
	const { children, class: extraClass }: Props = $props();
</script>

<div class={cn('grid grid-cols-2 gap-x-3 gap-y-4', extraClass)}>
	{@render children()}
</div>
