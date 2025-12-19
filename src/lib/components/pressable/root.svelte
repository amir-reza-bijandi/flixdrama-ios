<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type AnchorProps = {
		as: 'a';
		href?: string;
	};
	type ButtonProps = {
		as?: 'button';
		onClick?: () => void;
	};
	type Props = (AnchorProps | ButtonProps) & {
		children: Snippet;
		class?: ClassValue;
	};
	const { children, class: extraClass, ...restOfProps }: Props = $props();
</script>

<svelte:element
	this={restOfProps.as ?? 'button'}
	class={cn('group cursor-pointer', extraClass)}
	{...restOfProps.as === 'a'
		? {
				href: restOfProps.href
			}
		: {
				onpointerup: restOfProps.onClick
			}}
>
	{@render children()}
</svelte:element>
