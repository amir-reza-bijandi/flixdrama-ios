<script module>
	type Data<T = unknown> = T;
	export type SwitchSelectEventHandler = (value: Data, isActive: boolean) => void;
	export type { Data as SwitchData };
</script>

<script lang="ts" generics="T extends Data">
	import { Pressable } from '$lib/components/pressable';
	import type { Snippet } from 'svelte';

	type Props = {
		value: T;
		children: Snippet;
		isActive: boolean;
		onSelect?: SwitchSelectEventHandler;
	};
	const { value, isActive, children, onSelect }: Props = $props();
	const handleClick = () => onSelect?.(value, !isActive);
</script>

<Pressable.Root class="relative block w-full" onClick={handleClick}>
	<Pressable.Content class="relative flex h-15 items-center ps-4 active:scale-95">
		{@render children()}
		<div
			class={[
				'absolute top-1/2 left-4.5 h-7 w-12 -translate-y-1/2 rounded-full border border-stroke-primary transition-colors',
				isActive ? 'bg-accent-primary-tint' : 'duration-200'
			]}
		>
			<div
				class={[
					'absolute top-1/2 left-1 size-5 -translate-y-1/2 rounded-full bg-foreground-accent transition-transform ease-overshoot-medium',
					isActive && 'translate-x-full'
				]}
			></div>
		</div>
	</Pressable.Content>
</Pressable.Root>
