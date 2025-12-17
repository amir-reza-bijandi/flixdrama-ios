<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		heading: string;
	};
	const { children, heading }: Props = $props();
</script>

<div class="mt-6 px-5 transition-colors">
	<div class="text-2xl leading-none font-bold">
		{heading}
	</div>
	{@render children()}
</div>
