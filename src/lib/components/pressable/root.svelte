<script module>
	type AnchorProps = Pick<HTMLAnchorAttributes, 'href'> & {
		as: 'a';
	};
	type ButtonProps = Pick<HTMLButtonAttributes, 'type'> & {
		as?: 'button';
	};
	type Props = (AnchorProps | ButtonProps) & {
		children?: Snippet;
		class?: ClassValue;
		onClick?: () => void;
	};
	export type { Props as PressableProps };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn, type ClassValue } from 'tailwind-variants';

	const { children, class: extraClass, onClick, ...restOfProps }: Props = $props();
</script>

<svelte:element
	this={restOfProps.as ?? 'button'}
	class={cn('group cursor-pointer', extraClass)}
	{...restOfProps.as === 'a'
		? {
				href: restOfProps.href
			}
		: {
				type: restOfProps.type ?? 'button'
			}}
	onclick={onClick}
>
	{@render children?.()}
</svelte:element>
