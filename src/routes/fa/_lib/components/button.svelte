<script lang="ts">
	import * as Pressable from '$lib/components/pressable';
	import type { LucideIcon } from '$lib/types/icon';
	import type { Snippet } from 'svelte';

	type Props = {
		icon: LucideIcon;
		children: Snippet;
		'--margin-bottom'?: string;
	};
	const { icon: Icon, children }: Props = $props();
</script>

<Pressable.Root class="mb-(--margin-bottom) w-full">
	<Pressable.Content
		class="active:scale-scale-95 flex items-center justify-center gap-1.5 rounded-full bg-gradient bg-gradient-primary p-3 text-sm leading-none text-foreground-accent outline -outline-offset-1 outline-stroke-tertiary"
	>
		<Icon class="size-4" />
		{@render children()}
	</Pressable.Content>
</Pressable.Root>
