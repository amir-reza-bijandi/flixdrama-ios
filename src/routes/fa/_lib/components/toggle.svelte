<script lang="ts">
	import { tv } from '$lib/tv';
	import { toRem } from '$lib/utilities/general';
	import type { Snippet } from 'svelte';
	import type { VariantProps } from 'tailwind-variants';

	const getClass = tv({
		variants: {
			transition: {
				rotate: 'scale-0 -rotate-360 opacity-0',
				scale: 'scale-0 opacity-0'
			}
		},
		defaultVariants: {
			transition: 'rotate'
		}
	});

	type Props = VariantProps<typeof getClass> & {
		active: Snippet;
		inactive: Snippet;
		isActive: boolean;
	};
	const { active, inactive, isActive, transition }: Props = $props();

	let contentWidth = $state(0);
	let contentHeight = $state(0);
</script>

<div
	style:--width={toRem(contentWidth)}
	style:--height={toRem(contentHeight)}
	class="relative h-(--height) w-(--width)"
>
	<div
		class={[
			'absolute top-1/2 left-1/2 -translate-1/2 transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			isActive && getClass({ transition })
		]}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render inactive()}
	</div>
	<div
		class={[
			'absolute top-1/2 left-1/2 -translate-1/2 transition-[opacity,scale,rotate] duration-1000 ease-overshoot-light',
			!isActive && getClass({ transition })
		]}
		bind:clientWidth={contentWidth}
		bind:clientHeight={contentHeight}
	>
		{@render active()}
	</div>
</div>
