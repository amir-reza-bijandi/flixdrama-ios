<script lang="ts">
	import type { DirectionFactor } from '$lib/types/transition';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const TRANSITION_DURATION = 500;

	type Props = {
		children: Snippet;
		message: Snippet;
		directionFactor: DirectionFactor;
		height: number;
		readonly contentHeight: number;
	};
	let { children, message, directionFactor, height, contentHeight = $bindable() }: Props = $props();

	let listWidth = $state(0);
</script>

<div
	class="absolute inset-0"
	in:fly={{
		x: listWidth * directionFactor,
		duration: TRANSITION_DURATION,
		easing: backOut
	}}
	out:fly={{
		x: -listWidth * directionFactor,
		duration: TRANSITION_DURATION,
		easing: backOut
	}}
>
	<div
		style:--height={toRem(height)}
		class={['transition-height relative isolate h-(--height) duration-150 ease-out']}
	>
		<div class="absolute inset-0 overflow-hidden rounded-2xl">
			<div
				class="absolute inset-0 -z-10 rounded-2xl bg-background-tertiary outline -outline-offset-1 outline-stroke-primary backdrop-blur-lg"
			></div>
			{@render message()}
			<div
				class="divide-y divide-stroke-primary"
				bind:clientHeight={contentHeight}
				bind:clientWidth={listWidth}
			>
				{@render children()}
			</div>
		</div>
	</div>
</div>
