<script lang="ts">
	import { getPressableContext } from '$lib/components/pressable/root.svelte';
	import { type Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		class?: ClassValue;
		mustBounceOnClick?: boolean;
	};
	const { children, class: extraClass, mustBounceOnClick = true }: Props = $props();

	const context = getPressableContext();
</script>

<div
	class={cn(
		'transition-transform duration-750 ease-overshoot-heavy',
		mustBounceOnClick &&
			(context.stopPropagation ? 'group-active:scale-90' : context.isPointerDown && 'scale-90'),

		extraClass
	)}
>
	{@render children?.()}
</div>
