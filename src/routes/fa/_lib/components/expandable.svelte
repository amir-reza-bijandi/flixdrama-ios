<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		isActive?: boolean;
		overshoot?: boolean;
	};
	const { children, isActive = false, overshoot }: Props = $props();

	let height = $state(0);
	let hasTransition = $state(false);

	$effect(() => {
		if (height) requestAnimationFrame(() => (hasTransition = true));
	});
</script>

<div
	style:--height={toRem(isActive ? height : 0)}
	class={[
		'relative h-(--height) overflow-hidden',
		overshoot && (isActive ? 'ease-overshoot-light' : 'duration-300'),
		hasTransition && 'transition-[height]'
	]}
>
	<div
		class={['absolute top-0 w-full transition-opacity', !isActive && 'opacity-0 duration-300']}
		bind:clientHeight={height}
	>
		{@render children?.()}
	</div>
</div>
