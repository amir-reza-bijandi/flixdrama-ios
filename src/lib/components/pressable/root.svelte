<script module>
	type Context = {
		isPointerDown: boolean;
		stopPropagation: boolean;
	};
	const [get, set] = createContext<Context>();
	type AnchorProps = Pick<HTMLAnchorAttributes, 'href'> & {
		as: 'a';
		replaceState?: boolean;
	};
	type ButtonProps = Pick<HTMLButtonAttributes, 'type'> & {
		as?: 'button';
	};
	type Props = (AnchorProps | ButtonProps) & {
		children?: Snippet;
		class?: ClassValue;
		stopPropagation?: boolean;
		onClick?: () => void;
	};
	export { get as getPressableContext };
	export type { Props as PressableProps };
</script>

<script lang="ts">
	import { createContext, type Snippet } from 'svelte';
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		PointerEventHandler
	} from 'svelte/elements';
	import { cn, type ClassValue } from 'tailwind-variants';

	const {
		children,
		class: extraClass,
		stopPropagation = false,
		onClick,
		...restOfProps
	}: Props = $props();

	let context = $state<Context>({
		isPointerDown: false,
		stopPropagation
	});
	set(context);

	const handlePointerDown = () => (context.isPointerDown = true);
	const handlePointerDownCapture: PointerEventHandler<HTMLElement> = (e) =>
		stopPropagation && e.stopImmediatePropagation();
	const handlePointerUp = () => (context.isPointerDown = false);
</script>

<svelte:element
	this={restOfProps.as ?? 'button'}
	class={cn('group cursor-pointer', extraClass)}
	{...restOfProps.as === 'a'
		? {
				href: restOfProps.href,
				...(restOfProps.replaceState ? { 'data-sveltekit-replacestate': true } : {})
			}
		: {
				type: restOfProps.type ?? 'button'
			}}
	onclickcapture={onClick}
	onpointerdowncapture={handlePointerDownCapture}
	onpointerdown={handlePointerDown}
	onpointerup={handlePointerUp}
>
	{@render children?.()}
</svelte:element>
