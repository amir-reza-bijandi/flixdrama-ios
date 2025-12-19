<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import { fade } from 'svelte/transition';
	import { cn, type ClassValue } from 'tailwind-variants';

	type Props = {
		blur?: boolean;
		class?: ClassValue;
	};
	const { blur = true, class: extraClass }: Props = $props();
</script>

<div
	class={cn(
		'pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden rounded-full bg-background-secondary outline -outline-offset-1 outline-stroke-primary transition-colors',
		extraClass
	)}
>
	{#if blur}
		<div
			in:fade={{
				duration: TRANSITION.DURATION
			}}
			class="absolute inset-0 -z-10 backdrop-blur-2xl"
		></div>
	{/if}
</div>
