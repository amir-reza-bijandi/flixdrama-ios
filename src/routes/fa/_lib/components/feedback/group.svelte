<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="flex items-center gap-1.5">
	{@render children?.()}
</div>
