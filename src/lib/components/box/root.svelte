<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		id?: string;
	};
	const { children, class: extraClass, id }: Props = $props();
</script>

<div {id} class={cn('relative', extraClass)}>
	{@render children?.()}
</div>
