<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		spacing?: 16 | 24;
	};
	const { children, spacing = 24 }: Props = $props();
</script>

<div class={['flex flex-col', spacing === 24 ? 'gap-6' : 'gap-4']}>
	{@render children?.()}
</div>
