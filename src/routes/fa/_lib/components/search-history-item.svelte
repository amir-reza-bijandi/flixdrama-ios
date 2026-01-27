<script lang="ts">
	import { Pressable } from '$lib/components/pressable';
	import { HistoryIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		onClick?: () => void;
	};
	const { onClick, children }: Props = $props();
</script>

<Pressable.Root class="block w-full text-foreground-secondary transition-colors" {onClick}>
	<Pressable.Content class="flex origin-[center_right] items-center gap-1.5 p-3">
		<HistoryIcon class="size-4" />
		{@render children?.()}
	</Pressable.Content>
</Pressable.Root>
