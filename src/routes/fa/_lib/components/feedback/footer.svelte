<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="mt-4 flex items-center justify-between">
	{@render children?.()}
</div>
