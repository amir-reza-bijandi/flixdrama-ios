<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="mt-2 text-xs leading-none text-foreground-secondary">
	{@render children()}
</div>
