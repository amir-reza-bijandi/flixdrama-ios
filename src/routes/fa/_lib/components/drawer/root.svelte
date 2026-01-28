<script lang="ts">
	import { Box } from '$lib/components/box';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { hashStore } from '../../store/hash-store.svelte';
	import type { Hash } from '../../types/hash';

	type Props = {
		hash: Hash;
		class?: ClassValue;
		children?: Snippet;
	};
	const { hash, children, class: extraClass }: Props = $props();

	const isActive = $derived(hashStore.current === hash);
</script>

<Box.Root
	class={cn([
		'fixed -bottom-32 left-0 z-50 flex w-full flex-col gap-4 p-5 pb-37 transition-transform',
		!isActive && 'translate-y-full',
		extraClass
	])}
>
	<Box.Visuals class="bg-background-tertiary" roundedSide="top" />
	{@render children?.()}
</Box.Root>
