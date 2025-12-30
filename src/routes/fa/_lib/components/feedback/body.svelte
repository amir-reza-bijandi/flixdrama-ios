<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="mb-3 text-sm leading-normal">
	{@render children?.()}
</div>
