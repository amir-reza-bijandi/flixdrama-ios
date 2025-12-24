<script module>
	type Value<T = unknown> = T;
	export type RadioSelectEventHandler = (value: Value) => void;
</script>

<script lang="ts" generics="T extends Value">
	import * as Pressable from '$lib/components/pressable';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		value: T;
		onSelect?: RadioSelectEventHandler;
		isActive: boolean;
	};
	const { children, value, onSelect, isActive }: Props = $props();

	const handleClick = () => onSelect?.(value);
</script>

<Pressable.Root class="relative block w-full" onClick={handleClick}>
	<Pressable.Content class="flex h-16 items-center ps-4 active:scale-95">
		{@render children()}
		<div
			class={[
				'absolute top-1/2 left-4.5 size-5 -translate-y-1/2 rounded-full border border-stroke-primary transition-colors',
				isActive ? 'bg-accent-primary-tint' : 'duration-200'
			]}
		>
			<div
				class={[
					'absolute top-1/2 left-1/2 size-2.5 -translate-1/2 rounded-full bg-foreground-accent transition-[scale,opacity] ease-overshoot-medium',
					!isActive && 'scale-0 opacity-0'
				]}
			></div>
		</div>
	</Pressable.Content>
</Pressable.Root>
