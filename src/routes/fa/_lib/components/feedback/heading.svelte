<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="mb-0.5 text-sm leading-none font-bold">
	{@render children?.()}
</div>
