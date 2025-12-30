<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		isActive: boolean;
	};
	const { children, class: extraClass, isActive }: Props = $props();
</script>

<div
	class={cn(
		'grid overflow-hidden rounded-b-3xl border-t bg-background-tertiary transition-[grid-template-rows,border-color]',
		isActive ? 'grid-rows-[1fr] border-stroke-primary' : 'grid-rows-[0fr] border-transparent',
		extraClass
	)}
>
	<div
		class={[
			'absolute top-0 left-0 w-full bg-stroke-primary transition-opacity',
			!isActive && 'opacity-0'
		]}
	></div>
	<div class="min-h-0 overflow-hidden">
		<div class="divide-y divide-stroke-primary">
			{@render children?.()}
		</div>
	</div>
</div>
