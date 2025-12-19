<script lang="ts">
	import { TRANSITION } from '$lib/constants/transition';
	import { toRem } from '$lib/utilities/general';
	import { fade } from 'svelte/transition';

	type RoundnessValue = 0 | 8 | 12 | 16 | 20 | 24 | 32 | 'full';
	type BorderSide = 'all' | 'top';
	type BorderColor = 'primary' | 'secondary' | 'tertiary';
	type Border = {
		side: BorderSide;
		color: BorderColor;
	};
	type Background = 'secondary' | 'tertiary';
	type Roundness =
		| RoundnessValue
		| {
				topLeft: RoundnessValue;
				topRight: RoundnessValue;
				bottomLeft: RoundnessValue;
				bottomRight: RoundnessValue;
		  };
	type Props = {
		roundness: Roundness;
		hasBlur?: boolean;
		border?: Border;
		background?: Background;
	};
	const {
		roundness,
		hasBlur = true,
		border = {
			side: 'all',
			color: 'primary'
		},
		background = 'secondary'
	}: Props = $props();

	function roundnessValueToRem(roundnessValue: RoundnessValue) {
		return typeof roundnessValue === 'string' ? toRem(9999) : toRem(roundnessValue);
	}
</script>

<div
	style:--rounded-tl={typeof roundness === 'object'
		? roundnessValueToRem(roundness.topLeft)
		: roundnessValueToRem(roundness)}
	style:--rounded-tr={typeof roundness === 'object'
		? roundnessValueToRem(roundness.topRight)
		: roundnessValueToRem(roundness)}
	style:--rounded-bl={typeof roundness === 'object'
		? roundnessValueToRem(roundness.bottomLeft)
		: roundnessValueToRem(roundness)}
	style:--rounded-br={typeof roundness === 'object'
		? roundnessValueToRem(roundness.bottomRight)
		: roundnessValueToRem(roundness)}
	class={[
		'pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden rounded-tl-(--rounded-tl) rounded-tr-(--rounded-tr) rounded-br-(--rounded-br) rounded-bl-(--rounded-bl) transition-colors',
		border.side === 'all'
			? [
					(
						{
							primary: 'outline-stroke-primary',
							secondary: 'outline-stroke-secondary',
							tertiary: 'outline-stroke-tertiary'
						} as Record<BorderColor, string>
					)[border.color],
					'outline -outline-offset-1'
				]
			: [
					'border-t',
					(
						{
							primary: 'border-stroke-primary',
							secondary: 'border-stroke-secondary',
							tertiary: 'border-stroke-tertiary'
						} as Record<BorderColor, string>
					)[border.color]
				],
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
			class="absolute inset-0 -z-10 backdrop-blur-2xl"
		></div>
	{/if}
</div>
