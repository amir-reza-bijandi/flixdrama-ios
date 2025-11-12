<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		heading: string;
		children: Snippet;
	};
	const { heading, children }: Props = $props();
</script>

<div>
	<div class="mt-5 mb-2.5 font-bold">{heading}</div>
	{@render children()}
</div>
