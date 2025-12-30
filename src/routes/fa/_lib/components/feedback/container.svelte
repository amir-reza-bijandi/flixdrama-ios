<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="relative p-4">
	{@render children?.()}
</div>
