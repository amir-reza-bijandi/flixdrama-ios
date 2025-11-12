<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		padding: number;
	};
	const { children, padding }: Props = $props();
</script>

<div style:--padding={toRem(padding)} class="flex w-fit gap-2 px-(--padding)">
	{@render children()}
</div>
