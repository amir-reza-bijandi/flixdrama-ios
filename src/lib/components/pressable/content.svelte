<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		mustBounceOnClick?: boolean;
	};
	const { children, class: extraClass, mustBounceOnClick = true }: Props = $props();
</script>

<div
	class={cn(
		mustBounceOnClick &&
			'transition-transform duration-750 ease-overshoot-heavy group-active:scale-90',
		extraClass
	)}
>
	{@render children?.()}
</div>
