<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		padding?: number;
	};
	const { children, padding = 20 }: Props = $props();
</script>

<div style:--padding={toRem(padding)} class="p-(--padding)">
	{@render children()}
</div>
