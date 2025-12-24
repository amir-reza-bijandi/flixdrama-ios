<script lang="ts">
	import * as Box from '$lib/components/box';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import type { HASH } from '../../constants/hash';
	import { hashStore } from '../../store/hash-store.svelte';

	type Props = {
		hash: (typeof HASH)[keyof typeof HASH];
		class?: ClassValue;
		children: Snippet;
	};
	const { hash, children, class: extraClass }: Props = $props();

	const isActive = $derived(hashStore.current === hash);
	let height = $state(0);

	const handleBack = () => window.history.back();
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
	class={[
		'fixed inset-0 z-40 bg-background-primary/75 backdrop-blur-lg transition-opacity duration-250',
		!isActive && 'pointer-events-none opacity-0'
	]}
	onclick={handleBack}
></button>
<Box.Root
	class={cn([
		'fixed -bottom-32 left-0 z-50 w-full p-5 transition-transform duration-600 ease-overshoot-light',
		!isActive && 'translate-y-full',
		extraClass
	])}
>
	<Box.Visuals class="bg-background-tertiary" roundedSide="top" />
	<div class="flex flex-col gap-4 pb-32" bind:clientHeight={height}>
		{@render children()}
	</div>
</Box.Root>
