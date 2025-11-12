<script lang="ts">
	import type { Snippet } from 'svelte';
	import PostSection from './post-section.svelte';

	type Props = {
		children: Snippet;
	};
	const { children }: Props = $props();
</script>

<PostSection heading="Synopsis">
	<div
		class="rounded-2xl bg-background-secondary px-4.5 py-3 leading-normal outline -outline-offset-1 outline-stroke-primary"
	>
		{@render children()}
	</div>
</PostSection>
