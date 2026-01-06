<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		heading: string;
	};
	const { children, heading }: Props = $props();
</script>

<div>
	<div class="mb-3 font-bold transition-colors">{heading}</div>
	{@render children?.()}
</div>
