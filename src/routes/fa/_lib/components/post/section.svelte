<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		heading: string;
		'--margin-top'?: string;
	};
	const { children, heading }: Props = $props();
</script>

<div class="mt-(--margin-top)">
	<div class="mb-2 font-bold transition-colors">{heading}</div>
	{@render children()}
</div>
