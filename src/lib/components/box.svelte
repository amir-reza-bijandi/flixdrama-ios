<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import { fade } from 'svelte/transition';

	type Border = 'primary' | 'secondary' | 'tertiary';
	type Background = 'secondary' | 'tertiary';
	type Props = {
		roundness: 8 | 12 | 16 | 20 | 24 | 32 | 'full';
		hasBlur?: boolean;
		border?: Border;
		background?: Background;
	};
	const {
		roundness,
		hasBlur = true,
		border = 'primary',
		background = 'secondary'
	}: Props = $props();
</script>

<div
	style:--roundness={typeof roundness === 'string' ? toRem(9999) : toRem(roundness)}
	class={[
		'absolute inset-0 isolate -z-10 overflow-hidden rounded-(--roundness) outline -outline-offset-1',
		(
			{
				primary: 'outline-stroke-primary',
				secondary: 'outline-stroke-secondary',
				tertiary: 'outline-stroke-tertiary'
			} as Record<Border, string>
		)[border],
		(
			{
				secondary: 'bg-background-secondary',
				tertiary: 'bg-background-tertiary'
			} as Record<Background, string>
		)[background]
	]}
>
	{#if hasBlur}
		<div
			in:fade={{
				duration: TRANSITION.DURATION
			}}
			class="absolute inset-0 -z-10 backdrop-blur-xl"
		></div>
	{/if}
</div>
