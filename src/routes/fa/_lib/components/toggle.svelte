<script module>
	export type ToggleStateChangeEventHandler = (isActive: boolean) => void;
</script>

<script lang="ts">
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';

	type Props = {
		active: Snippet;
		inactive: Snippet;
		isActive: boolean;
		hitboxSize?: number;
		onStateChange: ToggleStateChangeEventHandler;
	};
	const { hitboxSize, active, inactive, isActive, onStateChange }: Props = $props();

	let contentWidth = $state(0);
	let contentHeight = $state(0);

	const handleClick = () => {
		onStateChange(!isActive);
	};
</script>

<button
	style:--width={toRem(contentWidth)}
	style:--height={toRem(contentHeight)}
	style:--hitbox-size={toRem(hitboxSize ?? 0)}
	class={[
		'relative h-(--height) w-(--width) before:absolute before:top-1/2 before:left-1/2 before:size-(--hitbox-size) before:-translate-1/2',
		hitboxSize ? 'before:block' : 'before:hidden'
	]}
	onclick={handleClick}
>
	<div
		class={[
			'absolute top-1/2 left-1/2 -translate-1/2 transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			isActive ? 'scale-0 -rotate-360 opacity-0' : 'scale-100 rotate-0'
		]}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render inactive()}
	</div>
	<div
		class={[
			'absolute top-1/2 left-1/2 -translate-1/2 transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			isActive ? 'scale-100 rotate-0' : 'scale-0 -rotate-360 opacity-0'
		]}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render active()}
	</div>
</button>
