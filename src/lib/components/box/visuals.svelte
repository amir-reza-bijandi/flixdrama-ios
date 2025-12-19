<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		blur?: boolean;
	};
	const { children, class: extraClass, blur = true }: Props = $props();
</script>

<div
	class={cn(
		'pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden rounded-full bg-background-secondary outline -outline-offset-1 outline-stroke-primary transition-colors',
		extraClass
	)}
>
	<div
		class={['absolute inset-0 -z-10 backdrop-blur-2xl transition-opacity', !blur && 'opacity-0']}
	>
		{@render children?.()}
	</div>
</div>
