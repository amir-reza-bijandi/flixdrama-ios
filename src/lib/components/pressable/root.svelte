<script module>
	type AnchorProps = Pick<HTMLAnchorAttributes, 'href'> & {
		as: 'a';
	};
	type ButtonProps = Pick<HTMLButtonAttributes, 'type'> & {
		as?: 'button';
		onClick?: () => void;
	};
	type Props = (AnchorProps | ButtonProps) & {
		children?: Snippet;
		class?: ClassValue;
	};
	export type { Props as PressableProps };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { cn, type ClassValue } from 'tailwind-variants';

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
				onclick: restOfProps.onClick,
				type: restOfProps.type ?? 'button'
			}}
>
	{@render children?.()}
</svelte:element>
