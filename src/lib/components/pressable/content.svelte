<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cnMerge, type ClassValue } from 'tailwind-variants';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};
	const { children, class: extraClass }: Props = $props();
</script>

<div
	class={cnMerge(
		'transition-transform duration-750 ease-overshoot-heavy group-active:scale-90',
		extraClass
	)({
		twMergeConfig: {}
	})}
>
	{@render children()}
</div>
