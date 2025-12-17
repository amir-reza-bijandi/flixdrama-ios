<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<div class="text-xl leading-none font-bold transition-colors">
	{@render children()}
</div>
