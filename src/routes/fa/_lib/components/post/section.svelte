<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		children?: Snippet;
		heading: string;
		class?: ClassValue;
	};
	const { children, heading, class: extraClass }: Props = $props();
</script>

<div>
	<div class={cn('mb-3 text-base leading-none font-bold transition-colors', extraClass)}>
		{heading}
	</div>
	{@render children?.()}
</div>
