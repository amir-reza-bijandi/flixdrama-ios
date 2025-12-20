<script lang="ts">
	import * as Box from '$lib/components/box';
	import * as Pressable from '$lib/components/pressable';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'tailwind-variants';

	type Props = {
		children: Snippet;
		class?: ClassValue;
		onClick?: () => void;
	};
	const { children, class: extraClass, onClick }: Props = $props();
</script>

<Pressable.Root class={extraClass} {onClick}>
	<Pressable.Content>
		<Box.Root class="flex size-10 items-center justify-center rounded-full">
			<Box.Visuals />
			{@render children?.()}
		</Box.Root>
	</Pressable.Content>
</Pressable.Root>
