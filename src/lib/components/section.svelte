<script lang="ts">
	import { langStore } from '$lib/store/lang-store.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		heading: string;
	};
	const { children, heading }: Props = $props();
</script>

<div class={['mt-6 transition-colors', langStore.current === 'en' && 'px-5']}>
	<div class="text-2xl leading-none font-bold">
		{heading}
	</div>
	{@render children()}
</div>
